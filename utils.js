const url = require('url');
const { SHORTENERS, BYPASS_SERVICES } = require('./config');

function cleanUrl(inputUrl) {
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
        return 'https://' + inputUrl;
    }
    return inputUrl;
}

function detectService70(url) {
    const urlLower = url.toLowerCase();
    for (const category in BYPASS_SERVICES) {
        const services = BYPASS_SERVICES[category];
        for (const domain in services) {
            if (urlLower.includes(domain)) {
                return { name: services[domain], category: category, domain: domain };
            }
        }
    }
    return { name: 'Unknown', category: 'unknown', domain: null };
}

function isAdShortener(url) {
    const service = detectService70(url);
    return service.category === 'ad_shorteners' || service.category === 'special_resolvers';
}

function isPasteService(url) {
    const service = detectService70(url);
    return service.category === 'paste_services';
}

function detectShortener(url) {
    const urlLower = url.toLowerCase();
    for (const [domain, name] of Object.entries(SHORTENERS)) {
        if (urlLower.includes(domain)) {
            return {
                is_shortened: true,
                service: name,
                domain: domain,
                message: `Detected: ${name} URL shortener`
            };
        }
    }
    return {
        is_shortened: false,
        service: null,
        domain: null,
        message: 'Not a detected URL shortener'
    };
}

module.exports = {
    cleanUrl,
    detectService70,
    isAdShortener,
    isPasteService,
    detectShortener
};