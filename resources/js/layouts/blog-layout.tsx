import { Link } from '@inertiajs/react';
import { index } from '@/actions/App/Http/Controllers/BlogController';
import { SpotifyNowPlaying } from '@/components/spotify-now-playing';
import { guestbook, home, now, uses } from '@/routes';
import { LaravelLogo } from '@/components/laravel-icon';
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern';
import { cn } from '@/lib/utils';

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-svh flex-col overflow-hidden bg-background">
            <AnimatedGridPattern
                className={cn(
                    'absolute inset-0 h-full w-full',
                    '[mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,white,transparent)]',
                )}
                width={40}
                height={40}
                numSquares={40}
                maxOpacity={0.06}
                duration={3}
                repeatDelay={0.5}
            />
            <header className="relative z-10 border-b border-border bg-background/80 backdrop-blur-sm">
                <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
                    <Link
                        href={home()}
                        className="font-semibold tracking-tight text-foreground"
                    >
                        jm.
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        <Link
                            href={home()}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            /home
                        </Link>
                        <Link
                            href={now()}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            /now
                        </Link>
                        <Link
                            href={index()}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            /blog
                        </Link>
                        <Link
                            href={uses()}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            /uses
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="relative z-10 mx-auto w-full max-w-3xl grow px-6 py-10">
                {children}
            </main>
            <footer className="relative z-10 bg-background/80 backdrop-blur-sm">
                <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
                    <SpotifyNowPlaying />
                    <a
                        href="https://laravel.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <span>Powered by</span>
                        <LaravelLogo className="size-4 fill-current text-[#FF2D20]" />
                    </a>
                </div>
            </footer>
        </div>
    );
}
