import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="mx-auto max-w-7xl space-y-6 p-6">
                {/* Welcome Message */}
                <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                    <div className="mb-4 flex items-center gap-4">
                        <div className="bg-primary-400/10 border-primary-400/30 flex h-12 w-12 items-center justify-center rounded-xl border">
                            <svg
                                className="text-primary-400 h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                                ></path>
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">
                                Welcome to Your Portfolio
                            </h1>
                            <p className="text-slate-400">
                                Manage your site settings and content here.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                        <div className="mb-4 flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                                <svg
                                    className="h-5 w-5 text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    ></path>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="font-semibold">Profile Views</h3>
                        </div>
                        <p className="text-primary-400 text-3xl font-bold">
                            1,234
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                            +12% from last month
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                        <div className="mb-4 flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                                <svg
                                    className="h-5 w-5 text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="font-semibold">Messages</h3>
                        </div>
                        <p className="text-3xl font-bold text-green-400">8</p>
                        <p className="mt-1 text-sm text-slate-400">
                            New this week
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                        <div className="mb-4 flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                                <svg
                                    className="h-5 w-5 text-purple-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="font-semibold">Projects</h3>
                        </div>
                        <p className="text-3xl font-bold text-purple-400">12</p>
                        <p className="mt-1 text-sm text-slate-400">
                            Active showcases
                        </p>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                    <h2 className="mb-4 text-lg font-semibold">Quick Links</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <a
                            href="/"
                            className="hover:border-primary-400/50 flex items-center gap-4 rounded-lg border border-slate-700 bg-slate-900 p-4 transition-colors"
                        >
                            <div className="bg-primary-400/10 flex h-10 w-10 items-center justify-center rounded-lg">
                                <svg
                                    className="text-primary-400 h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    ></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium">View Portfolio</h3>
                                <p className="text-sm text-slate-400">
                                    See your public site
                                </p>
                            </div>
                        </a>

                        <a
                            href="/settings/profile"
                            className="hover:border-primary-400/50 flex items-center gap-4 rounded-lg border border-slate-700 bg-slate-900 p-4 transition-colors"
                        >
                            <div className="bg-primary-400/10 flex h-10 w-10 items-center justify-center rounded-lg">
                                <svg
                                    className="text-primary-400 h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    ></path>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    ></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium">Settings</h3>
                                <p className="text-sm text-slate-400">
                                    Manage your account
                                </p>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                    <h2 className="mb-4 text-lg font-semibold">
                        Recent Activity
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="mt-2 h-2 w-2 rounded-full bg-green-400"></div>
                            <div>
                                <p className="text-slate-300">
                                    Portfolio site deployed successfully
                                </p>
                                <p className="text-sm text-slate-500">
                                    2 hours ago
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="mt-2 h-2 w-2 rounded-full bg-blue-400"></div>
                            <div>
                                <p className="text-slate-300">
                                    New message received
                                </p>
                                <p className="text-sm text-slate-500">
                                    1 day ago
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="mt-2 h-2 w-2 rounded-full bg-purple-400"></div>
                            <div>
                                <p className="text-slate-300">
                                    Profile updated
                                </p>
                                <p className="text-sm text-slate-500">
                                    3 days ago
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
