import { useState, useEffect, useRef } from 'react';

export default function Terminal() {
    const [displayText, setDisplayText] = useState('');
    const [showOutput, setShowOutput] = useState(false);
    const fullText = 'php artisan deploy --env=production';
    const indexRef = useRef(0);

    useEffect(() => {
        const typeNextChar = () => {
            if (indexRef.current < fullText.length) {
                setDisplayText(fullText.slice(0, indexRef.current + 1));
                indexRef.current++;
                setTimeout(typeNextChar, 60);
            } else {
                setTimeout(() => setShowOutput(true), 300);
            }
        };

        const initialDelay = setTimeout(typeNextChar, 800);
        return () => clearTimeout(initialDelay);
    }, []);

    return (
        <div className="terminal-glow overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
            <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-900 px-4 py-3">
                <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 font-mono text-xs text-slate-500">
                    mohamed@aslam: ~/portfolio
                </div>
            </div>
            <div className="min-h-[280px] p-6 font-mono text-sm">
                <div className="mb-4">
                    <div className="mb-2 text-slate-500">
                        $ systemctl status server
                    </div>
                    <div className="rounded border border-slate-700/50 bg-slate-900/50 p-3">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            <span className="text-green-400">
                                ● server.service
                            </span>
                            <span className="text-slate-400">
                                - Production API Server
                            </span>
                        </div>
                        <div className="space-y-1 text-xs text-slate-400">
                            <div>
                                Loaded: loaded
                                (/etc/systemd/system/server.service; enabled)
                            </div>
                            <div>
                                Active:{' '}
                                <span className="text-green-400">
                                    active (running)
                                </span>{' '}
                                since Mon 2024-01-15 09:23:14 UTC
                            </div>
                            <div>
                                Load:{' '}
                                <span className="text-primary-400">12%</span> |
                                Uptime:{' '}
                                <span className="text-primary-400">99.99%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <span className="text-primary-400">$</span>
                    <span className="ml-2">{displayText}</span>
                    {!showOutput && (
                        <span className="bg-primary-400 ml-1 inline-block h-5 w-0.5"></span>
                    )}
                </div>
                {showOutput && (
                    <div>
                        <div className="space-y-1 text-slate-400">
                            <div>
                                <span className="text-blue-400">[INFO]</span>{' '}
                                Initializing deployment pipeline...
                            </div>
                            <div>
                                <span className="text-blue-400">[INFO]</span>{' '}
                                Running database migrations...
                            </div>
                            <div>
                                <span className="text-green-400">[OK]</span> 47
                                migrations completed successfully
                            </div>
                            <div>
                                <span className="text-blue-400">[INFO]</span>{' '}
                                Optimizing caches...
                            </div>
                            <div>
                                <span className="text-green-400">[OK]</span>{' '}
                                Route cache warmed up
                            </div>
                            <div>
                                <span className="text-green-400">[OK]</span>{' '}
                                Config cache warmed up
                            </div>
                            <div>
                                <span className="text-primary-400">[DONE]</span>{' '}
                                Deployment successful! Serving traffic on port
                                443
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="text-slate-500">$</span>
                            <span className="text-slate-400">_</span>
                            <span className="inline-block h-5 w-0.5 bg-slate-400"></span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
