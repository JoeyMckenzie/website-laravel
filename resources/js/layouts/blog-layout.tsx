import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { index } from '@/actions/App/Http/Controllers/BlogController';

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
                            href={index()}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Blog
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>
        </div>
    );
}
