import { Head } from '@inertiajs/react';
import { Download } from 'lucide-react';

const experience = [
    {
        company: 'Givebutter',
        role: 'Senior Software Engineer II',
        dates: 'Aug 2025 — Present',
        bullets: [
            'Placeholder bullet point about your work',
            'Another accomplishment or responsibility',
        ],
    },
    {
        company: 'Dayforce',
        role: 'Senior Software Engineer',
        dates: 'Jun 2024 — Aug 2025',
        bullets: [
            'Placeholder bullet point about your work',
            'Another accomplishment or responsibility',
        ],
    },
    {
        company: 'National Funding',
        role: 'Senior Software Engineer',
        dates: 'Jan 2022 — Jun 2024',
        bullets: [
            'Placeholder bullet point about your work',
            'Another accomplishment or responsibility',
        ],
    },
    {
        company: 'MediKeeper',
        role: 'Software Engineer',
        dates: 'Dec 2020 — Jan 2022',
        bullets: [
            'Placeholder bullet point about your work',
            'Another accomplishment or responsibility',
        ],
    },
    {
        company: 'Sierra Pacific Industries',
        role: 'Applications Developer',
        dates: 'Jan 2020 — Dec 2020',
        bullets: [
            'Placeholder bullet point about your work',
            'Another accomplishment or responsibility',
        ],
    },
    {
        company: 'VSP Vision Care',
        role: 'Associate Software Engineer',
        dates: 'Jun 2018 — Jan 2020',
        bullets: [
            'Placeholder bullet point about your work',
            'Another accomplishment or responsibility',
        ],
    },
    {
        company: 'SAIC (formerly Engility)',
        role: 'Operations Research Analyst',
        dates: 'Sept 2016 — May 2018',
        bullets: [
            'Placeholder bullet point about your work',
            'Another accomplishment or responsibility',
        ],
    },
];

const education = [
    {
        school: 'San Diego State University',
        degree: 'B.S. Astronomy, Minor in Mathematics',
        dates: '2011 — 2016',
    },
];

const skills = [
    { category: 'Languages', items: 'PHP, TypeScript, Go, Rust' },
    { category: 'Frameworks', items: 'Laravel, React, Tailwind CSS' },
    { category: 'Tools', items: 'Git, Docker, AWS, CI/CD' },
];

export default function Cv() {
    return (
        <>
            <Head title="CV">
                <meta
                    name="description"
                    content="Joey McKenzie's resume and professional experience."
                />
            </Head>

            <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Joey McKenzie
                    </h1>
                    <p className="text-muted-foreground">Product Engineer</p>
                </div>
                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                    <Download className="size-4" />
                    Download PDF
                </a>
            </div>

            <section className="mt-8 space-y-3 pt-6">
                <h2 className="text-xl tracking-tight">Experience</h2>
                <div className="space-y-6">
                    {experience.map((job) => (
                        <div key={`${job.company}-${job.role}`}>
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                                    <span className="font-medium">
                                        {job.role}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {job.company}
                                    </span>
                                </div>
                                <span className="shrink-0 text-sm text-muted-foreground">
                                    {job.dates}
                                </span>
                            </div>
                            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                                {job.bullets.map((bullet) => (
                                    <li key={bullet}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-8 space-y-3 pt-6">
                <h2 className="text-xl tracking-tight">Education</h2>
                {education.map((edu) => (
                    <div
                        key={`${edu.school}-${edu.degree}`}
                        className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                    >
                        <div>
                            <span className="font-medium">{edu.degree}</span>
                            <span className="text-muted-foreground">
                                {' '}
                                &mdash; {edu.school}
                            </span>
                        </div>
                        <span className="shrink-0 text-sm text-muted-foreground">
                            {edu.dates}
                        </span>
                    </div>
                ))}
            </section>

            <section className="mt-8 space-y-3 pt-6">
                <h2 className="text-xl tracking-tight">Skills</h2>
                <ul className="space-y-3">
                    {skills.map((group) => (
                        <li key={group.category}>
                            <span className="font-medium">
                                {group.category}
                            </span>
                            <span className="text-muted-foreground">
                                {' '}
                                &mdash; {group.items}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
