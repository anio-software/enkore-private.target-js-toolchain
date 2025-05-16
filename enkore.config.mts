import {
	createConfig,
	createTargetJSNodeOptions
} from "@asint/enkore/spec/factory"

const isPublicRelease = (
	process.env?.RELEASE_VERSION ?? ""
).startsWith("vp")

export const config: unknown = createConfig({
	target: {
		name: "js-node",
		options: createTargetJSNodeOptions({
			npm: {
				registry: [{
					url: "https://registry.npmjs.org/",
					authTokenFilePath: "./secrets/npm_auth_token"
				}, {
					url: "https://npm-registry.anio.software/",
					scope: ["@asint", "@asint-types"],
					clientPrivateKeyFilePath: "./secrets/npm_client.pkey",
					clientCertificateFilePath: "./secrets/npm_client.cert",
					authTokenFilePath: "./secrets/anio_npm_auth_token"
				}]
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
						} : "@asint-types/<FQPN_FLAT>"
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
