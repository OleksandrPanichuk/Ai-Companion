"use client"

import { Companion, Message } from '@prisma/client'
import { FC, FormEvent, useState } from 'react'
import { useCompletion } from 'ai/react'

import { ChatHeader } from '@/components/ChatHeader'
import { useRouter } from 'next/navigation'
import { ChatMessages, ChatMessageProps } from '@/components/ChatMessages'
import { ChatForm } from '@/components/ChatForm'

interface IChatClientProps {
	companion: Companion & { messages: Message[]; _count: { messages: number } }
}
export const ChatClient: FC<IChatClientProps> = ({ companion }) => {
	const router = useRouter()
	const [messages, setMessages] = useState<any[]>(companion.messages)

	const { input, isLoading, handleInputChange, handleSubmit, setInput } =
		useCompletion({
			api: `/api/chat/${companion.id}`,
			onFinish(_prompt, completion) {
				const systemMessage: ChatMessageProps = {
					role: 'system',
					content: completion
				}

				setMessages((current) => [...current, systemMessage])
				setInput('')

				router.refresh()
			}
		})

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		const userMessage = {
			role: 'user',
			content: input
		}
		setMessages((current) => [...current, userMessage])

		handleSubmit(event)
	}

	return (
		<div className="flex flex-col h-full p-4 space-y-2">
			<ChatHeader companion={companion} />
			<ChatMessages
				isLoading={isLoading}
				companion={companion}
				messages={messages}
			/>
			<ChatForm
				isLoading={isLoading}
				input={input}
				handleInputChange={handleInputChange}
				onSubmit={onSubmit}
			/>
		</div>
	)
}
