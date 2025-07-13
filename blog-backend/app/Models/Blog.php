<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = ['user_id', 'title', 'content', 'image', 'status'];


    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'blog_category');
    }

    
}
