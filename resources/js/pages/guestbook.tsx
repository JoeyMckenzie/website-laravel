import { Head, router, useForm } from '@inertiajs/react';
import { Github, Trash2 } from 'lucide-react';
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
                <h1 className="text-3xl font-bold tracking-tight">
                    Guestbook
                </h1>
                <p className="text-muted-foreground">
                    Leave a message, say hello, or share something interesting.
                </p>
            </div>

            <div className="mt-6 border-t pt-6">
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
                            onChange={(e) => form.setData('body', e.target.value)}
                            placeholder="Leave a message..."
                            maxLength={280}
                            rows={3}
                            className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
                        <Github className="size-4" />
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
