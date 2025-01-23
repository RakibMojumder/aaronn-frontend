# Modern Portfolio Website

A modern, full-stack portfolio website built with Next.js 14, featuring a dynamic project showcase, rich text editing, and a responsive dashboard.

## 🌟 Features

### Public Features

- **Dynamic Project Showcase**: Display projects with detailed information and images
- **Responsive Design**: Fully responsive layout that works on all devices
- **Image Optimization**: Automatic image optimization using Next.js Image component
- **Blur Image Loading**: Progressive image loading with blur effect
- **Rich Text Content**: Support for various content types including paragraphs, lists, and quotes

### Dashboard Features

- **Project Management**: CRUD operations for portfolio projects
- **Rich Text Editor**: Advanced editor for project descriptions
- **Image Upload**: Drag-and-drop image upload with preview
- **Tag Management**: Multi-select tag system with search functionality
- **Real-time Validation**: Form validation using Zod and React Hook Form

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **Rich Text Editor**: Editor.js
- **Toast Notifications**: Sonner

### Backend Integration

- **API Integration**: Server Actions
- **Image Upload**: Custom file upload system
- **Authentication**: JWT-based auth with secure cookie storage
- **Data Fetching**: Server-side and client-side fetching strategies

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/RakibMojumder/aaronn-frontend.git
```

2. Install dependencies:

```bash
cd aaronn-portfolio
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Update `.env.local` with your configuration:

```env
NEXT_PUBLIC_SERVER_URL=your_api_url
```

5. Run the development server:

```bash
npm run dev
```

## 🚀 Deployment

The project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Configure environment variables
4. Deploy!

## 🔧 Configuration

### Environment Variables

- `NEXT_PUBLIC_SERVER_URL`: Backend API URL
- Add other environment variables as needed

### Project Structure

```
src/
├── actions/        # Server actions
├── app/           # App router pages
├── components/    # Reusable components
├── lib/           # Utilities and helpers
├── interface/     # TypeScript interfaces
└── styles/        # Global styles
```

## 💻 Development

### Commands

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks

## Live-link: https://aaronn-dev.vercel.app

## Admin Credentials
- Email: admin@gmail.com
- Password: 123456

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Rakib Ahmed - [GitHub Profile](https://github.com/RakibMojumder)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Editor.js](https://editorjs.io/)
