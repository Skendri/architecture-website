# 🏗️ Architecture Website with Vite + React

A modern, responsive React architecture website built with Vite, featuring smooth animations and beautiful design.

## ✨ Features

- 🚀 **Vite** - Lightning-fast build tool and dev server
- ⚛️ **React 18** - Latest React with concurrent features
- 🎨 **Framer Motion** - Smooth, professional animations
- 🎯 **Tailwind CSS** - Utility-first CSS framework
- 📱 **Responsive Design** - Works perfectly on all devices
- ♿ **Accessible** - Built with accessibility best practices
- 🎪 **Smooth Animations** - Intersection Observer + Framer Motion
- 🏗️ **Architecture Focus** - Content tailored for architectural firms

## 🎬 Animation Features

- **Scroll-triggered animations** using Intersection Observer
- **Smooth page transitions** with Framer Motion
- **Hover effects** on cards, buttons, and interactive elements
- **Floating elements** in hero section
- **Staggered animations** for lists and grids
- **Loading animations** and micro-interactions
- **Mobile-optimized** touch interactions

## 🛠️ Technologies Used

- **Vite** - Build tool and dev server
- **React 18** - UI library
- **Framer Motion** - Animation library
- **Tailwind CSS** - Styling framework
- **Lucide React** - Beautiful icons
- **PostCSS** - CSS processing
- **ESLint** - Code linting

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd architecture-website-vite
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation with animations
│   ├── Hero.jsx            # Landing section with floating cards
│   ├── About.jsx           # Company info with stats
│   ├── Projects.jsx        # Portfolio showcase
│   ├── Contact.jsx         # Contact form with validation
│   └── Footer.jsx          # Footer with social links
├── App.jsx                 # Main app component
├── main.jsx                # App entry point
└── index.css               # Global styles + Tailwind
```

## 🎨 Customization

### Colors
The website uses a modern color palette defined in `tailwind.config.js`:
- **Primary**: Blue gradient (#667eea to #5a67d8)
- **Secondary**: Purple gradient (#764ba2 to #6b46c1)
- **Accent**: Various gradient combinations

### Animations
All animations are controlled through Framer Motion:
- **Scroll animations**: Triggered by Intersection Observer
- **Hover effects**: Scale, rotate, and color transitions
- **Page transitions**: Smooth entrance animations
- **Micro-interactions**: Button and form animations

### Content
- Update company information in About section
- Add real projects to Projects section
- Modify contact information in Contact and Footer
- Customize hero section messaging

## 🎯 Performance Features

- **Vite's fast HMR** - Instant hot module replacement
- **Code splitting** - Automatic route-based splitting
- **Tree shaking** - Unused code elimination
- **Optimized images** - Lazy loading and compression
- **CSS optimization** - Tailwind's purging and minification
- **Bundle analysis** - Built-in bundle size analysis

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎪 Animation Types

1. **Fade In**: Elements fade in as they enter viewport
2. **Slide In**: Elements slide from left/right/top/bottom
3. **Scale In**: Elements scale up from smaller size
4. **Stagger**: Sequential animations for lists
5. **Hover**: Interactive hover effects
6. **Scroll**: Parallax and scroll-triggered animations

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Structure

- **Components**: Functional components with hooks
- **Animations**: Framer Motion for all animations
- **Styling**: Tailwind CSS with custom utilities
- **Icons**: Lucide React for consistent iconography

## 🌟 Key Features

### Smooth Animations
- Scroll-triggered animations using Intersection Observer
- Framer Motion for complex animations
- CSS transitions for micro-interactions
- Performance-optimized animation timing

### Modern Design
- Clean, professional layout
- Gradient backgrounds and text
- Card-based content organization
- Responsive grid layouts

### User Experience
- Smooth scrolling navigation
- Interactive hover effects
- Loading states and feedback
- Mobile-first responsive design

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help with the project, please open an issue on GitHub.

---

**Built with ❤️ using Vite, React, and Framer Motion**
