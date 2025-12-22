import {NextRequest, NextResponse} from 'next/server';
import MistralClient from '@mistralai/mistralai';

const mistral = new MistralClient(process.env.MISTRAL_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'El missatge és obligatori' }, { status: 400 });
    }
    
    const chatResponse = await mistral.chat({
      model: 'mistral-small-latest',
      messages: [
        { role: 'user', content: message }
      ],
    });

    if (chatResponse.choices.length > 0) {
      return NextResponse.json({ reply: chatResponse.choices[0].message.content });
    } else {
      return NextResponse.json({ reply: "Lo siento, no he podido procesar tu solicitud en este momento." });
    }

  } catch (error) {
    console.error('Error en la API de Mistral:', error);
    return NextResponse.json({ error: 'Ha ocorregut un error intern.' }, { status: 500 });
  }
}
