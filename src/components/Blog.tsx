'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import Loader from './blog-loader'
import { Button, Divider } from '@nextui-org/react'
import Link from 'next/link'
import { Oswald } from 'next/font/google'
import { IconBrandGithub } from '@tabler/icons-react'
import { formatearFecha } from '@/utils/format-date'
import { type Post } from '@/types/database'

const oswald = Oswald({ subsets: ['latin'] })
const supabase = createClientComponentClient()

export default function Blog({ id }: { id: string | null }) {
    const [blog, setBlog] = useState<Post | null>(null)
    const [blogs, setBlogs] = useState<Post[] | null>(null)

    useEffect(() => {
        const fetchBlog = async () => {
            setTimeout(async () => {
                const response = await supabase.from('posts').select('*, users(user_name, avatar_url)').eq('id', id)
                const blog: Post = response.data !== null && response.data.length > 0 ? response.data[0] : null
                setBlog(blog)
            }, 200)
        }

        const fetchBlogs = async () => {
            const queryUserId = await supabase.from('posts').select('*, users(user_name, avatar_url)').eq('id', id)
            const user = queryUserId.data !== null && queryUserId.data.length > 0 ? queryUserId.data[0].user_id : null

            const response = await supabase.from('posts').select('*, users(user_name, avatar_url)').eq('user_id', user).order('created_at', { ascending: false }).limit(4)
            const blogs = response.data !== null && response.data.length > 0 ? response.data : null
            setBlogs(blogs)
        }

        fetchBlog()
        fetchBlogs()
    }, [id])


    return (
        <>
            {blog !== null
                ? <section className="grid grid-cols-[70%_30%] mt-[10rem] mb-22">
                    <article className="m-auto flex flex-col items-center border rounded-md">
                        <div className="flex flex-col items-center pb-[50px] w-[700px]">
                            <img
                                className="rounded-sm h-fit"
                                alt="nextui logo"
                                src="https://i.blogs.es/09b647/googlefotos/840_560.jpg"
                            />
                            <div>
                                <h1 className={`text-2xl mt-6 text-wrap text-center uppercase ${oswald.className}`}>{blog.title}</h1>
                            </div>
                        </div>
                        <p className="text-md text-center max-w-[500px] pb-[10rem] h-fit">{blog.content}</p>
                        <div className="w-full m-auto flex justify-center py-3">
                            <Link href="/">
                                <Button >Volver al inicio</Button>
                            </Link>
                        </div>
                    </article>
                    <aside className="max-w-[300px] h-[500px] relative border">
                        <img
                            className="rounded-sm h-fit"
                            alt="nextui logo"
                            src="https://i.blogs.es/09b647/googlefotos/840_560.jpg"
                            width={300}
                        />
                        <div className="w-fit h-fit flex flex-col items-center gap-5 absolute top-[160px] left-[75px]">
                            <img className="rounded-full border" src={blog.users.avatar_url} alt='foto de github' width={150} height={150} />
                            <h1 className="text-md font-bold">{blog.users.user_name}</h1>
                            <Link href={`https://github.com/${blog.users.user_name}`} target='blank'><IconBrandGithub className="border border-black rounded-full w-[40px] h-[40px] p-1 hover:bg-indigo-400 hover:border-indigo-400 transition" /></Link>
                        </div>

                        <article className="max-w-[300px] border mt-[350px] flex flex-col justify-between mb-5">
                            <h3 className="text-center py-5">Other Posts</h3>
                            <Divider />
                            {blogs?.map((blog: Post) => {
                                const fecha = formatearFecha(blog.created_at)
                                return (
                                    <>

                                        <div key={blog.id} className="flex gap-5 items-center py-3 pl-3">
                                            <img
                                                className="rounded-sm"
                                                alt="nextui logo"
                                                src="https://i.blogs.es/09b647/googlefotos/840_560.jpg"
                                                width={120}
                                                height={120}
                                            />
                                            <div>
                                                <Link target='_blank' href={`http://localhost:3000/blogs/details?id=${blog.id}`}>
                                                    <p className={`${oswald.className} text-lg hover:text-indigo-600 transition`}>{blog.title}</p>
                                                </Link>
                                                <p>{fecha}</p>
                                            </div>
                                        </div>
                                        <Divider />
                                    </>
                                )
                            })}
                        </article>

                    </aside>
                </section>
                : <Loader />}
        </>
    )
}
