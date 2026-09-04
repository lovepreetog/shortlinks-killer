import subprocess
import sys
import os
import platform
import importlib.util

def print_header():
    os.system('cls' if platform.system() == 'Windows' else 'clear')
    
def check_dependencies():
    required = ['requests', 'bs4', 'whois']
    missing = []
    for pkg in required:
        if importlib.util.find_spec(pkg) is None:
            missing.append(pkg)
    if missing:
        print(f"Installing missing packages: {', '.join(missing)}")
        try:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
            print("Packages installed!\n")
        except Exception as e:
            print(f"Failed: {e}")
            return False
    return True

def check_nodejs():
    try:
        subprocess.run(['node', '--version'], capture_output=True, check=True)
        return True
    except:
        return False

def main():
    print_header()
    
    if not check_dependencies():
        print("Dependencies missing! run python -m pip install -r requirements.txt")
        sys.exit(1)
    
    if not check_nodejs():
        print("\nNode.js not found! Please install Node.js: https://nodejs.org/")
        sys.exit(1)
    
    
    try:
        subprocess.run(['node', 'main.js'], check=True)
    except KeyboardInterrupt:
        print("\n\nInterrupted. Goodbye!")
        sys.exit(0)
    except Exception as e:
        print(f"\nError: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()