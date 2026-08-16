# North Ledger Bookkeeping Website

A responsive, mobile-first bookkeeping website built with standard HTML, CSS, and JavaScript. It has no framework or build step.

## Preview locally

Serve this folder with any static web server so the clean resource and privacy URLs resolve correctly.

## Replace before launch

Search the project for these placeholders:

- `North Ledger Bookkeeping`
- `Maya Bennett`
- `hello@northledger.ca`
- `647-555-0148`
- `https://www.northledger.ca/`
- `123 King Street West, Suite 400`
- Placeholder credentials, testimonial, results, and financial figures

Update the same business information in the JSON-LD schema inside `index.html`, plus `robots.txt` and `sitemap.xml`. Replace the stylized CSS portrait with an authentic professional photo when one is available.

The privacy policy is substantive and based on a Canadian bookkeeping-service context, but the owner must confirm that its actual vendors, security practices, retention periods, contact details, marketing practices, and cross-border processing match the policy. Obtain legal review before treating it as final legal advice.

## Contact form

The demonstration form validates in the browser and displays a confirmation message, but it intentionally does not send or store submissions. Connect it to the host's form service, a serverless function, or the client's CRM before launch, then update the privacy copy.

## SEO and launch features

- Unique title and meta description
- Canonical URL
- Open Graph and X/Twitter metadata
- Custom social sharing card
- Local Business, Accounting Service, Person, Website, and FAQ structured data
- Three complete, indexable bookkeeping resource articles with Article structured data
- Dedicated privacy policy with access, consent, retention, safeguarding, service-provider, cookie, complaint, and CASL-related disclosures
- `robots.txt` and `sitemap.xml`
- Semantic headings and landmarks
- Fast, dependency-free source
- Security headers for Netlify and compatible static hosts
- Accessible mobile navigation, form labels, keyboard controls, skip link, and reduced-motion support
- Custom no-index 404 page

## Project structure

- `index.html` — page content and SEO metadata
- `resources/` — three complete bookkeeping resource articles
- `privacy/index.html` — dedicated privacy policy
- `assets/css/styles.css` — complete responsive design system
- `assets/js/script.js` — menu, FAQ, reveal animation, form demo, and footer year
- `og-card.svg` — social sharing card
- `robots.txt` and `sitemap.xml` — search engine discovery files
- `_headers` — security and caching headers
- `404.html` — custom not-found page
