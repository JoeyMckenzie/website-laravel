<?php

declare(strict_types=1);

use App\Http\Controllers\BlogController;
use App\Http\Controllers\FeedController;
use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{post}', [BlogController::class, 'show'])->name('blog.show');

Route::get('/feed.xml', [FeedController::class, 'rss'])->name('feed');

Route::get('/sitemap.xml', static function (): Symfony\Component\HttpFoundation\Response {
    $sitemap = Sitemap::create()
        ->add(Url::create('/'))
        ->add(Url::create('/now'))
        ->add(Url::create('/uses'))
        ->add(Url::create('/guestbook'))
        ->add(Url::create('/blog'));

    Post::query()
        ->published()
        ->latest('published_at')
        ->get(['slug', 'storage_key'])
        ->each(fn (Post $post): Sitemap => $sitemap->add(Url::create('/blog/'.$post->slug)));

    return $sitemap->toResponse(request());
})->name('sitemap');
