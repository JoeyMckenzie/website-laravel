import { Head, router, useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import type { GithubUser, GuestbookEntry } from '@/types';

export default function Guestbook({
    entries,
    githubUser,
}: {
    entries: GuestbookEntry[];
    githubUser: GithubUser;
}) {
    const form = useForm({ body: '' });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.post('/guestbook', {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    }

    function handleDelete(id: number) {
        router.delete(`/guestbook/${id}`, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Guestbook">
                <meta
                    name="description"
                    content="Sign my guestbook and leave a message."
                />
            </Head>

            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Guestbook</h1>
                <p className="text-muted-foreground">
                    Leave a message, say hello, or share something interesting.
                </p>
            </div>

            <div className="mt-6 flex justify-center pt-6">
                {githubUser ? (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <img
                                src={githubUser.avatar}
                                alt={githubUser.username}
                                className="size-6 rounded-full"
                            />
                            <span>
                                Signed in as{' '}
                                <span className="font-medium text-foreground">
                                    {githubUser.username}
                                </span>
                            </span>
                        </div>
                        <textarea
                            value={form.data.body}
                            onChange={(e) =>
                                form.setData('body', e.target.value)
                            }
                            placeholder="Leave a message..."
                            maxLength={280}
                            rows={3}
                            className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                        {form.errors.body && (
                            <p className="text-sm text-destructive">
                                {form.errors.body}
                            </p>
                        )}
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                                {form.data.body.length}/280
                            </span>
                            <button
                                type="submit"
                                disabled={
                                    form.processing || !form.data.body.trim()
                                }
                                className="inline-flex items-center rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-50"
                            >
                                Sign
                            </button>
                        </div>
                    </form>
                ) : (
                    <a
                        href="/auth/github/redirect"
                        className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                    >
                        <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4"
                        >
                            <title>GitHub</title>
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                        Sign in with GitHub
                    </a>
                )}
            </div>

            <div className="mt-8 space-y-6">
                {entries.length > 0 ? (
                    entries.map((entry) => (
                        <div key={entry.id} className="flex gap-3">
                            <img
                                src={entry.github_avatar}
                                alt={entry.github_username}
                                className="size-8 rounded-full"
                            />
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <a
                                        href={`https://github.com/${entry.github_username}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm font-medium hover:underline"
                                    >
                                        {entry.github_username}
                                    </a>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(
                                            entry.created_at,
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </span>
                                    {githubUser?.username ===
                                        entry.github_username && (
                                        <button
                                            onClick={() =>
                                                handleDelete(entry.id)
                                            }
                                            className="text-muted-foreground transition-colors hover:text-destructive"
                                            title="Delete"
                                        >
                                            <Trash2 className="size-3.5" />
                                        </button>
                                    )}
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {entry.body}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted-foreground">
                        No entries yet. Be the first to sign!
                    </p>
                )}
            </div>
        </>
    );
}
