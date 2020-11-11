<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class CarData extends Model
{
    public $timestamps = false;
    protected $fillable = ['id', 'make', 'model', 'license_plate', 'colour', 'x_loc', 'y_loc', 'available'];
}
