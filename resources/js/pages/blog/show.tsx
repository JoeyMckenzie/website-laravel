import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { index } from '@/actions/App/Http/Controllers/BlogController';
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
                <meta
                    property="og:image"
                    content={`/${post.image}`}
                />
                {post.published_at && (
                    <meta
                        property="article:published_time"
                        content={post.published_at}
                    />
                )}
            </Head>

            <div className="mb-8">
                <Link
                    href={index()}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    &larr; Back to blog
                </Link>
            </div>

            <header className="mb-10 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time>{post.formatted_published_at}</time>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                        {post.tag.hash_tagged}
                    </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {post.title}
                </h1>
            </header>

            <article
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </>
    );
}
