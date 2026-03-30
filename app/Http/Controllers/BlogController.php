<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use App\Services\MarkdownRenderer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class BlogController extends Controller
{
    public function index(Request $request): Response
    {
        $selectedTag = $request->query('tag');
        $search = $request->query('search');

        $posts = Post::query()
            ->with('tag:id,name')
            ->when(app()->isProduction(), static fn ($query) => $query->published())
            ->when(is_string($selectedTag), static fn ($query) => $query->whereHas(
                'tag',
                static fn ($q) => $q->where('name', $selectedTag),
            ))
            ->when(is_string($search) && $search !== '', static fn ($query) => $query->where(
                static fn ($q) => $q
                    ->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%"),
            ))
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

        return Inertia::render('blog/index', [
            'posts' => $posts,
            'tags' => Tag::all(),
            'selectedTag' => $selectedTag,
            'search' => $search,
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
