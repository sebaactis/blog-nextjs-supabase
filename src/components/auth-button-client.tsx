'use client'

import { type Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { GitHubIcon } from '../app/icons'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'

const AuthButtonClient = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient()
    const router = useRouter()

    async function handleSignIn() {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'
            }
        })
    }

    async function handleSignOut() {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <section className="mx-7">
            {
                session === null
                    ? <button onClick={handleSignIn} type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-4 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
                        <GitHubIcon />
                        Iniciar Sesion con Github
                    </button>
                    : <Button className="px-2" onClick={handleSignOut}> Cerrar Sesion </Button>
            }

        </section>
    )
}

export default AuthButtonClient
