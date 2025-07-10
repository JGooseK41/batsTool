# SSL Certificate Troubleshooting - Already Using Netlify DNS

Since you're already using Netlify DNS, let's diagnose why the certificate isn't provisioning.

## Quick Diagnostic Steps

### 1. Check Domain Connection in Netlify

Go to your site's dashboard:
1. **Site settings** → **Domain management**
2. Check if `batstool.com` shows:
   - ✅ "Netlify DNS" indicator
   - ❌ Any error messages
   - ⏳ "Awaiting External DNS" (shouldn't see this if using Netlify DNS)

### 2. Force Certificate Renewal

Try these steps in order:

**Option A: Renew Certificate Button**
1. Site settings → Domain management → HTTPS
2. Look for "Renew certificate" button
3. Click it and wait 10-15 minutes

**Option B: Remove and Re-add Domain**
1. Site settings → Domain management
2. Click "..." next to batstool.com → Remove domain
3. Wait 5 minutes
4. Add custom domain → batstool.com
5. Certificate should auto-provision

### 3. Check DNS Records in Netlify

Go to **Domains** (top nav) → **batstool.com** → Check records:

Should have:
```
batstool.com      A        75.2.60.5
www               CNAME    [your-site-name].netlify.app
```

If missing, add them manually.

### 4. Common Issues & Fixes

**Issue: "DNS verification failed"**
```bash
# Run this command to check DNS:
dig batstool.com A
dig _acme-challenge.batstool.com TXT

# Should return Netlify IPs
```

**Issue: Domain shows "Check DNS configuration"**
- Click "Check DNS configuration" button
- If it fails, there may be conflicting records

**Issue: Mixed DNS (some records elsewhere)**
- ALL DNS must be managed by Netlify
- Check for records at old DNS provider

### 5. Advanced Troubleshooting

**Check for Conflicting Records:**
1. In Netlify DNS settings for batstool.com
2. Look for:
   - Duplicate A records
   - Conflicting CNAME records
   - Old CAA records blocking Let's Encrypt

**CAA Record Fix:**
Add this record if needed:
```
Type: CAA
Name: @
Value: 0 issue "letsencrypt.org"
```

**Clear Potential Blocks:**
1. Remove any URL redirects temporarily
2. Ensure no .htaccess rules blocking /.well-known/
3. Check netlify.toml for restrictive headers

### 6. Nuclear Option - Full Reset

If nothing works:

1. **Remove from Site:**
   - Site settings → Remove custom domain

2. **Remove from Netlify DNS:**
   - Domains → batstool.com → Delete domain

3. **Re-add to Netlify DNS:**
   - Domains → Add domain → batstool.com
   - Let it auto-configure

4. **Re-connect to Site:**
   - Site settings → Add custom domain
   - Should work now

### 7. Contact Netlify Support

If still failing, open support ticket with:
- Site name: [your-site].netlify.app
- Custom domain: batstool.com
- Error message: "We could not provision a Let's Encrypt certificate"
- Confirmation you're using Netlify DNS

**Support Portal:** https://www.netlify.com/support/

**Include this info:**
```
Domain: batstool.com
DNS: Netlify DNS (confirmed)
Issue: Let's Encrypt provisioning fails
Site: [your netlify subdomain]
Time waiting: [hours/days since adding domain]
```

## Quick Command to Share with Support

Run this and include output:
```bash
echo "=== DNS Check ==="
dig batstool.com A
echo -e "\n=== Nameservers ==="
dig batstool.com NS
echo -e "\n=== CAA Records ==="
dig batstool.com CAA
echo -e "\n=== Certificate Check ==="
echo | openssl s_client -connect batstool.com:443 -servername batstool.com 2>/dev/null | openssl x509 -noout -subject -issuer 2>/dev/null || echo "No certificate found"
```

## Most Likely Fix

Since you're already on Netlify DNS, the issue is likely:
1. **Domain not fully connected to your site** - Remove and re-add
2. **Certificate provisioning stuck** - Use "Renew certificate" button
3. **DNS cache issue at Netlify** - Support can flush this

The fastest solution is usually removing the domain from your site (not from Netlify DNS) and re-adding it.