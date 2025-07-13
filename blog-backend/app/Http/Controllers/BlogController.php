<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    // Store blog by author
    public function store(Request $request)
    {
        $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required',
            'image'   => 'nullable|image|max:2048',
        ]);

        $path = $request->file('image')
            ? $request->file('image')->store('blogs', 'public')
            : null;

        $blog = Blog::create([
            'user_id' => $request->user()->id,
            'title'   => $request->title,
            'content' => $request->content,
            'image'   => $path,
            // status defaults to 'pending'
        ]);

        return response()->json($blog, 201);
    }



    // Get blogs for logged-in author
    public function myBlogs()
    {
        $user = Auth::user();
        return $user ? $user->blogs : response()->json(['error' => 'Unauthenticated'], 401);
    }

    // Admin: Get all blogs with authors
    public function allBlogs()
    {
        return Blog::with('author:id,name,author_name')->get();
    }

    // Admin: Change blog status
    public function changeStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,disabled',
        ]);

        $blog = Blog::findOrFail($id);
        $blog->status = $request->status;
        $blog->save();

        return response()->json(['message' => 'Blog status updated']);
    }
}
