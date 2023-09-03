import { FC, ReactNode } from 'react'

import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { checkSubscription } from '@/lib/subscription'

const Layout: FC<{ children: ReactNode }> = async ({ children }) => {
	// const isPro = await checkSubscription()
	const isPro  = false
	return (
		<div className="h-full">
			<Navbar isPro={isPro} />
			<div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
				<Sidebar  isPro={isPro}  />
			</div>
			<main className="md:pl-20 pt-16 h-full">{children}</main>
		</div>
	)
}

export default Layout
