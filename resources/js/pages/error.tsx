import { Head, Link } from '@inertiajs/react';
import { Terminal } from 'lucide-react';
import { index } from '@/actions/App/Http/Controllers/BlogController';
import { home } from '@/routes';

const messages: Record<number, { title: string; description: string }> = {
    404: {
        title: 'page not found',
        description: "Looks like you've ventured into the void.",
    },
    500: {
        title: 'server error',
        description: 'Something went wrong on our end.',
    },
    503: {
        title: 'service unavailable',
        description: "We'll be back shortly.",
    },
};

export default function Error({ status }: { status: number }) {
    const { title, description } = messages[status] ?? {
        title: 'unexpected error',
        description: 'Something went wrong.',
    };

    return (
        <>
            <Head title={`${status}`} />

            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                    <Terminal className="size-4" />
                    <span className="font-mono">app/error.tsx</span>
                </div>

                <h1 className="font-mono text-8xl font-bold tracking-tighter">
                    {status}
                </h1>

                <p className="mt-4 font-mono text-lg text-muted-foreground">
                    error: {title}
                </p>

                <p className="mt-2 text-muted-foreground">{description}</p>

                <div className="mt-8 flex gap-3">
                    <Link
                        href={home()}
                        className="inline-flex items-center rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                    >
                        Go Home
                    </Link>
                    <Link
                        href={index.url()}
                        className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                        Browse Blog
                    </Link>
                </div>
            </div>
        </>
    );
}
