import SectionHeading from '@/components/home/section-heading';

const groups = [
    {
        name: 'AI / LLM',
        items: [
            'Prism',
            'Tool-using agents',
            'Memory workflows',
            'Claude Code',
            'Codex',
            'OpenCode',
        ],
    },
    {
        name: 'Backend',
        items: ['PHP', 'Laravel', 'MySQL', 'REST APIs', 'Queues', 'Pest'],
    },
    {
        name: 'Frontend',
        items: ['Livewire', 'React', 'Inertia', 'Tailwind CSS'],
    },
    {
        name: 'Infrastructure',
        items: ['Git', 'Linux', 'GitHub Actions', 'Application deployment'],
    },
];
export default function Stack() {
    return (
        <section className="section page-width" aria-label="Technology stack">
            <SectionHeading
                label="Working stack"
                title="Tools with a purpose"
            />
            <div className="stack-grid">
                {groups.map((group) => (
                    <div key={group.name}>
                        <h3>{group.name}</h3>
                        <ul>
                            {group.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
