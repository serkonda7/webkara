import * as esbuild from 'esbuild'
import process from 'process'

const config = {
	entryPoints: [
		'src/main.ts',
		'src/kara.ts',
		'src/world.ts',
		'src/editor.ts',
		'src/data_storage.ts',
		'src/vector.ts',
		'src/dom_util.ts',
	],
	outdir: 'public/js',
}

esbuild.build(config).catch(() => { process.exit(1) })
