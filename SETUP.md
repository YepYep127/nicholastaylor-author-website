# Nicholas Taylor Website — Setup & Maintenance Guide

## Overview

Static HTML/CSS author website replacing Squarespace.
- **Hosting:** GitHub Pages (free)
- **Domain:** nicholastaylor.co (managed through GoDaddy)
- **Contact form:** Formspree (free — 50 submissions/month)
- **Newsletter:** Mailchimp embedded form

---

## One-Time Setup Steps

### 1. Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click **New repository** (top right "+")
3. Name: `nicholastaylor-website` (or similar)
4. Set to **Public**
5. Do NOT check "Add a README" — click **Create repository**

Then in Terminal, run these commands:
```bash
cd /Users/nicktaylor/Desktop/Website2026
git branch -m master main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/nicholastaylor-website.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. In your GitHub repo, go to **Settings → Pages**
2. Under "Source", select branch: `main`, folder: `/ (root)`
3. Click **Save**
4. Your site will be live at: `https://YOUR_GITHUB_USERNAME.github.io/nicholastaylor-website`

### 3. Connect Your GoDaddy Domain

**In GitHub Pages settings:**
1. Under "Custom domain", type `nicholastaylor.co` and click Save
2. Check "Enforce HTTPS" once it becomes available (may take a few hours)

**In GoDaddy DNS:**
1. Log in to GoDaddy → My Products → DNS for nicholastaylor.co
2. Delete any existing A records pointing to Squarespace
3. Add these 4 A records (Host: `@`, TTL: 600):
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
4. Add a CNAME record:
   - Host: `www`
   - Points to: `YOUR_GITHUB_USERNAME.github.io`
   - TTL: 600

DNS changes can take up to 24 hours to fully propagate.

---

### 4. Set Up Formspree (Contact Form)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Click **New Form**, name it "Contact"
3. Copy your Form ID (looks like: `xpzvgwkj`)
4. Open `contact.html` and replace `YOUR_FORM_ID`:
   ```
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   Change to:
   ```
   action="https://formspree.io/f/xpzvgwkj"
   ```
5. Push the change to GitHub (see "Making Updates" below)

Free tier: 50 submissions/month. Submissions go to your email.

---

### 5. Set Up Mailchimp Newsletter

1. Log in to Mailchimp
2. Go to **Audience → Signup forms → Embedded forms**
3. Copy the form `action` URL — it looks like:
   ```
   https://nicholastaylor.us1.list-manage.com/subscribe/post?u=XXXXX&id=XXXXX
   ```
4. In ALL of these files, replace `REPLACE_WITH_MAILCHIMP_ACTION_URL` with that URL:
   - `index.html`
   - `about.html`
   - `contact.html`
   - `blog/index.html`
   - `books/legon-series.html`
   - `books/contractor-series.html`
   - `books/service-term.html`
   - `books/techfly.html`
   - `books/invisible-defenders.html`
   - `books/essaerist-war.html`

   The easiest way: open Terminal and run:
   ```bash
   cd /Users/nicktaylor/Desktop/Website2026
   sed -i '' 's|REPLACE_WITH_MAILCHIMP_ACTION_URL|YOUR_ACTUAL_URL_HERE|g' $(find . -name "*.html")
   ```

---

## Making Updates (After Initial Setup)

Every time you change a file, push the update to GitHub:

```bash
cd /Users/nicktaylor/Desktop/Website2026

# Stage your changed files
git add index.html          # or whatever file(s) you changed
# OR stage everything:
git add -A

# Commit with a message
git commit -m "Update homepage hero book"

# Push to GitHub (site updates in ~1-2 minutes)
git push
```

---

## File Structure

```
Website2026/
├── index.html              ← Homepage
├── about.html              ← About page
├── contact.html            ← Contact form (Formspree)
├── css/
│   └── style.css           ← All styles
├── images/
│   ├── covers/             ← Book cover images
│   ├── author/             ← Author headshot
│   └── icons/              ← Retailer logos (Amazon, Apple, etc.)
├── books/
│   ├── legon-series.html
│   ├── contractor-series.html
│   ├── service-term.html
│   ├── techfly.html
│   ├── invisible-defenders.html
│   └── essaerist-war.html
└── blog/
    └── index.html          ← Blog listing (currently shelved from nav)
```

---

## Adding a New Book

1. Download the cover image into `images/covers/`
2. Add the book to the relevant series page in `books/`
3. Add it to the novels grid in `index.html`
4. Push to GitHub

## Enabling the Blog (If You Decide To)

The blog files are still there — just not linked in the nav. To re-add:
1. Open every HTML file
2. Find the nav `<ul>` and add back:
   ```html
   <li><a href="blog/index.html">Blog</a></li>
   ```
   (use `../blog/index.html` in the `books/` and `blog/` directories)

---

## Remaining Items

- [ ] Create GitHub account / repo and push site
- [ ] Enable GitHub Pages
- [ ] Update GoDaddy DNS to point to GitHub
- [ ] Create Formspree account — replace `YOUR_FORM_ID` in contact.html
- [ ] Get Mailchimp embed URL — replace `REPLACE_WITH_MAILCHIMP_ACTION_URL` in all files
- [ ] Update Essaerist War retailer links on `books/essaerist-war.html` (Apple, B&N, Google, Kobo, Smashwords currently have placeholder URLs)
