'use client'

import { Input } from '@nextui-org/react'
import { useState } from 'react'

const cloudinaryCloudName = 'dmiwggr2n'
const cloudinaryApiKey = '551143467912187'
const cloudinaryApiSecret = 'WeW2o3XJi3F1WTMnGcsln-F4rZM'


const FileUpload = ({ setImageUrl }: { setImageUrl: (url: string) => void }) => {
    const [file, setFile] = useState<File | null>(null)

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const cloudurl = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload?api_key=${cloudinaryApiKey}&api_secret=${cloudinaryApiSecret}`

        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'Images')

        const response = await fetch(
            cloudurl,
            {
                method: 'POST',
                body: data
            }
        )

        const res = await response.json()
        const url: string = res.secure_url
        setImageUrl(url)
        console.log(url)
    }

    return (
        <div>
            <Input type="file" name='file' onChange={(e) => { setFile(e.target.files[0]) }} />
            <button onClick={handleSubmit}> Subir imagen </button>
        </div>
    )
}

export default FileUpload
