# SSL Certificate Provisioning Troubleshooting Guide

## Common Causes of Let's Encrypt Certificate Provisioning Failure

### 1. DNS Configuration Issues

**Check DNS Records:**
```bash
# Check A record
dig batstool.com A

# Check CNAME record (if using www)
dig www.batstool.com CNAME

# Check all DNS records
dig batstool.com ANY
```

**Required DNS Configuration:**
- A record pointing to Netlify's load balancer IP
- OR CNAME record pointing to your Netlify subdomain
- DNS propagation can take up to 48 hours

### 2. CAA Records Blocking Let's Encrypt

**Check for CAA records:**
```bash
dig batstool.com CAA
```

If CAA records exist, ensure they include:
```
batstool.com. 300 IN CAA 0 issue "letsencrypt.org"
```

### 3. Domain Verification Issues

**Netlify needs to verify domain ownership via:**
- HTTP-01 challenge (most common)
- DNS-01 challenge

**Common blockers:**
- Firewall blocking Netlify's verification
- Previous HTTPS redirects interfering
- Domain registrar security features

## Step-by-Step Resolution

### Step 1: Remove and Re-add Domain
1. Go to Netlify Dashboard > Domain Settings
2. Remove batstool.com
3. Wait 5 minutes
4. Re-add the domain
5. Wait for automatic provisioning

### Step 2: Check DNS Configuration
1. Verify your DNS provider settings
2. Ensure records point to Netlify:
   - Option A: A record → 75.2.60.5
   - Option B: CNAME → [your-site].netlify.app

### Step 3: Manual Certificate Request
If automatic provisioning fails:
1. Click "Verify DNS configuration" in Netlify
2. If DNS is correct, click "Provision certificate"
3. Monitor the certificate status

### Step 4: Check Domain Registrar
Some registrars have security features that block:
- Domain verification requests
- Certificate provisioning
- DNS changes

**Common registrar issues:**
- GoDaddy: Domain privacy/proxy settings
- Namecheap: WhoisGuard interference
- Cloudflare: Proxy settings (must be DNS only)

### Step 5: Use Netlify DNS (Recommended)
1. Go to Domains > Add or register domain
2. Select "Add domain" and enter batstool.com
3. Follow instructions to update nameservers at registrar
4. Benefits:
   - Automatic SSL provisioning
   - Faster DNS propagation
   - Better integration with Netlify

## Alternative Solutions

### Option 1: Use Netlify Subdomain
While fixing custom domain:
```
https://[your-site-name].netlify.app
```

### Option 2: External SSL Certificate
1. Obtain certificate from another provider
2. Upload to Netlify (Business plan required)

### Option 3: Cloudflare SSL
1. Add site to Cloudflare (free tier)
2. Use Cloudflare's SSL certificate
3. Set SSL mode to "Full" or "Full (strict)"
4. Point Cloudflare to Netlify

## Verification Commands

**Test HTTPS after provisioning:**
```bash
# Check certificate
openssl s_client -connect batstool.com:443 -servername batstool.com

# Check SSL status
curl -I https://batstool.com

# Check certificate details
echo | openssl s_client -connect batstool.com:443 2>/dev/null | openssl x509 -noout -dates
```

## Quick Checklist

- [ ] DNS records correctly configured
- [ ] No conflicting CAA records
- [ ] Domain fully propagated (24-48 hours)
- [ ] No domain registrar blocks
- [ ] Netlify can access domain for verification
- [ ] No existing SSL redirects interfering
- [ ] Domain not on Netlify's blocked list

## Support Resources

1. **Netlify Support:**
   - Dashboard > Help > Contact Support
   - Include domain name and error message

2. **Netlify Community:**
   - https://community.netlify.com

3. **Status Page:**
   - https://www.netlifystatus.com

## Most Likely Solution

Based on the error message, the most common fix is:

1. **Wait 24-48 hours** for DNS to fully propagate
2. **Remove and re-add domain** in Netlify settings
3. **Consider using Netlify DNS** for automatic configuration

The "could not provision" error often resolves itself once DNS is fully propagated and Netlify can properly verify domain ownership.