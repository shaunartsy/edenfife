const fs = require('fs');
const path = require('path');

const cssPath = path.join('c:/Users/user/Documents/edenfife/assets/css', 'main.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Fix next js font/media paths
css = css.replace(/\/_next\/static\/media\/([^\/]+?)\.[a-f0-9]+\.(eot|woff2|woff|ttf|svg)/g, '../fonts/$1.$2');

// Some paths might be for Next.js internal fonts like `a3c2f369cb4be41c-s.woff2` which don't map to a name before a dot.
// We can just nuke the custom @font-face blocks for PT Sans and PT Serif, and replace their usages.

// 2. Replace the font families
css = css.replace(/__PT_Sans_438d47/g, '"PT Sans"');
css = css.replace(/__PT_Sans_Fallback_438d47/g, '"PT Sans"');

css = css.replace(/__PT_Serif_7dbc8c/g, '"PT Serif"');
css = css.replace(/__PT_Serif_Fallback_7dbc8c/g, '"PT Serif"');

// 3. Inject Google Fonts at the top
const googleFontsImport = `@import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=PT+Serif:wght@400;700&display=swap');\n`;

if (!css.includes('fonts.googleapis.com')) {
    css = googleFontsImport + css;
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Fixed CSS fonts!');
