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
			publish: {
				withExactDependencyVersions: true,
				withPackageNames: [
					"@asint/<FQPN_FLAT>"
				],
				typesPackage: {
					withPackageNames: [
						"@asin-types/<FQPN_FLAT>"
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
