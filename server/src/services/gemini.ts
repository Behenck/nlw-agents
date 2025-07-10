import { GoogleGenAI } from '@google/genai'
import { env } from '../env.ts'

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
})

const model = 'gemini-2.5-flash'

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcreva o áudio para português do Brasil. Seja preciso e natural na transcrição. Mantenha a pontuação adequada e divida o texto em parágrafos quando for apropriado',
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  })

  if (!response.text) {
    throw new Error('Não foi possível fazer a transcrição')
  }

  return response.text
}

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT',
    },
  })

  if (!response.embeddings?.[0].values) {
    throw new Error('Não foi possível gerar os embeddings!')
  }

  return response.embeddings[0].values
}

export async function generateAnswer(
  question: string,
  transcriptions: string[]
) {
  const context = transcriptions.join('\n\n')

  const prompt = `
  Você é um assistente inteligente que responde perguntas com base em um contexto fornecido.Com base no texto fornecido abaixo como contexto, responda a pergunta de fomra clara e precisa em português Brasil.
  Contexto:
  ${context}
  Pergunta:
  ${question}
  Instruções:
  - Use apenas informações do contexto fornecido.
  - Se a resposta não estiver no contexto, diga "Desculpe, não sei a resposta para isso."
  - Seja claro e direto na resposta.
  - Mantenha um tom amigável e profissional.
  - Cite trechos do contexto quando necessário.
  - Se for citar o contexto, utilize o termo "Conteúdo da aula"
  `.trim()

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  })

  if (!response.text) {
    throw new Error('Não foi possível gerar a resposta')
  }
  return response.text
}
