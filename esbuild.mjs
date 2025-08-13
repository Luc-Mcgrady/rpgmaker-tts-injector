import esbuild from "esbuild"

await esbuild.build({
    entryPoints: ["src/index.ts"],
    outfile: "dist/userscript.js",
    bundle: true,
    minify: true,
    platform: "browser"
})