const fs = require('fs');
const path = require('path');

const folders = [
    'about', 'appointment', 'careers', 'contact', 'disclaimer',
    'news', 'news-details', 'privacy', 'service-details', 'services', 'terms', 'faq'
];

for (const folder of folders) {
    if (fs.existsSync(folder) && fs.statSync(folder).isDirectory()) {
        const indexPath = path.join(folder, 'index.html');
        // Wait, did we rename services-1.html? We'll just extract them as they are named in the folder
        const newPath = `${folder}.html`;

        if (fs.existsSync(indexPath)) {
            fs.renameSync(indexPath, newPath);
            console.log(`Moved ${indexPath} -> ${newPath}`);
        }

        // try to remove empty folder
        try {
            const files = fs.readdirSync(folder);
            if (files.length === 0) {
                fs.rmdirSync(folder);
                console.log(`Deleted empty folder ${folder}`);
            }
        } catch (e) {
            console.log(`Could not delete folder ${folder}: ${e.message}`);
        }
    }
}

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') || f === 'sitemap.xml');

const replacements = [
    { old: 'href="/assets/', new: 'href="assets/' },
    { old: 'src="/assets/', new: 'src="assets/' },
    { old: 'url(/assets/', new: 'url(assets/' },
    { old: 'src="/favicon.ico"', new: 'src="favicon.ico"' },
    { old: 'href="/favicon.ico"', new: 'href="favicon.ico"' }
];

const links = [
    'services', 'careers', 'news', 'news-details', 'privacy', 'terms',
    'disclaimer', 'service-details', 'about', 'contact', 'faq', 'appointment'
];
const linkReplacements = links.map(l => ({
    regex: new RegExp(`href="/${l}"`, 'g'),
    new: `href="${l}.html"`
}));

// Also cover case where there was a trailing slash like href="/services/"
const linkReplacementsSlash = links.map(l => ({
    regex: new RegExp(`href="/${l}/"`, 'g'),
    new: `href="${l}.html"`
}));

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    for (const r of replacements) {
        if (content.includes(r.old)) {
            content = content.replaceAll(r.old, r.new);
            changed = true;
        }
    }

    for (const r of linkReplacements) {
        if (r.regex.test(content)) {
            content = content.replace(r.regex, r.new);
            changed = true;
        }
    }

    for (const r of linkReplacementsSlash) {
        if (r.regex.test(content)) {
            content = content.replace(r.regex, r.new);
            changed = true;
        }
    }

    if (content.includes('href="/"')) {
        content = content.replaceAll('href="/"', 'href="index.html"');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated paths in ${file}`);
    }
}
