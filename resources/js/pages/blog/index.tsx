import { Head, Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/BlogController';
import type { PostSummary } from '@/types';

export default function BlogIndex({ posts }: { posts: PostSummary[] }) {
    return (
        <>
            <Head title="Blog">
                <meta
                    name="description"
                    content="Thoughts on software development, Laravel, PHP, Rust, and more."
                />
            </Head>

            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
                <p className="text-muted-foreground">
                    Thoughts on software development and things I find
                    interesting.
                </p>
            </div>

            <div className="mt-10 space-y-8">
                {posts.map((post) => (
                    <article key={post.slug}>
                        <Link
                            href={show(post.slug)}
                            className="group block space-y-2"
                        >
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <time>{post.formatted_published_at}</time>
                                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                                    {post.tag.hash_tagged}
                                </span>
                            </div>
                            <h2 className="text-xl font-semibold group-hover:underline">
                                {post.title}
                            </h2>
                            <p className="text-muted-foreground">
                                {post.description}
                            </p>
                        </Link>
                    </article>
                ))}
            </div>
        </>
    );
}
