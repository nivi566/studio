
import {NextRequest, NextResponse} from 'next/server';
import MistralClient from '@mistralai/mistralai';

const mistral = new MistralClient(process.env.MISTRAL_API_KEY);

type Point = {
  city: string;
  address: string;
};

type Community = {
  community: string;
  points: Point[];
};

export async function POST(req: NextRequest) {
  try {
    const { query, points } = await req.json();

    if (!query || !points) {
      return NextResponse.json(
        { error: 'La consulta y los puntos son obligatorios' },
        { status: 400 }
      );
    }

    const systemPrompt = `
      Ets un assistent expert en filtrar una llista de punts de recollida a Espanya.
      Rebràs una consulta de l'usuari i una llista completa de punts de recollida en format JSON.
      La teva tasca és analitzar la consulta i retornar NOMÉS un objecte JSON que contingui una clau "filteredPoints".
      El valor de "filteredPoints" ha de ser un array d'objectes, on cada objecte representa una comunitat autònoma que coincideix amb la consulta.
      Si la consulta de l'usuari es refereix a una ciutat específica, retorna la comunitat autònoma que conté aquesta ciutat.
      Si la consulta es refereix a una comunitat autònoma, retorna només aquesta comunitat.
      L'estructura de cada objecte dins de l'array ha de ser exactament igual a la de l'entrada, amb la seva clau "community" i el seu array "points".
      No afegeixis cap text, explicació o format addicional. La teva resposta ha de ser exclusivament l'objecte JSON.
      
      Exemple de consulta d'usuari: "Punts a Madrid"
      Resposta JSON esperada:
      {
        "filteredPoints": [
          {
            "community": "Comunidad de Madrid",
            "points": [
              { "city": "Madrid", "address": "Calle Gran Vía, 28, 28013 Madrid" }
            ]
          }
        ]
      }

      Exemple de consulta d'usuari: "Catalunya"
      Resposta JSON esperada:
      {
        "filteredPoints": [
          {
            "community": "Cataluña",
            "points": [
              { "city": "Barcelona", "address": "Passeig de Gràcia, 92, 08008 Barcelona" },
              { "city": "Girona", "address": "Rambla de la Llibertat, 1, 17004 Girona" },
              { "city": "Lleida", "address": "Carrer Major, 3, 25007 Lleida" },
              { "city": "Tarragona", "address": "Rambla Nova, 45, 43003 Tarragona" }
            ]
          }
        ]
      }
    `;

    const userMessage = `
      Consulta de l'usuari: "${query}"
      Llista de punts de recollida:
      ${JSON.stringify(points, null, 2)}
    `;

    const chatResponse = await mistral.chat({
      model: 'mistral-small-latest',
      response_format: { type: "json_object" },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
    });

    if (
      !chatResponse.choices ||
      chatResponse.choices.length === 0 ||
      !chatResponse.choices[0].message.content
    ) {
      return NextResponse.json(
        { error: "No s'ha rebut una resposta vàlida de l'assistent." },
        { status: 500 }
      );
    }
    
    try {
      const result = JSON.parse(chatResponse.choices[0].message.content);
      return NextResponse.json(result);
    } catch (parseError) {
       console.error('Error al parsejar la resposta de Mistral:', parseError);
       return NextResponse.json({ filteredPoints: points });
    }

  } catch (error) {
    console.error('Error a la ruta de filtrar-puntos:', error);
    return NextResponse.json(
      { error: "Ha ocorregut un error intern al servidor." },
      { status: 500 }
    );
  }
}
