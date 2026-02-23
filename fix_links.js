const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const replacements = [
    { old: '<a href="/"><i class="fab fa-facebook-f"></i></a>', new: '<a href="https://www.facebook.com/edenfife" target="_blank"><i class="fab fa-facebook-f"></i></a>' },
    { old: '<a href="/"><i class="fab fa-twitter"></i></a>', new: '<a href="https://twitter.com/edenfife" target="_blank"><i class="fab fa-twitter"></i></a>' },
    { old: '<a href="/"><i class="fab fa-linkedin-in"></i></a>', new: '<a href="https://www.linkedin.com/company/edenfife" target="_blank"><i class=\"fab fa-linkedin-in\"></i></a>' },
    { old: '<a href="/"><span class="fab fa-facebook-square"></span></a>', new: '<a href="https://www.facebook.com/edenfife" target="_blank"><span class="fab fa-facebook-square"></span></a>' },
    { old: '<a href="/"><span class="fab fa-twitter"></span></a>', new: '<a href="https://twitter.com/edenfife" target="_blank"><span class="fab fa-twitter"></span></a>' },
    { old: '<a href="/"><span class="fab fa-instagram"></span></a>', new: '<a href="https://www.instagram.com/edenfife" target="_blank"><span class="fab fa-instagram"></span></a>' },
    { old: '<a href="/"><span class="fab fa-pinterest-p"></span></a>', new: '<a href="https://www.pinterest.com/edenfife" target="_blank"><span class="fab fa-pinterest-p"></span></a>' },
    { old: '<a href="/"><span class="fab fa-youtube"></span></a>', new: '<a href="https://www.youtube.com/edenfife" target="_blank"><span class="fab fa-youtube"></span></a>' },
    { old: '<a href="#"><img src="assets/images/logo.png" alt="" /></a>', new: '<a href="/"><img src="assets/images/logo.png" alt="" /></a>' },
    { old: '<a class="btn-1" href="/">Discover Our Services', new: '<a class="btn-1" href="/services-1">Discover Our Services' }
];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    for (const r of replacements) {
        if (content.includes(r.old)) {
            content = content.split(r.old).join(r.new);
            changed = true;
        }
    }
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated links in ' + file);
    }
}
