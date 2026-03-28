<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Post;
use App\Services\MarkdownRenderer;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

final class BlogController extends Controller
{
    public function index(): Response
    {
        $resolver = fn () => Post::query()
            ->with('tag:id,name')
            ->when(app()->isProduction(), fn ($query) => $query->published())
            ->latestPublished()
            ->get([
                'slug',
                'title',
                'description',
                'image',
                'tag_id',
                'published_at',
                'storage_key',
            ]);

        $posts = app()->isProduction()
            ? Cache::remember('blog:posts', now()->addMinutes(5), $resolver)
            : $resolver();

        return Inertia::render('blog/index', [
            'posts' => $posts,
        ]);
    }

    public function show(Post $post, MarkdownRenderer $renderer): Response
    {
        $post->load('tag:id,name');

        $content = $renderer->render($post->slug, $post->content);

        return Inertia::render('blog/show', [
            'post' => $post,
            'content' => $content,
        ]);
    }
}
