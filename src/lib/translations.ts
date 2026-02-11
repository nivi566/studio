/**
 * @fileOverview Diccionario centralizado de traducciones para InTrack.
 * Soporta Castellano (es), Catalán (ca) e Inglés (en).
 */

export type Language = 'es' | 'ca' | 'en';

export const translations = {
  es: {
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      tracking: 'Seguimiento',
      about: 'Quiénes Somos',
      pickup: 'Puntos de Recogida',
      blog: 'Blog',
      contact: 'Contacto',
      assistant: 'Asistente',
      login: 'Iniciar Sesión',
      profile: 'Mi Perfil',
      invoices: 'Facturas',
      logout: 'Salir'
    },
    hero: {
      title: 'Tu paquete,',
      titleItalic: 'a tu ritmo.',
      subtitle: 'Envíos nacionales e internacionales con la red de lockers más segura y rápida del mercado.',
      badge: 'Servicio 24/7 activo'
    },
    tracking: {
      title: 'Localiza tu envío',
      subtitle: 'Introduce tu código de seguimiento para conocer el estado de tu paquete en tiempo real.',
      placeholder: 'Ej: TRK-001',
      button: 'Buscar',
      searching: 'Buscando...',
      error: 'Código no encontrado. Por favor, verifica tu referencia (Ej: TRK-001).',
      connError: 'Error en la conexión. Por favor, inténtalo de nuevo más tarde.',
      resultsTitle: 'Resultados de tu envío',
      refLabel: 'Referencia de envío',
      statusLabel: 'Estado del paquete',
      origin: 'Origen',
      destination: 'Destino Final',
      location: 'Ubicación Actual',
      eta: 'Fecha Entrega (ETA)',
      states: {
        processing: 'Procesando',
        prepared: 'Preparado',
        shipped: 'Enviado',
        delivered: 'Entregado'
      }
    },
    contact: {
      title: '¿Necesitas ayuda con tu paquete?',
      subtitle: 'Nuestro equipo humano está al otro lado de la tecnología. Escríbenos y te responderemos lo antes posible.',
      infoTitle: 'Información de Contacto',
      hq: 'Sede Operativa',
      support: 'Atención al Cliente',
      phone: 'Teléfono Soporte',
      urgentTitle: '¿Duda urgente?',
      urgentDesc: 'Si has perdido tu código de recogida, recuerda que puedes encontrarlo en el SMS o Email de confirmación.',
      formTitle: 'Cuéntanos qué ocurre',
      name: 'Nombre',
      email: 'Email',
      reason: 'Motivo de la consulta',
      reasonPlaceholder: 'Selecciona una opción',
      reasons: {
        code: 'Problema con mi código / Locker',
        intl: 'Envío Internacional',
        biz: 'Soy un E-commerce / Empresa',
        other: 'Otros asuntos'
      },
      orderId: 'ID de Pedido o Locker (Opcional)',
      message: 'Mensaje',
      messagePlaceholder: '¿En qué podemos ayudarte hoy?',
      submit: 'Contactar ahora'
    },
    services: {
      title: 'Una solución para cada necesidad',
      subtitle: 'La red de lockers inteligentes que se adapta a tu ritmo de vida'
    },
    footer: {
      desc: 'Tu solución de confianza para envíos nacionales e internacionales. Rapidez, seguridad y precios competitivos.',
      newsletter: 'Subscríbete a nuestro boletín',
      newsletterDesc: 'Recibe las últimas noticias y ofertas especiales directamente en tu bandeja de entrada.',
      subscribe: 'Subscribirse',
      rights: 'Todos los derechos reservados.'
    }
  },
  ca: {
    nav: {
      home: 'Inici',
      services: 'Serveis',
      tracking: 'Seguiment',
      about: 'Qui Som',
      pickup: 'Punts de Recollida',
      blog: 'Blog',
      contact: 'Contacte',
      assistant: 'Assistent',
      login: 'Iniciar Sessió',
      profile: 'El meu Perfil',
      invoices: 'Factures',
      logout: 'Sortir'
    },
    hero: {
      title: 'El teu paquet,',
      titleItalic: 'al teu ritme.',
      subtitle: 'Enviaments nacionals i internacionals amb la xarxa de lockers més segura i ràpida del mercat.',
      badge: 'Servei 24/7 actiu'
    },
    tracking: {
      title: 'Localitza el teu enviament',
      subtitle: 'Introdueix el teu codi de seguiment per conèixer l\'estat del teu paquet en temps real.',
      placeholder: 'Ex: TRK-001',
      button: 'Cercar',
      searching: 'Cercant...',
      error: 'Codi no trobat. Si us plau, verifica la teva referència (Ex: TRK-001).',
      connError: 'Error en la connexió. Torna-ho a provar més tard.',
      resultsTitle: 'Resultats del teu enviament',
      refLabel: 'Referència d\'enviament',
      statusLabel: 'Estat del paquet',
      origin: 'Origen',
      destination: 'Destinació Final',
      location: 'Ubicació Actual',
      eta: 'Data Entrega (ETA)',
      states: {
        processing: 'Processant',
        prepared: 'Preparat',
        shipped: 'Enviat',
        delivered: 'Lliurat'
      }
    },
    contact: {
      title: 'Necessites ajuda amb el teu paquet?',
      subtitle: 'El nostre equip humà està a l\'altre costat de la tecnologia. Escriu-nos i et respondrem al més aviat possible.',
      infoTitle: 'Informació de Contacte',
      hq: 'Seu Operativa',
      support: 'Atenció al Client',
      phone: 'Telèfon Suport',
      urgentTitle: 'Dubte urgent?',
      urgentDesc: 'Si has perdut el teu codi de recollida, recorda que el pots trobar al SMS o Email de confirmació.',
      formTitle: 'Explica\'ns què passa',
      name: 'Nom',
      email: 'Email',
      reason: 'Motiu de la consulta',
      reasonPlaceholder: 'Selecciona una opció',
      reasons: {
        code: 'Problema amb el meu codi / Locker',
        intl: 'Enviament Internacional',
        biz: 'Sóc un E-commerce / Empresa',
        other: 'Altres assumptes'
      },
      orderId: 'ID de Comanda o Locker (Opcional)',
      message: 'Missatge',
      messagePlaceholder: 'En què et podem ajudar avui?',
      submit: 'Contactar ara'
    },
    services: {
      title: 'Una solució per a cada necessitat',
      subtitle: 'La xarxa de lockers intel·ligents que s\'adapta al teu ritme de vida'
    },
    footer: {
      desc: 'La teva solució de confiança per enviaments nacionals i internacionals. Rapidesa, seguretat i preus competitius.',
      newsletter: 'Subscriu-te al nostre butlletí',
      newsletterDesc: 'Rep les últimes notícies i ofertes especials directament a la teva bústia.',
      subscribe: 'Subscriure\'s',
      rights: 'Tots els drets reservats.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      tracking: 'Tracking',
      about: 'About Us',
      pickup: 'Pickup Points',
      blog: 'Blog',
      contact: 'Contact',
      assistant: 'Assistant',
      login: 'Login',
      profile: 'My Profile',
      invoices: 'Invoices',
      logout: 'Logout'
    },
    hero: {
      title: 'Your package,',
      titleItalic: 'at your pace.',
      subtitle: 'National and international shipments with the safest and fastest locker network on the market.',
      badge: '24/7 Service active'
    },
    tracking: {
      title: 'Track your shipment',
      subtitle: 'Enter your tracking code to know the current status of your package in real time.',
      placeholder: 'Ex: TRK-001',
      button: 'Search',
      searching: 'Searching...',
      error: 'Code not found. Please verify your reference (Ex: TRK-001).',
      connError: 'Connection error. Please try again later.',
      resultsTitle: 'Shipment results',
      refLabel: 'Shipping Reference',
      statusLabel: 'Package Status',
      origin: 'Origin',
      destination: 'Final Destination',
      location: 'Current Location',
      eta: 'Delivery Date (ETA)',
      states: {
        processing: 'Processing',
        prepared: 'Prepared',
        shipped: 'Shipped',
        delivered: 'Delivered'
      }
    },
    contact: {
      title: 'Need help with your package?',
      subtitle: 'Our human team is on the other side of technology. Write to us and we will respond as soon as possible.',
      infoTitle: 'Contact Information',
      hq: 'Operational HQ',
      support: 'Customer Support',
      phone: 'Support Phone',
      urgentTitle: 'Urgent question?',
      urgentDesc: 'If you have lost your pickup code, remember you can find it in the confirmation SMS or Email.',
      formTitle: 'Tell us what is happening',
      name: 'Name',
      email: 'Email',
      reason: 'Reason for inquiry',
      reasonPlaceholder: 'Select an option',
      reasons: {
        code: 'Problem with my code / Locker',
        intl: 'International Shipment',
        biz: 'I am an E-commerce / Company',
        other: 'Other matters'
      },
      orderId: 'Order or Locker ID (Optional)',
      message: 'Message',
      messagePlaceholder: 'How can we help you today?',
      submit: 'Contact now'
    },
    services: {
      title: 'A solution for every need',
      subtitle: 'The smart locker network that adapts to your lifestyle'
    },
    footer: {
      desc: 'Your trusted solution for national and international shipments. Speed, security, and competitive prices.',
      newsletter: 'Subscribe to our newsletter',
      newsletterDesc: 'Get the latest news and special offers directly in your inbox.',
      subscribe: 'Subscribe',
      rights: 'All rights reserved.'
    }
  }
};
