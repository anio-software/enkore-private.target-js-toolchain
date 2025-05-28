import {transform} from "lightningcss"
import path from "node:path"
import fs from "node:fs"

type Result = {
	code: string
	classNames: Record<string, string>
}

export async function cssTransform(
	projectRoot: string,
	inputFilePath: string
): Promise<Result> {
	const absoluteFilePath = path.join(projectRoot, inputFilePath)

	const transformed = transform({
		filename: absoluteFilePath,
		code: fs.readFileSync(absoluteFilePath),
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
