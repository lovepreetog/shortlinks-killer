[![Python Version](https://img.shields.io/badge/python-3.6+-blue.svg)](https://python.org)
[![Node.js Version](https://img.shields.io/badge/node-14+-green.svg)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Telegram](https://img.shields.io/badge/Telegram-@beasteren-blue)](https://t.me/beasteren)

# ShortLinks-Killer

URL Unshortener with Advanced Security Checks and Ad Bypass Capabilities

Python Version: 3.6+
Node.js Version: 14+
License: MIT
Telegram: @beasteren

---

## Overview

ShortLink-Killer is a powerful URL unshortening tool designed to bypass the majority of shortlink services, ad walls, and paste services. It combines Node.js for intelligent pattern matching and DOM analysis with Python for robust HTTP handling and security verification. The tool provides comprehensive security analysis including SSL validation, domain age checking, and threat detection for every expanded URL.

---

## Features

### URL Unshortening
- Expands shortened URLs from over 60 services
- Follows HTTPS/HTTP redirect chains automatically
- Handles nested shortlinks within shortlinks
- Recovers original destination URLs

### Ad Bypass System
- Bypasses 40+ ad shortener services including Linkvertise, AdFly, Shorte.st, and more
- Smart pattern matching for JavaScript redirects
- DOM button detection for Continue, Skip, Verify, and Next buttons
- Extracts hidden destination URLs from obfuscated code

### Security Analysis
- SSL certificate validation and expiry checking
- Domain WHOIS lookup with creation date and age analysis
- Risk level classification (SAFE, LOW_RISK, MEDIUM_RISK, HIGH_RISK)
- Suspicious keyword detection for phishing attempts
- Domain age warnings for newly created domains

### Paste Service Extraction
- Extracts content from over 50 paste services
- Supports Pastebin, Rentry, Justpaste.it, ControlC, Telegraph, and more
- Auto-detects and displays content preview
- Handles various paste formats and structures

### Domain Intelligence
- Retrieves domain creation date
- Calculates domain age in years and days
- Shows SSL issuer information
- Displays SSL certificate expiry status

---

## Installation

### Prerequisites

- Node.js v14 or higher
- Python 3.6 or higher
- pip (Python package manager)

### Quick Setup

```bash
git clone https://github.com/yourusername/ShortLink-Killer.git
cd ShortLinks-Killer
pip install -r requirements.txt
python start.py
