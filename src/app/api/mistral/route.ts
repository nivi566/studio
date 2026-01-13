
import {NextRequest, NextResponse} from 'next/server';
import MistralClient from '@mistralai/mistralai';

const systemPrompt = `
Eres un asistente virtual experto en la información de la página web https://intrack-logistics.netlify.app/.
Tu tarea es responder únicamente con información que se encuentre en esa página.
No inventes datos, ni proporciones ejemplos externos, ni listas genéricas.
Si la información no está en la web, di claramente: "Ho sento, no tinc aquesta informació en aquest moment."

Cuando respondas, sigue estas reglas:
1. Solo utiliza contenido de la web indicada.
2. No agregues información externa.
3. Sé claro, conciso y directo.
4. Mantén el estilo y tono de la web.
5. Responde en catalán.
`;

export async function POST(req: NextRequest) {
  try {
    // Inicialitza el client dins de la funció POST per accedir a les variables d'entorn
    const mistral = new MistralClient(process.env.MISTRAL_API_KEY);

    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'El missatge és obligatori' }, { status: 400 });
    }
    
    const chatResponse = await mistral.chat({
      model: 'mistral-small-latest',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
    });

    if (chatResponse.choices.length > 0 && chatResponse.choices[0].message.content) {
      return NextResponse.json({ reply: chatResponse.choices[0].message.content });
    } else {
      return NextResponse.json({ reply: "Ho sento, no he pogut processar la teva sol·licitud en aquest moment." });
    }

  } catch (error) {
    console.error('Error en la API de Mistral:', error);
    return NextResponse.json({ error: 'Ha ocorregut un error intern.' }, { status: 500 });
  }
}
