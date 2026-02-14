<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = ['order_id', 'freelancer_id', 'title', 'description', 'offered_price', 'deadline', 'status'];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function freelancer()
    {
        return $this->belongsTo(Freelancer::class);
    }
}
