import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function LandingPage() {
  const { userId }: { userId: string | null } = await auth()
  if (userId !== null) redirect('/user')
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <header className="w-full py-4 bg-primary text-primary-foreground">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Todo App</h1>
        </div>
      </header>
      <main className="flex flex-col items-center mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to your Todo app!
        </h2>
        <p className="mb-8 text-center max-w-md">
          Manage your tasks efficiently and stay organized. Sign in or sign up
          to get started.
        </p>
        <div className="flex space-x-4">
          <Button variant="secondary" asChild>
            <SignInButton />
          </Button>
          <Button variant="default" asChild>
            <SignUpButton />
          </Button>
        </div>
      </main>
      <footer className="w-full py-4 mt-auto bg-gray-200 text-center">
        <p>&copy; {new Date().getFullYear()} Todo App. All rights reserved.</p>
      </footer>
    </div>
  )
}
