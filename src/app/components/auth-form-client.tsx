'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function FormLogin({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient()
    const router = useRouter()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSignUp = async () => {
        await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'http://localhost:3000/login'
            }
        })
        router.refresh()
    }

    const handleSignIn = async () => {
        const { data: { session } } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (session?.access_token !== null) {
            router.push('/')
        } else {
            alert('Usuario o contraseña incorrecta')
        }
    }

    return (
        <section className={session !== null ? '' : 'grid place-content-center p-7 gap-3'}>
            {
                session === null
                    ? <>
                        <input autoComplete="off" className="text-black p-2 rounded" type="text" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                        <input autoComplete="off" className="text-black p-2 rounded" type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                        <button className="bg-sky-300 hover:bg-sky-500 transition duration-150 ease-out hover:ease-in font-bold py-2 px-4 rounded text-black" onClick={handleSignUp}>Sign up</button>
                        <button className="bg-sky-300 hover:bg-sky-500 transition duration-150 ease-out hover:ease-in font-bold py-2 px-4 rounded text-black" onClick={handleSignIn}>Sign in</button>
                    </>
                    : <> </>
            }

        </section>
    )
}
