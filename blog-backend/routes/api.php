<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\AuthController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();  // includes id, name, email, role, author_name...
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])
      ->middleware('auth:sanctum');

Route::middleware(['auth:sanctum', 'role:author'])->group(function () {
    Route::post('/author/blogs', [BlogController::class, 'store']);
    Route::get('/author/blogs', [BlogController::class, 'myBlogs']);
    Route::get('/categories', [CategoryController::class, 'index']);

});

// Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
//     Route::get('/admin/blogs', [BlogController::class, 'allBlogs']);
//     Route::post('/admin/blogs/{id}/status', [BlogController::class, 'changeStatus']);
//     Route::apiResource('/categories', CategoryController::class);
// });

// routes/api.php  – admin group
Route::middleware(['auth:sanctum','role:admin'])->prefix('admin')->group(function () {
          Route::apiResource('categories', CategoryController::class);
          Route::get('blogs',                [BlogController::class,'allBlogs']);
          Route::post('blogs/{id}/status',   [BlogController::class,'changeStatus']);
});

