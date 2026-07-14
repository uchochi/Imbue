import { spawn } from 'node:child_process';

const server = spawn('node', ['server/index.js'], { stdio: 'inherit' });
const vite = spawn('npx', ['vite'], { stdio: 'inherit' });

server.on('close', (code) => { console.log(`Server exited (${code})`); process.exit(code); });
vite.on('close', (code) => { console.log(`Vite exited (${code})`); process.exit(code); });

process.on('SIGINT', () => { server.kill(); vite.kill(); process.exit(); });
process.on('SIGTERM', () => { server.kill(); vite.kill(); process.exit(); });
