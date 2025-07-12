<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /* ---------- Register ---------- */
    public function register(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'required|email|unique:users',
            'password'    => 'required|min:6',
            'role'        => 'required|in:admin,author',
            'author_name' => 'required_if:role,author',
        ]);

        $user = User::create([
            'name'        => $request->name,
            'email'       => $request->email,
            'password'    => bcrypt($request->password),
            'role'        => $request->role,
            'author_name' => $request->role === 'author' ? $request->author_name : null,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'user'         => $user,
        ]);
    }

    /* ---------- Login ---------- */
    public function login(Request $request)
    {
        $request->validate([

            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Revoke old tokens (optional)
        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'user'         => $user,
        ]);
    }

    public function logout(Request $request)
    {
        if ($token = $request->user()?->currentAccessToken()) {
            $token->delete();        // safe: only runs when token present
        }

        return response()->json(['message' => 'Logged out']);
    }
}
