<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use App\Services\MarkdownRenderer;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use League\CommonMark\Exception\CommonMarkException;

final class BlogController extends Controller
{
    public function index(Request $request): Response
    {
        $selectedTag = $request->query('tag');
        $rawSearch = $request->query('search');
        $search = is_string($rawSearch) ? $rawSearch : null;

        $posts = Post::query()
            ->with('tag:id,name')
            ->when(is_string($selectedTag), static fn (Builder $query) => $query->whereHas('tag', static fn ($q) => $q->where(
                'name',
                $selectedTag,
            )))
            ->when(is_string($search) && filled($search), static fn (Builder $query) => $query->where(static fn (Builder $q) => $q->where(
                'title',
                'like',
                "%{$search}%",
            )->orWhere('description', 'like', "%{$search}%")))
            ->latestPublished()
            ->get([
                'slug',
                'title',
                'description',
                'image',
                'tag_id',
                'published_at',
                'storage_key',
                'content',
            ]);

        return Inertia::render('blog/index', [
            'posts' => $posts,
            'tags' => Tag::all(),
            'selectedTag' => $selectedTag,
            'search' => $search,
        ]);
    }

    /**
     * @throws CommonMarkException
     */
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
