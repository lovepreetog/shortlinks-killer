
const readline = require('readline');
const { spawn } = require('child_process');
const { cleanUrl, detectService70, isAdShortener, isPasteService } = require('./utils');
const { bypassShortlink, extractPasteContent } = require('./bypass');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
}

async function callPython(url) {
    return new Promise((resolve) => {
        const python = spawn('python3', ['main.py', url]);
        let output = '';
        let error = '';
        python.stdout.on('data', (data) => { output += data.toString(); });
        python.stderr.on('data', (data) => { error += data.toString(); });
        python.on('close', (code) => {
            if (code === 0) {
                try { resolve(JSON.parse(output)); }
                catch (e) { resolve({ error: 'Invalid response from Python' }); }
            } else {
                resolve({ error: error || 'Python script failed' });
            }
        });
    });
}

async function callPythonSecurity(url) {
    return new Promise((resolve) => {
        const python = spawn('python3', ['security.py', url]);
        let output = '';
        let error = '';
        python.stdout.on('data', (data) => { output += data.toString(); });
        python.stderr.on('data', (data) => { error += data.toString(); });
        python.on('close', (code) => {
            if (code === 0) {
                try { resolve(JSON.parse(output)); }
                catch (e) { resolve({ error: 'Invalid response from Python' }); }
            } else {
                resolve({ error: error || 'Python security check failed' });
            }
        });
    });
}

async function main() {
    console.log('This tool can bypass mostly shortlinks | coded by: telegram: @beasteren');
    console.log('\npress Enter to quit!\n');
    
    while (true) {
        const short = await question('Enter shortlink: ');
        
        if (['exit', 'quit', ''].includes(short.trim().toLowerCase())) {
            console.log('\nGoodbye!');
            rl.close();
            break;
        }
        
        const url = cleanUrl(short.trim());
        
        console.log(`\nProcessing: ${url}`);
        console.log('-'.repeat(50));
        
        const service = detectService70(url);
        if (service.name !== 'Unknown') {
            console.log(`Found! ${service.name}`);
        }
        
        const result = await callPython(url);
        if (result.error) {
            console.log(`Error: ${result.error}`);
            continue;
        }
        
        let finalUrl = result.destination;
        
        if (isAdShortener(url)) {
            const bypass = await bypassShortlink(url);
            if (bypass.success) {
                console.log(`Ads bypassed! ${bypass.method}`);
                finalUrl = bypass.final_url;
            }
        }
        
        if (isPasteService(url)) {
            const paste = await extractPasteContent(url);
            if (paste.success) {
                console.log(`Paste extraction: ${paste.content}`);
            }
        }
        
        const safety = await callPythonSecurity(finalUrl);
        if (safety.error) {
            console.log(`Safety check error: ${safety.error}`);
            continue;
        }
        
        console.log('Safety check done!');
        
        const ssl = safety.ssl_info;
        if (ssl.valid) {
            console.log(`SSL license: VALID | Issued to: ${ssl.issued_to} | Issued by: ${ssl.issued_by} | Expires in: ${ssl.expires_in}`);
        } else {
            console.log('SSL license: INVALID');
        }
        
        const domain = safety.domain_info;
        if (domain.created !== 'N/A') {
            console.log(`Domain info: ${domain.domain} | Created: ${domain.created} | Age: ${domain.age_years} years (${domain.age_days} days)`);
        } else {
            console.log('Domain info: Could not retrieve');
        }
        
        console.log();
        console.log(`Final URL: ${finalUrl}`);
        console.log(`Status: ${safety.status}`);
        
        if (safety.issues && safety.issues.length > 0) {
            for (const issue of safety.issues) {
                console.log(`  ❌ ${issue}`);
            }
        }
        if (safety.warnings && safety.warnings.length > 0) {
            for (const warning of safety.warnings) {
                console.log(`  ⚠️ ${warning}`);
            }
        }
        
        console.log();
       
        console.log('Project coded by: Telegram: @beasteren');
        
        console.log();
    }
}

main().catch(console.error);