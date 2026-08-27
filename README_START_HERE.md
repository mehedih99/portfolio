# MD Mehedi Hasan — Dynamic Professional Portfolio

This package contains a complete dynamic portfolio website plus a private no-code Admin Panel.

## What is included

- `index.html` — public recruiter-facing portfolio
- `admin.html` — private CMS / Admin Panel
- `setup-config.html` — one-time no-code Supabase configuration helper
- `supabase_schema.sql` — database, security policies and media storage
- `assets/` — design, scripts and optimized portfolio images

## Current content already included

- Corrected UAE career timeline:
  - Icons Coffee Couture: June 2022 – January 2023
  - Atelier BLG: February 2023 – February 2024
  - Goya Cafe: February 2024 – Present
- Goya progression: Head Barista → Cafe Manager
- 10+ staff leadership, 20+ supplier coordination, 10+ events
- 4 new outlet openings
- Major event case studies
- Current Summer House / Lemon campaign
- POS & cashiering experience: Foodics, Sapaad, Square POS, Loyverse, MobiPOS, Odoo, Zoho Basic, Tally Basic
- Coffee machines, manual brewing and product-development skills
- Computer/digital skills and 60+ WPM typing
- Custom Goya Smart Operations Portal case study with screenshot-ready slider
- Education, certifications, proof images and selected gallery

**Important:** the date when independent outlet management started is intentionally NOT included anywhere.

---

# 1. Preview immediately

Open `index.html` in a browser. The website works immediately using the built-in content.

Open `admin.html` and choose **Local Demo Mode** to test editing on your own browser.

Local Demo Mode is for preview/testing only. Changes are stored in that browser and are not visible to recruiters on other devices.

---

# 2. Create a NEW Supabase project

Use a new Supabase project for this portfolio.

1. Create project in Supabase.
2. Open **SQL Editor**.
3. Paste and run `supabase_schema.sql`.
4. In **Authentication → Users**, create the admin user:
   - `mehedi.src@gmail.com`
5. Choose a strong password.

The SQL gives public users read-only access and allows only the configured owner email to edit content/upload media.

---

# 3. Configure without coding

1. Open `setup-config.html`.
2. Paste your Supabase **Project URL**.
3. Paste the **anon public key**.
4. Click **Download config.js**.
5. Replace `assets/js/config.js` with the downloaded file.

Never use the Supabase service-role key in a public website.

---

# 4. Recommended hosting

Recommended architecture:

**GitHub repository → Cloudflare Pages → Custom domain**

### GitHub
Create a private or public repository and upload the contents of this folder.

### Cloudflare Pages
- Create a Pages project.
- Connect the GitHub repository.
- Framework preset: **None**
- Build command: leave empty
- Output directory: `/` (repository root)

Cloudflare will host the static site and automatically redeploy when GitHub changes.

### Domain
A custom personal domain is recommended. Examples:
- `mdmehedihasan.com`
- `mehedihasan.me`
- another available professional name domain

---

# 5. Initialize live content

After Supabase is configured and the site is live:

1. Open `https://YOUR-DOMAIN/admin.html`
2. Sign in.
3. Click **Save & Publish** once.

The built-in portfolio content will be stored in Supabase. From then on, the public website reads live content from Supabase.

---

# 6. Future updates — no coding

Use `/admin.html` to update:

- profile/about text
- contact details
- KPI numbers
- career timeline
- Goya responsibilities
- events and featured events
- campaign details
- suppliers
- POS/business systems
- delivery platforms
- computer/digital skills
- coffee machines and brewing methods
- portal case study
- portal screenshots/slides
- certificates
- gallery photos
- SEO title/description

Click **Save & Publish**. The website updates without editing HTML/JavaScript.

---

# 7. Uploading photos and portal screenshots

When Supabase is configured, every image field in Admin has an **Upload** button.

Files are uploaded to the public `portfolio-media` bucket and the website uses the new URL automatically after Save & Publish.

For portal screenshots:

**Admin → Portal → Portal slider → Upload**

The four built-in workflow mock slides can be replaced one by one with real portal screenshots later.

---

# 8. Privacy

Public certificate images included in this package have sensitive identifiers intentionally redacted/cropped where appropriate.

Before uploading future documents, hide:
- employee/customer personal data
- passwords/PINs
- company confidential sales data
- bank/payment data
- private supplier terms
- certificate/ID numbers when unnecessary

Keep full original proof privately and share it directly with HR only when required.

---

# 9. Backups

Admin → Settings:

- **Export JSON Backup** before major edits.
- **Import JSON Backup** to restore a saved copy.
- **Restore Built-in Defaults** returns to the content delivered with this package.

