// src/app/api/chat/route.ts
import {NextRequest, NextResponse} from 'next/server';
import MistralClient from '@mistralai/mistralai';

const mistral = new MistralClient(process.env.MISTRAL_API_KEY);

const systemPrompt = `Eres un asistente virtual experto en la información de [https://intrack-logistics.netlify.app/]. 
Tu tarea es responder únicamente con información que se encuentre en esa página. 
No inventes datos, ni proporciones ejemplos externos, ni listas genéricas. 
Si la información no está en la web, di claramente: "Lo siento, no tengo esa información en este momento."

Cuando respondas, sigue estas reglas:
1. Solo utiliza contenido de la web indicada.
2. No agregues información externa.
3. Sé claro, conciso y directo.
4. Mantén el estilo de la web (tono formal o informal según corresponda).
5. Evita listas extensas a menos que estén exactamente en la web.`;

export async function POST(req: NextRequest) {
  try {
    const {message} = await req.json();

    if (!message) {
      return NextResponse.json(
        {error: 'El missatge és obligatori'},
        {status: 400}
      );
    }

    const chatResponse = await mistral.chat({
      model: 'mistral-small-latest',
      messages: [
        {role: 'system', content: systemPrompt},
        {role: 'user', content: message},
      ],
    });

    if (
      !chatResponse.choices ||
      chatResponse.choices.length === 0 ||
      !chatResponse.choices[0].message.content
    ) {
      return NextResponse.json(
        {error: "No s'ha rebut una resposta vàlida de l'assistent."},
        {status: 500}
      );
    }

    return NextResponse.json({
      reply: chatResponse.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error a la ruta de Mistral:', error);
    return NextResponse.json(
      {error: 'Ha ocorregut un error intern al servidor.'},
      {status: 500}
    );
  }
}
