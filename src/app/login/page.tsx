import { AuthButtonServer } from '@/components/auth-button-server'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Login() {
    const supabase = createServerComponentClient({ cookies })

    const { data: { session } } = await supabase.auth.getSession()

    if (session !== null) {
        redirect('/')
    }

    return (

        <main className="h-screen flex flex-col justify-center align-center">
            <section className="flex justify-center rounded-md">
                <article className="rounded-l-md imagenStyle">

                </article>
                <AuthButtonServer />
            </section>
        </main>
    )
}



