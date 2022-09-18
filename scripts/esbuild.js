import * as esbuild from 'esbuild'
import process from 'process'

const dev_build = process.argv.includes('--dev')

const config = {
	entryPoints: [
		'src/main.ts',
		'src/kara.ts',
		'src/world.ts',
		'src/editor.ts',
	],
	outdir: 'public/js',
	minify: !dev_build,
	sourcemap: dev_build,
	watch: process.argv.includes('--watch'),
}

esbuild.build(config).catch(() => { process.exit(1) })
