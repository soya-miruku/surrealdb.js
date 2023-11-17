import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";
import project from "./project.json" assert { type: "json" };

await emptyDir("./npm");

await build({
	entryPoints: ["./src/index.ts"],
	outDir: "./npm",
	shims: {
		// see JS docs for overview and more options
		deno: false,
		webSocket: false,
	},
	package: {
		// package.json properties
		name: "@soyamiruku/surrealdb.bun",
		version: project.version,
		description: "Javascript driver for SurrealDB",
		license: "Apache 2.0",
		repository: {
			type: "git",
			url: "https://github.com/soya-miruku/surrealdb.js.git",
		},
		types: "./esm/types.d.ts",
		exports: {
			".": {
				"import": "./esm/index.js",
				"require": "./script/index.js",
				"types": "./esm/types.d.ts"
			}
		},
		author: {
			name: "Tobie Morgan Hitchcock",
			url: "https://surrealdb.com",
		},
		dependencies: {
			"unws": "^0.2.3",
			"tcp-websocket": "^0.1.1",
			"ws": "^8.13.0",
		},
		devDependencies: {
			"@types/node": "^18.7.18",
			"@types/ws": "8.5.3",
			"esbuild": "0.15.8",
		},
		scripts: {
			"build:web": "esbuild ./esm/index.js --platform=node --format=esm --minify --bundle --sourcemap --outfile=./web/index.js",
		},
		browser: "./web/index.js",
	},
	// skipSourceOutput: true,
	mappings: {
		"./src/library/WebSocket/deno.ts": "./src/library/WebSocket/node.ts",
	},
	compilerOptions: {
		lib: ["DOM"],
		sourceMap: true,
	},
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
