<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Services\SpotifyService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class SpotifyServiceTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        Cache::flush();

        config([
            'services.spotify.client_id' => 'test-client-id',
            'services.spotify.client_secret' => 'test-client-secret',
            'services.spotify.refresh_token' => 'test-refresh-token',
        ]);
    }

    public function test_returns_now_playing_data_for_track(): void
    {
        Http::fake([
            'accounts.spotify.com/api/token' => Http::response([
                'access_token' => 'test-token',
                'token_type' => 'Bearer',
                'expires_in' => 3600,
            ]),
            'api.spotify.com/v1/me/player*' => Http::response([
                'currently_playing_type' => 'track',
                'item' => [
                    'name' => 'Bohemian Rhapsody',
                    'album' => [
                        'images' => [['url' => 'https://example.com/album.jpg']],
                    ],
                    'artists' => [['name' => 'Queen']],
                    'show' => null,
                    'external_urls' => ['spotify' => 'https://open.spotify.com/track/123'],
                ],
            ]),
        ]);

        $service = new SpotifyService;
        $result = $service->nowPlaying();

        $this->assertNotNull($result);
        $this->assertSame('Bohemian Rhapsody', $result->title);
        $this->assertSame('Queen', $result->artist);
        $this->assertSame('https://example.com/album.jpg', $result->albumImage);
        $this->assertSame('https://open.spotify.com/track/123', $result->href);
    }

    public function test_returns_now_playing_data_for_podcast(): void
    {
        Http::fake([
            'accounts.spotify.com/api/token' => Http::response([
                'access_token' => 'test-token',
                'token_type' => 'Bearer',
                'expires_in' => 3600,
            ]),
            'api.spotify.com/v1/me/player*' => Http::response([
                'currently_playing_type' => 'episode',
                'item' => [
                    'name' => 'Episode 42',
                    'album' => null,
                    'artists' => null,
                    'show' => [
                        'name' => 'Tech Podcast',
                        'images' => [['url' => 'https://example.com/show.jpg']],
                    ],
                    'external_urls' => ['spotify' => 'https://open.spotify.com/episode/456'],
                ],
            ]),
        ]);

        $service = new SpotifyService;
        $result = $service->nowPlaying();

        $this->assertNotNull($result);
        $this->assertSame('Episode 42', $result->title);
        $this->assertSame('Tech Podcast', $result->artist);
        $this->assertSame('https://example.com/show.jpg', $result->albumImage);
    }

    public function test_returns_null_when_nothing_playing(): void
    {
        Http::fake([
            'accounts.spotify.com/api/token' => Http::response([
                'access_token' => 'test-token',
                'token_type' => 'Bearer',
                'expires_in' => 3600,
            ]),
            'api.spotify.com/v1/me/player*' => Http::response(null, 204),
        ]);

        $service = new SpotifyService;
        $result = $service->nowPlaying();

        $this->assertNull($result);
    }

    public function test_returns_null_on_api_error(): void
    {
        Http::fake([
            'accounts.spotify.com/api/token' => Http::response([
                'access_token' => 'test-token',
                'token_type' => 'Bearer',
                'expires_in' => 3600,
            ]),
            'api.spotify.com/v1/me/player*' => Http::response(null, 500),
        ]);

        $service = new SpotifyService;
        $result = $service->nowPlaying();

        $this->assertNull($result);
    }

    public function test_caches_access_token(): void
    {
        Http::fake([
            'accounts.spotify.com/api/token' => Http::response([
                'access_token' => 'test-token',
                'token_type' => 'Bearer',
                'expires_in' => 3600,
            ]),
            'api.spotify.com/v1/me/player*' => Http::response(null, 204),
        ]);

        $service = new SpotifyService;
        $service->nowPlaying();
        $service->nowPlaying();

        Http::assertSentCount(3); // 1 token request + 2 now-playing requests
    }
}
