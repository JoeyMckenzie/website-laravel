<?php

declare(strict_types=1);

namespace App\Data;

/**
 * @phpstan-type SpotifyNowPlayingSchema array{
 *     currently_playing_type: string,
 *     item: array{
 *         name: string,
 *         album: ?array{images: array<int, array{url: string}>},
 *         artists: ?array<int, array{name: string}>,
 *         show: ?array{name: string, images: array<int, array{url: string}>},
 *         external_urls: array{spotify: ?string}
 *     }
 * }
 */
final readonly class NowPlayingData
{
    public function __construct(
        public string $title,
        public string $artist,
        public string $albumImage,
        public string $href,
    ) {}

    /**
     * @param  SpotifyNowPlayingSchema  $data
     */
    public static function fromSpotifyResponse(array $data): self
    {
        $item = $data['item'];
        $title = $item['name'];
        $href = $item['external_urls']['spotify'] ?? '/';

        if ($data['currently_playing_type'] === 'track' && $item['album'] !== null && $item['artists'] !== null) {
            return new self(
                title: $title,
                artist: $item['artists'][0]['name'],
                albumImage: $item['album']['images'][0]['url'],
                href: $href,
            );
        }

        if ($item['show'] !== null) {
            return new self(
                title: $title,
                artist: $item['show']['name'],
                albumImage: $item['show']['images'][0]['url'],
                href: $href,
            );
        }

        throw new \RuntimeException('Unexpected Spotify response format');
    }
}
