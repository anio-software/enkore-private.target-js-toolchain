import {
	createConfig,
	createTargetJSNodeOptions
} from "enkore/spec/factory"
import path from "node:path"
import {fileURLToPath} from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const isPublicRelease = (
	process.env?.RELEASE_VERSION ?? ""
).startsWith("vp")

export const config: unknown = createConfig({
	target: {
		name: "js-node",
		options: createTargetJSNodeOptions({
			npm: {
				configFilePath: path.join(__dirname, ".cicd", "npmrc")
			},

			// needed or we end up with a broken build
			preprocess: {
				expandStarExports: true
			},
			publish: {
				withExactDependencyVersions: true,
				withPackageNames: [
					isPublicRelease ? {
						name: "<FQPN>",
						publishWithProvenance: true
					} : "@asint/<FQPN_FLAT>"
				],
				typesPackage: {
					withPackageNames: [
						isPublicRelease ? {
							name: "@enkore-types/<PN>",
							publishWithProvenance: true
						} : "@asin-types/<FQPN_FLAT>"
					]
				}
			},
			externalPackages: [
				"@enkore-private/target-js-typescript",
				"@enkore-private/target-js-babel",
				"@enkore-private/target-js-rollup"
			]
		})
	}
})
