import {transform} from "lightningcss"

type Result = {
	code: string
	classNames: Record<string, string>
}

export async function cssTransform(
	projectRoot: string,
	code: string,
	fileName: string
): Promise<Result> {
	const transformed = transform({
		filename: fileName,
		code: Buffer.from(code),
		cssModules: true,
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
