const systems: Record<string, { title: string; detail: string }[]> = {
    freya: [
        { title: 'Desktop / voice', detail: 'Disposable interfaces' },
        { title: 'Persistent core', detail: 'Mind · memory · missions' },
        { title: 'Permission gate', detail: 'Guard / Governor' },
        { title: 'Scoped tools', detail: 'Browser · files · apps' },
    ],
    forge: [
        { title: 'Workspace / CLI', detail: 'Explicit start and stop' },
        { title: 'Background engine', detail: 'PTYs and session state' },
        { title: 'Agent terminals', detail: 'Claude · Codex · others' },
        { title: 'Git worktrees', detail: 'Isolated checkouts' },
    ],
    hireai: [
        { title: 'Livewire interface', detail: 'Documents and accounts' },
        { title: 'Laravel services', detail: 'Validation and app rules' },
        { title: 'Prism / queues', detail: 'Generation workflows' },
        { title: 'Providers / storage', detail: 'Models and persistence' },
    ],
};
export default function ArchitectureSketch({
    slug,
    title,
}: {
    slug: string;
    title: string;
}) {
    const nodes = systems[slug] || [
        { title: 'Public interface', detail: 'User actions' },
        { title: 'Application core', detail: 'Rules and state' },
        { title: 'Service boundaries', detail: 'Tools and integrations' },
        { title: 'Persistence', detail: 'Application data' },
    ];
    return (
        <svg
            className="architecture-sketch"
            width="380"
            height="480"
            viewBox="0 0 380 480"
            role="img"
            aria-labelledby={slug + '-diagram-title ' + slug + '-diagram-desc'}
        >
            <title id={slug + '-diagram-title'}>
                {title + ' system sketch'}
            </title>
            <desc id={slug + '-diagram-desc'}>
                {nodes
                    .map((node) => node.title + ': ' + node.detail)
                    .join('. ')}
            </desc>
            {nodes.map((node, index) => (
                <g key={node.title}>
                    {index > 0 && (
                        <path
                            className="diagram-connector"
                            d={'M190 ' + (30 + (index - 1) * 112 + 78) + ' v34'}
                        />
                    )}
                    <rect
                        className={
                            'diagram-box ' + (index === 1 ? 'diagram-core' : '')
                        }
                        x="30"
                        y={30 + index * 112}
                        width="320"
                        height="78"
                        rx="6"
                    />
                    <text
                        className="diagram-title"
                        x="190"
                        y={61 + index * 112}
                        textAnchor="middle"
                    >
                        {node.title}
                    </text>
                    <text
                        className="diagram-detail"
                        x="190"
                        y={87 + index * 112}
                        textAnchor="middle"
                    >
                        {node.detail}
                    </text>
                </g>
            ))}
        </svg>
    );
}
