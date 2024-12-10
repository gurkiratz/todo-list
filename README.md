# 🚀 Modern Todo App

![image](https://github.com/user-attachments/assets/e25d7bda-41fe-4554-911f-61532583a657)

A sleek and efficient todo application built with cutting-edge technologies. Stay organized and boost your productivity with this feature-rich task management solution.

## Live Deployment

You can view the live deployment of the app at the following link:
[https://todo-list-nbdbt4nn1-gurkiratzs-projects.vercel.app/](https://todo-list-nbdbt4nn1-gurkiratzs-projects.vercel.app/)

## ✨ Features

- 🔐 Secure authentication with Clerk
- 🔄 Real-time updates
- 🌓 Dark mode support
- 🏢 Multi-organization task management
- 📱 Responsive design for all devices
- 🔍 Advanced filtering and sorting options

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation
- **Authentication**: [Clerk](https://clerk.dev/) - Complete user management solution
- **Database**: [Supabase](https://supabase.io/) - Open-source Firebase alternative
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM for SQL databases
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- **State Management**: [Recoil.js](https://recoiljs.org/) - State management library for React
- **Development**: [ngrok](https://ngrok.com/) - Secure tunneling for local development

## Running the App

To run the app locally, you need to start an ngrok tunnel. Since this app is in development, you have to start the tunnel locally yourself.

1. Install ngrok if you haven't already:

   ```sh
   npm install -g ngrok
   ```

2. Start the ngrok tunnel:

   ```sh
   ngrok http 3000
   ```

3. Copy the forwarding URL provided by ngrok and use it to access your local app.

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
