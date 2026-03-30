import { useEffect, useState } from 'react';
import { Music } from 'lucide-react';
import type { NowPlaying } from '@/types';

export default function SpotifyNowPlaying() {
    const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const response = await fetch('/api/spotify/now-playing');
                const data = await response.json();
                setNowPlaying(data.nowPlaying);
            } catch {
                setNowPlaying(null);
            }
        };

        fetchNowPlaying();

        const interval = setInterval(fetchNowPlaying, 30_000);

        return () => clearInterval(interval);
    }, []);

    if (!nowPlaying) {
        return (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Music className="size-4" />
                <span>Not listening to anything</span>
            </div>
        );
    }

    return (
        <a
            href={nowPlaying.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
            <img
                src={nowPlaying.albumImage}
                alt={nowPlaying.title}
                className="size-10 rounded"
            />
            <div className="min-w-0">
                <p className="truncate font-medium text-foreground">
                    {nowPlaying.title}
                </p>
                <p className="truncate text-xs">{nowPlaying.artist}</p>
            </div>
        </a>
    );
}
