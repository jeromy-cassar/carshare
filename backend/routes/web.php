<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//user routes 
Route::get('/users', array('middleware' => 'cors', 'uses' => 'UserController@index'));            
Route::post('/users', array('middleware' => 'cors', 'uses' => 'UserController@store'));       
Route::get('/users/{user}', array('middleware' => 'cors', 'uses' => 'UserController@show'));   
Route::post('/change', array('middleware' => 'cors', 'uses' => 'UserController@update'));

//login routes
Route::post('/login', array('middleware' => 'cors', 'uses' => 'LoginController@login'));
Route::post('/logout', array('middleware' => 'cors', 'uses' => 'LoginController@logout'));

//cardata routes
Route::get('/cars', array('middleware' => 'cors', 'uses' => 'CarDataController@index'));
Route::get('/cars/{car}', array('middleware' => 'cors', 'uses' => 'CarDataController@show'));

//booking routes
Route::get('/booking/{user}', array('middleware' => 'cors', 'uses' => 'BookingController@getPreviousBookings'));
Route::post('/booking/car', array('middleware' => 'cors', 'uses' => 'BookingController@assignCar'));
Route::post('/booking/payment', array('middleware' => 'cors', 'uses' => 'BookingController@finalisePayment'));
Route::post('/return/{user}/{car}', array('middleware' => 'cors', 'uses' => 'BookingController@update'));

//carspace route
Route::get('/carspaces', array('middleware' => 'cors', 'uses' => 'CarSpaceController@index'));