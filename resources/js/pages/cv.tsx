import { Head } from '@inertiajs/react';
import { Download } from 'lucide-react';
import {
    FadeInSection,
    StaggeredItem,
    StaggeredList,
} from '@/components/motion';

const experience = [
    {
        company: 'Givebutter',
        role: 'Senior Software Engineer II',
        dates: 'Aug 2025 — Present',
        summary:
            'Building things with PHP, Laravel, TypeScript, and React at a nonprofit fundraising platform that genuinely cares about doing good in the world. I love my job and the people I work with, which I understand is a rare and slightly suspicious thing to say.',
    },
    {
        company: 'Dayforce',
        role: 'Senior Software Engineer',
        dates: 'Jun 2024 — Aug 2025',
        summary:
            'Worked on platform security for an HR system managing 7 million users across 3,000+ organizations. Built device fingerprinting services, a CSP violation analytics pipeline, and a CSRF protection framework that apparently fixed 1,500+ security vulnerabilities. Turns out enterprise software has a lot of security vulnerabilities.',
    },
    {
        company: 'National Funding',
        role: 'Senior Software Engineer',
        dates: 'Jan 2022 — Jun 2024',
        summary:
            'Built loan management systems on AWS using serverless workflows, .NET, and more acronyms than I care to count. Integrated Plaid for loan qualification, wrangled Salesforce into behaving, and wrote enough Terraform to have opinions about it. Strong opinions. Mostly positive.',
    },
    {
        company: 'MediKeeper',
        role: 'Software Engineer',
        dates: 'Dec 2020 — Jan 2022',
        summary:
            'Helped migrate legacy health and wellness apps off ASP.NET WebForms, which is exactly as fun as it sounds. Built out .NET and Vue features, improved test coverage significantly, and collaborated with accessibility teams to make sure the apps worked for everyone and not just people who happen to use a mouse.',
    },
    {
        company: 'Sierra Pacific Industries',
        role: 'Applications Developer',
        dates: 'Jan 2020 — Dec 2020',
        summary:
            'Migrated IBM RPG green screen inventory systems managing $800 million in yearly revenue to .NET Core and Angular. If you have never had to read RPG code before, consider yourself lucky. I have seen things.',
    },
    {
        company: 'VSP Vision Care',
        role: 'Associate Software Engineer',
        dates: 'Jun 2018 — Jan 2020',
        summary:
            'Built patient claims management systems for optical retailers serving 2 million monthly users with Angular, Java, and Spring Boot. My first real enterprise job, where I learned that "we\'ve always done it this way" is a complete sentence to some people.',
    },
    {
        company: 'SAIC (formerly Engility)',
        role: 'Operations Research Analyst',
        dates: 'Sept 2016 — May 2018',
        summary:
            'Analyzed federal financial data with R and Python to build cost models for Navy shipbuilding programs. Started my career moving Excel spreadsheets into SQL Server and writing .NET background jobs, which somehow led to everything else on this page.',
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
                    <p className="flex items-center gap-2 text-muted-foreground">
                        Product engineer. Developer. Tinkerer.
                    </p>
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

            <FadeInSection className="mt-8 space-y-3 pt-6">
                <h2 className="text-xl tracking-tight">Experience</h2>
                <StaggeredList className="space-y-6">
                    {experience.map((job) => (
                        <StaggeredItem key={`${job.company}-${job.role}`}>
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
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                {job.summary}
                            </p>
                        </StaggeredItem>
                    ))}
                </StaggeredList>
            </FadeInSection>

            <FadeInSection className="mt-8 space-y-3 pt-6">
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
            </FadeInSection>

            <FadeInSection className="mt-8 space-y-3 pt-6">
                <h2 className="text-xl tracking-tight">Skills</h2>
                <StaggeredList className="space-y-3">
                    {skills.map((group) => (
                        <StaggeredItem key={group.category}>
                            <span className="font-medium">
                                {group.category}
                            </span>
                            <span className="text-muted-foreground">
                                {' '}
                                &mdash; {group.items}
                            </span>
                        </StaggeredItem>
                    ))}
                </StaggeredList>
            </FadeInSection>
        </>
    );
}
