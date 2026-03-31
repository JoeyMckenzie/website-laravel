import { Head } from '@inertiajs/react';

const sections = [
    {
        title: 'Stack',
        items: [
            { name: 'Laravel', description: 'As the good Lord intended' },
            {
                name: 'React + TypeScript',
                description:
                    "At some point it's easier to follow the zeitgeist",
            },
            { name: 'Tailwind', description: 'Self-explanatory' },
            {
                name: 'SQLite / MySQL',
                description: "I'll get around to Postgres eventually...",
            },
        ],
    },
    {
        title: 'Software',
        items: [
            { name: 'Zen', description: 'Browser of choice' },
            { name: 'Figma', description: 'Design and prototyping' },
            { name: 'TablePlus', description: 'Database management' },
            { name: 'Raycast', description: 'Launcher and productivity' },
        ],
    },
    {
        title: 'Hardware',
        items: [
            { name: 'MacBook Pro', description: 'Daily driver' },
            { name: 'Apple Studio Display', description: 'External monitor' },
        ],
    },
];

export default function Uses() {
    return (
        <>
            <Head title="Uses">
                <meta
                    name="description"
                    content="The tools, software, and hardware I use for development."
                />
            </Head>

            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Uses</h1>
                <p className="text-muted-foreground">
                    The tools, software, and hardware I use on a daily basis.
                </p>
            </div>

            {sections.map((section) => (
                <section key={section.title} className="mt-8 space-y-3 pt-6">
                    <h2 className="text-2xl tracking-tight">{section.title}</h2>
                    <ul className="space-y-3">
                        {section.items.map((item) => (
                            <li key={item.name}>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-muted-foreground">
                                    {' '}
                                    &mdash; {item.description}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </>
    );
}
