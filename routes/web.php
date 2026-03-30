<?php

use App\Http\Controllers\Api\PostReactionController;
use App\Http\Controllers\Api\SpotifyController;
use App\Http\Controllers\Auth\GithubController;
use App\Http\Controllers\GuestbookController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::inertia('/now', 'now')->name('now');
Route::inertia('/uses', 'uses')->name('uses');

Route::get('/guestbook', [GuestbookController::class, 'index'])->name('guestbook');
Route::post('/guestbook', [GuestbookController::class, 'store'])->middleware('throttle:10,1')->name('guestbook.store');
Route::delete('/guestbook/{entry}', [GuestbookController::class, 'destroy'])->name('guestbook.destroy');

Route::get('/auth/github/redirect', [GithubController::class, 'redirect'])->name('github.redirect');
Route::get('/auth/github/callback', [GithubController::class, 'callback'])->name('github.callback');

Route::get('/api/spotify/now-playing', SpotifyController::class)->name('api.spotify.now-playing');
Route::get('/api/posts/{slug}/reactions', [PostReactionController::class, 'index'])->name('api.posts.reactions.index');
Route::post('/api/posts/{slug}/reactions', [PostReactionController::class, 'store'])->middleware('throttle:30,1')->name('api.posts.reactions.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/blog.php';
require __DIR__.'/settings.php';
