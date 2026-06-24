export interface TranslationDict {
  nav: {
    home: string;
    work: string;
    toolkit: string;
    tech: string;
    labs: string;
    resume: string;
    connect: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    exploreBtn: string;
    touchBtn: string;
    scroll: string;
  };
  bento: {
    badge: string;
    title: string;
    subtitle: string;
    status: string;
    inspectNode: string;
    nodeState: string;
    consensusLocks: string;
    consensusRate: string;
    edgeGateway: string;
    pauseLive: string;
    resumeLive: string;
    gatewayLatency: string;
    sysHighCons: string;
    framerate: string;
    activeParticles: string;
    techStack: string;
    modalOverview: string;
    modalArchitecture: string;
    modalMetrics: string;
    modalClose: string;
    statsTitle: string;
    statsProjects: string;
    statsCoffee: string;
    statsExperience: string;
    projects: {
      kunan: {
        title: string;
        category: string;
        description: string;
        details: string;
        architecture: string[];
        metrics: { label: string; value: string; trend?: string }[];
      };
      sirea: {
        title: string;
        category: string;
        description: string;
        details: string;
        architecture: string[];
        metrics: { label: string; value: string; trend?: string }[];
      };
      academico: {
        title: string;
        category: string;
        description: string;
        details: string;
        architecture: string[];
        metrics: { label: string; value: string; trend?: string }[];
      };
      portal: {
        title: string;
        category: string;
        description: string;
        details: string;
        architecture: string[];
        metrics: { label: string; value: string; trend?: string }[];
      };
    };
  };
  tech: {
    badge: string;
    title: string;
    subtitle: string;
    proficiency: string;
    shipped: string;
    helpText: string;
    hoverInfo: string;
    categories: {
      frontend: string;
      backend: string;
      webgl: string;
      isomorphic: string;
      styling: string;
      animation: string;
      lowlevel: string;
      containers: string;
    };
  };
  terminal: {
    badge: string;
    title: string;
    subtitle: string;
    welcomeTitle: string;
    welcomeSubtitle: string;
    welcomeHelp: string;
    inputPlaceholder: string;
    exp: string;
    shipped: string;
    contrib: string;
    neofetchAscii: string[];
  };
  connect: {
    compose: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    btnBroadcast: string;
    btnSyncing: string;
    successTitle: string;
    successSubtitle: string;
    receiptHeader: string;
    sender: string;
    channel: string;
    inquiry: string;
    timestamp: string;
    btnReceipt: string;
    btnDismiss: string;
    authTitle: string;
    authSubtitle: string;
    btnAuth: string;
    authenticatedAs: string;
    btnLogout: string;
    transmissionsLog: string;
  };
  resume: {
    badge: string;
    btnPrint: string;
    title: string;
    subtitle: string;
    location: string;
    profileTitle: string;
    profileText: string;
    expTitle: string;
    eduTitle: string;
    eduName: string;
    eduMajor: string;
    eduDetails: string;
    credTitle: string;
    jobs: {
      job1: {
        title: string;
        company: string;
        date: string;
        bullets: string[];
      };
      job2: {
        title: string;
        company: string;
        date: string;
        bullets: string[];
      };
      job3: {
        title: string;
        company: string;
        date: string;
        bullets: string[];
      };
    };
  };
  footer: {
    badge: string;
    cta: string;
    title: string;
    touchBtn: string;
    resumeBtn: string;
    rights: string;
  };
}

export const translations: { en: TranslationDict; es: TranslationDict } = {
  en: {
    nav: {
      home: 'HOME',
      work: 'WORK',
      toolkit: 'TOOLKIT',
      tech: 'TECH',
      labs: 'LABS',
      resume: 'RESUME',
      connect: 'CONNECT',
    },
    hero: {
      badge: 'Systems Eng. / Full-Stack Developer',
      title1: 'Hi 👋, I\'m Rodolfo Riveros Mitma',
      title2: '',
      description: 'Specialized in building high-impact digital solutions: from robust backend architectures to immersive frontend experiences, mobile apps, and video game development. Passionate about technology and teaching, I transform complex ideas into efficient code.',
      exploreBtn: 'Explore My Work',
      touchBtn: 'Get In Touch',
      scroll: 'SCROLL',
    },
    bento: {
      badge: 'PORTFOLIO HIGHLIGHTS',
      title: 'Selected Works',
      subtitle: 'Plataformas educativas, control de asistencia biometrico, sistemas academicos y portales institucionales.',
      status: '01 / 04 ACTIVE PROJECTS',
      inspectNode: 'Click to inspect scheduler loads, node configurations, and performance stats.',
      nodeState: 'NODE STATE: COMPILING PIPELINE',
      consensusLocks: 'Consensus Locks: ACTIVE',
      consensusRate: 'CONSENSUS RATE',
      edgeGateway: 'EDGE GATEWAY',
      pauseLive: 'PAUSE LIVE',
      resumeLive: 'RESUME LIVE',
      gatewayLatency: 'GATEWAY LATENCY',
      sysHighCons: 'SYSTEM HIGH-CONSISTENCY MODE',
      framerate: 'FPS',
      activeParticles: 'Active Particles',
      techStack: 'Technical Stack',
      modalOverview: 'Project Overview',
      modalArchitecture: 'Core System Architecture',
      modalMetrics: 'System Metrics',
      modalClose: 'Close',
      statsTitle: 'SYSTEM TELEMETRY SUMMARY',
      statsProjects: 'Projects Completed',
      statsCoffee: 'Coffee Consumed',
      statsExperience: 'Years Experience',
      projects: {
        kunan: {
          title: 'Kunan - Control de Asistencia',
          category: 'SISTEMA DE CONTROL DE ASISTENCIA',
          description: 'Control de asistencia mediante biometricos ZKTeco con notificaciones SMS a padres de familia.',
          details: 'Kunan es un sistema de control de asistencia que integra dispositivos biometricos ZKTeco para el registro preciso de entrada y salida de estudiantes. Envia notificaciones automáticas via SMS a los padres de familia cuando el estudiante registra su asistencia, permitiendo una comunicacion efectiva entre la institucion educativa y el hogar.',
          architecture: ['Laravel Backend Core', 'ZKTeco Biometric SDK', 'SMS Gateway Integration', 'MySQL Database'],
          metrics: [
            { label: 'Biometric Devices', value: '15+', trend: 'ZKTeco integrated' },
            { label: 'SMS Delivery Rate', value: '98%', trend: 'Instant notifications' },
            { label: 'Active Students', value: '2,000+', trend: 'Daily attendance' },
          ]
        },
        sirea: {
          title: 'SIREA - UGEL Urubamba',
          category: 'PLATAFORMA GUBERNAMENTAL',
          description: 'Control de asistencia docente bajo directiva MINEDU 326-2017 para instituciones educativas de UGEL Urubamba.',
          details: 'SIREA es un sistema oficial para la Unidad de Gestión Educativa Local de Urubamba, Cusco. Permite controlar la asistencia de docentes en instituciones educativas bajo la directiva MINEDU 326-2017, generando reportes detallados y consolidados para las IIEE de UGEL Urubamba.',
          architecture: ['React Frontend', 'Express.js Backend API', 'MySQL Database', 'MINEDU Report Generator'],
          metrics: [
            { label: 'Registered Teachers', value: '1,200+', trend: 'UGEL Urubamba' },
            { label: 'Educational Institutions', value: '180+', trend: 'MINEDU directive' },
            { label: 'Attendance Reports', value: '15,000+', trend: 'Detailed & consolidated' },
          ]
        },
        academico: {
          title: 'Sistema Academico Profito',
          category: 'SUITE DE GESTION ACADEMICA',
          description: 'Gestion completa de matrículas, notas, reportes y toda la gestión académica para la EESPP LA SALLE.',
          details: 'Sistema Academico Profito es un intranet que maneja integralmente la gestión académica de la EESPP LA SALLE. Incluye matrículas, registro de notas, generación de reportes, control de asistencia y administración académica completa de estudiantes.',
          architecture: ['Laravel Backend Core', 'MySQL Database', 'Bootstrap Frontend', 'PDF Report Generator'],
          metrics: [
            { label: 'Managed Students', value: '3,000+', trend: 'EESPP LA SALLE' },
            { label: 'Reports Generated', value: '5,000+', trend: 'Academic period' },
            { label: 'System Uptime', value: '99.9%', trend: 'High availability' },
          ]
        },
        portal: {
          title: 'Portal Academico La Salle',
          category: 'PLATAFORMA ACADEMICA',
          description: 'Plataforma de calificación y asistencia para estudiantes de la IESP LA SALLE DE Urubamba.',
          details: 'Portal Academico construido con Next.js en el frontend y FastAPI en el backend para la IESP LA SALLE DE Urubamba. Permite a los docentes calificar y registrar la asistencia de estudiantes de manera eficiente, con una interfaz moderna y rápida.',
          architecture: ['Next.js Frontend', 'FastAPI Backend', 'PostgreSQL Database', 'JWT Authentication'],
          metrics: [
            { label: 'Active Students', value: '1,500+', trend: 'IESP LA SALLE' },
            { label: 'Response Time', value: '<200ms', trend: 'FastAPI optimized' },
            { label: 'Daily Users', value: '50+', trend: 'Teachers & staff' },
          ]
        }
      }
    },
    tech: {
      badge: 'SYSTEM COMPETENCIES',
      title: 'Technical Ecosystem',
      subtitle: 'Deep engineering mastery across declarative application state, reactive graphics shaders, low-latency compiler environments, and core network fabrics.',
      proficiency: 'PROFICIENCY',
      shipped: 'Projects Shipped',
      helpText: 'Hover over any technology node above to audit system proficiency metrics.',
      hoverInfo: 'Hover over any technology node above to audit system proficiency metrics.',
      categories: {
        frontend: 'FRONTEND DEVELOPMENT',
        backend: 'BACKEND ARCHITECTURE',
        webgl: 'WEBGL / SHADERS',
        isomorphic: 'ISOMORPHIC SYSTEMS',
        styling: 'AESTHETIC STYLING',
        animation: 'DYNAMIC ANIMATION',
        lowlevel: 'SYSTEMS / COMPILERS',
        containers: 'CLOUD CONCURRENCY',
      },
    },
    terminal: {
      badge: 'SANDBOX WORKSTATION',
      title: 'Interactive Sandbox',
      subtitle: 'Audit portfolio metrics, system parameters, and neofetch credentials inside the fully functional terminal emulator below.',
      welcomeTitle: 'Welcome to the Systems Sandbox Interactive Console!',
      welcomeSubtitle: 'Type commands below to audit structural systems, credentials, and open source indices.',
      welcomeHelp: 'For a list of supported parameters, type help.',
      inputPlaceholder: 'type help, neofetch, clear...',
      exp: 'EXPERIENCE',
      shipped: 'SHIPPED',
      contrib: 'OPEN SOURCE',
      neofetchAscii: [
        '        .------.      ',
        '       /  _  _  \\     SYS.IO [root@sysio]',
        '       |   / \\   |    ---------------------------',
        '       |  \\_ _/  |    OS: CoreOS stable-rolling v4.0',
        '       \\    |    /    Kernel: x86_64 WebAssembly Sandbox',
        '        \'------\'     Uptime: 8+ Years Engineering Mastery',
        '                      Shell: React-V4 Shell Sandbox',
        '                      Resolution: Responsive Grid viewport',
        '                      IDE: Custom Neovim / AI Studio Workspace',
        '                      CPU: Gemini-3.5 Core Integration',
        '                      Memory: 100% Client-side Hydration',
      ]
    },
    connect: {
      compose: 'SECURE SYSTEM COMPOSE',
      title: 'Connect with Rodolfo',
      subtitle: 'Submit architectural proposals, system design inquiries, or credentials requests instantly.',
      nameLabel: 'Full Name',
      emailLabel: 'Email Address',
      messageLabel: 'Project inquiry',
      messagePlaceholder: 'Summarize specifications, memory footprints, target parameters...',
      btnBroadcast: 'BROADCAST TRANSMISSION',
      btnSyncing: 'SYNCING METRICS...',
      successTitle: 'Transmission Synced',
      successSubtitle: 'Message successfully logged into the portfolio data node. Secure handshake has been verified.',
      receiptHeader: 'RECEIPT HASH ID',
      sender: 'SENDER',
      channel: 'CHANNEL',
      inquiry: 'INQUIRY',
      timestamp: 'Logged on UTC',
      btnReceipt: 'RECEIPT.JSON',
      btnDismiss: 'DISMISS',
      authTitle: 'Establish Secure Link',
      authSubtitle: 'Authenticate with Google to verify sender identity, generate TLS handshakes, and access persistent transmission records.',
      btnAuth: 'ESTABLISH SECURE LINK (GOOGLE LOGIN)',
      authenticatedAs: 'SECURE PORT SESSION ACTIVE:',
      btnLogout: 'DISCONNECT LINK',
      transmissionsLog: 'SECURE HANDSHAKE LOGS',
    },
    resume: {
      badge: 'CURRICULUM VITAE',
      btnPrint: 'PRINT / SAVE',
      title: 'SYS.IO',
      subtitle: 'Staff Cloud & Full-Stack Systems Engineer',
      location: 'San Francisco, CA (Hybrid / Remote)',
      profileTitle: 'Executive Profile',
      profileText: 'High-performance Systems Engineer with over 8 years of professional tenure directing cloud architectures, distributed microservice meshes, and low-latency client pipelines. Expert in Rust compiler targets, WebAssembly edge execution, and optimizing container scaling parameters on Kubernetes GPU clusters. Dedicated to writing clear, test-driven code, maximizing cache concurrency, and creating immersive visual dashboard platforms.',
      expTitle: 'Professional Experience',
      eduTitle: 'Education',
      eduName: 'BS in Computer Science & Distributed Systems',
      eduMajor: 'University of California, Berkeley | 2013 - 2017',
      eduDetails: 'Specialized in Parallel Algorithms, Database Management Theory, and Graphics Shaders.',
      credTitle: 'Key Credentials',
      jobs: {
        job1: {
          title: 'Staff Cloud Infrastructure Architect',
          company: 'Principal Cloud Inc | San Francisco, CA',
          date: '2022 - PRESENT',
          bullets: [
            'Led the migration of distributed machine learning models to serverless GPU clusters, reducing operational latency by 42%.',
            'Designed eBPF-based API gateways executing WASM routing tables with sub-millisecond warm bootstrap bounds.',
            'Orchestrated unified logging telemetry using custom D3/Rust aggregators serving 4M+ concurrent client handshakes.'
          ]
        },
        job2: {
          title: 'Senior Systems & WebGL Architect',
          company: 'Neural Networks Studio | Austin, TX',
          date: '2019 - 2022',
          bullets: [
            'Built web-based real-time 3D telemetry displays using Three.js and custom GLSL vertex shaders to visualize network congestion.',
            'Established strict optimistic React caching strategies, removing re-render lag for high-dimensional ledger analytics.',
            'Optimized Postgres caching indices, lowering read queries load times by 65%.'
          ]
        },
        job3: {
          title: 'Full-Stack Software Engineer',
          company: 'Spatial Systems Labs | Seattle, WA',
          date: '2017 - 2019',
          bullets: [
            'Developed responsive GraphQL APIs utilizing Node.js, Express, and Redis, processing 15,000 requests per minute with absolute zero data leaks.',
            'Implemented cross-platform web components matching precise desktop and mobile touch target guidelines.'
          ]
        }
      }
    },
    footer: {
      badge: 'VERIFIED SECURE CONNECTION',
      cta: 'Ready to build the future?',
      title: 'Ready to build\nthe future?',
      touchBtn: 'Get in touch',
      resumeBtn: 'View resume',
      rights: 'ALL RIGHTS RESERVED',
    }
  },
  es: {
    nav: {
      home: 'INICIO',
      work: 'PROYECTOS',
      toolkit: 'HERRAMIENTAS',
      tech: 'TECNOLOGÍAS',
      labs: 'LABORATORIO',
      resume: 'CV',
      connect: 'CONTACTAR',
    },
    hero: {
      badge: 'Ing. de Sistemas / Desarrollador Full-Stack',
      title1: 'Hola 👋, soy Rodolfo Riveros Mitma',
      title2: '',
      description: 'Especializado en construir soluciones digitales de alto impacto: desde arquitecturas robustas en el backend hasta experiencias inmersivas en frontend, apps móviles y desarrollo de videojuegos. Apasionado por la tecnología y la enseñanza, transformo ideas complejas en código eficiente.',
      exploreBtn: 'Explorar Proyectos',
      touchBtn: 'Ponerse en Contacto',
      scroll: 'DESLIZAR',
    },
    bento: {
      badge: 'PROYECTOS DESTACADOS',
      title: 'Trabajos Seleccionados',
      subtitle: 'Plataformas educativas, control de asistencia biométrico, sistemas académicos y portales institucionales.',
      status: '01 / 04 PROYECTOS ACTIVOS',
      inspectNode: 'Haz clic para inspeccionar cargas del planificador, configuraciones de nodos y métricas de rendimiento.',
      nodeState: 'ESTADO DEL NODO: COMPILANDO LÍNEA',
      consensusLocks: 'Bloqueos de Consenso: ACTIVOS',
      consensusRate: 'TASA DE CONSENSO',
      edgeGateway: 'PUERTA DE ENLACE DE BORDE',
      pauseLive: 'PAUSAR EN VIVO',
      resumeLive: 'REANUDAR EN VIVO',
      gatewayLatency: 'LATENCIA DE ENTRADA',
      sysHighCons: 'SISTEMA DE ALTA CONSISTENCIA',
      framerate: 'FPS',
      activeParticles: 'Partículas Activas',
      techStack: 'Pila Tecnológica',
      modalOverview: 'Descripción General',
      modalArchitecture: 'Arquitectura del Sistema',
      modalMetrics: 'Métricas del Sistema',
      modalClose: 'Cerrar',
      statsTitle: 'RESUMEN DE TELEMETRÍA DEL SISTEMA',
      statsProjects: 'Proyectos Completados',
      statsCoffee: 'Café Consumido',
      statsExperience: 'Años de Experiencia',
      projects: {
        kunan: {
          title: 'Kunan - Control de Asistencia',
          category: 'SISTEMA DE CONTROL DE ASISTENCIA',
          description: 'Control de asistencia mediante biometricos ZKTeco con notificaciones SMS a padres de familia.',
          details: 'Kunan es un sistema de control de asistencia que integra dispositivos biometricos ZKTeco para el registro preciso de entrada y salida de estudiantes. Envia notificaciones automaticas via SMS a los padres de familia cuando el estudiante registra su asistencia, permitiendo una comunicación efectiva entre la institución educativa y el hogar.',
          architecture: ['Core Laravel (PHP)', 'SDK Biometrico ZKTeco', 'Pasarela SMS', 'Base de Datos MySQL'],
          metrics: [
            { label: 'Dispositivos Biométricos', value: '15+', trend: 'ZKTeco integrados' },
            { label: 'Tasa de Entrega SMS', value: '98%', trend: 'Notificaciones al instante' },
            { label: 'Estudiantes Activos', value: '2,000+', trend: 'Asistencia diaria' },
          ]
        },
        sirea: {
          title: 'SIREA - UGEL Urubamba',
          category: 'PLATAFORMA GUBERNAMENTAL',
          description: 'Control de asistencia docente bajo directiva MINEDU 326-2017 para instituciones educativas de UGEL Urubamba.',
          details: 'SIREA es un sistema oficial para la Unidad de Gestión Educativa Local de Urubamba, Cusco. Permite controlar la asistencia de docentes en instituciones educativas bajo la directiva MINEDU 326-2017, generando reportes detallados y consolidados para las IIEE de UGEL Urubamba.',
          architecture: ['Frontend React', 'API Backend Express.js', 'Base de Datos MySQL', 'Generador de Reportes MINEDU'],
          metrics: [
            { label: 'Docentes Registrados', value: '1,200+', trend: 'UGEL Urubamba' },
            { label: 'Instituciones Educativas', value: '180+', trend: 'Directiva MINEDU' },
            { label: 'Reportes de Asistencia', value: '15,000+', trend: 'Detallados y consolidados' },
          ]
        },
        academico: {
          title: 'Sistema Académico Profito',
          category: 'SUITE DE GESTIÓN ACADÉMICA',
          description: 'Gestión completa de matrículas, notas, reportes y toda la gestión académica para la EESPP LA SALLE.',
          details: 'Sistema Académico Profito es un intranet que maneja integralmente la gestión académica de la EESPP LA SALLE. Incluye matrículas, registro de notas, generación de reportes, control de asistencia y administración académica completa de estudiantes.',
          architecture: ['Core Laravel (PHP)', 'Base de Datos MySQL', 'Frontend Bootstrap', 'Generador de Reportes PDF'],
          metrics: [
            { label: 'Estudiantes Gestionados', value: '3,000+', trend: 'EESPP LA SALLE' },
            { label: 'Reportes Generados', value: '5,000+', trend: 'Período académico' },
            { label: 'Disponibilidad', value: '99.9%', trend: 'Alta disponibilidad' },
          ]
        },
        portal: {
          title: 'Portal Académico La Salle',
          category: 'PLATAFORMA ACADÉMICA',
          description: 'Plataforma de calificación y asistencia para estudiantes de la IESP LA SALLE DE Urubamba.',
          details: 'Portal Académico construido con Next.js en el frontend y FastAPI en el backend para la IESP LA SALLE DE Urubamba. Permite a los docentes calificar y registrar la asistencia de estudiantes de manera eficiente, con una interfaz moderna y rápida.',
          architecture: ['Frontend Next.js', 'Backend FastAPI', 'Base de Datos PostgreSQL', 'Autenticación JWT'],
          metrics: [
            { label: 'Estudiantes Activos', value: '1,500+', trend: 'IESP LA SALLE' },
            { label: 'Tiempo de Respuesta', value: '<200ms', trend: 'FastAPI optimizado' },
            { label: 'Usuarios Diarios', value: '50+', trend: 'Docentes y personal' },
          ]
        }
      }
    },
    tech: {
      badge: 'COMPETENCIAS DEL SISTEMA',
      title: 'Ecosistema Tecnológico',
      subtitle: 'Dominio de ingeniería avanzada en estado declarativo, shaders reactivos acelerados por GPU, compiladores nativos de baja latencia y redes core.',
      proficiency: 'DOMINIO',
      shipped: 'Proyectos Shipped',
      helpText: 'Pasa el cursor sobre cualquier nodo tecnológico para auditar las métricas de dominio del sistema.',
      hoverInfo: 'Pasa el cursor sobre cualquier nodo tecnológico para auditar las métricas de dominio del sistema.',
      categories: {
        frontend: 'DESARROLLO FRONTEND',
        backend: 'ARQUITECTURA BACKEND',
        webgl: 'WEBGL / SHADERS',
        isomorphic: 'SISTEMAS ISOMÓRFICOS',
        styling: 'DISEÑO ESTÉTICO',
        animation: 'ANIMACIÓN DINÁMICA',
        lowlevel: 'SISTEMAS / COMPILADORES',
        containers: 'CONCURRENCIA CLOUD',
      },
    },
    terminal: {
      badge: 'ESTACIÓN INTERACTIVA',
      title: 'Laboratorio de Pruebas',
      subtitle: 'Audita las métricas de mi portafolio, parámetros del sistema y credenciales de neofetch dentro de la terminal interactiva.',
      welcomeTitle: '¡Bienvenido a la Consola Interactiva de Systems Sandbox!',
      welcomeSubtitle: 'Escribe comandos a continuación para auditar sistemas, credenciales e índices de código abierto.',
      welcomeHelp: 'Para ver la lista de parámetros autorizados, escribe help.',
      inputPlaceholder: 'escribe help, neofetch, clear...',
      exp: 'TRAYECTORIA',
      shipped: 'COMPLETADOS',
      contrib: 'CÓDIGO ABIERTO',
      neofetchAscii: [
        '        .------.      ',
        '       /  _  _  \\     SYS.IO [root@sysio]',
        '       |   / \\   |    ---------------------------',
        '       |  \\_ _/  |    OS: CoreOS stable-rolling v4.0',
        '       \\    |    /    Kernel: x86_64 WebAssembly Sandbox',
        '        \'------\'     Uptime: 8+ Años de Maestría',
        '                      Shell: React-V4 Shell Sandbox',
        '                      Resolution: Responsive Grid viewport',
        '                      IDE: Custom Neovim / AI Studio Workspace',
        '                      CPU: Integración Core Gemini-3.5',
        '                      Memory: 100% Client-side Hydration',
      ]
    },
    connect: {
      compose: 'REACCIÓN SEGURA DE MENSAJES',
      title: 'Conectar con Rodolfo',
      subtitle: 'Envía propuestas de arquitectura, consultas de diseño de sistemas o solicitudes de credenciales al instante.',
      nameLabel: 'Nombre Completo',
      emailLabel: 'Correo Electrónico',
      messageLabel: 'Consulta de Proyecto',
      messagePlaceholder: 'Resume especificaciones, consumo de memoria, parámetros deseados...',
      btnBroadcast: 'TRANSMITIR MENSAJE',
      btnSyncing: 'SINCRONIZANDO MÉTRICAS...',
      successTitle: 'Transmisión Completada',
      successSubtitle: 'Mensaje registrado con éxito en el nodo de datos del portafolio. Firma segura verificada.',
      receiptHeader: 'HASH DE RECIBO ID',
      sender: 'REMITENTE',
      channel: 'CANAL',
      inquiry: 'CONSULTA',
      timestamp: 'Registrado en UTC',
      btnReceipt: 'RECIBO.JSON',
      btnDismiss: 'DESCARTAR',
      authTitle: 'Establecer Enlace Seguro',
      authSubtitle: 'Autentícate con Google para verificar la identidad del remitente, generar un protocolo TLS seguro y acceder a los registros persistentes de tus transmisiones.',
      btnAuth: 'ESTABLECER ENLACE SEGURO (GOOGLE LOGIN)',
      authenticatedAs: 'SESIÓN DE PUERTO SEGURO ACTIVA:',
      btnLogout: 'DESCONECTAR ENLACE',
      transmissionsLog: 'REGISTROS DE TRANSMISIONES SEGURAS',
    },
    resume: {
      badge: 'CURRICULUM VITAE',
      btnPrint: 'IMPRIMIR / GUARDAR',
      title: 'SYS.IO',
      subtitle: 'Ingeniero de Sistemas Cloud & Full-Stack',
      location: 'San Francisco, CA (Híbrido / Remoto)',
      profileTitle: 'Perfil Ejecutivo',
      profileText: 'Ingeniero de Sistemas de alto rendimiento con más de 8 años de trayectoria profesional dirigiendo arquitecturas cloud, mallas de microservicios distribuidos y tuberías de cliente de baja latencia. Experto en objetivos de compilación Rust, ejecución en el borde con WebAssembly y optimización de parámetros de escalado de contenedores en clústeres GPU Kubernetes. Dedicado a escribir código limpio, robusto y guiado por pruebas.',
      expTitle: 'Experiencia Profesional',
      eduTitle: 'Educación',
      eduName: 'Grado en Ingeniería Informática y Sistemas Distribuidos',
      eduMajor: 'Universidad de California, Berkeley | 2013 - 2017',
      eduDetails: 'Especialización en Algoritmos Paralelos, Teoría de Bases de Datos y Programación de Shaders.',
      credTitle: 'Credenciales Clave',
      jobs: {
        job1: {
          title: 'Staff Cloud Infrastructure Architect',
          company: 'Principal Cloud Inc | San Francisco, CA',
          date: '2022 - PRESENTE',
          bullets: [
            'Lideró la migración de modelos de machine learning distribuidos a clústeres GPU serverless, reduciendo la latencia operativa un 42%.',
            'Diseñó puertas de enlace API basadas en eBPF para ejecutar tablas de enrutamiento WASM en submilisegundos.',
            'Orquestó la unificación de telemetría de logs mediante agregadores D3/Rust sirviendo a más de 4M de conexiones activas.'
          ]
        },
        job2: {
          title: 'Senior Systems & WebGL Architect',
          company: 'Neural Networks Studio | Austin, TX',
          date: '2019 - 2022',
          bullets: [
            'Desarrolló interfaces de telemetría 3D en tiempo real usando Three.js y shaders de vértices GLSL para mapear la congestión de red.',
            'Estableció estrategias de almacenamiento optimista en React para eliminar el retraso de renderizado de analíticas.',
            'Optimizó índices de caché en bases de datos PostgreSQL, reduciendo el tiempo de lectura en un 65%.'
          ]
        },
        job3: {
          title: 'Full-Stack Software Engineer',
          company: 'Spatial Systems Labs | Seattle, WA',
          date: '2017 - 2019',
          bullets: [
            'Desarrolló APIs GraphQL responsivas con Node.js, Express y Redis, procesando 15,000 req/min con cero fugas de datos.',
            'Implementó componentes interactivos multiplataforma cumpliendo con estrictas directrices de usabilidad táctil de 44px.'
          ]
        }
      }
    },
    footer: {
      badge: 'CONEXIÓN DE SEGURIDAD VERIFICADA',
      cta: '¿Listo para construir el mañana?',
      title: '¿Listo para construir\nel mañana?',
      touchBtn: 'Ponerse en contacto',
      resumeBtn: 'Ver CV',
      rights: 'TODOS LOS DERECHOS RESERVADOS',
    }
  }
};
