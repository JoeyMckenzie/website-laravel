<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Response;

final class FeedController extends Controller
{
    public function rss(): Response
    {
        $posts = Post::query()
            ->with('tag:id,name')
            ->published()
            ->latest('published_at')
            ->get(['slug', 'title', 'description', 'image', 'published_at', 'tag_id', 'storage_key']);

        $items = $posts->map(fn(Post $post): string => <<<XML
                <item>
                    <title><![CDATA[{$post->title}]]></title>
                    <link>{$this->postUrl($post)}</link>
                    <description><![CDATA[{$post->description}]]></description>
                    <pubDate>{$this->formatRssDate($post->published_at)}</pubDate>
                    <guid>{$this->postUrl($post)}</guid>
                    <enclosure url="{$this->imageUrl($post)}" type="image/jpeg" />
                </item>
            XML)->join("\n");

        $xml = <<<XML
            <?xml version="1.0" encoding="UTF-8"?>
            <rss version="2.0">
                <channel>
                    <title>Joey McKenzie's Blog</title>
                    <link>{$this->siteUrl()}</link>
                    <description>Thoughts on software development, Laravel, PHP, Rust, and more.</description>
                    <language>en-us</language>
                    {$items}
                </channel>
            </rss>
            XML;

        return response($xml, 200, [
            'Content-Type' => 'application/rss+xml; charset=UTF-8',
        ]);
    }

    private function postUrl(Post $post): string
    {
        return url("/blog/{$post->slug}");
    }

    private function imageUrl(Post $post): string
    {
        return url("/{$post->image}");
    }

    private function siteUrl(): string
    {
        return url('/');
    }

    private function formatRssDate(?string $date): string
    {
        $timestamp = $date !== null ? strtotime($date) : false;

        return date('r', $timestamp !== false ? $timestamp : time());
    }
}
