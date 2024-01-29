import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthButtonClient from './auth-button-client'
import FormLogin from './auth-form-client'

export async function AuthButtonServer() {
    const supabase = createServerComponentClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    return (

        <section className={` ${session !== null ? '' : 'bg-blue-900 p-20 flex flex-col rounded-r-md'} `}>
            <FormLogin session={session} />
            <AuthButtonClient session={session} />
        </section>
    )
}
