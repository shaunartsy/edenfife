const fs = require('fs');
const path = require('path');

const cssPath = path.join('c:/Users/user/Documents/edenfife/assets/css', 'main.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Fix the nested double quoting issues from naive replacement
css = css.replace(/""PT Sans""/g, '"PT Sans"');
css = css.replace(/""PT Serif""/g, '"PT Serif"');

// Deduplicate the array of identical font fallbacks
css = css.replace(/"PT Sans", "PT Sans"/g, '"PT Sans"');
css = css.replace(/"PT Serif", "PT Serif"/g, '"PT Serif"');

// Fix preloader relative path
css = css.replace(/url\(\.\.\/fonts\/preloader\.svg\)/g, 'url(../images/icons/preloader.svg)');

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Fixed Double Quotes and Preloader SVG in CSS!');
