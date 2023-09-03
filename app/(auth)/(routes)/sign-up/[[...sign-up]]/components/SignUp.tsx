'use client'

import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { SignUp as SignUpClerk } from '@clerk/nextjs'

export const SignUp = () => {
	const [appearance, setAppearance] = useState({})

	const { theme } = useTheme()

	useEffect(() => {
		if (theme === 'dark') {
			setAppearance({ baseTheme: dark })
		} else {
			setAppearance({})
		}
	}, [theme])
	return <SignUpClerk appearance={appearance} />
}
