<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\AuthController;


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])
      ->middleware('auth:sanctum');

Route::middleware(['auth:sanctum', 'role:author'])->group(function () {
    Route::post('/author/blogs', [BlogController::class, 'store']);
    Route::get('/author/blogs', [BlogController::class, 'myBlogs']);
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/blogs', [BlogController::class, 'allBlogs']);
    Route::post('/admin/blogs/{id}/status', [BlogController::class, 'changeStatus']);
});
