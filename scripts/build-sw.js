'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
// scripts/build-sw.ts
var esbuild_1 = require('esbuild');
var path_1 = require('path');
var ENTRY_FILE = path_1.resolve('src', 'service-worker.ts');
var OUT_FILE = path_1.resolve('public', 'service-worker.js');
(0, esbuild_1.build)({
	entryPoints: [ENTRY_FILE],
	outfile: OUT_FILE,
	bundle: false,
	format: 'iife',
	platform: 'browser',
	target: ['es2020'],
})
	.then(function () {
		console.log('✅ Service Worker build completed!');
	})
	.catch(function (e) {
		console.error('❌ Build failed:', e);
		process.exit(1);
	});
