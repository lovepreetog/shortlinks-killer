# ShortLink-Killer

URL Unshortener with Advanced Security Checks and Ad Bypass Capabilities

Python Version: 3.6+
Node.js Version: 14+
License: MIT
Telegram: @beasteren

---

Overview

ShortLink-Killer is a powerful URL unshortening tool designed to bypass the majority of shortlink services, ad walls, and paste services. It combines Node.js for intelligent pattern matching and DOM analysis with Python for robust HTTP handling and security verification. The tool provides comprehensive security analysis including SSL validation, domain age checking, and threat detection for every expanded URL.

---

Features

URL Unshortening
- Expands shortened URLs from over 60 services
- Follows HTTP redirect chains automatically
- Handles nested shortlinks within shortlinks
- Recovers original destination URLs

Ad Bypass System
- Bypasses 40+ ad shortener services including Linkvertise, AdFly, Shorte.st, and more
- Smart pattern matching for JavaScript redirects
- DOM button detection for Continue, Skip, Verify, and Next buttons
- Extracts hidden destination URLs from obfuscated code

Security Analysis
- SSL certificate validation and expiry checking
- Domain WHOIS lookup with creation date and age analysis
- Risk level classification (SAFE, LOW_RISK, MEDIUM_RISK, HIGH_RISK)
- Suspicious keyword detection for phishing attempts
- Domain age warnings for newly created domains

Paste Service Extraction
- Extracts content from over 50 paste services
- Supports Pastebin, Rentry, Justpaste.it, ControlC, Telegraph, and more
- Auto-detects and displays content preview
- Handles various paste formats and structures

Domain Intelligence
- Retrieves domain creation date
- Calculates domain age in years and days
- Shows SSL issuer information
- Displays SSL certificate expiry status

---

Supported Services

URL Shorteners

bit.ly, tinyurl.com, ow.ly, is.gd, rebrand.ly, short.link, goo.gl, t.co, lnkd.in, rb.gy, v.gd, cutt.ly, urlzs.com, shorte.st, adf.ly, bc.vc

Ad Shorteners (Bypassable)

Linkvertise (linkvertise.com, linkvertise.download, link-center.net, link-target.net, link-hub.net, link-to.net, direct-link.net, file-link.net)
Cutty (cuty.io, cuttty.com)
ShrinkMe (shrinkme.click)
Sub2Get (sub2get.com)
Sub2Unlock (sub2unlock.me, sub2unlock.com, sub2unlock.net)
Lootlinks (loot-links.com, loot-link.com, lootlinks.co, lootlink.org, lootdest.org, linksloot.net, links-loot.com, lootdest.com, links.lootlabs.gg)
AdFoc.us (adfoc.us)
Boost.ink (boost.ink, bst.gg, bst.wtf, booo.st)
BoostFusedGT (boost.fusedgt.com)
LetsBoost (letsboost.net)
mboost.me (mboost.me)
Rekonise (rekonise.com, rkns.link)
Shorte.st (sh.st, gestyy.com, destyy.com)
egirls.wtf
leasurepartment.xyz
GPLinks (gplinks.co)
Just2Earn (just2earn.com)
Exe.io (exe.io)

Paste Services

Pastebin (pastebin.com)
PasteLua (pastelua.com)
Pastelink (pastelink.net)
Pastesite (pastesite.net)
Rentry (rentry.org, rentry.co)
JustpasteIt (jpst.it)
EcoDevs (gopaste.link, getpaste.link, notecanyon.com, pastehill.com, spacebin.in, pastecanyon.com, freepaste.link, justetext.com, pastetoday.com, pastemega.com, expaste.com, pastemake.online, pastezone.site, pastemode.com, paskyk.com, mypastelink.com)
ControlC (controlc.com)
PasteWorkInk (paste.work.ink)
PrivateBin (paste.to)
PasterSo (paster.so)
Hastebin (hastebin.skyra.pw, hastebin.de)
PasteDrop (paste-drop.com)
Leakutopia (leakutopia.click)
LeaksLinks (leakslinks.com)
Goldpaster (goldpaster.pro)
Pasteso (pasteso.com)
LinkDirect (link-direct.xyz, link-direct.pro)
n0paste (n0paste.eu)
PasteFlash (pasteflash.com)
Pasteva (pasteva.com)
Leaked.tools (leaked.tools)
Telegraph (telegra.ph)
Vaultlinks (vaultlinks.xyz)

Special Resolvers

bestnsfw.site
directlinker.com
pasterlink.com
up-to-down.net
SubFinal (subfinal.com, subtolink.com)
LocationRedirect (justpaster.lol)

---

Installation

Prerequisites

Node.js v14 or higher
Python 3.6 or higher
pip (Python package manager)

Quick Setup

git clone https://github.com/yourusername/ShortLink-Killer.git
cd ShortLink-Killer
pip install -r requirements.txt
python start.py

Manual Installation

npm install
pip install requests beautifulsoup4 python-whois
python start.py

---

Usage

Interactive Mode

python start.py

This tool can bypass mostly shortlinks
coded by: @beasteren on Telegram

press Enter to quit!

Enter shortlink: https://bit.ly/3XyZabc

Processing: https://bit.ly/3XyZabc
--------------------------------------------------
Found! Bitly
Ads bypassed! redirect
Safety check done!
SSL license: VALID | Issued to: example.com | Issued by: Let's Encrypt | Expires in: 89 days
Domain info: example.com | Created: 2020-01-01 | Age: 3.5 years (1278 days)

Final URL: https://example.com/destination
Status: SAFE - No issues detected
--------------------------------------------------
Project coded by: Telegram: @beasteren

Example Workflows

Unshorten a Simple Link
Input: https://tinyurl.com/example
Output: https://original-site.com/page

Bypass an Ad Shortener
Input: https://linkvertise.com/12345
Output: https://destination.com/file
Method: button_selector

Extract Paste Content
Input: https://pastebin.com/abc123
Output: [Content Preview] Lorem ipsum dolor sit amet...

Security Analysis
Input: https://suspicious-link.com
Output: HIGH_RISK - Multiple security concerns detected
        SSL certificate invalid
        Domain is new (2 days old)
        Suspicious keyword: login

---

Risk Level Classification

SAFE
No issues detected
Criteria: Valid SSL, domain age > 1 year, no suspicious keywords

LOW_RISK
Minor warnings only
Criteria: Minor SSL concerns or domain age warnings

MEDIUM_RISK
Some concerns detected
Criteria: SSL issues or multiple warnings

HIGH_RISK
URL may be dangerous
Criteria: Multiple SSL issues + suspicious keywords + new domain

Security Features

SSL Verification
- Validates SSL certificate chain
- Checks certificate expiry date
- Identifies certificate issuer
- Warns about expiring certificates (less than 30 days)

Domain Age Analysis
- Retrieves domain creation date via WHOIS
- Calculates domain age in years and days
- Flags domains younger than 1 year as potentially suspicious

Threat Detection
- Scans for suspicious keywords: login, signin, verify, secure, banking, paypal
- Detects typosquatting attempts (g00gle, faceb00k)
- Flags multiple red flags as HIGH_RISK

---

Architecture

main.js (Node.js)
- User input handling
- Service detection
- Orchestration
- Interacts with bypass.js

bypass.js (Node.js)
- Pattern matching
- DOM analysis
- Ad bypass
- Paste extraction

config.js (Node.js)
- Service lists
- Patterns
- Button selectors

utils.js (Node.js)
- Helper functions
- URL cleaning
- Service detection

main.py (Python)
- HTTP requests
- Redirect following

security.py (Python)
- SSL certificate checking
- WHOIS lookup
- Risk assessment

start.py (Python)
- Dependency checking
- Node.js verification
- Application launcher

---

Configuration

config.js - Service Definitions

Add new shorteners:

const SHORTENERS = {
    'newshort.link': 'NewShortener'
};

Add new ad shorteners:

const BYPASS_SERVICES = {
    ad_shorteners: {
        'newsite.com': 'NewAdService'
    }
};

Custom User Agent:

const USER_AGENT = 'Mozilla/5.0 (Custom) ...';

Timeout Configuration:

const options = {
    timeout: 30000
};

---

Contributing

Contributions are always welcome. Here is how you can help:

1. Report bugs by opening an issue with detailed steps to reproduce
2. Suggest new features or services to support
3. Add support for more URL shorteners or paste services
4. Improve documentation
5. Submit pull requests for bug fixes, features, or optimizations

Development Setup

git clone https://github.com/yourusername/ShortLink-Killer.git
cd ShortLink-Killer
pip install -r requirements.txt
npm install

---

License

This project is licensed under the MIT License.

MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

Connect

Telegram: @beasteren
GitHub Issues: Report a Problem

---

Acknowledgments

Built for developers who want to save time manually expanding shortlinks
Thanks to the open-source community
Inspired by the countless times we have all needed to bypass ad walls

---

Support the Project

If this tool saves you time or makes your work easier:

Star the repository on GitHub
Fork the repository and share it
Report issues and suggest features
Share it with your team and colleagues
Contribute code or documentation
