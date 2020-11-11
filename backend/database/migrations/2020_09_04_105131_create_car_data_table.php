<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('car_data', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('make');
            $table->string('model');
            $table->string('colour');
            $table->string('license_plate')->unique();
            $table->decimal('x_loc', 9, 6);
            $table->decimal('y_loc', 9, 6);
            $table->boolean('available')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('car_data');
    }
}
