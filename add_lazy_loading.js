const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Add lazy loading to images that don't have it and are not logos
    content = content.replace(/<img(.*?)>/gi, (match, p1) => {
        if (p1.includes('loading=')) return match;
        if (p1.includes('logo') || p1.includes('banner') || p1.includes('hero')) return match;

        changed = true;
        return '<img' + p1 + ' loading="lazy">';
    });

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Added lazy loading to ' + file);
    }
}
