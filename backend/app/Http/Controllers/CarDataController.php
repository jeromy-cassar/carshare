<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\CarData;
use Validator;

class CarDataController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CarData::where('available', '=', true)->get();
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($carID)
    {
        $car = CarData::find($carID);

        if(is_null($car))
        {
            return response()->json(['message' => 'Car not found'], 404);
        }

        return response()->json($car, 200);
    }
   
}