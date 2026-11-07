<?php

use App\Http\Controllers\Product\CategoryController;
use App\Http\Controllers\Product\ProductController;
use Illuminate\Support\Facades\Route;

Route::view('/', 'welcome', ['page' => 'Home']);

Route::view('/order-form', 'welcome', ['page' => 'OrderForm']);

// PRODUCTS ROUTE
Route::view('/products', 'welcome', ['page' => 'Products']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/product-list', [ProductController::class, 'index']);

// CHECKOUT ROUTE
Route::view('/checkout', 'welcome', ['page' => 'Checkout']);
