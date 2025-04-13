// scripts/build-sw.js
const { build } = require('esbuild');
const path = require('path');

const ENTRY_FILE = path.resolve(__dirname, '../services/service-worker.ts');
const OUT_FILE = path.resolve(__dirname, '../public/service-worker.js');

build({
	entryPoints: [ENTRY_FILE],
	outfile: OUT_FILE,
	bundle: false,
	format: 'iife',
	platform: 'browser',
	target: ['es2020'],
})
	.then(() => {
		console.log('✅ Service Worker build completed!');
	})
	.catch(e => {
		console.error('❌ Build failed:', e);
		process.exit(1);
	});
