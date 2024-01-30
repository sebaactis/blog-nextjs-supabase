'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import Loader from './blog-loader'

const supabase = createClientComponentClient()

export default function Blog({ id }: { id: string | null }) {
    const [blog, setBlog] = useState<any | null>(null)

    useEffect(() => {
        const fetchBlog = async () => {
            setTimeout(async () => {
                const response = await supabase.from('posts').select('*, users(user_name, avatar_url)').eq('id', id)
                const blog = response.data !== null && response.data.length > 0 ? response.data[0] : null
                setBlog(blog)
            }, 200)
        }

        fetchBlog()
    }, [id])

    return (
        <>
            {blog !== null
                ? <section className="bg-transparent flex flex-col h-screen mt-20">
                    <article className="flex flex-col mx-auto items-start">
                        <div className="flex flex-row p-2 mb-2">
                            <h1 className="text-4xl font-bold text-wrap max-w-screen-sm">{blog.title}</h1>
                        </div>
                        <div className="flex flex-row items-center gap-5 mt-6 mb-10">
                            <img className="rounded-full" src={blog.users.avatar_url} alt='foto de github' width={33} height={33} />
                            <h1 className="text-md">{blog.users.user_name}</h1>
                        </div>
                    </article>
                    <article className=" flex flex-col mx-auto w-4/6 items-center">
                        <div className="mt-10 h-80 flex justify-center">
                            <p className="text-lg">{blog.content}</p>
                        </div>
                    </article>
                </section>
                : <Loader />}
        </>
    )
}
