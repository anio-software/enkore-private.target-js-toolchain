import {
	createConfig,
	createTargetJSNodeOptions
} from "@anio-software/enkore/spec/factory"

export const config: unknown = createConfig({
	target: {
		name: "js-node",
		options: createTargetJSNodeOptions({
			// needed or we end up with a broken build
			preprocess: {
				expandStarExports: true
			},

			externalPackages: [
				"@anio-software/enkore-private.target-js-typescript",
				"@anio-software/enkore-private.target-js-babel",
				"@anio-software/enkore-private.target-js-rollup"
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
				registry: "anioSoftware"
			}, {
				packageName: "<FQPN>_types",
				registry: "anioSoftware",
				packageContents: "projectTypes"
			}]
		})
	}
})
