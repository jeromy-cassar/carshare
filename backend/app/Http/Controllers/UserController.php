<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(User::get(), 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  $userID
     * @return \Illuminate\Http\Response
     */
    public function show($userID)
    {
        $user = User::find($userID);

        if(is_null($user))
        {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // validation rules
        $createRules = [
            'firstname' => 'required|alpha',
            'lastname' => 'required|alpha',
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'confirm_password' => 'required|same:password',
            'dob' => 'required',
            'mobile' => ['required', 'regex:/^\(?(?:\+?61|0)(?:(?:2\)?[ -]?(?:3[ -]?[38]|[46-9][ -]?[0-9]|5[ -]?[0-35-9])|3\)?(?:4[ -]?[0-57-9]|[57-9][ -]?[0-9]|6[ -]?[1-67])|7\)?[ -]?(?:[2-4][ -]?[0-9]|5[ -]?[2-7]|7[ -]?6)|8\)?[ -]?(?:5[ -]?[1-4]|6[ -]?[0-8]|[7-9][ -]?[0-9]))(?:[ -]?[0-9]){6}|4\)?[ -]?(?:(?:[01][ -]?[0-9]|2[ -]?[0-57-9]|3[ -]?[1-9]|4[ -]?[7-9]|5[ -]?[018])[ -]?[0-9]|3[ -]?0[ -]?[0-5])(?:[ -]?[0-9]){5})$/', 'unique:users']
        ];

        $validator = Validator::make($request->all(), $createRules);

        if($validator->fails())
        {
            return response()->json($validator->errors(), 400);
        }

        //calculate age from dob and check if users are over 18 years of age
        $dob = date($request->input('dob'));

        $age = floor((time() - strtotime($dob)) / 31556926);
        if($age < 18)
        {
            return response()->json(['dob' => 'You must be 18 years or older to create an account'], 400);
        }
        
        //create new user
        $user = User::create($request->all());

        return response()->json($user, 201);
    }

    /**
     * Update password for user.
     * Rules: Passwords must match; Username must exist in DB
     * @param  \Illuminate\Http\Request  $request
     * @param  $userID
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $updateRules = [
            'username' => 'required|exists:users',
            'password' => 'required|min:8',
            'confirm_password' => 'required|same:password',
        ];

        $validator = Validator::make($request->all(), $updateRules);
        
        //check if validation fails
        if($validator->fails())
        {
            return response()->json($validator->errors(), 400);
        }
        
        $getUsername = User::where('username', '=', $request->input('username'))
                           ->first();
                           
        //username doesn't match with user ID
        if(is_null($getUsername))
        {
            return response()->json(['Username' => 'Incorrect Username'], 400);
        }
        
        //update user's password
        User::where('id', '=', $getUsername->id)
                        ->update(['password' => $request->input('password')]);

        return response()->json(['Updated Password' => 'User: '.$getUsername->id.' updated successfully'], 200);
    }
}