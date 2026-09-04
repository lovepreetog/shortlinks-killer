import requests
import sys
import json

USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

def unshorten_universal(url):
    try:
        resp = requests.get(
            url,
            allow_redirects=True,
            timeout=15,
            headers={'User-Agent': USER_AGENT}
        )
        return {
            'destination': resp.url,
            'status_code': resp.status_code,
            'error': None
        }
    except Exception as e:
        return {'destination': None, 'status_code': None, 'error': str(e)}

if __name__ == '__main__':
    if len(sys.argv) > 1:
        url = sys.argv[1]
        result = unshorten_universal(url)
        print(json.dumps(result))