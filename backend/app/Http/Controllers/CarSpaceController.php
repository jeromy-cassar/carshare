<?php

namespace App\Http\Controllers;
use App\CarSpace;

use Illuminate\Http\Request;

class CarSpaceController extends Controller
{
    //get car spaces that are available (not allocated)
    public function index()
    {
        return response()->json([CarSpace::where('allocated', '=', false)->get()], 200);
    }
}
