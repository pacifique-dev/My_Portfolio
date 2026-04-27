# Pacifique NIYISHOBORA - Full Stack Developer Portfolio

A modern, responsive portfolio website showcasing full-stack development skills with React, Node.js, JavaScript, and more.

## Features

✨ **Modern Design**
- Responsive layout (mobile, tablet, desktop)
- Dark/Light/Cyan theme switching
- Smooth animations and scroll effects
- Glassmorphism UI elements

⚙️ **Customization**
- Settings panel for real-time profile updates
- Theme customization with custom gradients
- Font size adjustment
- Personal information management
- Social media links

📧 **Contact Form**
- EmailJS integration for contact messages
- Real-time form validation
- Success/error notifications
- Spam protection

🎯 **Additional Features**
- Typed text animation
- Scroll-triggered animations
- Portfolio filtering system
- Header shadow on scroll
- Back-to-top button
- Mouse glow cursor effect

## Project Structure

```
├── index.html          # Main HTML file with semantic structure
├── style.css          # Production-ready stylesheets
├── main.js            # JavaScript logic and functionality
├── WIN_20260425_19_19_13_Pro.jpg  # Profile image (add your own)
├── nigaa.png          # About section image (add your own)
└── README.md          # This file
```

## Setup Instructions

### 1. Add Your Images

Replace placeholder images with your own:
- `WIN_20260425_19_19_13_Pro.jpg` - Hero section profile image (300x300px recommended)
- `nigaa.png` - About section image (310x310px recommended)

### 2. Configure Email Notifications (Optional)

To enable contact form email functionality:

1. Go to [emailjs.com](https://www.emailjs.com)
2. Sign up for a free account
3. Add your Gmail as a service:
   - Click "Add New Service"
   - Select Gmail
   - Authorize your email
   - Copy the **Service ID**
4. Create an email template:
   - Go to "Email Templates"
   - Create template with variables: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{subject}}`, `{{service}}`, `{{message}}`
   - Copy the **Template ID**
5. Get your Public Key:
   - Go to Account → API
   - Copy your **Public Key**
6. Update `main.js`:
   ```javascript
   const EMAILJS_PUBLIC_KEY = 'your_public_key';
   const EMAILJS_SERVICE_ID = 'your_service_id';
   const EMAILJS_TEMPLATE_ID = 'your_template_id';
   ```

### 3. Customize Portfolio Information

Click the settings icon (⚙️) in the header to:
- Update your name and role
- Change location
- Add bio
- Update social media links
- Customize theme colors
- Adjust font size

All changes are saved to browser's localStorage.

### 4. Update Portfolio Projects

Edit the portfolio cards in `index.html`:
- Replace project titles and descriptions
- Update live links (currently set to disabled)
- Update GitHub repository links
- Change project categories (frontend, fullstack, design)

### 5. Update Social Links

Replace placeholder URLs in `index.html`:
- Instagram
- GitHub
- LinkedIn
- Twitter/X
- Facebook

## Deployment Options

### Option 1: Netlify (Recommended for Beginners)
1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Site goes live instantly

### Option 2: Vercel
1. Create account at [vercel.com](https://vercel.com)
2. Import your project
3. Deploy with one click

### Option 3: GitHub Pages
1. Create GitHub repository
2. Push your files
3. Enable Pages in repository settings
4. Site deploys automatically

### Option 4: Traditional Hosting
1. Upload files via FTP to your hosting server
2. Ensure all files are in the root directory
3. Access via your domain

## Browser Compatibility

✅ Chrome (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Edge (latest)
✅ Mobile browsers (iOS Safari, Chrome Android)

## Performance Tips

1. **Optimize Images**: Compress images before uploading
   - Use online tools like TinyPNG or ImageOptim
   - Recommended: Convert to WebP format

2. **Minify Files**: Reduce file sizes
   - CSS: ~25KB (already optimized)
   - JS: ~30KB (already optimized)

3. **CDN Assets**: All external libraries use CDN
   - Boxicons (icons)
   - Google Fonts
   - EmailJS

4. **Lighthouse Score**: Aim for 90+ on all metrics
   - Run audit in Chrome DevTools

## Customization Guide

### Change Color Scheme
Edit CSS variables in `style.css`:
```css
--primary-blue: #60a5fa;
--secondary-blue: #38bdf8;
--accent-purple: #a855f7;
```

### Modify Font Sizes
Use the font size slider in settings panel (⚙️)

### Update Header Navigation
Edit nav links in `index.html` `<nav>` section

### Add New Sections
1. Add section HTML
2. Add CSS styling
3. Add scroll reveal animation class: `class="reveal"`

## Troubleshooting

### Images not showing?
- Ensure image files are in the same directory
- Check file names match exactly (case-sensitive on Linux/Mac)
- Verify file formats are supported (JPG, PNG, WebP)

### Email form not working?
- Verify EmailJS keys are correctly set in `main.js`
- Check browser console for errors (F12 → Console)
- Ensure email address is correctly configured in EmailJS

### Contact form validation errors?
- All required fields must be filled (Name, Email, Subject, Message)
- Email must be valid format
- Message limited to 1200 characters

### Styles not loading?
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- Clear browser cache
- Check CSS file is in same directory

## SEO Optimization

Already includes:
- Meta descriptions
- Open Graph tags
- Social media cards
- Structured data ready
- Mobile optimization
- Fast loading times

Additional recommendations:
1. Submit sitemap to Google Search Console
2. Add Google Analytics tracking
3. Create XML sitemap
4. Submit to Google My Business

## Legal & Credits

### Fonts Used
- **Syne** (Headings) - Google Fonts
- **DM Sans** (Body) - Google Fonts
- **JetBrains Mono** (Code) - Google Fonts

### Icons
- **Boxicons** - Free icon library

### Services
- **EmailJS** - Email backend service (free tier)

### License
This portfolio is open source and available for personal use.

## Support & Updates

For issues or questions:
- GitHub Issues (if repository is public)
- Email: niyishoborapacifique@gmail.com
- Twitter: @Niyishobor2335

## Version History

**v1.0.0** (2025-04-27)
- Initial production release
- Full customization features
- EmailJS integration
- Mobile responsive design
- Theme switching
- Settings panel

---

**Made with ❤️ by Pacifique NIYISHOBORA**
