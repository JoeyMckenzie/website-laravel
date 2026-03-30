import { Head } from '@inertiajs/react';

const sections = [
    {
        title: 'Editor',
        items: [
            { name: 'PhpStorm', description: 'Primary IDE for PHP and Laravel development' },
            { name: 'VS Code', description: 'For frontend work and quick edits' },
            { name: 'JetBrains Mono', description: 'Font of choice across all editors and terminals' },
        ],
    },
    {
        title: 'Terminal',
        items: [
            { name: 'Warp', description: 'Modern terminal with AI features' },
            { name: 'Oh My Zsh', description: 'Shell framework with plugins and themes' },
            { name: 'Laravel Herd', description: 'One-click PHP development environment' },
        ],
    },
    {
        title: 'Stack',
        items: [
            { name: 'Laravel', description: 'Backend framework of choice' },
            { name: 'React + TypeScript', description: 'Frontend framework via Inertia.js' },
            { name: 'Tailwind CSS', description: 'Utility-first CSS' },
            { name: 'SQLite / MySQL', description: 'Database depending on the project' },
        ],
    },
    {
        title: 'Software',
        items: [
            { name: 'Arc', description: 'Browser of choice' },
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
                <section
                    key={section.title}
                    className="mt-8 space-y-3 border-t pt-6"
                >
                    <h2 className="text-2xl tracking-tight">
                        {section.title}
                    </h2>
                    <ul className="space-y-3">
                        {section.items.map((item) => (
                            <li key={item.name}>
                                <span className="font-medium">
                                    {item.name}
                                </span>
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
