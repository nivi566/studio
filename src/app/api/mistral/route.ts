import { NextRequest, NextResponse } from 'next/server';
import MistralClient from '@mistralai/mistralai';

// Este es el "cerebro" del asistente. Se ha añadido soporte oficial para Francés (FR).
const systemPrompt = `
Eres el asistente virtual oficial de InTrack Logistics. 
Tu tarea es ayudar a los usuarios basándote EXCLUSIVAMENTE en estos datos reales:

INFORMACIÓN DE CONTACTO / CONTACT:
- Correo oficial: info@intrack-logistics.cat
- Sede Operativa / Siège: Calle Resina, 41, 28021, Madrid, España.
- Teléfono: +34 912 345 678
- Web: https://intrack-logistics.cat/

SERVICIOS / SERVICES:
- Transporte Terrestre, Marítimo y Aéreo (Transport Routier, Maritime et Aérien).
- Almacenamiento y Distribución (Entreposage et Distribution).
- Logística Inversa y Soluciones a medida (Logistique Inverse et Solutions sur mesure).

INSTRUCCIONES IMPORTANTES:
1. Si te preguntan por contacto, da el email info@intrack-logistics.cat. NUNCA uses correos de gmail, outlook o similares.
2. Si preguntan por "Puntos de Recogida" (Points de Collecte), diles que pueden ver el mapa en la sección correspondiente del menú superior.
3. IDIOMA: Responde SIEMPRE en el mismo idioma en el que el usuario te escriba (Español, Catalán, Inglés o FRANCÉS). Sé profesional y muy conciso.
4. Si algo no está en esta lista, responde según el idioma del usuario:
   - ES: "Lo siento, no tengo esa información detallada, por favor contacta a info@intrack-logistics.cat".
   - FR: "Désolé, je n'ai pas d'informations détaillées à ce sujet, veuillez contacter info@intrack-logistics.cat".
   - EN: "Sorry, I don't have detailed information on this, please contact info@intrack-logistics.cat".
   - CA: "Ho sento, no tinc aquesta informació detallada, si us plau contacta amb info@intrack-logistics.cat".
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
      temperature: 0.1, // Temperatura baja para evitar alucinaciones
    });

    const reply = chatResponse.choices[0].message.content || "Lo siento, no puedo responder ahora.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Error Mistral:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}