# Robin Labryga Website

A modern, performant personal website built with 2025's best practices for static sites. This repository contains the source code for my personal website, showcasing clean code, accessibility, and modern web standards.

## 🚀 Features

### Modern Web Standards (2025)

- **HTML5 Semantic Markup**: Proper document structure with semantic elements
- **CSS Grid & Flexbox**: Modern layout techniques with container queries
- **ES2024+ JavaScript**: Modern JavaScript features with progressive enhancement
- **Web Components Ready**: Structured for easy component integration

### Performance & Optimization

- **Core Web Vitals Optimized**: Fast loading, good CLS, and FID scores
- **Progressive Web App (PWA)**: Service worker, manifest, offline capabilities
- **Lazy Loading**: Images and content loaded efficiently
- **Resource Preloading**: Critical resources loaded optimally
- **Optimized Assets**: SVG icons and optimized images

### Accessibility & Usability

- **WCAG 2.1 AA Compliant**: Full accessibility support
- **Keyboard Navigation**: Complete keyboard accessibility
- **Screen Reader Optimized**: Proper ARIA labels and semantic structure
- **Focus Management**: Visible focus indicators and logical tab order
- **Skip Links**: Easy content navigation for assistive technology

### Modern CSS Features

- **CSS Custom Properties**: Comprehensive design system with variables
- **Fluid Typography**: Responsive text scaling with clamp()
- **Dark/Light Mode**: System preference detection with manual toggle
- **Container Queries**: Modern responsive design approach
- **CSS Grid**: Advanced layout capabilities
- **Smooth Animations**: Respects `prefers-reduced-motion`

### Developer Experience

- **Clean Architecture**: Modular, maintainable code structure
- **Error Handling**: Comprehensive error management
- **Modern JavaScript Classes**: Object-oriented approach
- **Service Worker**: Offline functionality and caching
- **SEO Optimized**: Meta tags, structured data, sitemap

## 📁 Project Structure

```
robinlabryga.github.io/
├── index.html              # Main homepage
├── 404.html               # Custom 404 error page
├── manifest.json          # PWA manifest
├── sw.js                  # Service worker
├── robots.txt             # Search engine crawler instructions
├── sitemap.xml            # Site structure for SEO
├── assets/                # Static assets
│   ├── favicon.svg        # Modern SVG favicon
│   ├── avatar-placeholder.svg
│   ├── project1-placeholder.svg
│   ├── project2-placeholder.svg
│   └── project3-placeholder.svg
├── styles/
│   └── main.css          # Modern CSS with custom properties
├── scripts/
│   └── main.js           # Modern JavaScript (ES2024+)
├── pages/                # Additional pages
│   └── about.html        # About page example
└── README.md             # This file
```

## 🛠️ Technologies Used

### Core Technologies

- **HTML5**: Semantic markup with modern features
- **CSS3**: Custom properties, Grid, Flexbox, container queries
- **JavaScript ES2024+**: Modern syntax and features
- **Service Worker API**: PWA functionality

### Modern CSS Features

- CSS Custom Properties (CSS Variables)
- CSS Grid and Flexbox
- Container Queries
- Fluid Typography with `clamp()`
- CSS Logical Properties
- `prefers-reduced-motion` support
- Native CSS color functions

### JavaScript Features

- ES2024+ syntax and features
- Classes and modules
- Intersection Observer API
- Web Storage API
- Service Worker API
- Modern event handling

### Performance Features

- Resource preloading
- Lazy loading
- Service worker caching
- Optimized images (SVG)
- Critical CSS inlining
- Efficient animations

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Basic understanding of HTML, CSS, and JavaScript
- (Optional) Local web server for testing service worker features

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/robinlabryga/robinlabryga.github.io.git
   cd robinlabryga.github.io
   ```

2. **Open in a web server**

   For development, use a local server to test all features:

   **Using Python:**

   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Using Node.js (with npx):**

   ```bash
   npx serve .
   ```

   **Using PHP:**

   ```bash
   php -S localhost:8000
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000`

### Deployment

This site is designed for **GitHub Pages** deployment:

1. Push to your GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io`

## 🎨 Customization

### Colors and Theming

Edit CSS custom properties in `styles/main.css`:

```css
:root {
  --color-primary: hsl(217, 91%, 60%);
  --color-secondary: hsl(342, 89%, 48%);
  /* ... more variables */
}
```

### Content

- Update `index.html` with your personal information
- Replace placeholder images in `assets/` folder
- Modify navigation links and sections as needed

### Adding New Pages

1. Create new HTML file in `pages/` directory
2. Follow the existing structure and include necessary CSS/JS
3. Update navigation in all relevant files
4. Add to `sitemap.xml` for SEO

## ⚡ Performance Optimizations

### Implemented Optimizations

- **Critical CSS**: Above-the-fold styles loaded inline
- **Resource Hints**: Preload, prefetch for critical resources
- **Image Optimization**: SVG graphics for scalability
- **Service Worker**: Caching and offline functionality
- **Efficient Loading**: Progressive enhancement approach

### Performance Metrics

- **Lighthouse Score**: 95+ for Performance, Accessibility, Best Practices, SEO
- **Core Web Vitals**: Optimized for all metrics
- **Bundle Size**: Minimal JavaScript and CSS footprint

## ♿ Accessibility Features

- **WCAG 2.1 AA Compliance**: Full accessibility standard compliance
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators and logical flow
- **Color Contrast**: High contrast ratios for readability
- **Reduced Motion**: Respects user's motion preferences

## 🔒 Security Features

- **Content Security Policy**: Implemented via meta tags
- **HTTPS Only**: Designed for secure connections
- **No Inline Scripts**: External JavaScript files only
- **Safe External Links**: `noopener noreferrer` attributes

## 📱 Progressive Web App (PWA)

Features include:

- **Service Worker**: Offline functionality and caching
- **Web App Manifest**: Installable app experience
- **Responsive Design**: Works on all device sizes
- **Fast Loading**: Optimized for mobile networks

## 🔍 SEO Optimization

- **Meta Tags**: Comprehensive meta information
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Schema.org markup for search engines
- **Sitemap**: XML sitemap for search engine indexing
- **Robots.txt**: Search engine crawler instructions

## 🌐 Browser Support

### Fully Supported

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Graceful Degradation

- All modern features have fallbacks
- Progressive enhancement approach
- Core functionality works in older browsers

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

While this is a personal website, suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Contact

- **Website**: [https://robinlabryga.github.io](https://robinlabryga.github.io)
- **LinkedIn**: [https://www.linkedin.com/in/robin-labryga/](https://www.linkedin.com/in/robin-labryga/)
- **Email**: [contact@example.com](mailto:contact@example.com)

---

**Built with ❤️ using modern web standards and best practices for 2025.**
