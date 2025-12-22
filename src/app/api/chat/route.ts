import {NextRequest, NextResponse} from 'next/server';
import MistralClient from '@mistralai/mistralai';

// Asegúrate de tener MISTRAL_API_KEY en tus variables de entorno
const mistral = new MistralClient(process.env.MISTRAL_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'El missatge és obligatori' }, { status: 400 });
    }

    const systemPrompt = `
      Eres un asistente virtual experto en la información de [https://intrack-logistics.netlify.app/].
      Tu tarea es responder únicamente con información que se encuentre en esa página.
      No inventes datos, ni proporciones ejemplos externos, ni listas genéricas.
      Si la información no está en la web, di claramente: "Lo siento, no tengo esa información en este momento."

      Cuando respondas, sigue estas reglas:
      1. Solo utiliza contenido de la web indicada.
      2. No agregues información externa.
      3. Sé claro, conciso y directo.
      4. Mantén el estilo de la web (tono formal o informal según corresponda).
      5. Evita listas extensas a menos que estén exactamente en la web.
    `;
    
    // Aquí, en una implementación real, se haría una búsqueda semántica
    // en el contenido de la web para pasarlo como contexto al LLM.
    // Por simplicidad, aquí solo pasamos la pregunta del usuario.

    const chatResponse = await mistral.chat({
      model: 'mistral-small-latest',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
    });

    if (chatResponse.choices.length > 0) {
      return NextResponse.json({ reply: chatResponse.choices[0].message.content });
    } else {
      return NextResponse.json({ reply: "Lo siento, no he podido procesar tu solicitud en este momento." });
    }

  } catch (error) {
    console.error('Error en la API de chat:', error);
    return NextResponse.json({ error: 'Ha ocorregut un error intern.' }, { status: 500 });
  }
}