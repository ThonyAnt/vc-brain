import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';

await build({
  entryPoints: ['src/main.js'],
  bundle: true,
  minify: true,
  format: 'iife',
  outfile: 'bundle.js',
  logLevel: 'info',
});

// standalone.html: everything inlined, open from anywhere (file://, artifact, email)
const html = readFileSync('index.html', 'utf8');
const js = readFileSync('bundle.js', 'utf8');
const standalone = html.replace('<script src="./bundle.js"></script>', () => `<script>${js}</script>`);
writeFileSync('standalone.html', standalone);

// artifact.html: same content as a body fragment (no doctype/html/head/body)
const style = standalone.match(/<style>[\s\S]*?<\/style>/)[0];
const body = standalone.match(/<body>([\s\S]*)<\/body>/)[1];
writeFileSync('artifact.html', `<title>VC Brain — fund memory mockup</title>\n${style}\n${body}`);
console.log('wrote standalone.html, artifact.html');
