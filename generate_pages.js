const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

const oldFooterLinks = `                <ul class="link-widget-1-list">
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms &amp; Conditions</a></li>
                  <li><a href="#">Support</a></li>
                  <li><a href="#">Disclaimer</a></li>
                  <li><a href="/faq">FAQ</a></li>
                </ul>`;

const newFooterLinks = `                <ul class="link-widget-1-list">
                  <li><a href="/privacy.html">Privacy Policy</a></li>
                  <li><a href="/terms.html">Terms &amp; Conditions</a></li>
                  <li><a href="/contact">Support</a></li>
                  <li><a href="/disclaimer.html">Disclaimer</a></li>
                  <li><a href="/faq">FAQ</a></li>
                </ul>`;

for (let file of files) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(oldFooterLinks)) {
        content = content.replace(oldFooterLinks, newFooterLinks);
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated footer in ${file}`);
    }
}

// Generate new pages
const aboutContent = fs.readFileSync('about.html', 'utf8');
const headerMatch = aboutContent.match(/([\s\S]*?)<section class="about-1-section">/);
const footerMatch = aboutContent.match(/(<footer class="footer-1">[\s\S]*)/);

if (headerMatch && footerMatch) {
    let baseHeader = headerMatch[1];
    const footerStr = footerMatch[1];

    function createPage(filename, title, htmlContent) {
        let headerStr = baseHeader.replace(/<h1>.+<\/h1>/, `<h1>${title}</h1>`);
        headerStr = headerStr.replace(/<li>About Us<\/li>/, `<li>${title}</li>`);
        headerStr = headerStr.replace(/<title>.+<\/title>/, `<title>${title} | Eden Fife Healthcare</title>`);

        // adjust bg image if you want or leave as is.
        const bodyStr = `<section class="section-padding"><div class="auto-container">${htmlContent}</div></section>`;

        fs.writeFileSync(filename, headerStr + bodyStr + footerStr, 'utf8');
        console.log(`Created ${filename}`);
    }

    createPage('privacy.html', 'Privacy Policy', `
    <h2 class="mb_20">Privacy Policy</h2>
    <p class="mb_20">At Eden Fife Healthcare, we are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy details how we collect, use, and protect any information you provide us while using our website or our services.</p>
    <h3 class="mb_15">1. Information We Collect</h3>
    <p class="mb_20">We collect information that you voluntarily provide when you fill out forms, contact us via email, or subscribe to our newsletter. This may include your name, email address, phone number, and any details related to your care requirements.</p>
    <h3 class="mb_15">2. How We Use Your Information</h3>
    <p class="mb_20">The data we collect is used strictly for internal purposes such as to customize your care solutions, process your inquiries, and keep you updated regarding our services. We never sell or share your personal information with third parties unless required by law or as absolutely necessary for providing the requested care services.</p>
    <h3 class="mb_15">3. Data Security</h3>
    <p class="mb_20">We employ stringent security protocols and procedures to safeguard your personal information against unauthorized access, loss, or misuse.</p>
    <h3 class="mb_15">4. Your Rights</h3>
    <p class="mb_20">You have the right to request a copy of the personal information we hold about you and to ask for it to be corrected or deleted. If you have any inquiries regarding your data, please contact us at <a href="mailto:admin@edenfife.com">admin@edenfife.com</a>.</p>
  `);

    createPage('terms.html', 'Terms & Conditions', `
    <h2 class="mb_20">Terms & Conditions</h2>
    <p class="mb_20">Welcome to Eden Fife Healthcare. By continuing to browse and use this website, you agree to adhere to the following terms and conditions of use, which govern Eden Fife Healthcare's relationship with you concerning this website.</p>
    <h3 class="mb_15">1. Website Use</h3>
    <p class="mb_20">The information contained in this website is for general information purposes only. While we endeavor to keep the information up-to-date and accurate, we make no guarantees about the completeness, accuracy, or reliability of the site's content.</p>
    <h3 class="mb_15">2. Service Terms</h3>
    <p class="mb_20">Our care services are subject to an individual care agreement formed between Eden Fife Healthcare and the client. The details of these services are formally negotiated and recorded prior to the start of any care provision.</p>
    <h3 class="mb_15">3. Copyright</h3>
    <p class="mb_20">This website and its content are copyright of Eden Fife Healthcare Ltd. All rights reserved. You may not distribute, reproduce, or commercially exploit the content without our express written permission.</p>
    <h3 class="mb_15">4. Modifications</h3>
    <p class="mb_20">Eden Fife Healthcare reserves the right to modify these terms and conditions at any time. Continuing to use the site after changes signifies your acceptance of the new terms.</p>
  `);

    createPage('disclaimer.html', 'Disclaimer', `
    <h2 class="mb_20">Disclaimer</h2>
    <p class="mb_20">The information contained on the Eden Fife Healthcare website is provided for general informational purposes only. Every effort has been made to ensure the accuracy of the information presented on this site; however, we assume no professional liability for the contents provided herein.</p>
    <h3 class="mb_15">General Information</h3>
    <p class="mb_20">The contents of this site are not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health providers with any questions you may have regarding a medical condition.</p>
    <h3 class="mb_15">External Links</h3>
    <p class="mb_20">Through this website, you are able to link to other websites which are not under the control of Eden Fife Healthcare. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</p>
    <h3 class="mb_15">Limitation of Liability</h3>
    <p class="mb_20">In no event will Eden Fife Healthcare be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits resulting from the use of this website.</p>
  `);
} else {
    console.log('Failed to parse about.html');
}
