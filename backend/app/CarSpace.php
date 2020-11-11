<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CarSpace extends Model
{
    public $timestamps = false;
    protected $fillable = ['x_loc', 'y_loc', 'allocated'];
}
