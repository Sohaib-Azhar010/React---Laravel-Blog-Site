<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
{
    $request->validate([
        'email' => 'required|email|unique:users',
        'password' => 'required|min:6',
        'role' => 'required|in:admin,author',
        'author_name' => 'required_if:role,author',
    ]);

    $user = User::create([
        'email' => $request->email,
        'password' => bcrypt($request->password),
        'role' => $request->role,
        'author_name' => $request->role === 'author' ? $request->author_name : null,
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'access_token' => $token,
        'user' => $user,
    ]);
}

}
