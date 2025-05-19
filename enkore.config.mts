import {
	createConfig,
	createTargetJSNodeOptions
} from "@anio-software/enkore/spec/factory"

const isPublicRelease = (
	process.env?.RELEASE_VERSION ?? ""
).startsWith("vp")

export const config: unknown = createConfig({
	target: {
		name: "js-node",
		options: createTargetJSNodeOptions({
			// needed or we end up with a broken build
			preprocess: {
				expandStarExports: true
			},

			externalPackages: [
				"@enkore-private/target-js-typescript",
				"@enkore-private/target-js-babel",
				"@enkore-private/target-js-rollup"
			],

			publishWithExactDependencyVersions: true,

			registry: {
				"anioSoftware": {
					url: "https://npm-registry.anio.software",
					authTokenFilePath: "secrets/anio_npm_auth_token",
					clientPrivateKeyFilePath: "secrets/npm_client.pkey",
					clientCertificateFilePath: "secrets/npm_client.cert"
				}
			},

			packageSourceRegistryByScope: {
				"@anio-software": {
					registry: "anioSoftware"
				}
			},

			publish: [{
				packageName: "@anio-software/enkore.target-js-toolchain",
				registry: "anioSoftware"
			}, {
				packageName: "@anio-software/enkore-types.target-js-toolchain",
				registry: "anioSoftware",
				packageContents: "projectTypes"
			}]
		})
	}
})
