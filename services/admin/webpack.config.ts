import path from "path";

import { buildWebpackConfig, type TConfig, type TBuildEnv } from "@packages/build-config";
import webpack from "webpack";

import packageJson from './package.json';

export default (env: TBuildEnv): TConfig => {
	const config: TConfig = buildWebpackConfig({
		...env,
		port: env.port ?? 3002,
		paths: {
			entry: path.resolve(__dirname, "src", "index.tsx"),
			output: path.resolve(__dirname, "build"),
			html: path.resolve(__dirname, "public", "index.html"),
			src: path.resolve(__dirname, "src"),
			public: path.resolve(__dirname, "public")
		}
	});

	config.plugins.push(new webpack.container.ModuleFederationPlugin({
		name: "admin", // название микрофронтенда
		filename: "remoteEntry.js", // название файла для удаленного подключения в хост-контейнер
		exposes: {
			"./router": "./src/router/router.tsx"
		}, // указываем то, что хотим отдать наружу
		shared: { // указываем общие библиотеки
			...packageJson.dependencies,
			"react": {
				eager: true,
				requiredVersion: packageJson.dependencies["react"]
			},
			"react-router-dom": {
				eager: true,
				requiredVersion: packageJson.dependencies["react-router-dom"]
			},
			"react-dom": {
				eager: true, // указывает на то, что необходимо эту библиотеку подгрузить сразу
				requiredVersion: packageJson.dependencies["react-dom"] // здесь можно указать необходимую версию. !основные зависимости лучше выносить отдельно
			}
		} 
	}))

	return config;
};