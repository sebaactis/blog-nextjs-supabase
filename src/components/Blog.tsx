
'use client'

import { useState } from 'react'
import { type Post } from '@/types/database'
import BlogDetail from './BlogDetail'
import AsideBlogDetails from './AsideBlogDetails'

export default function Blog({ id }: { id: string | null }) {
    const [blog, setBlog] = useState<Post | null>(null)
    const [blogs, setBlogs] = useState<Post[] | null>(null)

    return (
        <>
            <section className="grid grid-cols-[70%_30%] mt-[10rem] mb-22">
                <BlogDetail blog={blog} setBlog={setBlog} id={id} />
                <AsideBlogDetails blogs={blogs} setBlogs={setBlogs} id={id} blog={blog} />
            </section>
        </>
    )
}
