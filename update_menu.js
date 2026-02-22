const fs = require('fs');

const files = fs.readdirSync('.', { withFileTypes: true })
    .filter(dirent => !dirent.isDirectory() && dirent.name.endsWith('.html'))
    .map(dirent => dirent.name);

// We need a regex that matches:
// <li class="dropdown">\s*<a href="/services-1">Our Services</a>\s*<ul(?:.*?)>[\s\S]*?</ul>\s*(?:<div class="dropdown-btn">.*?</div>\s*)?</li>
// Note: we can match all variations using a dotAll modifier: /s
const regex = /<li class="dropdown">\s*<a href="\/services-1">Our Services<\/a>\s*<ul[^>]*>[\s\S]*?<\/ul>\s*(?:<div class="dropdown-btn">[\s\S]*?<\/div>\s*)?<\/li>/s;

let modifiedFiles = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // Check if there are matches
    // Note: since there can be multiple instances (main menu, sticky header, mobile menu), we need a global regex /sg
    const globalRegex = /<li class="dropdown">\s*<a href="\/services-1">Our Services<\/a>\s*<ul[^>]*>[\s\S]*?<\/ul>\s*(?:<div class="dropdown-btn">[\s\S]*?<\/div>\s*)?<\/li>/sg;

    const matches = content.match(globalRegex);
    if (matches) {
        console.log(`Found ${matches.length} matches in ${file}`);
        content = content.replace(globalRegex, '<li><a href="/services-1">Our Services</a></li>');
        fs.writeFileSync(file, content, 'utf8');
        modifiedFiles++;
    }
}

console.log(`Modified ${modifiedFiles} files.`);
