import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function LandingPage() {
  const { userId }: { userId: string | null } = await auth()
  if (userId !== null) redirect('/user')
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="w-full py-4 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 backdrop-blur-sm fixed top-0 z-50 border-b border-purple-100">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Todo App
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="default"
              className="transform hover:scale-105 transition-all duration-200 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-2 rounded-lg shadow-lg hover:shadow-xl"
              asChild
            >
              <SignInButton />
            </Button>

            <Button
              variant="outline"
              className="transform hover:scale-105 transition-all duration-200 border-2 border-purple-600 text-purple-600 px-8 py-2 rounded-lg shadow-md hover:shadow-lg"
              asChild
            >
              <SignUpButton />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-8 space-y-8 animate-fadeIn">
        <div className="max-w-xl w-full space-y-6 text-center">
          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-center mb-6 
  bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 
  bg-clip-text text-transparent 
  animate-gradient
  drop-shadow-2xl
  transform hover:scale-105 transition-all duration-300
  relative
  before:content-[''] before:absolute before:-inset-1 before:bg-gradient-to-r before:from-purple-600/20 before:via-pink-500/20 before:to-indigo-600/20 before:blur-xl before:-z-10
"
          >
            Todo App
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Manage your tasks efficiently and stay organized. Sign in or sign up
            to get started.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              variant="default"
              className="transform hover:scale-105 transition-all duration-200 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-2 rounded-lg shadow-lg hover:shadow-xl"
              asChild
            >
              <SignInButton />
            </Button>

            <Button
              variant="outline"
              className="transform hover:scale-105 transition-all duration-200 border-2 border-purple-600 text-purple-600 px-8 py-2 rounded-lg shadow-md hover:shadow-lg"
              asChild
            >
              <SignUpButton />
            </Button>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="container mx-auto px-4 flex justify-center items-center gap-2">
          <p className="text-white text-center text-sm">
            &copy; {new Date().getFullYear()} Todo App. All rights reserved.
          </p>
          <p className="text-sm">
            <span className="text-white/80">Made with ❤️ by </span>
            <a
              href="https://github.com/gurkiratz/todo-list"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-200 transition-colors duration-200 font-medium"
            >
              Gurkirat
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
