const https = require('https');
const http = require('http');
const { BYPASS_PATTERNS, PASTE_SELECTORS, USER_AGENT, BYPASS_BUTTONS } = require('./config');

function getPage(urlString) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(urlString);
        const protocol = parsedUrl.protocol === 'https:' ? https : http;
        
        const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
            path: parsedUrl.pathname + parsedUrl.search || '/',
            method: 'GET',
            headers: { 'User-Agent': USER_AGENT },
            timeout: 30000
        };
        
        const req = protocol.get(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: data,
                    finalUrl: res.responseUrl || urlString
                });
            });
        });
        
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Timeout'));
        });
        
        req.on('error', (err) => {
            reject(err);
        });
        
        req.end();
    });
}

function bypassShortlink(inputUrl) {
    return new Promise(async (resolve) => {
        try {
            const result = await getPage(inputUrl);
            const html = result.body;
            
            if (result.finalUrl !== inputUrl) {
                resolve({ success: true, final_url: result.finalUrl, method: 'redirect' });
                return;
            }
            
            for (const pattern of BYPASS_PATTERNS) {
                const match = html.match(pattern);
                if (match) {
                    resolve({ success: true, final_url: match[1], method: 'pattern_match' });
                    return;
                }
            }
            
            for (const selector of BYPASS_BUTTONS) {
                const cleanSelector = selector.replace(/[#.]/g, '').replace(/\[.*?\]/g, '');
                const regex = new RegExp(`<[^>]*${cleanSelector}[^>]*>.*?href=["']([^"']+)["']`, 'i');
                const match = html.match(regex);
                if (match) {
                    const finalUrl = match[1];
                    if (!finalUrl.startsWith('#')) {
                        resolve({ success: true, final_url: finalUrl, method: 'button_selector' });
                        return;
                    }
                }
            }
            
            const continueMatch = html.match(/<a[^>]*href=["']([^"']+)["'][^>]*>.*?Continue with ads.*?<\/a>/i);
            if (continueMatch) {
                const finalUrl = continueMatch[1];
                if (!finalUrl.startsWith('#')) {
                    resolve({ success: true, final_url: finalUrl, method: 'continue_button' });
                    return;
                }
            }
            
            const anyHrefMatch = html.match(/<a[^>]*href=["']([^"']+)["'][^>]*>.*?(?:Continue|Verify|Skip|Next|Click|Unlock).*?<\/a>/i);
            if (anyHrefMatch) {
                const finalUrl = anyHrefMatch[1];
                if (!finalUrl.startsWith('#')) {
                    resolve({ success: true, final_url: finalUrl, method: 'button_href' });
                    return;
                }
            }
            
            resolve({ success: false, error: 'No bypass method found', final_url: inputUrl });
            
        } catch (error) {
            resolve({ success: false, error: error.message, final_url: inputUrl });
        }
    });
}

function extractPasteContent(inputUrl) {
    return new Promise(async (resolve) => {
        try {
            const result = await getPage(inputUrl);
            const html = result.body;
            const domain = new URL(inputUrl).hostname;
            
            if (domain in PASTE_SELECTORS) {
                const selector = PASTE_SELECTORS[domain];
                const regex = new RegExp(`<[^>]*${selector.replace('.', 'class="').replace('#', 'id="')}[^>]*>(.*?)<\\/[^>]*>`, 'is');
                const match = html.match(regex);
                if (match) {
                    const content = match[1].replace(/<[^>]*>/g, '').trim();
                    resolve({ success: true, content: content.substring(0, 500) + (content.length > 500 ? '...' : '') });
                    return;
                }
            }
            
            const preMatch = html.match(/<pre[^>]*>(.*?)<\/pre>/is);
            if (preMatch) {
                const content = preMatch[1].replace(/<[^>]*>/g, '').trim();
                resolve({ success: true, content: content.substring(0, 500) + (content.length > 500 ? '...' : '') });
                return;
            }
            
            resolve({ success: false, error: 'No content found' });
            
        } catch (error) {
            resolve({ success: false, error: error.message });
        }
    });
}

module.exports = { bypassShortlink, extractPasteContent };