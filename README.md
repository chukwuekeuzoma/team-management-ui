# Team Management System

A modern, intuitive web application built with Next.js for managing teams within organizations. This application provides a clean and efficient interface for viewing, creating, editing, and managing team information with powerful search and filtering capabilities.

## 🚀 What This Application Does

This team management system helps organizations:

- **View Teams**: Browse through all teams with detailed information including team names, codes, descriptions, emails, entities, and managers
- **Search & Filter**: Quickly find specific teams using search functionality and filter by entity (Global, EMEA, AMER, APAC, R&D, Ops, Fintech)
- **Manage Teams**: Create new teams, edit existing team information, and delete teams when needed
- **Sort Data**: Sort teams by name, code, entity, or manager for better organization
- **Paginate Results**: Handle large datasets efficiently with customizable page sizes (10, 25, 50, 100 items per page)
- **Bulk Operations**: Select multiple teams for batch operations

## ✨ Key Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Search**: Instant search results as you type
- **Smart Filtering**: Filter teams by entity with dropdown selection
- **Interactive Sorting**: Click column headers to sort data in ascending/descending order
- **Modal Forms**: Clean, user-friendly forms for creating and editing teams
- **Confirmation Dialogs**: Safe deletion with confirmation prompts
- **Success Notifications**: Clear feedback when operations complete successfully
- **Data Validation**: Form validation ensures data integrity
- **State Management**: Efficient state management using Zustand
- **Type Safety**: Full TypeScript support for better development experience

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 15.5.4 with React 19.1.0
- **Styling**: Tailwind CSS for modern, responsive design
- **UI Components**: Custom components built with Radix UI primitives
- **State Management**: Zustand for lightweight state management
- **Form Handling**: React Hook Form with Yup validation
- **TypeScript**: Full type safety throughout the application
- **Testing**: Jest with React Testing Library
- **Icons**: Lucide React for beautiful, consistent icons

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun (we recommend pnpm)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repository-url>
   cd team-management
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## 📋 Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check for code quality issues
- `pnpm test` - Run the test suite
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Generate test coverage report

## 🎯 How to Use

### Viewing Teams

- The main page displays all teams in a clean table format
- Use the search bar to find specific teams by name or description
- Filter teams by entity using the dropdown menu
- Click on column headers to sort data

### Creating a New Team

1. Click the "Create Team" button in the top-right corner
2. Fill out the team information form:
   - Team Name (required)
   - Description (required)
   - Code (required, unique identifier)
   - Email (required, valid email format)
   - Team Email (required, valid email format)
   - Entity (required, select from dropdown)
   - Manager (required)
3. Click "Create Team" to save

### Editing a Team

1. Click the "Edit" button (pencil icon) in the Actions column for any team
2. Modify the team information in the form
3. Click "Update Team" to save changes

### Deleting a Team

1. Click the "Delete" button (trash icon) in the Actions column
2. Confirm the deletion in the dialog that appears
3. The team will be removed and you'll see a success message

## 🏗️ Project Structure

```
team-management/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   │   └── Teams/         # Team management components
│   └── ui/               # Reusable UI components
├── data/                 # Sample data
├── lib/                  # Utility functions
├── stores/               # State management (Zustand stores)
├── types/                # TypeScript type definitions
└── components.json       # Component configuration
```

## 🧪 Testing

The application includes comprehensive testing setup:

- Unit tests for components using Jest and React Testing Library
- Test coverage reporting
- Watch mode for development

Run tests with:

```bash
pnpm test
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy your application

### Manual Deployment

1. Build the application: `pnpm build`
2. Start the production server: `pnpm start`

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Submit a pull request

## 📝 License

This project is private and proprietary. All rights reserved.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information about the problem
3. Include steps to reproduce the issue

---

Built with ❤️ using Next.js and modern web technologies @MARTINS.

