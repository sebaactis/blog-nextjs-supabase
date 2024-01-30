import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { AuthButtonServer } from '../components/auth-button-server'
import BlogsContainer from '../components/BlogsContainer'

const supabase = createServerComponentClient({ cookies })

export default async function Home() {
  const { data: { session } } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <BlogsContainer />
      </main>
      <footer className="bg-gray-800 flex justify-center items-center p-3">
        <AuthButtonServer />
      </footer>

    </>
  )
}
