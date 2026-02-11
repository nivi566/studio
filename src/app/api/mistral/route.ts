import { NextRequest, NextResponse } from 'next/server';
import MistralClient from '@mistralai/mistralai';

// Este es el "cerebro" del asistente. Aquí le damos los datos reales.
const systemPrompt = `
Eres el asistente virtual oficial de InTrack Logistics. 
Tu tarea es ayudar a los usuarios basándote EXCLUSIVAMENTE en estos datos reales:

INFORMACIÓN DE CONTACTO:
- Correo oficial: info@intrack-logistics.cat
- Sede Operativa: Calle Resina, 41, 28021, Madrid, España.
- Teléfono: +34 912 345 678
- Web: https://intrack-logistics.cat/

SERVICIOS:
- Transporte Terrestre, Marítimo y Aéreo.
- Almacenamiento y Distribución.
- Logística Inversa y Soluciones a medida.

INSTRUCCIONES IMPORTANTES:
1. Si te preguntan por contacto, da el email info@intrack-logistics.cat. NUNCA uses correos de outlook, gmail o hotmail.
2. Si preguntan por "Puntos de Recogida", diles que pueden ver el mapa en la sección correspondiente del menú superior.
3. IDIOMA: Responde SIEMPRE en el mismo idioma en el que el usuario te escriba (si te escribe en Inglés, responde en Inglés; si es en Catalán, responde en Catalán), de forma profesional y muy concisa.
4. Si algo no está en esta lista, di: "Lo siento, no tengo esa información detallada, por favor contacta a info@intrack-logistics.cat".
`;

export async function POST(req: NextRequest) {
  try {
    const mistral = new MistralClient(process.env.MISTRAL_API_KEY);
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Mensaje vacío' }, { status: 400 });
    }
    
    const chatResponse = await mistral.chat({
      model: 'mistral-small-latest',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.1, // Temperatura muy baja para que no invente datos
    });

    const reply = chatResponse.choices[0].message.content || "Lo siento, no puedo responder ahora.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Error Mistral:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}