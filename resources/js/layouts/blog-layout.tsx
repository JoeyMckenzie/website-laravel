import { Link } from '@inertiajs/react';
import { index } from '@/actions/App/Http/Controllers/BlogController';
import AppLogoIcon from '@/components/app-logo-icon';
import SpotifyNowPlaying from '@/components/spotify-now-playing';
import { guestbook, home, now, uses } from '@/routes';

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-svh bg-background">
            <header className="border-b border-border">
                <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
                    <Link
                        href={home()}
                        className="flex items-center gap-2 font-medium"
                    >
                        <AppLogoIcon className="size-7 fill-current text-foreground" />
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        <Link
                            href={home()}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Home
                        </Link>
                        <Link
                            href={now()}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Now
                        </Link>
                        <Link
                            href={index()}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Blog
                        </Link>
                        <Link
                            href={uses()}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Uses
                        </Link>
                        <Link
                            href={guestbook()}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Guestbook
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>
            <footer className="border-t border-border">
                <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
                    <SpotifyNowPlaying />
                </div>
            </footer>
        </div>
    );
}
