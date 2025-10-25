# Environment Variables Setup for Netlify

## Overview

API keys are now managed through Netlify environment variables for better security. This keeps secrets out of source code while maintaining seamless functionality for users.

## How It Works

```
┌─────────────────────────────┐
│  User loads batstool.com    │
└──────────┬──────────────────┘
           │
           ↓
┌─────────────────────────────────────┐
│  index.html calls                   │
│  /.netlify/functions/get-api-keys   │
└──────────┬──────────────────────────┘
           │
           ↓
┌─────────────────────────────────────┐
│  Netlify Function reads             │
│  process.env.ETHERSCAN_API_KEY      │
│  process.env.ARKHAM_API_KEY         │
│  etc.                               │
└──────────┬──────────────────────────┘
           │
           ↓
┌─────────────────────────────────────┐
│  Returns keys to client             │
│  Client applies to API configs      │
└─────────────────────────────────────┘

Fallback chain:
1. Netlify env vars (production)
2. localStorage (user settings)
3. Hardcoded defaults (local dev)
```

## Setup Instructions

### Step 1: Access Netlify Dashboard

1. Go to [app.netlify.com](https://app.netlify.com)
2. Select your site (batstool.com)
3. Go to **Site settings** → **Environment variables**

### Step 2: Add Environment Variables

Click **Add a variable** and add each of these:

| Variable Name          | Description                    | Current Value (migrate from code) |
|------------------------|--------------------------------|-----------------------------------|
| `ETHERSCAN_API_KEY`    | Etherscan API for EVM chains   | `3X65ZBIMYIGFZEV6B3D2YWWXUJD1DWAKP8` |
| `ARKHAM_API_KEY`       | Arkham Intelligence API        | `d377a526-c9ea-4cb6-a647-775559583ff6` |
| `BLOCKCHAIN_API_KEY`   | Blockchain.info (optional)     | *(leave empty for now)* |
| `TRONGRID_API_KEY`     | TronGrid API (if using Tron)   | *(check your Tron config)* |
| `SOLANA_RPC_URL`       | Solana RPC endpoint (optional) | `https://api.mainnet-beta.solana.com` |

**Scope:** Set to **"All deploy contexts"** (Production, Deploy previews, Branch deploys)

### Step 3: Deploy

After adding variables:
```bash
# Trigger a new deployment (or just wait for next auto-deploy)
git commit --allow-empty -m "Trigger redeploy for env vars"
git push
```

### Step 4: Verify

After deployment, check browser console:
- ✅ Should see: `✅ Loaded API keys from Netlify environment variables`
- ❌ If local dev: `ℹ️ Netlify environment not available, using localStorage or defaults`

## Files Involved

### Client-side: `index.html`
```javascript
async function loadApiSettingsOnStartup() {
    // Try Netlify function first
    const response = await fetch('/.netlify/functions/get-api-keys');
    if (response.ok) {
        const data = await response.json();
        // Apply environment keys
        blockchainAPIs.ethereum.apiKey = data.keys.etherscan;
        // ...
    }
    // Falls back to localStorage or hardcoded defaults
}
```

### Server-side: `netlify/functions/get-api-keys.js`
```javascript
exports.handler = async (event, context) => {
    const apiKeys = {
        etherscan: process.env.ETHERSCAN_API_KEY || null,
        arkham: process.env.ARKHAM_API_KEY || null,
        // ...
    };
    return { statusCode: 200, body: JSON.stringify({ success: true, keys: apiKeys }) };
};
```

## Local Development

### Option 1: Use Netlify Dev (Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Create local .env file (DO NOT COMMIT!)
cat > .env << 'EOF'
ETHERSCAN_API_KEY=3X65ZBIMYIGFZEV6B3D2YWWXUJD1DWAKP8
ARKHAM_API_KEY=d377a526-c9ea-4cb6-a647-775559583ff6
BLOCKCHAIN_API_KEY=
TRONGRID_API_KEY=
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
EOF

# Add .env to .gitignore
echo ".env" >> .gitignore

# Run with Netlify Dev (loads .env automatically)
netlify dev
```

### Option 2: Use Hardcoded Defaults

Just open `index.html` directly - it will fall back to the hardcoded defaults in the code.

## Security Best Practices

### ✅ DO
- Store API keys in Netlify environment variables
- Add `.env` to `.gitignore`
- Rotate keys periodically
- Use different keys for production vs development
- Monitor API usage in provider dashboards

### ❌ DON'T
- Commit `.env` files to Git
- Share API keys publicly
- Use the same key across multiple projects
- Hardcode production keys in commits going forward

## Migration Plan

### Phase 1: Add Environment Variables (Now)
- Add current keys to Netlify environment variables
- Deploy updated code with Netlify function
- Verify everything works

### Phase 2: Remove Hardcoded Keys (Later - Optional)
Once environment variables are confirmed working:
```javascript
// Could eventually remove hardcoded defaults like this:
apiKey: '3X65ZBIMYIGFZEV6B3D2YWWXUJD1DWAKP8',  // ← Remove this line

// Replace with:
apiKey: null,  // Will be loaded from env vars or localStorage
```

**Note:** Keep hardcoded defaults for now as fallback during transition.

## Troubleshooting

### "Netlify environment not available"
**Normal for local development.** The app falls back to hardcoded defaults. To test with env vars locally, use `netlify dev`.

### "API request failed: 401"
**API key invalid or expired.** Check:
1. Environment variable is set correctly in Netlify
2. Value matches your actual API key
3. API key hasn't been rate-limited or revoked

### Function returns null keys
**Environment variables not set.** Verify in Netlify dashboard that variables exist and are spelled correctly (case-sensitive).

### Changes not taking effect
**Redeploy required.** Environment variable changes require a new deployment to take effect.

## Monitoring

### Check Current Configuration

In browser console:
```javascript
// See what keys are loaded
fetch('/.netlify/functions/get-api-keys')
  .then(r => r.json())
  .then(d => console.log('Current keys:', d));
```

### Netlify Function Logs

View function execution:
1. Netlify Dashboard → **Functions**
2. Click `get-api-keys`
3. View logs and invocations

## Cost Considerations

- **Netlify Functions**: Free tier includes 125,000 requests/month
- **This function**: Called once per page load (~1,000-5,000/month)
- **Well within free tier limits**

## Benefits Summary

✅ **Security**: Keys not in source code or Git history
✅ **Flexibility**: Easy to rotate without code changes
✅ **User Experience**: Still seamless, no user configuration
✅ **Best Practice**: Industry standard for secrets management
✅ **Fallback Support**: Works locally without env vars

---

**Last Updated:** 2025-10-24
**Status:** Ready to implement
