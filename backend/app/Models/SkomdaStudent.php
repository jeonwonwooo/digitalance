<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SkomdaStudent extends Model
{
    protected $fillable = ['nis', 'name', 'email', 'class', 'major'];
    
    public function getRouteKeyName()
    {
        return 'nis';
    }

    public function freelancers()
    {
        return $this->hasMany(Freelancer::class);
    }
}
