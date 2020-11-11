<?php

namespace App\Http\Controllers;

use App\Booking;
use App\User;
use App\CarData;
use App\CarSpace;
use Illuminate\Http\Request;
use Validator;
use Session;
use DateTime; 

class BookingController extends Controller
{   
    //method for returning previous bookings of a user
    //if there are no previous bookings made by the user, return message
    public function getPreviousBookings($userID)
    {
        //check if there is no user logged in/created
        if(empty($userID))
        {
            return response()->json(['No account' => 'You must have an account or have logged in to see your previous bookings'], 400);
        }
        
        //find user
        $user = User::find($userID);

        //check if user exists in DB
        if(is_null($user))
        {
            return response()->json(['User' => 'User does not exist'], 404);
        }

        //find all bookings for the user
        $bookings = Booking::where('userID', '=', $userID)->first();
        
        //check if the user has any previous bookings
        if(is_null($bookings))
        {
            return response()->json(['bookings' => 'You have not created any bookings'], 200);
        }
        
        $getBookings = Booking::where('userID', '=', $userID)
                              ->orderBy('status', 'DESC')
                              ->get();
        return response()->json([$getBookings], 200);
    }

    //assign car to user - save to session
    public function assignCar(Request $request)
    {
        $rules = [
            'from' => 'required',
            'to' => 'required',
            'car' => 'required|numeric'
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails())
        {
            return response()->json($validator->errors(), 400);
        }

        //find car
        $car = CarData::where('id', '=', $request->input('car'))->first();

        if(is_null($car))
        {
            return response()->json(['Car' => 'Car does not exist'], 400);
        }
        
        //check if car is available
        if($car->available == false)
        {
            return response()->json(['Car' => 'Car is not available'], 400);
        }
        
        //cost: 70+45n, where n = num of days 
        //convert dates to date objects
        $dateBooked = new DateTime(date('Y-m-d', strtotime($request->input('from'))));
        $returnDate = new DateTime(date('Y-m-d', strtotime($request->input('to'))));

        //check if the booking date begins after / equal to the return date
        if($dateBooked >= $returnDate)
        {
            return response()->json(['Date' => 'Invalid return and booking dates'], 400);
        }
        
        //calculate the number of days the car will be booked for
        $days = date_diff($dateBooked, $returnDate); //calculate n

        //calculate the cost
        $cost = 70+(45*$days->days);
        $cost = number_format($cost,2,'.',''); //convert to currency
        
        //store in session
        Session::put(['car' => $car]);
        Session::put(['date_booked' => $request->input('from')]);
        Session::put(['return_date' => $request->input('to')]);
        Session::put(['cost' => $cost]);
        
        return response()->json(['car' => Session::get('car'),
                                 'date booked' => Session::get('date_booked'),
                                 'return date' => Session::get('return_date'),
                                 'cost' => Session::get('cost')], 200);
    }

    //method to validate credit card details - confirms booking
    public function finalisePayment(Request $request)
    {
            $rules = [
                'card_number' => 'required',
                'car' => 'required',
                'from' => 'required',
                'to' => 'required',
                'cardholder_name' => 'required', 
                'expiry_date' => 'required',
                'cost' => 'required',
                'cvv' => 'required|numeric|digits:3',
            ];
            
            $validator = Validator::make($request->all(), $rules);
    
            //if validation is incorrect
            if($validator->fails())
            {
                return response()->json($validator->errors(), 400);
            }

            //check expiry date
            list($month,$year) = explode('/', $request->input('expiry_date'));
        
            if(strtotime(substr(date('Y'), 0, 2)."{$year}-{$month}") < strtotime(date("Y-m")))
            {
                return response()->json(['expiry_date' => 'credit card is expired'], 400);
            }

            //check credit card number
            $verified = false;

            //credit card patterns
            $MasterCard = "/^([51|52|53|54|55]{2})([0-9]{14})$/";
            $Visa = "/^([4]{1})([0-9]{12,15})$/";

            if(preg_match($MasterCard, $request->input('card_number')))
            {
                $verified = true;
            }

            if(preg_match($Visa, $request->input('card_number')))
            {
                $verified = true;
            }
            
            //check if card number is invalid
            if($verified == false)
            {
                return response()->json(['card_number' => 'Invalid card number'], 400);
            }
            
            //check if card holder name has only letters and spaces
            $pattern = "/^[a-zA-Z\s]+$/";

            if(!preg_match($pattern, $request->input('cardholder_name')))
            {
                return response()->json(['cardholder_name' => 'Cardholder name must contain letters and spaces'], 400);
            }

            $user = User::where('id', '=', $request->input('userid'))->first();

            //check if user has not made an account
            if(is_null($user))
            {
                return response()->json(['account' => 'You must create an account to make a booking'], 400);
            }

            //check if user exists but has not logged in
            if($user->active == false)
            {
                return response()->json(['account' => 'You must log in to make a booking'], 400);
            }

            //check if the user has already an active booking
            $currentBooking = Booking::where('status', '=', 'Ongoing')
                                     ->where('userID', '=', $user->id)
                                     ->first();
            
            if(!is_null($currentBooking))
            {
                return response()->json(['booking' => 'You already have one active booking. You must complete your current in order to book a vehicle'], 400);
            }

            $booking['userID'] = $user->id;
            $booking['carID'] = $request->input('car');
            $booking['date_booked'] = $request->input('from');
            $booking['return_date'] = $request->input('to');
            $booking['cost'] = $request->input('cost');
            $booking['status'] = 'Ongoing';

            $newbooking = Booking::create($booking); //create a new booking

            //update carspace - make it available
            $Car = CarData::where('id', '=', $request->input('car'))->first();
            
            $updateCarSpace = CarSpace::where('x', '=', $Car->x_loc)
                                      ->where('y', '=', $Car->y_loc)
                                      ->update(['allocated' => false]);
            
            //update the car - make it unavailable
            $updateCar = CarData::where('id', '=', $booking['carID'])
                                ->update(['available' => false]);

            return response()->json(['booking' => 'Booking created'], 201);
    }

    /**
     * Update status of booking and availablity to car
     *
     * @param  \Illuminate\Http\Request  $request $carID $bookingID
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $userID, $carID)
    {   
        $rules = [
            'x' => 'required|exists:car_spaces',
            'y' => 'required|exists:car_spaces'
        ];

        $validator = Validator::make($request->all(), $rules);
    
        //if validation is incorrect
        if($validator->fails())
        {
            return response()->json($validator->errors(), 400);
        }

        $carspace = CarSpace::where('x', '=', $request->input('x'))
                            ->where('y', '=', $request->input('y'))
                            ->first();
        
        //check if carspace doesnt exist
        if(is_null($carspace))
        {
            return response()->json(['carspace' => 'Location does not exist'], 404);
        }

        //check if carspace is already allocated
        if($carspace->allocated == true)
        {
            return response()->json(['carspace' => 'Location is already allocated'], 400);
        }

        //get IDs for car and booking
        $booking = Booking::find($request->input('bookingID'));
        $car = CarData::where('id', '=', $carID)->first();
        
        //check if the booking exists
        if(is_null($booking))
        {
            return response()->json(['booking' => 'Booking does not exist'], 404);
        }

        //check if car exists
        if(is_null($car))
        {
            return response()->json(['car' => 'Car doesn\'t exist'], 404);
        }
        
        //check if the right user is returning the vehicle
        if($userID != $booking->userID)
        {
            return response()->json(['booking' => 'A different user tried to update a booking'], 404);
        }

        //check if that vehicle has already been returned
        if($booking->status == 'Returned')
        {
            return response()->json(['car' => 'Car has already been returned'], 400);
        }

        //update car's location
        $updateCar = CarData::where('id', '=', $carID)
                            ->update(['available' => true, 'x_loc' => $request->input('x'), 'y_loc' => $request->input('y')]);
        
        //update carspace to available and its location
        $carspace = CarSpace::where('x', '=', $request->input('x'))
                            ->where('y', '=', $request->input('y'))
                            ->update(['allocated' => true]);

        //update a booking
        Booking::where('id', '=', $booking->id)
                    ->update(['status' => 'Returned']);

        return response()->json(['car' => 'Car has been returned'], 200);
    }
}