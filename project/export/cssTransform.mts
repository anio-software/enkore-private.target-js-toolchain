import {transform} from "lightningcss"
import path from "node:path"
import fs from "node:fs"

type Result = {
	code: string
	cssClassNames: Record<string, string>
}

export async function cssTransform(
	projectRoot: string,
	inputFilePath: string
): Promise<Result> {
	const absoluteFilePath = path.join(projectRoot, inputFilePath)

	const {code, exports} = transform({
		filename: absoluteFilePath,
		code: fs.readFileSync(absoluteFilePath),
		cssModules: true,
		projectRoot
	})

	const cssClassNames: Record<string, string> = {}

	if (exports) {
		for (const className in exports) {
			const cssExport = exports[className]

			cssClassNames[className] = cssExport.name
		}
	}

	return {
		code: code.toString(),
		cssClassNames
	}
}
