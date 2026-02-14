<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Freelancer extends Model
{
    protected $fillable = ['student_id', 'bio', 'email', 'password', 'status'];

    public function skomda_student()
    {
        return $this->belongsTo(SkomdaStudent::class);
    }

    public function portofolios()
    {
        return $this->hasMany(Portofolio::class);
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function offers()
    {
        return $this->hasMany(Offer::class);
    }
}
