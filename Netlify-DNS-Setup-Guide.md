# Switching to Netlify DNS - Step by Step Guide

## Why Switch to Netlify DNS?
- Automatic SSL certificate provisioning
- Faster DNS propagation
- Better integration with Netlify features
- Simplified domain management

## Step 1: Add Domain to Netlify DNS

1. **Go to Netlify Dashboard**
   - Navigate to: https://app.netlify.com
   - Click on "Domains" in the top navigation

2. **Add Your Domain**
   - Click "Add or register domain"
   - Enter: `batstool.com`
   - Click "Verify"
   - Click "Add domain"

3. **Get Your Nameservers**
   - Netlify will show you 4 nameservers like:
     ```
     dns1.p01.nsone.net
     dns2.p01.nsone.net
     dns3.p01.nsone.net
     dns4.p01.nsone.net
     ```
   - **IMPORTANT**: Copy these exact nameservers - yours may be different

## Step 2: Update Nameservers at Your Domain Registrar

### GoDaddy
1. Log in to GoDaddy.com
2. Go to "My Products" > Domains
3. Click "DNS" next to batstool.com
4. Click "Change Nameservers"
5. Choose "Custom Nameservers"
6. Delete existing nameservers
7. Add all 4 Netlify nameservers
8. Save changes

### Namecheap
1. Log in to Namecheap.com
2. Go to "Domain List"
3. Click "Manage" next to batstool.com
4. Find "Nameservers" section
5. Select "Custom DNS"
6. Add all 4 Netlify nameservers
7. Click the checkmark to save

### Google Domains
1. Log in to domains.google.com
2. Click on batstool.com
3. Click "DNS" in the left menu
4. Click "Custom name servers"
5. Add all 4 Netlify nameservers
6. Click "Save"

### Other Registrars
1. Look for: DNS Settings, Nameservers, or DNS Management
2. Choose: Custom/External Nameservers
3. Replace existing with Netlify's 4 nameservers
4. Save changes

## Step 3: Configure DNS Records in Netlify

1. **Return to Netlify Dashboard**
   - Go to Domains > batstool.com
   - Click "Add domain settings"

2. **Netlify Will Auto-Create Records**
   - A record: Points batstool.com to your site
   - CNAME record: Points www.batstool.com to your site

3. **Verify Records** (should see):
   ```
   batstool.com      A        75.2.60.5
   www.batstool.com  CNAME    batstool.netlify.app
   ```

## Step 4: Connect Domain to Your Site

1. **Go to Your Site Settings**
   - Navigate to your site in Netlify
   - Go to "Domain settings"

2. **Add Custom Domain**
   - Click "Add custom domain"
   - Enter: `batstool.com`
   - Click "Verify"
   - Netlify will detect you're using Netlify DNS

3. **Set as Primary Domain**
   - Click "Options" dropdown next to batstool.com
   - Select "Set as primary domain"

## Step 5: Wait for Propagation

### Timeline:
- **DNS Propagation**: 1-48 hours (usually 2-4 hours)
- **SSL Certificate**: Automatic after DNS propagates
- **Full functionality**: Within 24 hours

### Check Progress:
```bash
# Check DNS propagation
dig batstool.com NS

# Should return Netlify nameservers:
# dns1.p01.nsone.net
# dns2.p01.nsone.net
# dns3.p01.nsone.net
# dns4.p01.nsone.net
```

### Monitor in Netlify:
- Go to Site settings > Domain management
- Look for green checkmarks
- SSL certificate will show "Provisioning" then "Active"

## Step 6: Verify SSL Certificate

Once propagated, Netlify will automatically:
1. Provision Let's Encrypt certificate
2. Enable HTTPS
3. Set up auto-renewal

Check status:
- Site settings > Domain management > HTTPS
- Should show: "Your site has HTTPS enabled"

## Troubleshooting

### "DNS verification failed"
- Wait longer for propagation
- Verify nameservers are exactly as provided
- Check no old DNS records at registrar

### "Domain already exists"
- Domain may be connected to another Netlify account
- Contact Netlify support

### Still showing old website
- Clear browser cache
- Try incognito/private mode
- DNS may still be propagating

## Benefits After Switch

1. **Automatic SSL renewal**
2. **Faster DNS updates**
3. **Branch deploys with subdomains**
4. **DDoS protection**
5. **Global CDN optimization**

## Important Notes

- **Email**: If you use email with this domain, note your MX records first
- **Subdomains**: Any existing subdomains need to be recreated in Netlify
- **Downtime**: Minimal if any, but plan for 1-2 hours potential
- **Reverting**: You can always switch back to original nameservers

## Quick Reference

1. Add domain to Netlify DNS → Get 4 nameservers
2. Update nameservers at domain registrar
3. Wait for propagation (2-48 hours)
4. Connect domain to your Netlify site
5. SSL certificate provisions automatically
6. Done! 🎉

## Support

If issues persist after 48 hours:
- Netlify Support: https://www.netlify.com/support/
- Community: https://community.netlify.com/