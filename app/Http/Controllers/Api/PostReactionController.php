<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PostReaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class PostReactionController extends Controller
{
    public function index(string $slug): JsonResponse
    {
        $counts = PostReaction::query()
            ->where('post_slug', $slug)
            ->selectRaw('reaction, count(*) as count')
            ->groupBy('reaction')
            ->pluck('count', 'reaction');

        $ipHash = hash('xxh128', (string) request()->ip());

        $userReactions = PostReaction::query()
            ->where('post_slug', $slug)
            ->where('ip_hash', $ipHash)
            ->pluck('reaction');

        return response()->json([
            'counts' => $counts,
            'userReactions' => $userReactions,
        ]);
    }

    public function store(Request $request, string $slug): JsonResponse
    {
        $validated = $request->validate([
            'reaction' => ['required', 'string', 'in:fire,thumbs_up,mind_blown,heart'],
        ]);

        $ipHash = hash('xxh128', (string) $request->ip());

        $existing = PostReaction::query()
            ->where('post_slug', $slug)
            ->where('reaction', $validated['reaction'])
            ->where('ip_hash', $ipHash)
            ->first();

        if ($existing) {
            $existing->delete();

            return response()->json(['toggled' => 'removed']);
        }

        PostReaction::create([
            'post_slug' => $slug,
            'reaction' => $validated['reaction'],
            'ip_hash' => $ipHash,
        ]);

        return response()->json(['toggled' => 'added']);
    }
}
