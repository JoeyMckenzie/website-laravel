<?php

declare(strict_types=1);

use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Route;

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{post}', [BlogController::class, 'show'])->name('blog.show');
