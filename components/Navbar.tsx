'use client'

import { Menu, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { UserButton } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { useState, useEffect, FC } from 'react'
import { dark } from '@clerk/themes'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { ModeToggle } from '@/components/ModeToggle'
import { MobileSidebar } from '@/components/MobileSidebar'
import { useProModal } from '@/hooks/useProModal'

const font = Poppins({ weight: '600', subsets: ['latin'] })

interface INavbarProps {
	isPro: boolean
}

export const Navbar: FC<INavbarProps> = ({ isPro }) => {
	const [appearance, setAppearance] = useState({})

	const { onOpen } = useProModal()

	const { theme } = useTheme()

	useEffect(() => {
		if (theme === 'dark') {
			setAppearance({ baseTheme: dark })
		} else {
			setAppearance({})
		}
	}, [theme])

	return (
		<div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 h-16 border-b border-primary/10 bg-secondary">
			<div className="flex items-center">
				<MobileSidebar isPro={isPro} />
				<Link href="/" className="hidden md:flex md:items-center md:gap-x-2">
					<Image src={'/logo.png'} alt="Logo" width={48} height={48} />
					<h1
						className={cn(
							'text-xl md:text-3xl font-bold text-primary',
							font.className
						)}
					>
						companion.ai
					</h1>
				</Link>
			</div>
			<div className=" flex items-center gap-x-3">
				{!isPro && (
					<Button onClick={onOpen} size="sm" variant="premium">
						Upgrade
						<Sparkles className="h-4 w-4 fill-white text-white ml-2" />
					</Button>
				)}
				<ModeToggle />
				<UserButton afterSignOutUrl="/" appearance={appearance} />
			</div>
		</div>
	)
}
