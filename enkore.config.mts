import {
	createConfig,
	createTargetJSNodeOptions
} from "enkore/spec/factory"

export const config: unknown = createConfig({
	target: {
		name: "js-node",
		options: createTargetJSNodeOptions({
			// needed or we end up with a broken build
			preprocess: {
				expandStarExports: true
			},
			publishWithExactDependencyVersions: true,
			createTypesPackage: {
				orgName: "@enkore-types"
			},
			externalPackages: [
				"@enkore/typescript",
				"@enkore-private/target-js-babel",
				"@enkore-private/target-js-rollup"
			]
		})
	}
})
