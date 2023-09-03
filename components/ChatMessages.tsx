'use client'
import { Companion } from '@prisma/client'
import { ElementRef, FC, useEffect, useRef, useState } from 'react'


import { ChatMessage } from '@/components/ChatMessage'

export interface ChatMessageProps {
	role: 'system' | 'user'
	content?: string
	isLoading?: boolean
	src?: string
}

interface IChatMessagesProps {
	messages: ChatMessageProps[]
	isLoading: boolean
	companion: Companion
}

export const ChatMessages: FC<IChatMessagesProps> = ({
	messages,
	isLoading,
	companion
}) => {
	const scrollRef = useRef<ElementRef<'div'>>(null)

	const [fakeLoading, setFakeLoading] = useState(
		messages.length === 0 ? true : false
	)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setFakeLoading(false)
		}, 1000)

		return () => {
			clearTimeout(timeout)
		}
	}, [])

	useEffect(() => {
		scrollRef?.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages.length])
	return (
		<div className="flex-1 overflow-y-auto pr-4 hide-scrollbar">
			<ChatMessage
				isLoading={fakeLoading}
				src={companion.image.src}
				role="system"
				content={`Hello, I am ${companion.name}, ${companion.description}`}
			/>
			{messages.map((message) => (
				<ChatMessage
					key={message.content}
					src={companion.image.src}
					content={message.content}
					role={message.role}
				/>
			))}
			{isLoading && (
				<ChatMessage src={companion.image.src} role="system" isLoading />
			)}
			<div ref={scrollRef} />
		</div>
	)
}
