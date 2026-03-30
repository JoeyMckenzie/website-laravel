import { Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/BlogController';
import type { PostSummary } from '@/types';

export default function PostPreviewCard({ post }: { post: PostSummary }) {
    return (
        <article>
            <Link href={show(post.slug)} className="group block space-y-2">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time>{post.formatted_published_at}</time>
                    <span>&middot;</span>
                    <span>{post.reading_time_minutes} min read</span>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                        {post.tag.hash_tagged}
                    </span>
                </div>
                <h2 className="text-xl font-semibold group-hover:underline">
                    {post.title}
                </h2>
                <p className="text-muted-foreground">{post.description}</p>
            </Link>
        </article>
    );
}
