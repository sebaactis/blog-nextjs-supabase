'use client'

import Blog from '@/components/Blog'
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
