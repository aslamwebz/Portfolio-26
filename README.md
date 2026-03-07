# Mohamed Aslam - Senior Backend Engineer Portfolio

A modern, performant portfolio website built with Laravel 12 and React 19, showcasing professional projects, technical expertise, and career achievements.

## 🚀 Features

- **Modern Dark Theme**: Sleek, professional design with smooth animations and particle effects
- **Interactive Terminal**: Animated terminal showcasing technical skills and commands
- **Project Showcase**: Filterable portfolio with live demos and GitHub links
- **Experience Timeline**: Professional history with achievements and metrics
- **Tech Stack Display**: Visual representation of technical expertise
- **Responsive Design**: Optimized for all devices using Tailwind CSS
- **Authentication**: User authentication system powered by Laravel Fortify
- **TypeScript**: Full type safety across the frontend
- **SEO Optimized**: Meta tags and structured data for search engines

## 🛠️ Tech Stack

### Backend

- **Laravel 12** - PHP framework
- **PHP 8.2+** - Backend language
- **Laravel Fortify** - Authentication scaffolding
- **Laravel Wayfinder** - Route generation
- **MySQL** - Database
- **Pest 4** - PHP testing framework

### Frontend

- **React 19** - UI library with latest features
- **TypeScript** - Type-safe JavaScript
- **Inertia.js v2** - SPA-like experience without API complexity
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Radix UI** - Accessible component primitives
- **Vite** - Fast build tool and dev server

### Development Tools

- **Laravel Pint** - PHP code formatting
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **Laravel Boost** - Development productivity tools

## 📦 Installation

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18 or higher
- npm or yarn
- MySQL or compatible database

### Setup Steps

1. **Clone the repository**

```bash
git clone https://github.com/your-username/portfolio-26.git
cd portfolio-26
```

2. **Install dependencies**

```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
```

3. **Environment setup**

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

4. **Database setup**

```bash
# Create database and run migrations
php artisan migrate
```

5. **Build assets**

```bash
npm run build
```

6. **Start development server**

```bash
# Using Laravel Herd (recommended)
# The site will be available at https://portfolio-26.test

# Or using artisan serve
php artisan serve
```

## 🎯 Usage

### Development

```bash
# Start all development services (server, queue, vite)
composer run dev

# Start with SSR support
composer run dev:ssr

# Run tests
composer run test

# Code formatting
composer run lint
npm run format
```

### Production Deployment

```bash
# Optimize for production
composer install --optimize-autoloader --no-dev
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 📁 Project Structure

```
├── app/
│   ├── Actions/           # Laravel action classes
│   ├── Http/             # Controllers and middleware
│   ├── Models/           # Eloquent models
│   └── Providers/        # Service providers
├── resources/
│   ├── js/
│   │   ├── components/   # React components
│   │   ├── pages/        # Inertia page components
│   │   ├── layouts/      # Layout components
│   │   └── hooks/        # Custom React hooks
│   └── views/            # Blade views (minimal)
├── routes/
│   ├── web.php           # Web routes
│   └── api.php           # API routes
├── database/
│   ├── migrations/       # Database migrations
│   └── seeders/          # Database seeders
└── tests/
    ├── Feature/          # Feature tests
    └── Unit/             # Unit tests
```

## 🎨 Customization

### Personal Information

Edit the following files to customize the portfolio:

- **`resources/js/pages/welcome.tsx`** - Main portfolio content, projects, and experience
- **`resources/js/pages/projects/index.tsx`** - Projects showcase
- **`resources/js/components/terminal.tsx`** - Terminal animation content
- **`resources/js/components/navigation.tsx`** - Navigation menu

### Styling

- **`tailwind.config.js`** - Tailwind configuration
- **`resources/css/app.css`** - Global styles
- Component-specific styles are handled via Tailwind classes

### Adding New Projects

1. Add project data to `resources/js/pages/welcome.tsx` and `resources/js/pages/projects/index.tsx`
2. Add project screenshots to `public/img/`
3. Update technologies array as needed

## 🧪 Testing

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test --filter PortfolioTest

# Run with coverage
php artisan test --coverage
```

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for fast loading
- **Bundle Size**: Optimized with Vite's tree-shaking
- **Image Optimization**: Lazy loading and WebP support

## 🔒 Security

- Laravel's built-in CSRF protection
- Input validation and sanitization
- Secure authentication with Laravel Fortify
- Environment-based configuration
- Regular security updates via Composer

## 🚀 Deployment

### Heroku

```bash
heroku create your-app-name
heroku buildpacks:add heroku/php
heroku buildpacks:add heroku/nodejs
git push heroku main
```

### DigitalOcean App Platform

1. Connect repository
2. Set environment variables
3. Deploy automatically on push

### Traditional Hosting

1. Upload files to server
2. Install dependencies
3. Set up web server (Nginx/Apache)
4. Configure SSL certificate

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

- **Portfolio**: https://your-portfolio-url.com
- **GitHub**: https://github.com/your-username
- **LinkedIn**: https://linkedin.com/in/your-profile
- **Email**: your.email@example.com

## 🙏 Acknowledgments

- [Laravel](https://laravel.com) - The PHP framework for web artisans
- [React](https://reactjs.org) - The JavaScript library for building user interfaces
- [Inertia.js](https://inertiajs.com) - The modern monolith for building SPAs
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com) - Beautifully designed components

---

**Built with ❤️ using modern web technologies**
