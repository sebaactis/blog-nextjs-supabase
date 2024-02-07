'use client'

import { useState } from 'react'
import { Navbar, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem } from '@nextui-org/react'
import { type Session } from '@supabase/supabase-js'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

const supabase = createClientComponentClient()

function NavBarContainer({ session }: { session: Session | null }) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const router = useRouter()

    const signOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
            </NavbarContent>

            <NavbarContent justify='end'>
                <NavbarItem className="border p-1 rounded-lg px-4 bg-purple-600 text-white hover:bg-purple-500 transition">
                    <Link href="blogs/create">
                        Crear
                    </Link>
                </NavbarItem>
                <NavbarItem >
                    {session !== null ? <button className="max-sm:hidden border p-1 rounded-lg px-4 bg-indigo-500 text-white hover:bg-indigo-400 transition" onClick={signOut}> Cerrar Session </button> : 'Login'}
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                <NavbarMenuItem>
                    {session !== null ? 'Logout' : 'Login'}
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar >
    )
}

export default NavBarContainer

