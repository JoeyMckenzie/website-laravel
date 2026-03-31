import { useEffect, useState } from 'react';
import type { ReactionType, ReactionsResponse } from '@/types';

const reactions: { type: ReactionType; emoji: string; label: string }[] = [
    { type: 'fire', emoji: '🔥', label: 'This is great' },
    { type: 'thumbs_up', emoji: '👍', label: 'Useful' },
    { type: 'mind_blown', emoji: '🤯', label: 'Mind blown' },
    { type: 'heart', emoji: '❤️', label: 'Love it' },
];

export default function PostReactions({ slug }: { slug: string }) {
    const [counts, setCounts] = useState<Partial<Record<ReactionType, number>>>(
        {},
    );
    const [userReactions, setUserReactions] = useState<ReactionType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/posts/${slug}/reactions`)
            .then((res) => res.json())
            .then((data: ReactionsResponse) => {
                setCounts(data.counts);
                setUserReactions(data.userReactions);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [slug]);

    async function toggleReaction(type: ReactionType) {
        const isActive = userReactions.includes(type);

        // Optimistic update
        setCounts((prev) => ({
            ...prev,
            [type]: (prev[type] ?? 0) + (isActive ? -1 : 1),
        }));
        setUserReactions((prev) =>
            isActive ? prev.filter((r) => r !== type) : [...prev, type],
        );

        try {
            await fetch(`/api/posts/${slug}/reactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(
                        document.cookie
                            .split('; ')
                            .find((row) => row.startsWith('XSRF-TOKEN='))
                            ?.split('=')[1] ?? '',
                    ),
                },
                body: JSON.stringify({ reaction: type }),
            });
        } catch {
            // Revert on failure
            setCounts((prev) => ({
                ...prev,
                [type]: (prev[type] ?? 0) + (isActive ? 1 : -1),
            }));
            setUserReactions((prev) =>
                isActive ? [...prev, type] : prev.filter((r) => r !== type),
            );
        }
    }

    if (isLoading) {
        return (
            <div className="flex gap-2">
                {reactions.map((r) => (
                    <div
                        key={r.type}
                        className="h-10 w-16 animate-pulse rounded-lg bg-secondary"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-2">
            {reactions.map((r) => {
                const count = counts[r.type] ?? 0;
                const isActive = userReactions.includes(r.type);

                return (
                    <button
                        key={r.type}
                        onClick={() => toggleReaction(r.type)}
                        title={r.label}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                            isActive
                                ? 'border-primary/50 bg-primary/10 text-foreground'
                                : 'border-border bg-secondary/50 text-muted-foreground hover:border-primary/30 hover:bg-secondary'
                        }`}
                    >
                        <span>{r.emoji}</span>
                        {count > 0 && (
                            <span className="font-medium">{count}</span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
