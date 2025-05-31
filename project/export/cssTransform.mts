import {transform} from "lightningcss"

type Result = {
	code: string
	classNames: Record<string, string>
}

type LightningCSSOptions = {
	fileName: string
	cssModulesPattern: string
}

export async function cssTransform(
	projectRoot: string,
	code: string,
	options: LightningCSSOptions
): Promise<Result> {
	const transformed = transform({
		filename: options.fileName,
		code: Buffer.from(code),
		cssModules: {
			pattern: options.cssModulesPattern
		},
		projectRoot
	})

	const classNames: Record<string, string> = {}

	if (transformed.exports) {
		for (const className in transformed.exports) {
			const cssExport = transformed.exports[className]

			classNames[className] = cssExport.name
		}
	}

	return {
		code: transformed.code.toString(),
		classNames
	}
}
