'use client'

import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { SignIn as SignInClerk } from '@clerk/nextjs'

export const SignIn = () => {
	const [appearance, setAppearance] = useState({})

	const { theme } = useTheme()

	useEffect(() => {
		if (theme === 'dark') {
			setAppearance({ baseTheme: dark })
		} else {
			setAppearance({})
		}
	}, [theme])
	return <SignInClerk appearance={appearance} />
}
