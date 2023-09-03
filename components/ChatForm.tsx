import { ChangeEvent, FC, FormEvent } from 'react'
import { ChatRequestOptions } from 'ai'
import { SendHorizonal } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface IChatFormProps {
	input: string
	handleInputChange: (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => void
	onSubmit: (
		e: FormEvent<HTMLFormElement>,
		chatRequestOptions?: ChatRequestOptions | undefined
	) => void
	isLoading: boolean
}

export const ChatForm: FC<IChatFormProps> = ({
	input,
	handleInputChange,
	onSubmit,
	isLoading
}) => {
	return (
		<form
			onSubmit={onSubmit}
			className="border-t border-primary/10 py-4 flex items-center gap-x-2"
		>
			<Input
				disabled={isLoading}
				value={input}
				onChange={handleInputChange}
				placeholder="Type a message"
				className="rounded-lg bg-primary/10"
			/>
			<Button disabled={isLoading} variant="ghost">
				<SendHorizonal className="w-6 h-6" />
			</Button>
		</form>
	)
}
