import ssl
import socket
import sys
import json
from datetime import datetime, timezone
from urllib.parse import urlparse

def check_safety(url):
    ssl_info = {}
    domain_info = {}
    issues = []
    warnings = []
    
    try:
        parsed = urlparse(url)
        hostname = parsed.netloc or parsed.path.split('/')[0]
        if ':' in hostname:
            hostname = hostname.split(':')[0]
        
        context = ssl.create_default_context()
        with socket.create_connection((hostname, 443), timeout=5) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                cert = ssock.getpeercert()
                subject = dict(x[0] for x in cert['subject'])
                issuer = dict(x[0] for x in cert['issuer'])
                expiry = datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y %Z')
                days_left = (expiry - datetime.now()).days
                
                ssl_info = {
                    'valid': True,
                    'issued_to': subject.get('commonName', 'Unknown'),
                    'issued_by': issuer.get('commonName', 'Unknown'),
                    'expires_in': f'{days_left} days'
                }
                
                if days_left < 30:
                    warnings.append(f"SSL expires in {days_left} days")
    except:
        ssl_info = {'valid': False, 'issued_to': 'N/A', 'issued_by': 'N/A', 'expires_in': 'N/A'}
        issues.append("SSL certificate invalid")
    
    try:
        import whois
        domain = urlparse(url).netloc
        if domain.startswith('www.'):
            domain = domain[4:]
        w = whois.whois(domain)
        if w.creation_date:
            creation_date = w.creation_date[0] if isinstance(w.creation_date, list) else w.creation_date
            now = datetime.now(timezone.utc)
            if creation_date.tzinfo is None:
                creation_date = creation_date.replace(tzinfo=timezone.utc)
            age_days = (now - creation_date).days
            age_years = age_days / 365
            
            domain_info = {
                'domain': domain,
                'created': creation_date.strftime('%Y-%m-%d'),
                'age_days': age_days,
                'age_years': round(age_years, 1)
            }
            
            if age_days < 365:
                warnings.append(f"Domain is new ({age_days} days old)")
    except:
        domain_info = {'domain': 'N/A', 'created': 'N/A', 'age_days': 'N/A', 'age_years': 'N/A'}
        warnings.append("Could not determine domain age")
    
    suspicious = ['login', 'signin', 'verify', 'secure', 'banking', 'paypal', 'g00gle', 'faceb00k']
    for word in suspicious:
        if word in url.lower():
            warnings.append(f"Suspicious keyword: {word}")
    
    if len(issues) >= 2:
        risk = 'HIGH_RISK'
        status = 'HIGH RISK - URL may be dangerous'
    elif len(issues) >= 1:
        risk = 'MEDIUM_RISK'
        status = 'MEDIUM RISK - Some concerns detected'
    elif len(warnings) >= 2:
        risk = 'LOW_RISK'
        status = 'LOW RISK - Minor warnings only'
    else:
        risk = 'SAFE'
        status = 'SAFE - No issues detected'
    
    return {
        'risk_level': risk,
        'status': status,
        'ssl_info': ssl_info,
        'domain_info': domain_info,
        'issues': issues,
        'warnings': warnings
    }

if __name__ == '__main__':
    if len(sys.argv) > 1:
        url = sys.argv[1]
        result = check_safety(url)
        print(json.dumps(result))