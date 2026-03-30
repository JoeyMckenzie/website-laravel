import { Head } from '@inertiajs/react';

export default function Now() {
    return (
        <>
            <Head title="Now">
                <meta
                    name="description"
                    content="A living changelog of what I'm learning, tinkering with, and thinking about outside of client work."
                />
            </Head>

            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Now</h1>
                <p className="text-muted-foreground">
                    A living changelog of what I'm learning, tinkering with, and
                    thinking about outside of client work.
                </p>
            </div>

            <section className="mt-10 space-y-3 border-t pt-6">
                <h2 className="text-2xl tracking-tight">Work</h2>
                <p className="text-muted-foreground leading-7">
                    I'm currently a Senior Developer at{' '}
                    <a
                        href="https://www.givebutter.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-foreground underline-offset-4 transition-colors hover:underline"
                    >
                        Givebutter
                    </a>{' '}
                    building things with PHP, Laravel, TypeScript, and React.
                    Our goal is to make the world a better place and empower the
                    changemaker in all of us.
                </p>
                <p className="text-muted-foreground leading-7">
                    I work on a lot of things, mainly Laravel and React. I love
                    my job and the people I get to work with. I love working
                    with PHP and TypeScript, and do a lot to build our community
                    and empower our developers to be the best they can be.
                </p>
            </section>

            <section className="mt-8 space-y-3 border-t pt-6">
                <h2 className="text-2xl tracking-tight">Online</h2>
                <p className="text-muted-foreground leading-7">
                    In my spare time, I write a lot of PHP and enjoy tinkering
                    on ideas with Laravel. I've got quite a few fun projects
                    I've worked on that usually make their way over to the blog.
                    Find me on{' '}
                    <a
                        href="https://github.com/joeymckenzie"
                        target="_blank"
                        rel="noreferrer"
                        className="text-foreground underline-offset-4 transition-colors hover:underline"
                    >
                        GitHub
                    </a>
                    .
                </p>
            </section>

            <section className="mt-8 space-y-3 border-t pt-6">
                <h2 className="text-2xl tracking-tight">Offline</h2>
                <p className="text-muted-foreground leading-7">
                    If I'm not sitting in front of a terminal, I'm chasing
                    around my two-year old and spending time with my family. I
                    enjoy fishing, grabbing a drink at my local watering hole
                    with friends, and posting mid takes about software on{' '}
                    <a
                        href="https://x.com/_joeyMcKenzie"
                        target="_blank"
                        rel="noreferrer"
                        className="text-foreground underline-offset-4 transition-colors hover:underline"
                    >
                        X
                    </a>
                    .
                </p>
            </section>
        </>
    );
}
