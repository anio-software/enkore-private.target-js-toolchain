import {minify} from "terser"

export async function jsMinify(code: string): Promise<string> {
	const result = await minify(code, {
		module: true,
		format: {
			//
			// very important, we need this setting to preserve the /*@__PURE__*/ annotations
			//
			preserve_annotations: true
		}
	})

	return result.code!
}
