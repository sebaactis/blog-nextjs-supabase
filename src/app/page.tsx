import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Posts from '@/components/Posts'

const supabase = createServerComponentClient({ cookies })

export default async function Home() {
  const { data: { session } } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
          <Posts />
      </main>
    </>
  )
}
