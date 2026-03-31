<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\SpotifyService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

final class SpotifyController extends Controller
{
    public function __invoke(SpotifyService $spotify): JsonResponse
    {
        $nowPlaying = Cache::remember('spotify:now_playing', 30, $spotify->nowPlaying(...));

        return response()->json([
            'nowPlaying' => $nowPlaying,
        ]);
    }
}
