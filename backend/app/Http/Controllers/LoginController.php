<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\User;
use Session;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $rules = [
            'username' => 'required|exists:users',
            'password' => 'required|exists:users'
        ];

        $validator = Validator::make($request->all(), $rules);
        
        //if validation is incorrect
        if($validator->fails())
        {
            return response()->json($validator->errors(), 400);
        }

        $username = $request->input('username');
        $password = $request->input('password');
        
        $getUser = User::where('username', '=', $request->username)
                       ->where('password', '=', $request->password)
                       ->first();
        
        //if user isnt found, return error message and 400 status 
        if(is_null($getUser))
        {
            return response()->json(['message' => 'Incorrect Username or Password'], 400);
        }

        $user_id = User::where('username', '=', $username)->first()->id;
        
        //update active to user
        $update = User::where('username', '=', $request->username)
                      ->where('password', '=', $request->password)
                      ->update(['active' => true]);      

        $active = User::where('username', '=', $request->username)
                      ->where('password', '=', $request->password)
                      ->first();
        return response()->json(['id' => $user_id, 'username' => $username, 'active' => $active->active], 200);
    }

    public function getSession()
    {
        return response()->json(['session' => Session::all()], 200);
    }

    public function logout(Request $request)
    {
        $user = User::where('username', '=', $request->input('username'))
                    ->where('id', '=', $request->input('userid'))
                    ->first();
        if(is_null($user))
        {
            return response()->json(['Logout' => 'Unsuccessful'], 400);
        }
        //update user's active status
        $update = User::where('username', '=', $request->input('username'))
                    ->where('id', '=', $request->input('userid'))
                    ->update(['active' => false]);

        $user = User::where('username', '=', $request->input('username'))
                    ->where('id', '=', $request->input('userid'))
                    ->first();
        return response()->json(['id' => $user->id, 'username' => $request->input('username'),'active' => $user->active], 200);
    }
}
