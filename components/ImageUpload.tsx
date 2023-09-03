'use client'

import { FC, useEffect, useState, memo } from 'react'
import { CldUploadButton } from 'next-cloudinary'
import Image from 'next/image'
import axios from 'axios'
import qs from 'query-string'
// import { v2 as cloudinary } from 'cloudinary'

interface IImageUploadProps {
	value: {
		src: string
		key: string
	}
	onChange: ({ src, key }: { src: string; key: string }) => void
	disabled?: boolean
}

const ImageUpload: FC<IImageUploadProps> = memo(function ImageUpload({
	value,
	onChange,
	disabled
}) {
	const [mounted, setMounted] = useState<boolean>(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const onUpload = async (result: any) => {
		try {
			if (value.key.length > 0 && value.src.length > 0) {
				const url = qs.stringifyUrl({
					url: '/api/cloudinary',
					query: {
						key: value.key
					}
				})
				await axios.delete(url)
			}
		} finally {
			onChange({ src: result.info.secure_url, key: result.info.public_id })
		}
	}

	if (!mounted) return null
	return (
		<div className="space-y-4 w-full flex flex-col justify-center items-center">
			<CldUploadButton
				options={{ maxFiles: 1, folder: 'companion.ai' }}
				onUpload={onUpload}
				uploadPreset="ui3ndgid"
			>
				<div
					className="
        p-4 
        border-4 
        border-dashed
        border-primary/10 
        rounded-lg 
        hover:opacity-75 
        transition 
        flex 
        flex-col 
        space-y-2 
        items-center 
        justify-center
      "
				>
					<div className="relative h-40 w-40">
						<Image
							fill
							alt="Upload"
							src={value.src || '/placeholder.svg'}
							className="rounded-lg object-cover"
						/>
					</div>
				</div>
			</CldUploadButton>
		</div>
	)
})
export default ImageUpload
