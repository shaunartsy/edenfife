const fs = require('fs');
const path = require('path');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Make core paths root-relative so they don't break when moved to sub-folders
    const replacements = [
        { old: 'href="assets/', new: 'href="/assets/' },
        { old: 'src="assets/', new: 'src="/assets/' },
        { old: 'url(assets/', new: 'url(/assets/' }
    ];

    for (const r of replacements) {
        if (content.includes(r.old)) {
            content = content.replaceAll(r.old, r.new);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated relative paths in ${file}`);
    }
}

// Subdirectory conversion
for (const file of htmlFiles) {
    // Never rename root index or 404
    if (file === 'index.html' || file === '404.html' || file.startsWith('google')) {
        continue;
    }

    const folderName = file.replace('.html', '');
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }

    // Move the file into the folder and name it index.html
    const newPath = path.join(folderName, 'index.html');
    fs.renameSync(file, newPath);
    console.log(`Moved ${file} -> ${newPath}`);
}
