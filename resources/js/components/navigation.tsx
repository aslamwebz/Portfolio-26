import { useState } from 'react';
import { Link } from '@inertiajs/react';

interface NavigationProps {
    auth?: {
        user?: any;
    };
}

export default function Navigation({ auth }: NavigationProps) {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#stack', label: 'Stack' },
        { href: '#experience', label: 'Experience' },
        { href: '#projects', label: 'Projects' },
    ];

    const handleSmoothScroll = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
    ) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsOpen(false);
    };

    return (
        <nav className="fixed top-0 right-0 left-0 z-50 border-b border-slate-800 bg-slate-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <a
                        href="#"
                        onClick={(e) => handleSmoothScroll(e, '#')}
                        className="font-mono text-xl font-semibold tracking-tight"
                    >
                        <span className="text-primary-400">&lt;</span>MA
                        <span className="text-primary-400">/&gt;</span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center space-x-8 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) =>
                                    handleSmoothScroll(e, link.href)
                                }
                                className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={(e) => handleSmoothScroll(e, '#contact')}
                            className="bg-primary-400/10 text-primary-400 border-primary-400/30 hover:bg-primary-400/20 rounded-lg border px-4 py-2 text-sm font-medium transition-all"
                        >
                            Contact
                        </a>
                        {auth?.user && (
                            <Link
                                href="/dashboard"
                                className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-slate-400 hover:text-white md:hidden"
                        aria-label="Toggle menu"
                    >
                        {!isOpen ? (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        ) : (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`border-b border-slate-700 bg-slate-800 transition-all duration-200 md:hidden ${
                    isOpen
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 overflow-hidden opacity-0'
                }`}
            >
                <div className="space-y-3 px-4 py-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleSmoothScroll(e, link.href)}
                            className="block text-slate-400 transition-colors hover:text-white"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={(e) => handleSmoothScroll(e, '#contact')}
                        className="text-primary-400 block"
                    >
                        Contact
                    </a>
                    {auth?.user && (
                        <Link
                            href="/dashboard"
                            className="block text-slate-400 transition-colors hover:text-white"
                        >
                            Dashboard
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
