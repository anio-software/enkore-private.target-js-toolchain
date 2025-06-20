import {minify} from "terser"

export async function jsMinify(code: string): Promise<string> {
	const result = await minify(code, {
		module: true
	})

	return result.code!
}
