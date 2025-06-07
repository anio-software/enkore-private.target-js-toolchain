import {bundleAsync} from "lightningcss"
import {createRequire} from "node:module"
import fs from "node:fs"
import path from "node:path"

type LightningCSSOptions = {
	fileName: string
	minify?: boolean
}

export async function cssBundle(
	projectRoot: string,
	code: string,
	options: LightningCSSOptions
): Promise<string> {
	const syntheticFilePath = path.join(
		path.dirname(options.fileName),
		`__virtual_${Math.random().toString(32).slice(2)}.css`
	)

	// used to resolve node modules
	const req = createRequire(path.join(projectRoot, "index.js"))

	const transformed = await bundleAsync({
		filename: syntheticFilePath,
		cssModules: false,
		projectRoot,
		resolver: {
			read(file) {
				if (file === syntheticFilePath) {
					return code
				}

				return fs.readFileSync(file).toString()
			},

			resolve(specifier, originatingFile) {
				if (specifier.startsWith("./")) {
					return path.join(
						path.dirname(originatingFile),
						specifier
					)
				}

				return req.resolve(specifier)
			}
		},
		minify: options?.minify === true
	})

	return transformed.code.toString()
}
