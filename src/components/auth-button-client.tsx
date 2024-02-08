'use client'

import { type Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { GitHubIcon, GoogleIcon } from '../app/icons'

const AuthButtonClient = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient()

    async function handleSignInGitHub() {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'
            }
        })
    }

    async function handleSignInGoogle() {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'
            }
        })
    }


    return (
        <section className="mx-7 flex flex-col">
            <button onClick={handleSignInGitHub} type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-md px-5 py-4 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
                <GitHubIcon />
                Iniciar Sesion con Github
            </button>
            <button onClick={handleSignInGoogle} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-md px-5 py-4 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                <GoogleIcon />
                Iniciar Sesion con Google
            </button>
        </section>
    )
}

export default AuthButtonClient
