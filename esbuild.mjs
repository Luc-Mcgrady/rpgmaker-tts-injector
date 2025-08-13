import esbuild from "esbuild"

await esbuild.build({
    entryPoints: ["src/index.ts"],
    outfile: "dist/userscript.js",
    bundle: true,
    minify: true,
    platform: "browser",
    banner: {js: `// https://gist.github.com/BettyJJ/17cbaa1de96235a7f5773b8690a20462
const short_name = "en-US-AvaNeural";
const locale = "en-US";
`}
})