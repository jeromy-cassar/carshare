<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = ['firstname', 'lastname', 'username', 'email', 'password', 'dob', 'mobile'];
}
