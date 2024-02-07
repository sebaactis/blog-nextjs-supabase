'use client'

import Blog from '@/components/Blog'
import NavBar from '@/components/NavBar'
import { useSearchParams } from 'next/navigation'


export default async function Page() {
    const params = useSearchParams()
    const id = params.get('id')

    return (
        <div>
            <Blog id={id} />
        </div>
    )
}
