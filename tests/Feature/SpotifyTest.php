<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class SpotifyTest extends TestCase
{
    use RefreshDatabase;

    #[\Override]
    protected function setUp(): void
    {
        parent::setUp();

        Cache::flush();

        config([
            'services.spotify.client_id' => 'test-client-id',
            // @mago-expect lint:no-literal-password
            'services.spotify.client_secret' => 'test-client-secret',
            // @mago-expect lint:no-literal-password
            'services.spotify.refresh_token' => 'test-refresh-token',
        ]);
    }

    public function test_spotify_endpoint_returns_json_when_playing(): void
    {
        Http::fake([
            'accounts.spotify.com/api/token' => Http::response([
                // @mago-expect lint:no-literal-password
                'access_token' => 'test-token',
                'token_type' => 'Bearer',
                'expires_in' => 3600,
            ]),
            'api.spotify.com/v1/me/player*' => Http::response([
                'currently_playing_type' => 'track',
                'item' => [
                    'name' => 'Test Song',
                    'album' => [
                        'images' => [['url' => 'https://example.com/image.jpg']],
                    ],
                    'artists' => [['name' => 'Test Artist']],
                    'show' => null,
                    'external_urls' => ['spotify' => 'https://open.spotify.com/track/123'],
                ],
            ]),
        ]);

        $response = $this->getJson(route('api.spotify.now-playing'));

        $response
            ->assertOk()
            ->assertJsonStructure([
                'nowPlaying' => [
                    'title',
                    'artist',
                    'albumImage',
                    'href',
                ],
            ])
            ->assertJsonPath('nowPlaying.title', 'Test Song')
            ->assertJsonPath('nowPlaying.artist', 'Test Artist');
    }

    public function test_spotify_endpoint_returns_null_when_not_playing(): void
    {
        Http::fake([
            'accounts.spotify.com/api/token' => Http::response([
                // @mago-expect lint:no-literal-password
                'access_token' => 'test-token',
                'token_type' => 'Bearer',
                'expires_in' => 3600,
            ]),
            'api.spotify.com/v1/me/player*' => Http::response(null, 204),
        ]);

        $response = $this->getJson(route('api.spotify.now-playing'));

        $response->assertOk()->assertJsonPath('nowPlaying', null);
    }
}
