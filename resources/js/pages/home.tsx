import { Head, Link } from '@inertiajs/react';
import PostPreviewCard from '@/components/post-preview-card';
import { index } from '@/actions/App/Http/Controllers/BlogController';
import type { PostSummary } from '@/types';

export default function Home({ recentPosts }: { recentPosts: PostSummary[] }) {
    return (
        <>
            <Head title="Home">
                <meta
                    name="description"
                    content="Developer. Dad. PHP enjoyer. Building things with Laravel and giving unsolicited advice on tech."
                />
            </Head>

            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Hi, I'm Joey.
                </h1>
                <p className="leading-7 text-muted-foreground">
                    Developer. Product engineer. Dad. PHP enjoyer. Building
                    things with Laravel and giving unsolicited advice on tech.
                </p>
            </div>

            <section className="mt-10 space-y-4 pt-6">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl tracking-tight">Recent Posts</h2>
                    <Link
                        href={index()}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        More
                    </Link>
                </div>

                <div className="space-y-8">
                    {recentPosts.map((post) => (
                        <PostPreviewCard key={post.slug} post={post} />
                    ))}
                </div>
            </section>
        </>
    );
}
