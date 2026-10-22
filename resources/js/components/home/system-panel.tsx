export default function SystemPanel() {
    return (
        <aside
            className="system-scene"
            aria-label="How I approach AI applications"
        >
            <div className="system-window">
                <div className="window-bar">
                    <span className="window-dots" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                    </span>
                    <span>system-design</span>
                    <span className="window-kind">Engineering sketch</span>
                </div>
                <div className="system-window-body">
                    <p className="mono system-comment">
                        // The model is one part of the application.
                    </p>
                    <p className="system-thesis">
                        Reasoning needs
                        <br />
                        <strong>a reliable system.</strong>
                    </p>
                    <div className="system-flow">
                        <div className="flow-input">
                            <span>User intent</span>
                            <small>Interface / API</small>
                        </div>
                        <span className="flow-connector" aria-hidden="true" />
                        <div className="flow-core">
                            <span>Application core</span>
                            <small>State · orchestration · recovery</small>
                        </div>
                        <div className="flow-branches" aria-hidden="true" />
                        <div className="flow-services">
                            <div>
                                <span>Model</span>
                                <small>Reasoning</small>
                            </div>
                            <div>
                                <span>Memory</span>
                                <small>Context</small>
                            </div>
                            <div>
                                <span>Tools</span>
                                <small>Scoped actions</small>
                            </div>
                        </div>
                        <p className="system-boundary">
                            Validate <span aria-hidden="true">→</span> authorize{' '}
                            <span aria-hidden="true">→</span> execute
                        </p>
                    </div>
                </div>
                <div className="window-footer">
                    <span className="mono">
                        Architecture / decisions / evidence
                    </span>
                    <a href="#work">
                        Explore the work <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </div>
            <div className="system-tag system-tag-backend">
                <span className="tag-symbol" aria-hidden="true">
                    {'{ }'}
                </span>
                <div>
                    <strong>Backend foundations</strong>
                    <span>PHP / Laravel</span>
                </div>
            </div>
            <div className="system-tag system-tag-ai">
                <span className="tag-symbol" aria-hidden="true">
                    ⌘
                </span>
                <div>
                    <strong>Applied AI</strong>
                    <span>Agents / LLM applications</span>
                </div>
            </div>
        </aside>
    );
}
