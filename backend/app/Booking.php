<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    public $timestamps = false;
    protected $fillable = ['userID', 'carID', 'date_booked', 'return_date', 'cost', 'status'];
}
