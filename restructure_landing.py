#!/usr/bin/env python3
import re

# Read the file
with open('index.html', 'r') as f:
    content = f.read()

# Find and extract the welcomeScreen content (lines ~1272-1387)
welcome_pattern = r'(\s*<div id="welcomeScreen"[^>]*>.*?</div>\s*\n\s*<!-- BATS Info Tab -->)'
match = re.search(welcome_pattern, content, re.DOTALL)

if match:
    welcome_content = match.group(1)
    # Clean up the welcome content - remove the tab-related styling
    welcome_content = welcome_content.replace('id="welcomeScreen"', 'id="landingContent"')
    welcome_content = welcome_content.replace('style="display: none; padding: 0; background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%); min-height: 100vh; overflow-y: auto; height: 100vh; position: relative;"', '')
    
    # Remove welcome screen from its current location
    content = re.sub(welcome_pattern, '\n                <!-- BATS Info Tab -->', content, flags=re.DOTALL)
    
    # Insert into landingPageContainer
    landing_container_pattern = r'(<div id="landingPageContainer"[^>]*>)\s*(<!-- Landing page content will be moved here -->)'
    replacement = r'\1\n' + welcome_content.strip() + '\n'
    content = re.sub(landing_container_pattern, replacement, content)
    
    # Write back
    with open('index.html', 'w') as f:
        f.write(content)
    
    print("Successfully restructured landing page")
else:
    print("Could not find welcomeScreen content")
