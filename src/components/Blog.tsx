'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import Loader from './blog-loader'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

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
                ? <section className="bg-transparent flex flex-col justify-between mt-20 border border-transparent rounded-md w-2/6 m-auto shadow-lg shadow-cyan-300">
                    <img
                        className="rounded-sm w-screen"
                        alt="nextui logo"
                        src="https://i.blogs.es/09b647/googlefotos/840_560.jpg"
                    />
                    <article className="flex flex-col mx-auto">
                        <div className="flex flex-row items-center gap-2 mt-3">
                            <h1 className="text-md ml-2">Written by: <span className="font-bold">{blog.users.user_name}</span></h1>
                            <img className="rounded-full" src={blog.users.avatar_url} alt='foto de github' width={25} height={25} />
                        </div>
                        <div className="flex flex-row p-2 mb-2">
                            <h1 className="text-2xl font-bold text-wrap max-w-screen-sm text-center mt-10">{blog.title}</h1>
                        </div>
                    </article>
                    <article className=" flex flex-col mx-auto w-4/6">
                        <div className="mt-10 mb-36 flex">
                            <p className="text-xl text-center">{blog.content}</p>
                        </div>
                    </article>
                </section>
                : <Loader />}
            <div className="w-full m-auto flex justify-center py-3">
                <Link href="/">
                    <Button >Volver al inicio</Button>
                </Link>
            </div>

        </>
    )
}
