<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        $products = Product::query()
            ->with(['variants' => fn ($query) => $query->where('is_active', true)->orderBy('id')])
            ->orderBy('name')
            ->get();

        return response()->json($products);
    }
}
