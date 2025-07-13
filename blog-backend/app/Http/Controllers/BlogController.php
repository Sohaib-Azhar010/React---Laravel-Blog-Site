<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class BlogController extends Controller
{
    /*──────────────────────────
    |  Author: create a blog
    ──────────────────────────*/
    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|max:255',
            'content'     => 'required',
            'image'       => 'nullable|image|max:2048',
            'category_id' => 'required|exists:categories,id',
        ]);

        $path = $request->file('image')
            ? $request->file('image')->store('blogs', 'public')
            : null;

        $blog = Blog::create([
            'user_id' => $request->user()->id,
            'title'   => $request->title,
            'content' => $request->content,
            'image'   => $path,
        ]);

        $blog->categories()->attach($request->category_id);

        return response()->json($blog->load('categories'), 201);
    }

    /* helper: ensure blog belongs to current author */
    protected function owned(Blog $blog): Blog
    {
        abort_if($blog->user_id !== Auth::id(), 403);
        return $blog;
    }

    /*──────────────────────────
    |  Author: fetch one blog for edit
    ──────────────────────────*/
    public function show(Blog $blog)
    {
        return $this->owned($blog)->load('categories');
    }

    /*──────────────────────────
    |  Author: update blog
    ──────────────────────────*/
    public function update(Request $r, Blog $blog)
    {
        $blog = $this->owned($blog);

        $r->validate([
            'title'       => 'required|max:255',
            'content'     => 'required',
            'category_id' => 'required|exists:categories,id',
            'image'       => 'nullable|image|max:2048',
        ]);

        if ($r->file('image')) {
            $blog->image = $r->file('image')->store('blogs', 'public');
        }

        $blog->fill($r->only('title', 'content'))->save();
        $blog->categories()->sync([$r->category_id]);
        $blog->update(['status' => 'pending']); // reset review

        return $blog->load('categories');
    }

    /*──────────────────────────
    |  Author: list own blogs
    ──────────────────────────*/
    public function myBlogs()
    {
        $user = Auth::user();            // or auth()->user()

        if (! $user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        return $user->blogs()            // relationship
            ->with('categories') // eager‑load
            ->latest()           // newest first
            ->get();
    }


    /*──────────────────────────
    |  Author: delete own blog
    ──────────────────────────*/
    public function destroy(Blog $blog)
    {
        $this->owned($blog)->delete();
        return response()->json(['message' => 'deleted']);
    }

    /*──────────────────────────
    |  Admin: list all blogs
    ──────────────────────────*/
    public function allBlogs()
    {
        return Blog::with(['author:id,name,author_name', 'categories'])->get();
    }

    /*──────────────────────────
    |  Admin: change status
    ──────────────────────────*/
    public function changeStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,disabled',
        ]);

        $blog = Blog::findOrFail($id);
        $blog->update(['status' => $request->status]);

        return response()->json(['message' => 'Blog status updated']);
    }
}
