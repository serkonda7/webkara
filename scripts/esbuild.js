import * as esbuild from 'esbuild'
import process from 'process'

const dev_build = process.argv.includes('--dev')

const config = {
	entryPoints: [
		'src/main.js',
		'src/kara.js',
		'src/world.js',
		'src/editor.js',
	],
	outdir: 'public/js',
	minify: !dev_build,
	sourcemap: dev_build,
	watch: process.argv.includes('--watch'),
}

esbuild.build(config).catch(() => { process.exit(1) })
