# 🔗 ShortLink-Killer

[![Python Version](https://img.shields.io/badge/python-3.6+-blue.svg)](https://python.org)
[![Node.js Version](https://img.shields.io/badge/node-14+-green.svg)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Telegram](https://img.shields.io/badge/Telegram-@beasteren-blue)](https://t.me/beasteren)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/yourusername/ShortLink-Killer/graphs/commit-activity)

> **URL unshortener with security checks and ad bypass capabilities** — Expand shortened URLs, bypass ad walls, and analyze link safety in one powerful tool!

## 📌 Quick Navigation
- [✨ Features](#-features)
- [🎯 Supported Services](#-supported-services)
- [📦 Installation](#-installation)
- [🚀 Usage](#-usage)
- [🛡️ Security Features](#️-security-features)
- [📊 How It Works](#-how-it-works)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [📞 Connect](#-connect)

---

## ✨ Features

### 🔗 URL Unshortening
- Expand shortened URLs from **60+** services
- Follows HTTP redirects automatically
- Handles nested shortlinks (shortlink within shortlink)

### 🛡️ Security Checks
- **SSL Certificate Validation** — Verify certificate validity and expiry
- **Domain Intelligence** — Get creation date, age analysis, and WHOIS information
- **Risk Assessment** — Categorizes URLs as SAFE, LOW_RISK, MEDIUM_RISK, or HIGH_RISK
- **Suspicious Keyword Detection** — Flags potentially malicious URLs

### 🚫 Ad Bypass
- **Smart Pattern Matching** — Extracts destination URLs from JavaScript redirects
- **DOM Analysis** — Finds and follows "Continue", "Skip", "Verify" buttons
- **Supports 40+ ad shorteners** including Linkvertise, AdFly, Shorte.st, and more

### 📋 Paste Service Extraction
- Extract content from **50+ paste services**
- Supports Pastebin, Rentry, Justpaste.it, ControlC, Telegraph, and more
- Auto-detects content and displays preview

### 🔍 Domain Intelligence
- Domain creation date and age (in years and days)
- SSL issuer information and expiry status
- Warning system for potential security threats

---

## 🎯 Supported Services

### URL Shorteners (60+)
| Service | Type | Service | Type |
|---------|------|---------|------|
| bit.ly | Shortener | tinyurl.com | Shortener |
| ow.ly | Shortener | is.gd | Shortener |
| rebrand.ly | Shortener | short.link | Shortener |
| t.co | Shortener | cutt.ly | Shortener |
| adf.ly | Ad Shortener | lnkd.in | Shortener |
| goo.gl | Shortener | buff.ly | Shortener |

### Ad Shorteners (Bypassable)
| Service | Service | Service |
|---------|---------|---------|
| Linkvertise | Cutty | ShrinkMe |
| Sub2Get | Sub2Unlock | Lootlinks |
| AdFoc.us | Boost.ink | GPLinks |
| Exe.io | Shorte.st | Rekonise |

### Paste Services (50+)
| Service | Service | Service |
|---------|---------|---------|
| Pastebin | Rentry | Justpaste.it |
| Pastelink | ControlC | Telegraph |
| Pastelua | Pastesite | EcoDevs Services |
| PrivateBin | Hastebin | PasteDrop |

*And many more! The tool automatically detects and processes supported services.*

---

## 📦 Installation

### Prerequisites
- **Node.js** (v14 or higher) — [Download](https://nodejs.org/)
- **Python 3.6+** — [Download](https://python.org/)
- **pip** — Python package manager

### Quick Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/ShortLink-Killer.git
cd ShortLink-Killer

# Install Python dependencies
pip install -r requirements.txt

# Start the tool
python start.py
