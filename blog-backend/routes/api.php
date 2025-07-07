<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // Admin routes
});

Route::middleware(['auth:sanctum', 'role:author'])->group(function () {
    // author routes
});