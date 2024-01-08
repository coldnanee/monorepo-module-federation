import path from "path";

import { buildWebpackConfig, type TConfig, type TBuildEnv } from "@packages/build-config";

import webpack from 'webpack';

export default (env: TBuildEnv): TConfig => {

	const config: TConfig = buildWebpackConfig({
		...env,
		paths: {
			entry: path.resolve(__dirname, "src", "index.tsx"),
			output: path.resolve(__dirname, "build"),
			html: path.resolve(__dirname, "public", "index.html"),
			src: path.resolve(__dirname, "src"),
			public: path.resolve(__dirname, "public")
		}
	});

	const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? "http://localhost:3001";
	const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? "http://localhost:3002"; 

	config.plugins.push(new webpack.container.ModuleFederationPlugin({
		name: "host",
		filename: "remoteEntry.js",
		remotes: {
			shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
			admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`
		}
	}))

	return config;
};