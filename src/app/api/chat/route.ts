// src/app/api/chat/route.ts
import {NextRequest, NextResponse} from 'next/server';
import MistralClient from '@mistralai/mistralai';

const mistral = new MistralClient(process.env.MISTRAL_API_KEY);

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
      messages: [{role: 'user', content: message}],
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
      {error: "Ha ocorregut un error intern al servidor."},
      {status: 500}
    );
  }
}
