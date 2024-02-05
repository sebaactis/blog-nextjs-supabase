'use client'
import { useState } from 'react'

const cloudinaryCloudName = 'dmiwggr2n'

const FileUpload = ({ setImageUrl }: { setImageUrl: (url: string) => void }) => {
    const [file, setFile] = useState<File | null>(null)
    const [showUrlImage, setShowUrlImage] = useState<string | undefined>(undefined)

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const cloudurl = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`

        const data = new FormData()

        if (file === null) return

        data.append('file', file)
        data.append('upload_preset', 'Images')

        const response = await fetch(cloudurl,
            {
                method: 'POST',
                body: data
            }
        )

        const res = await response.json()
        const url: string = res.secure_url
        setImageUrl(url)
        setShowUrlImage(url)
    }

    return (
        <div className="flex flex-col items-center gap-4 border p-2 rounded-md bg-default-100 border-transparent">
            <input type="file" name='file' onChange={(e) => {
                if (e.target.files?.length !== 0 && e.target.files !== null) {
                    setFile(e.target.files[0])
                }
            }} />
            <button className="border p-2 rounded-lg bg-green-200 hover:bg-green-400 transition font-bold" onClick={handleSubmit}> Subir imagen </button>
            <img src={showUrlImage} width={130} height={130} />
        </div>
    )
}

export default FileUpload
