<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // list all
    public function index()
    {
        return Category::all();
    }

    // create
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'   => 'required|string|max:255|unique:categories',
            'status' => 'in:active,inactive'  // optional; defaults to active
        ]);

        $category = Category::create([
            'name'   => $validated['name'],
            'status' => $validated['status'] ?? 'active',
        ]);

        return response()->json($category, 201);
    }

    // show single
    public function show(Category $category)
    {
        return $category;
    }

    // update
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name'   => 'sometimes|string|max:255|unique:categories,name,' . $category->id,
            'status' => 'sometimes|in:active,inactive',
        ]);

        $category->update($validated);
        return response()->json($category);
    }

    // delete
    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
