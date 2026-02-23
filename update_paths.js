const fs = require('fs');

const renames = {
    'services-1.html': 'services.html',
    'career.html': 'careers.html',
    'blog-grid.html': 'news.html',
    'blog-details.html': 'news-details.html'
};

for (const [oldName, newName] of Object.entries(renames)) {
    if (fs.existsSync(oldName)) {
        fs.renameSync(oldName, newName);
        console.log(`Renamed ${oldName} to ${newName}`);
    }
}

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f === 'sitemap.xml');

const replacements = [
    { regex: /href="\/services-1(\.html)?"/g, new: 'href="/services"' },
    { regex: /href="services-1\.html"/g, new: 'href="/services"' },
    { regex: /href="\/career(\.html)?"/g, new: 'href="/careers"' },
    { regex: /href="career\.html"/g, new: 'href="/careers"' },
    { regex: /href="\/blog-grid(\.html)?"/g, new: 'href="/news"' },
    { regex: /href="blog-grid\.html"/g, new: 'href="/news"' },
    { regex: /href="\/blog-details(\.html)?"/g, new: 'href="/news-details"' },
    { regex: /href="blog-details\.html"/g, new: 'href="/news-details"' },
    { regex: /href="\/privacy\.html"/g, new: 'href="/privacy"' },
    { regex: /href="privacy\.html"/g, new: 'href="/privacy"' },
    { regex: /href="\/terms\.html"/g, new: 'href="/terms"' },
    { regex: /href="terms\.html"/g, new: 'href="/terms"' },
    { regex: /href="\/disclaimer\.html"/g, new: 'href="/disclaimer"' },
    { regex: /href="disclaimer\.html"/g, new: 'href="/disclaimer"' },
    { regex: /href="\/service-details\.html"/g, new: 'href="/service-details"' },
    { regex: /href="service-details\.html"/g, new: 'href="/service-details"' },
    { regex: /href="\/about\.html"/g, new: 'href="/about"' },
    { regex: /href="about\.html"/g, new: 'href="/about"' },
    { regex: /href="\/contact\.html"/g, new: 'href="/contact"' },
    { regex: /href="contact\.html"/g, new: 'href="/contact"' },
    { regex: /href="\/faq\.html"/g, new: 'href="/faq"' },
    { regex: /href="faq\.html"/g, new: 'href="/faq"' },
    { regex: /href="index\.html"/g, new: 'href="/"' },
    // specific case for sitemap.xml loc lines
    { regex: /<loc>https:\/\/edenfife\.com\/services-1<\/loc>/g, new: '<loc>https://edenfife.com/services</loc>' },
    { regex: /<loc>https:\/\/edenfife\.com\/career<\/loc>/g, new: '<loc>https://edenfife.com/careers</loc>' },
    { regex: /<loc>https:\/\/edenfife\.com\/blog-grid<\/loc>/g, new: '<loc>https://edenfife.com/news</loc>' },
    { regex: /<loc>https:\/\/edenfife\.com\/blog-details<\/loc>/g, new: '<loc>https://edenfife.com/news-details</loc>' },
];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    for (const r of replacements) {
        if (r.regex.test(content)) {
            content = content.replace(r.regex, r.new);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated paths in ${file}`);
    }
}
