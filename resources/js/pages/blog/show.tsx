import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import PostReactions from '@/components/post-reactions';
import type { PostDetail } from '@/types';

export default function BlogShow({
    post,
    content,
}: {
    post: PostDetail;
    content: string;
}) {
    useEffect(() => {
        import('mermaid').then((mermaid) => {
            mermaid.default.initialize({ startOnLoad: false });
            mermaid.default.run();
        });
    }, []);

    return (
        <>
            <Head title={post.title}>
                <meta name="description" content={post.description} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.description} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={`/${post.image}`} />
                {post.published_at && (
                    <meta
                        property="article:published_time"
                        content={post.published_at}
                    />
                )}
            </Head>

            <header className="mb-10 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time>{post.formatted_published_at}</time>
                    <span>&middot;</span>
                    <span>{post.reading_time_minutes} min read</span>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                        {post.tag.hash_tagged}
                    </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {post.title}
                </h1>
                {post.image && (
                    <div className="overflow-hidden rounded-2xl border border-border">
                        <img
                            src={`/${post.image}`}
                            alt={post.title}
                            className="h-auto w-full object-cover"
                        />
                    </div>
                )}
            </header>

            <article
                className="prose max-w-none dark:prose-invert prose-img:mx-auto prose-img:rounded-md"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className="mt-10 border-t pt-6">
                <PostReactions slug={post.slug} />
            </div>
        </>
    );
}
