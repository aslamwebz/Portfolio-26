import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const generated = [
    'resources/js/actions',
    'resources/js/routes',
    'resources/js/wayfinder',
];

function run(command, args) {
    const result = spawnSync(command, args, {
        cwd: root,
        stdio: 'inherit',
        shell: false,
    });

    if (result.error) {
        process.stderr.write(`${result.error.message}\n`);
        process.exit(1);
    }
    if (result.status !== 0) {
        process.exit(result.status ?? 1);
    }
}

run('php', [
    'artisan',
    'wayfinder:generate',
    '--no-interaction',
    ...process.argv.slice(2),
]);
run(process.execPath, [
    resolve(root, 'node_modules/eslint/bin/eslint.js'),
    ...generated,
    '--fix',
]);
run(process.execPath, [
    resolve(root, 'node_modules/prettier/bin/prettier.cjs'),
    ...generated,
    '--write',
]);
