import { HfInference } from '@huggingface/inference';

// Initialize Hugging Face Inference with token
const HF_TOKEN = process.env.HF_TOKEN || 'hf_dummy_token_for_demo';
const hf = new HfInference(HF_TOKEN);
export async function POST(request: Request) {
	try {
		const { messages } = await request.json();
		const formattedMessages = formatMessages(messages);

		const stream = new ReadableStream({
			async start(controller) {
				try {
					// Use Mistral 7B model
					const response = await hf.textGenerationStream({
						model: 'mistralai/Mistral-7B-Instruct-v0.2',
						inputs: formattedMessages,
						parameters: {
							max_new_tokens: 10000,
							temperature: 0.7,
							repetition_penalty: 1.2,
						},
					});

					console.log('Starting Hugging Face API response stream...');

					// Accumulate text for better streaming experience
					let accumulatedText = '';

					for await (const chunk of response) {
						if (chunk && chunk.token && typeof chunk.token.text === 'string') {
							// Accumulate the text
							accumulatedText += chunk.token.text;

							// Send the accumulated text
							const data = JSON.stringify({ text: accumulatedText });
							controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
						} else {
							console.warn('Invalid chunk format:', chunk);
						}
					}

					// Signal the end of the stream with proper SSE format
					console.log('Ending stream');
					controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
					controller.close();
				} catch (error) {
					console.error('Error in streaming:', error);
					controller.error(error);
				}
			},
		});

		// ✅ CORS headers ni qo'shish
		return new Response(stream, {
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive',
				'Access-Control-Allow-Origin': '*', // ✅ CORS
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // ✅ CORS
				'Access-Control-Allow-Headers': 'Content-Type', // ✅ CORS
			},
		});
	} catch (error) {
		console.error('Error in chat API:', error);
		return new Response(
			JSON.stringify({ error: 'There was an error processing your request' }),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*', // ✅ CORS
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // ✅ CORS
					'Access-Control-Allow-Headers': 'Content-Type', // ✅ CORS
				},
			}
		);
	}
}

type Message = {
	role: 'user' | 'assistant';
	content: string;
};

function formatMessages(messages: Message[]): string {
	// Add system prompt
	const systemPrompt =
		'You are a helpful AI assistant for DevConnect, an IT networking platform. You can help users with networking advice, project ideas, technical questions, and career guidance. Be professional, friendly, and provide specific, actionable advice tailored to IT professionals.';

	// Format messages for Mistral model - simplified format
	let formattedText = `<s>[INST] ${systemPrompt} [/INST]</s>\n\n`;

	for (let i = 0; i < messages.length; i++) {
		const message = messages[i];
		if (message.role === 'user') {
			formattedText += `<s>[INST] ${message.content} [/INST]`;
		} else if (message.role === 'assistant') {
			formattedText += ` ${message.content} </s>\n\n`;
		}
	}

	// If the last message is from a user, close it properly
	if (messages.length > 0 && messages[messages.length - 1].role === 'user') {
		formattedText += ` `;
	}

	return formattedText;
}
