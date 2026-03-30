<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\NowPlayingData;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

final class SpotifyService
{
    private const string NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player?type=track,episode';

    private const string TOKEN_URL = 'https://accounts.spotify.com/api/token';

    public function nowPlaying(): ?NowPlayingData
    {
        try {
            $token = $this->getAccessToken();

            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'Authorization' => "Bearer {$token}",
            ])->get(self::NOW_PLAYING_URL);

            if ($response->status() === 204 || $response->failed()) {
                return null;
            }

            return NowPlayingData::fromSpotifyResponse($response->json());
        } catch (Exception) {
            return null;
        }
    }

    private function getAccessToken(): string
    {
        return Cache::remember('spotify:access_token', 600, static function (): string {
            $clientId = Config::string('services.spotify.client_id');
            $clientSecret = Config::string('services.spotify.client_secret');
            $refreshToken = Config::string('services.spotify.refresh_token');

            $response = Http::withBasicAuth($clientId, $clientSecret)
                ->asForm()
                ->post(self::TOKEN_URL, [
                    'grant_type' => 'refresh_token',
                    'refresh_token' => $refreshToken,
                ]);

            return $response->json('access_token');
        });
    }
}
