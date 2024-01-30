import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthButtonClient from './auth-button-client'

export async function AuthButtonServer() {
    const supabase = createServerComponentClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    return (

        <section className={` ${session !== null ? '' : 'bg-blue-900 p-40 flex flex-col rounded-r-md'} `}>
            <AuthButtonClient session={session} />
        </section>
    )
}
