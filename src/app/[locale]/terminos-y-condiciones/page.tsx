

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function TermsAndConditionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Términos y Condiciones de Uso
            </h1>
            <p className="mt-4 text-muted-foreground">
              Última actualización: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90 prose-headings:text-foreground prose-p:leading-relaxed prose-a:text-primary prose-strong:text-foreground">
            <p>
              Bienvenido a InTrack. Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de InTrack, ubicado en [URL del sitio web].
            </p>
            <p>
              Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando InTrack si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.
            </p>

            <h2 className="mt-8">1. Introducción</h2>
            <p>
              Estos Términos y Condiciones de Uso rigen el acceso y la utilización de los servicios ofrecidos por InTrack a través de su sitio web. El usuario se compromete a leer y aceptar los presentes términos antes de utilizar los servicios.
            </p>

            <h2 className="mt-8">2. Servicios Ofrecidos</h2>
            <p>
              InTrack ofrece servicios de logística y paquetería, incluyendo, pero no limitándose a, envíos nacionales e internacionales, seguimiento de paquetes, soluciones de e-commerce y puntos de recogida. Las características y tarifas específicas de cada servicio se detallan en las secciones correspondientes del sitio web.
            </p>

            <h2 className="mt-8">3. Obligaciones del Usuario</h2>
            <p>
              El usuario se compromete a:
            </p>
            <ul>
              <li>Proporcionar información veraz, precisa y actualizada al utilizar nuestros servicios, especialmente en lo que respecta a las direcciones de origen y destino, y los detalles del contenido del paquete.</li>
              <li>No utilizar los servicios de InTrack para enviar artículos prohibidos o ilegales según la legislación vigente y nuestras políticas internas.</li>
              <li>Embalar adecuadamente los envíos para garantizar su integridad durante el transporte.</li>
              <li>Realizar el pago de los servicios contratados según las tarifas y métodos de pago establecidos.</li>
            </ul>

            <h2 className="mt-8">4. Propiedad Intelectual</h2>
            <p>
              Todo el contenido incluido en este sitio web, como textos, gráficos, logotipos, iconos de botones, imágenes y software, es propiedad de InTrack o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual.
            </p>

            <h2 className="mt-8">5. Limitación de Responsabilidad</h2>
            <p>
              InTrack no será responsable de retrasos, pérdidas o daños causados por fuerza mayor, información incorrecta proporcionada por el usuario o un embalaje inadecuado. La responsabilidad de InTrack se limitará al valor estipulado en el seguro básico incluido en el envío o el seguro adicional contratado por el usuario.
            </p>

            <h2 className="mt-8">6. Modificaciones de los Términos</h2>
            <p>
              InTrack se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web. Se recomienda al usuario revisar esta página periódicamente para estar al tanto de cualquier cambio.
            </p>
            
            <h2 className="mt-8">7. Legislación Aplicable y Jurisdicción</h2>
            <p>
              Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de España. Cualquier disputa que surja en relación con estos términos y condiciones estará sujeta a la jurisdicción exclusiva de los tribunales de Madrid.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
