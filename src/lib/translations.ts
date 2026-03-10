/**
 * @fileOverview Diccionario centralizado de traducciones para InTrack.
 * Soporta Castellano (es), Catalán (ca), Inglés (en) y Francés (fr).
 */

export type Language = 'es' | 'ca' | 'en' | 'fr';

export const translations = {
  es: {
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      tracking: 'Seguimiento',
      orders: 'Pedidos',
      place_order: 'Haz tu pedido',
      returns: 'Devoluciones',
      booking: 'Solicitar Servicio',
      about: 'Quiénes Somos',
      pickup: 'Puntos de Recogida',
      blog: 'Blog',
      contact: 'Contacto',
      assistant: 'Asistente',
      login: 'Iniciar Sesión',
      profile: 'Mi Perfil',
      invoices: 'Facturas',
      my_orders: 'Mis pedidos',
      my_albaranes: 'Albaranes',
      reserve: 'Reservar',
      logout: 'Salir'
    },
    booking: {
      title: 'Solicitud de Servicio',
      subtitle: 'Gestiona tus necesidades de transporte y almacenaje de forma rápida.',
      formTitle: 'Nueva Solicitud',
      serviceLabel: 'Tipo de Servicio',
      originLabel: 'Origen',
      destLabel: 'Destino',
      cargoLabel: 'Detalles de la Carga',
      cargoPlaceholder: 'Pesos, medidas, cantidad de bultos...',
      submit: 'Enviar Solicitud',
      historyTitle: 'Mis Solicitudes',
      noHistory: 'Aún no has realizado ninguna solicitud.',
      pending: 'Pendiente',
      approved: 'Aprobado',
      rejected: 'Rechazado'
    },
    hero: {
      title: 'Tu paquete,',
      titleItalic: 'a tu ritmo.',
      subtitle: 'Envíos nacionales e internacionales con la red de lockers más segura y rápida del mercado.',
      badge: 'Servicio 24/7 activo'
    },
    services: {
      title: 'Una solución para cada necesidad',
      subtitle: 'La red de lockers inteligentes que se adapta a tu ritmo de vida',
      items: {
        reception: {
          title: 'Recepción de paquetería nacional',
          desc: 'Tu paquete está protegido en nuestras taquillas de alta seguridad hasta que tú lo retires.',
          detail: {
            title: 'Recepción de paquetería nacional',
            intro: 'Tu tranquilidad es nuestra priority. Por eso, tu paquete está protegido desde que llega a nuestras manos hasta que tú lo retires.',
            f1: 'Custodia Blindada:',
            f1d: 'Tu paquete se almacena en taquillas de alta seguridad con vigilancia.',
            f2: 'Notification Instantánea:',
            f2d: 'Garantizamos el aviso inmediato vía App/SMS en cuanto tu pedido es depositado.',
            f3: 'Garantía 24/7:',
            f3d: 'Acceso total en el momento que decidas.',
            footer: 'Compra con la confianza de que tus pedidos están en las mejores manos.'
          }
        },
        intl: {
          title: 'Compras Internacionales',
          desc: 'Compra en cualquier tienda del mundo y recibe tus paquetes de forma segura.',
          detail: {
            title: 'Compras Internacionales',
            intro: 'Compra en tus tiendas favoritas de EE.UU., China o Europa y recíbelo aquí.',
            f1: 'Dirección Global:',
            f1d: 'Compra como si vivieras allí y nosotros lo traemos.',
            f2: 'Consolidation:',
            f2d: 'Agrupamos varias compras en un solo envío para que ahorres.',
            f3: 'Aduanas:',
            f3d: 'Tramitamos los impuestos y aranceles por ti.',
            footer: 'Expande tus posibilidades de compra sin fronteras.'
          }
        },
        b2b: {
          title: 'Soluciones B2B y E-commerce',
          desc: 'Optimizamos la logística de tu negocio con integraciones personalizadas.',
          detail: {
            title: 'Soluciones B2B y E-commerce',
            intro: 'Impulsa la logística de tu negocio con herramientas diseñadas para crecer.',
            f1: 'Integración API:',
            f1d: 'Conecta tu tienda online directamente con nuestra red.',
            f2: 'Tarifas Corporativas:',
            f2d: 'Precios preferenciales basados en tu volumen mensual.',
            f3: 'Logística Inversa:',
            f3d: 'Gestiona devoluciones de forma sencilla.',
            footer: 'Impulsa tu negocio con un socio que entiende tus necesidades.'
          }
        },
        urgent: {
          title: 'Envíos Urgentes 24h',
          desc: 'La solución más rápida para tus envíos más importantes.',
          detail: {
            title: 'Envíos Urgentes 24h',
            intro: 'Garantizamos la entrega de tu paquete en cualquier punto en un plazo máximo de 24 horas.',
            f1: 'Máxima Prioridad:',
            f1d: 'Tratamiento preferente en todos nuestros procesos.',
            f2: 'Entrega Siguiente Día:',
            f2d: 'Recogemos y entregamos en el siguiente día laborable.',
            f3: 'Seguimiento Total:',
            f3d: 'No perdis de vista tu envío ni un segundo.',
            footer: 'Perfecto para documentos importantes o regalos de última hora.'
          }
        },
        tracking: {
          title: 'Seguimiento en Tiempo Real',
          desc: 'Controla la ubicación de tu paquete en cada momento.',
          detail: {
            title: 'Seguimiento en Tiempo Real',
            intro: 'Ten el control total sobre tu envío con nuestra tecnología de seguimiento avanzada.',
            f1: 'Mapa Interactivo:',
            f1d: 'Observa el progreso de tu envío visualmente.',
            f2: 'Actualizaciones:',
            f2d: 'Notificaciones automáticas en cada punto clave.',
            f3: 'ETA Dinámico:',
            f3d: 'Estimación de entrega actualizada según el tráfico.',
            footer: 'Incluido en todos nuestros servicios sin coste adicional.'
          }
        },
        pricing: {
          title: 'Tarifas',
          desc: 'Consulta nuestros precios competitivos para todo tipo de envíos.',
          detail: {
            title: 'Nuestras Tarifas',
            intro: 'Ofrecemos una estructura de precios transparente para que siempre sepas cuánto te costará.',
            f1: 'Precios Claros:',
            f1d: 'Tarifas ajustadas para cada necesidad.',
            f2: 'Calculadora Online:',
            f2d: 'Obtén un presupuesto al instante.',
            f3: 'Sin Sorpresas:',
            f3d: 'El precio que ves incluye seguimiento y seguro básico.',
            footer: 'Consulta nuestra página de tarifas para ver todos los detalles.',
            cta: 'Ver Tarifas'
          }
        }
      }
    },
    howItWorks: {
      title: 'Recoger tus compras nunca fue tan fácil',
      subtitle: 'En solo cuatro sencillos pasos, tu envío estará en camino.',
      steps: [
        { title: 'Regístrate', desc: 'Contacta con nosotros y selecciona tu punto InTrack.' },
        { title: 'Compra online', desc: 'Selecciona la opción de envío que mejor se adapte a ti.' },
        { title: 'Recibe tu código', desc: 'Te avisaremos al móvil cuando tu paquete esté en el locker.' },
        { title: 'Recoge cuando quieras', desc: 'Escanea tu código las 24h y llévate tu paquete.' }
      ],
      stepLabel: 'Paso'
    },
    competitiveAdvantages: {
      sectionTitle: '¿Por qué elegir InTrack?',
      agilityTitle: 'Logística flexible',
      agilityDesc: 'Nos adaptamos a las necesidades específicas de tu mercancía y a tu ritmo de ventas, sin estructuras rígidas.',
      humanTitle: 'Atención Personalizada',
      humanDesc: 'Soporte real por expertos logísticos. Hablamos de persona a persona, sin bots.',
      securityTitle: 'Seguridad Garantizada',
      securityDesc: 'Tus envíos están protegidos con seguros premium y custodia blindada en lockers.',
      visibilityTitle: 'Visibilidad Total',
      visibilityDesc: 'Tracking preciso en tiempo real y transparencia absoluta en tus costes operativos.',
    },
    blogSection: {
      title: 'Nuestro Blog',
      subtitle: 'Mantente al día con las últimas noticias y consejos del sector.',
      cta: 'Ver todos los artículos',
      readMore: 'Leer más'
    },
    testimonials: {
      title: 'Lo que dicen nuestros clientes',
      subtitle: 'La confianza y satisfacción de nuestros usuarios basada en soluciones innovadoras.',
      items: [
        { name: 'Ana García', role: 'Cliente Particular', quote: 'Por fin he dejado de perseguir repartidores. Recojo mis compras al salir del gimnasio, incluso a medianoche.' },
        { name: 'Carlos Rodríguez', role: 'Comprador Internacional', quote: 'Compro mucho en EE.UU. y Asia. Ahora sé que mi paquete me espera seguro en una taquilla blindada.' },
        { name: 'Elena Martínez', role: 'E-commerce Manager', quote: 'Integrar el widget de InTrack ha reducido las entregas fallidas a cero. Un salto de calidad para nuestra logística.' }
      ]
    },
    pricingPage: {
      title: 'Nuestras tarifas',
      subtitle: 'Elige el plan que mejor se adapte a tus necesidades. Precios claros y sin sorpresas.',
      tiers: {
        national: {
          name: 'Nacional',
          details: 'por envío estándar',
          desc: 'Ideal para envíos no urgentes dentro del territorio.',
          features: ['Entrega 48/72h', 'Seguimiento incluido', 'Cobertura total', 'Seguro básico'],
          cta: 'Comenzar ahora'
        },
        express: {
          name: 'Express 24h',
          details: 'por envío urgente',
          desc: 'Cuando el tiempo es un factor clave.',
          features: ['Entrega garantizada 24h', 'Seguimiento prioritario', 'Recogida preferente', 'Avisos por SMS'],
          cta: 'Seleccionar Express',
          popular: 'Más Popular'
        },
        intl: {
          name: 'Internacional',
          details: 'según destino y peso',
          desc: 'Conecta con el mundo con tarifas competitivas.',
          features: ['Europa en 3-5 días', 'Gestión de aduanas', 'Red global', 'Seguimiento completo'],
          cta: 'Calcular envío',
          priceText: 'Consultar'
        }
      }
    },
    returnsPage: {
      title: 'Devoluciones',
      subtitle: 'Portal de devoluciones. Solicita el retorno de tu pedido de forma fácil y rápida.',
      companyLabel: 'Empresa donde compraste',
      refLabel: 'Nº de Pedido / Referencia',
      nameLabel: 'Tu Nombre Completo',
      dniLabel: 'DNI / NIE',
      emailLabel: 'Email de contacto',
      submit: 'Autorizar Devolución',
      sending: 'Enviando...',
      successTitle: '¡Solicitud Recibida!',
      successMsg: 'Hemos registrado tu solicitud de devolución correctamente. Recibirás un email con los siguientes pasos en breve.',
      retry: 'Registrar otra devolución'
    },
    aboutPage: {
      heroTitle: 'Conectando tu mundo, un envío a la vez',
      heroSubtitle: 'Somos un equipo apasionado por la innovación, la eficiencia y las personas.',
      storyTitle: 'Nuestra Historia',
      storyP1: 'InTrack nació de una idea simple: hacer que la logística fuera más inteligente y accesible.',
      storyP2: 'Hoy ofrecemos soluciones innovadoras con taquillas inteligentes y códigos QR.',
      storyP3: 'Somos un referente en el sector con soluciones nacionales e internacionales.',
      missionTitle: 'Nuestra Misión',
      missionDesc: 'Proveer soluciones logísticas que impulsen el éxito de nuestros clientes con tecnología y fiabilidad.',
      visionTitle: 'Nuestra Visión',
      visionDesc: 'Ser el líder global en logística inteligente, sostenibles y eficientes.',
      valuesTitle: 'Nuestros Valores',
      valuesSubtitle: 'Los principios que guían nuestras decisiones.',
      values: {
        v1: 'Velocidad',
        v1d: 'Nos obsesiona la rapidez y optimización de rutes.',
        v2: 'Fiabilidad',
        v2d: 'Tu confianza es nuestro mayor activo.',
        v3: 'Cercanía',
        v3d: 'Ofrecemos un trato humano y personalizado.',
        v4: 'Alcance Global',
        v4d: 'Conectamos tu mundo sin fronteras.'
      }
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
    ordersPage: {
      title: 'Registra tu envío',
      subtitle: 'Notifica la llegada de un paquete a nuestras instalaciones para su gestión en Locker.',
      senderTitle: 'Datos del Remitente',
      senderDesc: 'Información de la empresa que realiza el envío.',
      companyLabel: 'Nombre de la Empresa',
      trackingLabel: 'Referencia / Tracking Interno',
      recipientTitle: 'Datos del Cliente Final',
      recipientDesc: 'Información para la recogida en el Locker.',
      clientNameLabel: 'Nombre del Destinatario',
      clientDniLabel: 'DNI / NIE',
      clientEmailLabel: 'Email de Contacto',
      helpText: 'El cliente recibirá un email automático con su código de acceso cuando el paquete llegue al locker.',
      submitButton: 'Registrar Pedido Ahora'
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
    login: {
      title: 'Iniciar Sesión',
      subtitle: 'Accede a tu área privada.',
      email: 'Correo electrónico',
      password: 'Contraseña',
      button: 'Entrar',
      entering: 'Entrando...',
      back: 'Volver al inicio',
      errorRequired: 'El correo electrónico y la contraseña son obligatorios.',
      errorInvalid: 'Datos incorrectos. Verifica tu correo y contraseña.',
      errorServer: 'Ha ocurrido un error inesperado o de conexión.'
    },
    footer: {
      desc: 'Tu solución de confianza para envíos nacionales e internacionales. Rapidez, seguridad y precios competitivos.',
      newsletter: 'Subscríbete a nuestro boletín',
      newsletterDesc: 'Recibe las últimas noticias y ofertas especiales directamente en tu bandeja de entrada.',
      subscribe: 'Subscribirse',
      rights: 'Todos los derechos reservados.',
      sections: {
        services: 'Servicios',
        company: 'Compañía',
        legal: 'Legal'
      }
    }
  },
  ca: {
    nav: {
      home: 'Inici',
      services: 'Serveis',
      tracking: 'Seguiment',
      orders: 'Comandes',
      place_order: 'Fes la teva comanda',
      returns: 'Devolucions',
      booking: 'Sol·licitar Servei',
      about: 'Qui Som',
      pickup: 'Punts de Recollida',
      blog: 'Blog',
      contact: 'Contacte',
      assistant: 'Assistent',
      login: 'Iniciar Sessió',
      profile: 'El meu Perfil',
      invoices: 'Factures',
      my_orders: 'Les meves comandes',
      my_albaranes: 'Albarans',
      reserve: 'Reservar',
      logout: 'Sortir'
    },
    booking: {
      title: 'Sol·licitud de Servei',
      subtitle: 'Gestiona les teves necessitats de transport i magatzem de forma ràpida.',
      formTitle: 'Nova Sol·licitud',
      serviceLabel: 'Tipus de Servei',
      originLabel: 'Origen',
      destLabel: 'Destí',
      cargoLabel: 'Detalls de la Càrrega',
      cargoPlaceholder: 'Pesos, mides, quantitat de bultos...',
      submit: 'Enviar Sol·licitud',
      historyTitle: 'Les meves sol·licituds',
      noHistory: 'Encara no has realitzat cap sol·licitud.',
      pending: 'Pendent',
      approved: 'Aprovat',
      rejected: 'Rebutjat'
    },
    hero: {
      title: 'El teu paquet,',
      titleItalic: 'al teu ritme.',
      subtitle: 'Enviaments nacionals i internacionals amb la xarxa de lockers més segura i ràpida del mercat.',
      badge: 'Servei 24/7 actiu'
    },
    services: {
      title: 'Una solució per a cada necessitat',
      subtitle: 'La xarxa de lockers intel·ligents que s\'adapta al teu ritme de vida',
      items: {
        reception: {
          title: 'Recepció de paqueteria nacional',
          desc: 'El teu paquet està protegit a les nostres taquilles d\'alta seguretat fins que el retiris.',
          detail: {
            title: 'Recepció de paqueteria nacional',
            intro: 'La teva tranquil·litat és la nostra prioritat. El teu paquet està protegit des que arriba fins que el reculls.',
            f1: 'Custòdia Blindada:',
            f1d: 'El paquet s\'emmagatzema en taquilles d\'alta seguretat amb vigilància.',
            f2: 'Notificació Instantània:',
            f2d: 'Avís immediat via App/SMS quan la teva comanda és dipositada.',
            f3: 'Garantia 24/7:',
            f3d: 'Accés total en el moment que decideixis.',
            footer: 'Compra amb la confiança que les teves comandes estan en les millors mans.'
          }
        },
        intl: {
          title: 'Compres Internacionals',
          desc: 'Compra a qualsevol botiga del món i rep els teus paquets de forma segura.',
          detail: {
            title: 'Compres Internacionals',
            intro: 'Compra a les teves botigues preferides d\'EUA, Xina o Europa i rep-ho aquí.',
            f1: 'Adreça Global:',
            f1d: 'Compra com si voguessis allà i nosaltres ho portem.',
            f2: 'Consolidació:',
            f2d: 'Agrupem diverses compres en un sol enviament perquè estalviïs.',
            f3: 'Duanes:',
            f3d: 'Tramitem els impostos i aranzels per tu.',
            footer: 'Expandeix les teves possibilitats de compra sense fronteres.'
          }
        },
        b2b: {
          title: 'Solucions B2B i E-commerce',
          desc: 'Optimitzem la logística del teu negoci amb integracions personalitzades.',
          detail: {
            title: 'Solucions B2B i E-commerce',
            intro: 'Impulsa la logística del teu negoci amb eines dissenyades per créixer.',
            f1: 'Integració API:',
            f1d: 'Connecta la teva botiga online directament amb la nostra xarxa.',
            f2: 'Tarifes Corporatives:',
            f2d: 'Preus preferencials basats en el teu volum mensual.',
            f3: 'Logística Inversa:',
            f3d: 'Gestiona devolucions de forma senzilla.',
            footer: 'Impulsa el teu negoci amb un soci que entén les teves necessitats.'
          }
        },
        urgent: {
          title: 'Enviaments Urgents 24h',
          desc: 'La solució més ràpida per als teus enviaments més importants.',
          detail: {
            title: 'Enviaments Urgents 24h',
            intro: 'Garantim el lliurament del teu paquet en qualsevol punt en un termini màxim de 24 hores.',
            f1: 'Máxima Prioritat:',
            f1d: 'Tractament preferent en tots els nostres processos.',
            f2: 'Lliurament Següent Dia:',
            f2d: 'Recollim i lliurem el següent dia laborable.',
            f3: 'Seguiment Total:',
            f3d: 'No perdis de vista el teu enviament ni un segon.',
            footer: 'Perfecte per a documents importants o regals d\'última hora.'
          }
        },
        tracking: {
          title: 'Seguiment en Temps Real',
          desc: 'Controla la ubicació del teu paquet en cada moment.',
          detail: {
            title: 'Seguiment en Temps Real',
            intro: 'Tingues el control total sobre el teu enviament amb tecnologia avançada.',
            f1: 'Mapa Interactiu:',
            f1d: 'Observa el progrés de l\'enviament visualment.',
            f2: 'Actualizaciones:',
            f2d: 'Notificaciones automàtiques en cada punt clau.',
            f3: 'ETA Dinàmic:',
            f3d: 'Estimació de lliurament actualitzada segons el trànsit.',
            footer: 'Inclòs en tots els nostres serveis sense cost addicional.'
          }
        },
        pricing: {
          title: 'Tarifes',
          desc: 'Consulta els nostres preus competitius per a tot tipus d\'enviaments.',
          detail: {
            title: 'Les nostres Tarifes',
            intro: 'Oferim una estructura de preus transparent perquè sempre sàpigues quant et costarà.',
            f1: 'Preus Clars:',
            f1d: 'Tarifes ajustades per a cada necessitat.',
            f2: 'Calculadora Online:',
            f2d: 'Obté un pressupost a l\'instant.',
            f3: 'Sense Sorpreses:',
            f3d: 'El preu que veus inclou seguiment i assegurança bàsica.',
            footer: 'Consulta la nostra pàgina de tarifes per veure tots els detalls.',
            cta: 'Veure Tarifes'
          }
        }
      }
    },
    howItWorks: {
      title: 'Recollir les teves compres mai ha estat tan fàcil',
      subtitle: 'En només quatre senzills passos, el teu enviament estarà en camí.',
      steps: [
        { title: 'Registra\'t', desc: 'Contacta amb nosaltres i selecciona el teu punt InTrack.' },
        { title: 'Compra online', desc: 'Selecciona l\'opció d\'enviament que millor s\'adapti a tu.' },
        { title: 'Rep el teu codi', desc: 'T\'avisarem al mòbil quan el paquet estigui al locker.' },
        { title: 'Recull quan vulguis', desc: 'Escaneja el codi les 24h i emporta\'t el paquet.' }
      ],
      stepLabel: 'Pas'
    },
    competitiveAdvantages: {
      sectionTitle: 'Per què triar InTrack?',
      agilityTitle: 'Logística flexible',
      agilityDesc: 'Ens adaptem a las necessitats específiques de la teva mercaderia i al teu ritme de vendes, sense estructures rígidies.',
      humanTitle: 'Atenció Personalizada',
      humanDesc: 'Suport real per experts logístics. Parlem de persona a persona, sense bots.',
      securityTitle: 'Seguridad Garantizada',
      securityDesc: 'Els teus enviaments estan protegits amb assegurances premium i custòdia blindada.',
      visibilityTitle: 'Visibilidad Total',
      visibilityDesc: 'Tracking precís en temps real i transparència absoluta en els teus costos operatius.',
    },
    blogSection: {
      title: 'El nostre Blog',
      subtitle: 'Mantén-te al dia amb les últimes notícies i consells del sector.',
      cta: 'Veure tots els articles',
      readMore: 'Llegir més'
    },
    testimonials: {
      title: 'El que diuen els nostres clients',
      subtitle: 'La confiança i satisfacció dels nostres usuaris basada en solucions innovadores.',
      items: [
        { name: 'Ana García', role: 'Client Particular', quote: 'Per fi he deixat de perseguir repartidors. Recullo les compres en sortir del gimnàs, fins i tot a mitjanit.' },
        { name: 'Carlos Rodríguez', role: 'Comprador Internacional', quote: 'Compro molt a EUA i Àsia. Ara sé que el meu paquet m\'espera segur en una taquilla blindada.' },
        { name: 'Elena Martínez', role: 'E-commerce Manager', quote: 'Integrar el giny d\'InTrack ha reduït els lliuraments fallits a zero. Un salto de qualitat per a la nostra logística.' }
      ]
    },
    pricingPage: {
      title: 'Les nostres tarifes',
      subtitle: 'Tria el pla que millor s\'adapti a les teves necessitats. Preus clars i sense sorpreses.',
      tiers: {
        national: {
          name: 'Nacional',
          details: 'per enviament estàndard',
          desc: 'Ideal per enviaments no urgents dins del territori.',
          features: ['Lliurament 48/72h', 'Seguiment inclòs', 'Cobertura total', 'Assegurança bàsica'],
          cta: 'Començar ara'
        },
        express: {
          name: 'Express 24h',
          details: 'per enviament urgent',
          desc: 'Quan el temps és un factor clave.',
          features: ['Lliurament garantit 24h', 'Seguiment prioritari', 'Recollida preferent', 'Avisos per SMS'],
          cta: 'Seleccionar Express',
          popular: 'Més Popular'
        },
        intl: {
          name: 'Internacional',
          details: 'segons destí i pes',
          desc: 'Connecta amb el món amb tarifes competitives.',
          features: ['Europa en 3-5 dies', 'Gestió de duanes', 'Xarxa global', 'Seguiment complet'],
          cta: 'Calcular enviament',
          priceText: 'Consultar'
        }
      }
    },
    returnsPage: {
      title: 'Devolucions',
      subtitle: 'Portal de devolucions. Sol·licita el retorn de la teva comanda de forma fàcil i ràpida.',
      companyLabel: 'Empresa on vas comprar',
      refLabel: 'Núm. de Comanda / Referència',
      nameLabel: 'El teu Nom Complet',
      dniLabel: 'DNI / NIE',
      emailLabel: 'Email de contacte',
      submit: 'Autoritzar Devolució',
      sending: 'Enviant...',
      successTitle: 'Sol·licitud Rebuda!',
      successMsg: 'Hem registrat la teva sol·licitud de devolució correctament. Rebràs un email amb els passos a seguir ben aviat.',
      retry: 'Registrar una altra devolució'
    },
    aboutPage: {
      heroTitle: 'Connectant el teu món, un enviament alhora',
      heroSubtitle: 'Som un equip apassionat per la innovació, l\'effciència i les persones.',
      storyTitle: 'La Nostra Història',
      storyP1: 'InTrack va néixer d\'una idea simple: fer que la logística fos més intel·ligent i accessible.',
      storyP2: 'Avui oferim solucions innovadores amb taquilles intel·ligents i codis QR.',
      storyP3: 'Som un referent en el sector amb solucions nacionals i internacionals.',
      missionTitle: 'La Nostra Missió',
      missionDesc: 'Proveir soluciques logístiques que impulsin l\'èxit dels nostres clients amb tecnologia i fiabilitat.',
      visionTitle: 'La Nostra Visió',
      visionDesc: 'Ser el líder global en logística intel·ligent, sostenibles i eficients.',
      valuesTitle: 'Els Nostres Valors',
      valuesSubtitle: 'Els principis que guien les nostres decisions.',
      values: {
        v1: 'Velocitat',
        v1d: 'Ens obsessiona la rapidesa i optimització de rutes.',
        v2: 'Fiabilitat',
        v2d: 'La teva confiança és el nostre actiu més gran.',
        v3: 'Proximitat',
        v3d: 'Oferim un tracte humà i personalitzat.',
        v4: 'Abast Global',
        v4d: 'Connectem el teu món sense fronteres.'
      }
    },
    tracking: {
      title: 'Localiza el teu enviament',
      subtitle: 'Introdueix el teu codi de seguiment per conèixer l\'estat del teu paquet en temps real.',
      placeholder: 'Ex: TRK-001',
      button: 'Cercar',
      searching: 'Cercant...',
      error: 'Codi no trobat. Si us plau, verifica la teva referència (Ex: TRK-001).',
      connError: 'Error en la connexió. Torna-ho a provar més tard.',
      resultsTitle: 'Resultats del teu enviament',
      refLabel: 'Referencia d\'enviament',
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
    ordersPage: {
      title: 'Registra el teu enviament',
      subtitle: 'Notifica l\'arribada d\'un paquet a les nostres instal·lacions per a la seva gestió en Locker.',
      senderTitle: 'Dades del Remitent',
      senderDesc: 'Informació de l\'empresa que realitza l\'enviament.',
      companyLabel: 'Nom de l\'Empresa',
      trackingLabel: 'Referència / Tracking Intern',
      recipientTitle: 'Dades del Client Final',
      recipientDesc: 'Informació per a la recollida al Locker.',
      clientNameLabel: 'Nom del Destinatari',
      clientDniLabel: 'DNI / NIE',
      clientEmailLabel: 'Email de Contacte',
      helpText: 'El client rebrà un email automàtic amb el seu codi d\'accés quan el paquet arribi al locker.',
      submitButton: 'Registrar Comanda Ara'
    },
    contact: {
      title: 'Necessites ajuda amb el teu paquet?',
      subtitle: 'El nostre equip humà està a l\'altre costat de la tecnologia. Escriu-nos i et respondrem al més aviat possible.',
      infoTitle: 'Informació de Contacte',
      hq: 'Seu Operativa',
      support: 'Atenció al Client',
      phone: 'Telèfon Suport',
      urgentTitle: 'Dubte urgent?',
      urgentDesc: 'Si has perdut el teu codi de recollida, recorda que el pots trobar al SMS o Email de confirmación.',
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
    login: {
      title: 'Iniciar Sessió',
      subtitle: 'Accedeix a la teva àrea privada.',
      email: 'Correu electrònic',
      password: 'Contrasenya',
      button: 'Entrar',
      entering: 'Entrant...',
      back: 'Tornar a l\'inici',
      errorRequired: 'El correu electrònic i la contrasenya són obligatoris.',
      errorInvalid: 'Dades incorrectes. Verifica el teu correu i contrasenya.',
      errorServer: 'Ha hagut un error inesperat o de connexió.'
    },
    footer: {
      desc: 'La teva solució de confiança per enviaments nacionals i internacionals. Rapidesa, seguretat i preus competitius.',
      newsletter: 'Subscriu-te al nostre butlletí',
      newsletterDesc: 'Rep les últimes notícies i ofertes especials directament a la teva bústia.',
      subscribe: 'Subscriure\'s',
      rights: 'Tots els drets reservats.',
      sections: {
        services: 'Serveis',
        company: 'Companyia',
        legal: 'Legal'
      }
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      tracking: 'Tracking',
      orders: 'Orders',
      place_order: 'Place order',
      returns: 'Returns',
      booking: 'Request Service',
      about: 'About Us',
      pickup: 'Pickup Points',
      blog: 'Blog',
      contact: 'Contact',
      assistant: 'Assistant',
      login: 'Login',
      profile: 'My Profile',
      invoices: 'Invoices',
      my_orders: 'My orders',
      my_albaranes: 'Delivery notes',
      reserve: 'Reserve',
      logout: 'Logout'
    },
    booking: {
      title: 'Service Request',
      subtitle: 'Manage your transport and storage needs quickly.',
      formTitle: 'New Request',
      serviceLabel: 'Service Type',
      originLabel: 'Origin',
      destLabel: 'Destination',
      cargoLabel: 'Cargo Details',
      cargoPlaceholder: 'Weights, dimensions, number of packages...',
      submit: 'Send Request',
      historyTitle: 'My Requests',
      noHistory: 'You haven\'t made any requests yet.',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected'
    },
    hero: {
      title: 'Your package,',
      titleItalic: 'at your pace.',
      subtitle: 'National and international shipments with the safest and fastest locker network on the market.',
      badge: '24/7 Service active'
    },
    services: {
      title: 'A solution for every need',
      subtitle: 'The smart locker network that adapts to your lifestyle',
      items: {
        reception: {
          title: 'National parcel reception',
          desc: 'Your package is protected in our high-security lockers until you pick it up.',
          detail: {
            title: 'National parcel reception',
            intro: 'Your peace of mind is our priority. Your package is protected from the moment it reaches us until you retrieve it.',
            f1: 'Armored Custody:',
            f1d: 'Your package is stored in high-security lockers with surveillance.',
            f2: 'Instant Notification:',
            f2d: 'We guarantee immediate notice via App/SMS as soon as your order is deposited.',
            f3: '24/7 Guarantee:',
            f3d: 'Total access whenever you decide.',
            footer: 'Shop with the confidence that your orders are in the best hands.'
          }
        },
        intl: {
          title: 'International Shopping',
          desc: 'Buy from any store in the world and receive your parcels safely.',
          detail: {
            title: 'International Shopping',
            intro: 'Shop at your favorite US, China, or Europe stores and receive it here.',
            f1: 'Global Address:',
            f1d: 'Shop as if you lived there and we bring it to you.',
            f2: 'Consolidation:',
            f2d: 'We group multiple purchases into one shipment to save you money.',
            f3: 'Customs:',
            f3d: 'We process taxes and duties for you.',
            footer: 'Expand your shopping possibilities without borders.'
          }
        },
        b2b: {
          title: 'B2B & E-commerce Solutions',
          desc: 'Optimize your business logistics with custom integrations and volume rates.',
          detail: {
            title: 'B2B & E-commerce Solutions',
            intro: 'Boost your business logistics with tools designed to grow.',
            f1: 'API Integration:',
            f1d: 'Connect your online store directly to our network.',
            f2: 'Corporate Rates:',
            f2d: 'Preferential prices based on your monthly volume.',
            f3: 'Reverse Logistics:',
            f3d: 'Manage returns easily through our network.',
            footer: 'Boost your growth with a partner that understands your needs.'
          }
        },
        urgent: {
          title: '24h Urgent Shipments',
          desc: 'The fastest solution for your most important shipments.',
          detail: {
            title: '24h Urgent Shipments',
            intro: 'We guarantee the delivery of your package anywhere within 24 hours.',
            f1: 'Maximum Priority:',
            f1d: 'Preferential treatment in all our processes.',
            f2: 'Next Day Delivery:',
            f2d: 'We collect and deliver on the next working day.',
            f3: 'Total Tracking:',
            f3d: "Don't lose sight of your shipment for a second.",
            footer: 'Perfect for important documents or last-minute gifts.'
          }
        },
        tracking: {
          title: 'Real-Time Tracking',
          desc: 'Control your package location at every moment.',
          detail: {
            title: 'Real-Time Tracking',
            intro: 'Have total control over your shipment with our advanced tracking technology.',
            f1: 'Interactive Map:',
            f1d: 'Watch your shipment progress visually.',
            f2: 'Status Updates:',
            f2d: 'Automatic notifications at every key point.',
            f3: 'Dynamic ETA:',
            f3d: 'Delivery estimate updated based on traffic.',
            footer: 'Included in all our services at no extra cost.'
          }
        },
        pricing: {
          title: 'Pricing',
          desc: 'Check our competitive prices for all types of shipments.',
          detail: {
            title: 'Our Rates',
            intro: 'We offer a transparent price structure so you always know the cost.',
            f1: 'Clear Prices:',
            f1d: 'Adjusted rates for every need.',
            f2: 'Online Calculator:',
            f2d: 'Get an instant quote.',
            f3: 'No Surprises:',
            f3d: 'The price you see includes tracking and basic insurance.',
            footer: 'Check our pricing page for full details.',
            cta: 'View Rates'
          }
        }
      }
    },
    howItWorks: {
      title: 'Picking up your purchases was never so easy',
      subtitle: 'In just four simple steps, your shipment will be on its way.',
      steps: [
        { title: 'Sign up', desc: 'Contact us and select your nearest InTrack point.' },
        { title: 'Shop online', desc: 'Select the shipping option that fits you best.' },
        { title: 'Get your code', desc: 'We will notify you when your package is in the locker.' },
        { title: 'Pick up anytime', desc: 'Scan your code 24/7 and take your package home.' }
      ],
      stepLabel: 'Step'
    },
    competitiveAdvantages: {
      sectionTitle: 'Why choose InTrack?',
      agilityTitle: 'Flexible Logistics',
      agilityDesc: 'We adapt to the specific needs of your goods and your sales pace, without rigid structures.',
      humanTitle: 'Personalized Support',
      humanDesc: 'Real support from logistics experts. We speak person to person, no bots.',
      securityTitle: 'Guaranteed Security',
      securityDesc: 'Your shipments are protected with premium insurance and armored custody.',
      visibilityTitle: 'Total Visibility',
      visibilityDesc: 'Precise real-time tracking and absolute transparency in your operating costs.',
    },
    blogSection: {
      title: 'Our Blog',
      subtitle: 'Stay updated with the latest news and industry tips.',
      cta: 'View all articles',
      readMore: 'Read more'
    },
    testimonials: {
      title: 'What our clients say',
      subtitle: 'The trust and satisfaction of our users based on innovative solutions.',
      items: [
        { name: 'Ana García', role: 'Private Customer', quote: 'I finally stopped chasing couriers. I pick up my purchases after the gym, even at midnight.' },
        { name: 'Carlos Rodríguez', role: 'International Buyer', quote: 'I buy a lot from the US and Asia. Now I know my package awaits safely in an armored locker.' },
        { name: 'Elena Martínez', role: 'E-commerce Manager', quote: 'Integrating the InTrack widget has reduced failed deliveries to zero. A quality leap for our logistics.' }
      ]
    },
    pricingPage: {
      title: 'Our Rates',
      subtitle: 'Choose the plan that best fits your needs. Clear prices and no surprises.',
      tiers: {
        national: {
          name: 'National',
          details: 'per standard shipment',
          desc: 'Ideal for non-urgent domestic shipments.',
          features: ['48/72h Delivery', 'Tracking included', 'Full coverage', 'Basic insurance'],
          cta: 'Start now'
        },
        express: {
          name: 'Express 24h',
          details: 'per urgent shipment',
          desc: 'When time is a key factor.',
          features: ['Guaranteed 24h delivery', 'Priority tracking', 'Preferential pickup', 'SMS alerts'],
          cta: 'Select Express',
          popular: 'Most Popular'
        },
        intl: {
          name: 'International',
          details: 'depending on destination',
          desc: 'Connect with the world at competitive rates.',
          features: ['Europa in 3-5 days', 'Customs management', 'Global network', 'Full tracking'],
          cta: 'Calculate shipping',
          priceText: 'Inquire'
        }
      }
    },
    returnsPage: {
      title: 'Returns',
      subtitle: 'Returns portal. Request the return of your order easily and quickly.',
      companyLabel: 'Company where you bought',
      refLabel: 'Order No. / Reference',
      nameLabel: 'Your Full Name',
      dniLabel: 'ID / Passport',
      emailLabel: 'Contact Email',
      submit: 'Authorize Return',
      sending: 'Sending...',
      successTitle: 'Request Received!',
      successMsg: 'We have registered your return request correctly. You will receive an email with the next steps shortly.',
      retry: 'Register another return'
    },
    aboutPage: {
      heroTitle: 'Connecting your world, one shipment at a time',
      heroSubtitle: 'We are a team passionate about innovation, efficiency, and people.',
      storyTitle: 'Our Story',
      storyP1: 'InTrack was born from a simple idea: making logistics smarter and more accessible.',
      storyP2: 'Today we offer innovative solutions with smart lockers and QR codes.',
      storyP3: 'We are a benchmark in the sector with domestic and international solutions.',
      missionTitle: 'Our Mission',
      missionDesc: 'Provide exceptional logistics solutions that drive client success with technology and reliability.',
      visionTitle: 'Our Vision',
      visionDesc: 'To be the global leader in smart logistics, recognized for sustainability and efficiency.',
      valuesTitle: 'Our Values',
      valuesSubtitle: 'The principles that guide our decisions.',
      values: {
        v1: 'Speed',
        v1d: 'We are obsessed with speed and route optimization.',
        v2: 'Reliability',
        v2d: 'Your trust is our greatest asset.',
        v3: 'Proximity',
        v3d: 'We offer a human and personalized treatment.',
        v4: 'Global Reach',
        v4d: 'We connect your world without borders.'
      }
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
    ordersPage: {
      title: 'Register your shipment',
      subtitle: 'Notify the arrival of a package at our facilities for Locker management.',
      senderTitle: 'Sender Details',
      senderDesc: 'Information about the company making the shipment.',
      companyLabel: 'Company Name',
      trackingLabel: 'Internal Reference / Tracking',
      recipientTitle: 'Final Client Details',
      recipientDesc: 'Information for picking up at the Locker.',
      clientNameLabel: 'Recipient Name',
      clientDniLabel: 'ID / Passport',
      clientEmailLabel: 'Contact Email',
      helpText: 'The client will receive an automatic email with their access code when the package arrives at the locker.',
      submitButton: 'Register Order Now'
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
    login: {
      title: 'Login',
      subtitle: 'Access your private area.',
      email: 'Email address',
      password: 'Password',
      button: 'Enter',
      entering: 'Entering...',
      back: 'Back to home',
      errorRequired: 'Email and password are required.',
      errorInvalid: 'Incorrect details. Check your email and password.',
      errorServer: 'An unexpected or connection error occurred.'
    },
    footer: {
      desc: 'Your trusted solution for national and international shipments. Speed, security, and competitive prices.',
      newsletter: 'Subscribe to our newsletter',
      newsletterDesc: 'Get the latest news and special offers directly in your inbox.',
      subscribe: 'Subscribe',
      rights: 'All rights reserved.',
      sections: {
        services: 'Services',
        company: 'Company',
        legal: 'Legal'
      }
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      tracking: 'Suivi',
      orders: 'Commandes',
      place_order: 'Passer commande',
      returns: 'Retours',
      booking: 'Demander un Service',
      about: 'À Propos',
      pickup: 'Points Relais',
      blog: 'Blog',
      contact: 'Contact',
      assistant: 'Assistant',
      login: 'Connexion',
      profile: 'Mon Profil',
      invoices: 'Factures',
      my_orders: 'Mes commandes',
      my_albaranes: 'Bons de livraison',
      reserve: 'Réserver',
      logout: 'Déconnexion'
    },
    booking: {
      title: 'Demande de Service',
      subtitle: 'Gérez vos besoins de transport et de stockage rapidement.',
      formTitle: 'Nouvelle Demande',
      serviceLabel: 'Type de Service',
      originLabel: 'Origine',
      destLabel: 'Destination',
      cargoLabel: 'Détails de la Cargaison',
      cargoPlaceholder: 'Poids, dimensions, nombre de colis...',
      submit: 'Envoyer la Demande',
      historyTitle: 'Mes Demandes',
      noHistory: 'Vous n\'avez pas encore fait de demandes.',
      pending: 'En attente',
      approved: 'Approuvé',
      rejected: 'Rejeté'
    },
    hero: {
      title: 'Votre colis,',
      titleItalic: 'à votre rythme.',
      subtitle: 'Envois nationaux et internationaux avec le réseau de consignes le plus sûr et le plus rapide du marché.',
      badge: 'Service 24/7 actif'
    },
    services: {
      title: 'Une solution pour chaque besoin',
      subtitle: 'Le réseau de consignes intelligentes qui s\'adapte à votre mode de vie',
      items: {
        reception: {
          title: 'Réception de colis nationaux',
          desc: 'Votre colis est protégé dans nos consignes haute sécurité jusqu\'à ce que vous le retiriez.',
          detail: {
            title: 'Réception de colis nationaux',
            intro: 'Votre tranquillité est notre priorité. Votre colis est protégé dès son arrivée chez nous jusqu\'à son retrait.',
            f1: 'Garde Blindée:',
            f1d: 'Votre colis est stocké dans des consignes haute sécurité sous surveillance.',
            f2: 'Notification Instantanée:',
            f2d: 'Notification immédiate via App/SMS dès que votre commande est déposée.',
            f3: 'Garantia 24/7:',
            f3d: 'Accès total quand vous le décidez.',
            footer: 'Achetez en toute confiance, vos commandes sont entre de bonnes mains.'
          }
        },
        intl: {
          title: 'Achats Internationaux',
          desc: 'Achetez dans n\'importe quel magasin au monde et recevez vos colis en toute sécurité.',
          detail: {
            title: 'Achats Internationaux',
            intro: 'Achetez dans vos magasins préférés aux USA, en Chine ou en Europe et recevez-les ici.',
            f1: 'Adresse Globale:',
            f1d: 'Achetez comme si vous y habitiez et nous vous le livrons.',
            f2: 'Consolidation:',
            f2d: 'Nous groupons plusieurs achats en un seul envoi pour économiser.',
            f3: 'Douanes:',
            f3d: 'Nous traitons les taxes et droits pour vous.',
            footer: 'Élargissez vos possibilités d\'achat sans frontières.'
          }
        },
        b2b: {
          title: 'Solutions B2B & E-commerce',
          desc: 'Optimisez la logistique de votre entreprise avec des intégrations personnalisées.',
          detail: {
            title: 'Solutions B2B & E-commerce',
            intro: 'Boostez votre logistique d\'entreprise avec des outils conçus pour la croissance.',
            f1: 'Intégration API:',
            f1d: 'Connectez votre boutique en ligne directement à notre réseau.',
            f2: 'Tarifs Entreprise:',
            f2d: 'Prix préférentiels basés sur votre volume mensuel.',
            f3: 'Logistique Inverse:',
            f3d: 'Gérez les retours facilement via notre réseau.',
            footer: 'Boostez votre croissance avec un partenaire qui comprend vos besoins.'
          }
        },
        urgent: {
          title: 'Envois Urgents 24h',
          desc: 'La solution la plus rapide pour vos envois les plus importants.',
          detail: {
            title: 'Envois Urgents 24h',
            intro: 'Nous garantissons la livraison de votre colis n\'importe où en 24 heures.',
            f1: 'Priorité Maximale:',
            f1d: 'Traitement préférentiel dans tous nos processus.',
            f2: 'Livraison Lendemain:',
            f2d: 'Collecte et livraison le jour ouvré suivant.',
            f3: 'Suivi Total:',
            f3d: 'Ne perdez pas votre envoi de vue une seconde.',
            footer: 'Parfait pour les documents importants ou les cadeaux de dernière minute.'
          }
        },
        tracking: {
          title: 'Suivi en Temps Réel',
          desc: 'Contrôlez l\'emplacement de votre colis à tout moment.',
          detail: {
            title: 'Suivi en Temps Réel',
            intro: 'Contrôle total sur votre envoi avec notre technologie de suivi avancée.',
            f1: 'Carte Interactive:',
            f1d: 'Visualisez la progression de votre envoi.',
            f2: 'Mises à jour:',
            f2d: 'Notifications automatiques à chaque étape clé.',
            f3: 'ETA Dynamique:',
            f3d: 'Estimation de livraison mise à jour selon le trafic.',
            footer: 'Inclus dans tous nos services sans frais supplémentaires.'
          }
        },
        pricing: {
          title: 'Tarifs',
          desc: 'Consultez nos prix compétitifs pour tous types d\'envois.',
          detail: {
            title: 'Nos Tarifs',
            intro: 'Nous offrons une structure de prix transparente pour que vous sachiez toujours le coût.',
            f1: 'Prix Clairs:',
            f1d: 'Tarifs ajustés pour chaque besoin.',
            f2: 'Calculateur en Ligne:',
            f2d: 'Obtenez un devis instantané.',
            f3: 'Sans Surprises:',
            f3d: 'Le prix inclut le suivi et l\'assurance de base.',
            footer: 'Consultez notre page de tarifs pour plus de détails.',
            cta: 'Voir Tarifs'
          }
        }
      }
    },
    howItWorks: {
      title: 'Récupérer vos achats n\'a jamais été aussi facile',
      subtitle: 'En seulement quatre étapes simples, votre envoi sera en route.',
      steps: [
        { title: 'Inscrivez-vous', desc: 'Contactez-nous et sélectionnez votre point InTrack.' },
        { title: 'Achetez en ligne', desc: 'Sélectionnez l\'option d\'envoi qui vous convient.' },
        { title: 'Recevez votre code', desc: 'Nous vous préviendrons par mobile quand le colis sera en consigne.' },
        { title: 'Retirez quand vous voulez', desc: 'Scannez votre code 24/7 et emportez votre colis.' }
      ],
      stepLabel: 'Étape'
    },
    competitiveAdvantages: {
      sectionTitle: 'Pourquoi choisir InTrack ?',
      agilityTitle: 'Logistique Flexible',
      agilityDesc: 'Nous nous adaptons aux besoins spécifiques de vos marchandises et à votre rythme de vente.',
      humanTitle: 'Support Personnalisé',
      humanDesc: 'Un vrai support par des experts logistiques. Nous parlons de personne à personne.',
      securityTitle: 'Sécurité Garantie',
      securityDesc: 'Vos envois sont protégés par des assurances premium et une garde blindée.',
      visibilityTitle: 'Visibilité Totale',
      visibilityDesc: 'Suivi précis en temps réel et transparence totale sur vos coûts opérationnels.',
    },
    blogSection: {
      title: 'Notre Blog',
      subtitle: 'Restez informé des dernières nouvelles et conseils du secteur.',
      cta: 'Voir tous les articles',
      readMore: 'Lire la suite'
    },
    testimonials: {
      title: 'Ce que disent nos clients',
      subtitle: 'La confiance et la satisfaction de nos utilisateurs basées sur des solutions innovantes.',
      items: [
        { name: 'Ana García', role: 'Client Particulier', quote: 'J\'ai enfin arrêté de courir après les livreurs. Je retire mes achats après le sport, même à minuit.' },
        { name: 'Carlos Rodríguez', role: 'Acheteur International', quote: 'J\'achète beaucoup aux USA et en Asie. Maintenant, je sais que mon colis m\'attend en sécurité.' },
        { name: 'Elena Martínez', role: 'E-commerce Manager', quote: 'L\'intégration du widget InTrack a réduit les échecs de livraison à zéro. Un vrai saut de qualité.' }
      ]
    },
    pricingPage: {
      title: 'Nos Tarifs',
      subtitle: 'Choisissez le plan qui vous convient le mieux. Prix clairs et sans surprises.',
      tiers: {
        national: {
          name: 'National',
          details: 'par envoi standard',
          desc: 'Idéal pour les envois non urgents sur le territoire.',
          features: ['Livraison 48/72h', 'Suivi inclus', 'Couverture totale', 'Assurance de base'],
          cta: 'Démarrer'
        },
        express: {
          name: 'Express 24h',
          details: 'par envoi urgent',
          desc: 'Quand le temps est un factor clé.',
          features: ['Livraison garantie 24h', 'Suivi prioritaire', 'Collecte préférentielle', 'Alertes SMS'],
          cta: 'Choisir Express',
          popular: 'Plus Populaire'
        },
        intl: {
          name: 'International',
          details: 'selon destination et poids',
          desc: 'Connectez-vous au monde avec des tarifs compétitifs.',
          features: ['Europe en 3-5 jours', 'Gestion des douanes', 'Réseau mondial', 'Suivi complet'],
          cta: 'Calculer envoi',
          priceText: 'Consulter'
        }
      }
    },
    returnsPage: {
      title: 'Retours',
      subtitle: 'Portail de retours. Demandez le retour de votre commande facilement et rapidement.',
      companyLabel: 'Entreprise d\'achat',
      refLabel: 'N° de Commande / Référence',
      nameLabel: 'Votre Nom Complet',
      dniLabel: 'ID / Passeport',
      emailLabel: 'Email de contact',
      submit: 'Autoriser le Retour',
      sending: 'Envoi en cours...',
      successTitle: 'Demande Reçue !',
      successMsg: 'Nous avons bien enregistré votre demande de retour. Vous recevrez un email sous peu.',
      retry: 'Enregistrer un autre retour'
    },
    aboutPage: {
      heroTitle: 'Connecter votre monde, un envoi à la fois',
      heroSubtitle: 'Nous sommes une équipe passionnée par l\'innovation, l\'efficacité et les gens.',
      storyTitle: 'Notre Histoire',
      storyP1: 'InTrack est né d\'une idea simple : rendre la logistique plus intelligente et accessible.',
      storyP2: 'Aujourd\'hui nous offrons des solutions innovantes avec des consignes et codes QR.',
      storyP3: 'Nous sommes une référence du secteur avec des solutions nationales et internationales.',
      missionTitle: 'Notre Mission',
      missionDesc: 'Fournir des solutions logistiques exceptionnelles qui boostent le succès de nos clients.',
      visionTitle: 'Notre Vision',
      visionDesc: 'Être le leader mondial de la logistique intelligente, durable et efficace.',
      valuesTitle: 'Nos Valeurs',
      valuesSubtitle: 'Les principes qui guident nos décisions.',
      values: {
        v1: 'Vitesse',
        v1d: 'Nous sommes obsédés par la vitesse et l\'optimisation des routes.',
        v2: 'Fiabilité',
        v2d: 'Votre confiance est notre plus grand atout.',
        v3: 'Proximité',
        v3d: 'Nous offrons un traitement humain et personnalisé.',
        v4: 'Portée Mondiale',
        v4d: 'Nous connectons votre monde sans frontières.'
      }
    },
    tracking: {
      title: 'Localisez votre envoi',
      subtitle: 'Entrez votre code de suivi pour connaître le statut de votre colis en temps réel.',
      placeholder: 'Ex: TRK-001',
      button: 'Chercher',
      searching: 'Recherche...',
      error: 'Code introuvable. Veuillez vérifier votre référence (Ex: TRK-001).',
      connError: 'Erreur de connexion. Veuillez réessayer plus tard.',
      resultsTitle: 'Résultats de votre envoi',
      refLabel: 'Référence d\'envoi',
      statusLabel: 'Statut du colis',
      origin: 'Origine',
      destination: 'Destination Finale',
      location: 'Localisation Actuelle',
      eta: 'Date de Livraison (ETA)',
      states: {
        processing: 'Traitement',
        prepared: 'Préparé',
        shipped: 'Envoyé',
        delivered: 'Livré'
      }
    },
    ordersPage: {
      title: 'Enregistrez votre envoi',
      subtitle: 'Signalez l\'arrivée d\'un colis dans nos installations pour sa gestion en consigne.',
      senderTitle: 'Détails de l\'Expéditeur',
      senderDesc: 'Informations de l\'entreprise qui effectue l\'envoi.',
      companyLabel: 'Nom de l\'Entreprise',
      trackingLabel: 'Référence / Suivi Interne',
      recipientTitle: 'Détails du Client Final',
      recipientDesc: 'Informations pour le retrait en consigne.',
      clientNameLabel: 'Nom du Destinataire',
      clientDniLabel: 'ID / Passeport',
      clientEmailLabel: 'Email de Contact',
      helpText: 'Le client recevra un email automatique avec son code d\'accès quand le colis arrivera en consigne.',
      submitButton: 'Enregistrer la Commande'
    },
    contact: {
      title: 'Besoin d\'aide avec votre colis ?',
      subtitle: 'Notre équipe humaine est derrière la technologie. Écrivez-nous y nous répondrons dès que possible.',
      infoTitle: 'Informations de Contact',
      hq: 'Siège Opérationnel',
      support: 'Service Client',
      phone: 'Téléphone Support',
      urgentTitle: 'Question urgente ?',
      urgentDesc: 'Si vous avez perdu votre code de retrait, vous pouvez le retrouver dans l\'e-mail de confirmation.',
      formTitle: 'Dites-nous ce qui se passe',
      name: 'Nom',
      email: 'Email',
      reason: 'Motif de la demande',
      reasonPlaceholder: 'Sélectionnez une option',
      reasons: {
        code: 'Problème avec mon code / Consigne',
        intl: 'Envoi International',
        biz: 'Je suis un E-commerce / Entreprise',
        other: 'Autres sujets'
      },
      orderId: 'ID de Commande ou Consigne (Optionnel)',
      message: 'Message',
      messagePlaceholder: 'Comment pouvons-nous vous aider aujourd\'hui ?',
      submit: 'Contacter maintenant'
    },
    login: {
      title: 'Connexion',
      subtitle: 'Accédez à votre espace privé.',
      email: 'Adresse e-mail',
      password: 'Mot de passe',
      button: 'Entrer',
      entering: 'Connexion...',
      back: 'Retour à l\'accueil',
      errorRequired: 'L\'e-mail et le mot de passe sont obligatoires.',
      errorInvalid: 'Données incorrectes. Vérifiez votre e-mail et mot de passe.',
      errorServer: 'Une erreur inattendue ou de connexion s\'est produite.'
    },
    footer: {
      desc: 'Votre solution de confiance pour les envois nationaux et internationaux. Rapidité, sécurité et prix compétitifs.',
      newsletter: 'Inscrivez-vous à notre newsletter',
      newsletterDesc: 'Recevez les dernières nouvelles et offres directement dans votre boîte de réception.',
      subscribe: 'S\'abonner',
      rights: 'Tous droits réservés.',
      sections: {
        services: 'Services',
        company: 'Entreprise',
        legal: 'Légal'
      }
    }
  }
};
