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
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $blog = Blog::create([
            'user_id' => Auth::id(), // using Facade for clarity
            'title' => $request->title,
            'content' => $request->content,
        ]);

        return response()->json([
            'message' => 'Blog submitted for review',
            'blog' => $blog,
        ]);
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
