'use client'

import { Divider } from '@nextui-org/react'
import Link from 'next/link'
import { IconBrandGithub } from '@tabler/icons-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect } from 'react'
import { formatearFecha } from '@/utils/format-date'
import { type Post } from '@/types/database'
import AsideBlog from './blog-aside-loader'

const supabase = createClientComponentClient()

interface Props {
    blogs: Post[] | null
    setBlogs: (blogs: Post[] | null) => void
    id: string | null
    blog: Post | null
}

function AsideBlogDetails({ blogs, setBlogs, id, blog }: Props) {
    const fecha = formatearFecha(blog?.created_at)

    useEffect(() => {
        setTimeout(() => {
            const fetchBlogs = async () => {
                const queryUserId = await supabase.from('posts').select('*, users(user_name, avatar_url)').eq('id', id)
                const user = queryUserId.data !== null && queryUserId.data.length > 0 ? queryUserId.data[0].user_id : null

                const response = await supabase.from('posts').select('*, users(user_name, avatar_url)').eq('user_id', user).order('created_at', { ascending: false }).limit(4)
                const blogs = response.data !== null && response.data.length > 0 ? response.data : null
                setBlogs(blogs)
            }

            fetchBlogs()
        }, 600)
    }, [id])

    if (blogs === null) {
        return (
            <AsideBlog />
        )
    }

    return (
        <aside className="max-w-[280px] h-[500px] border border-gray-500 relative text-white">
            <img
                className="rounded-sm h-fit blur-[2px]"
                alt="nextui logo"
                src={blog?.users.avatar_url}
                width={280}
            />
            <div className="w-fit h-fit flex flex-col items-center gap-5 absolute top-[160px] left-[75px]">
                <img className="rounded-full border" src={blog?.users.avatar_url} alt='foto de github' width={150} height={150} />
                <h1 className="text-md font-bold">{blog?.users.user_name}</h1>
                <Link href={`https://github.com/${blog?.users.user_name}`} target='blank'><IconBrandGithub className="border border-black rounded-full w-[40px] h-[40px] p-1 hover:bg-indigo-400 hover:border-indigo-400 transition" /></Link>
            </div>

            <article className="max-w-[300px] border border-gray-500 mt-[350px] flex flex-col justify-between mb-5 ">
                <h3 className="text-center py-5">Other Posts</h3>
                {blogs?.map((blog: Post) => {
                    return (
                        <>
                            <Divider className="bg-gray-500" />
                            <div key={blog.id} className="flex gap-5 items-center py-3 pl-3">
                                <img
                                    className="rounded-sm"
                                    alt="nextui logo"
                                    src={blog.imageUrl}
                                    width={120}
                                    height={120}
                                />
                                <div>
                                    <Link href={`http://localhost:3000/blogs/details?id=${blog.id}`}>
                                        <p className="text-lg hover:text-indigo-600 transition">{blog.title}</p>
                                    </Link>
                                    <p>{fecha}</p>
                                </div>
                            </div>
                        </>
                    )
                })}
            </article>

        </aside>
    )
}

export default AsideBlogDetails
