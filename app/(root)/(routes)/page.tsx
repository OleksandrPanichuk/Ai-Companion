import { Companions } from '@/components/Companions'
import { SearchInput } from '@/components/SearchInput'
import { Categories } from '@/components/Categories'
import db from '@/lib/prismadb'
import { FC } from 'react'
import { currentUser } from '@clerk/nextjs'

interface RootPageProps {
	searchParams: {
		categoryId: string
		name: string
	}
}

const RootPage: FC<RootPageProps> = async ({ searchParams }) => {
	// const user = await currentUser()



	const data = await db.companion.findMany({
		where: {
			categoryId: searchParams.categoryId,
			name: {
				contains: searchParams.name,
				mode: 'insensitive'
			}
		},
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			_count: {
				select: {
					messages: true
				}
			}
		}
	})

	const categories = await db.category.findMany()
	return (
		<div className="h-full p-4 space-y-2">
			<SearchInput />
			<Categories data={categories} />
			<Companions data={data} />
		</div>
	)
}

export default RootPage
