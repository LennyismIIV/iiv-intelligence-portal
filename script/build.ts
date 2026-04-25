import { build } from 'esbuild';
import { execSync } from 'child_process';

async function main() {
  console.log('Building frontend...');
  execSync('vite build', { stdio: 'inherit' });

  console.log('Building backend...');
  await build({
    entryPoints: ['server/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'node20',
    outfile: 'dist/index.cjs',
    format: 'cjs',
    external: ['better-sqlite3'],
  });

  console.log('✅ Build complete!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
