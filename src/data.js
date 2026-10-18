export const PROJECTS = [
  {
    id: 'krezium', cat: 'mobile', catLabel: 'Mobile', icon: '💳', title: 'Krezium',
    desc: 'App Android para llevar créditos y tarjetas sin necesitar internet. Sin cuentas, sin registro, todo se guarda local. La hice para aprender Flutter de verdad.',
    tags: ['Flutter', 'Dart', 'Android'], acc: '#3b82f6', glow: 'rgba(59,130,246,.1)', url: 'krezium/', customCard: 'krezium',
  },
  {
    id: 'simuinvest', cat: 'edtech', catLabel: 'EdTech', icon: '📈', title: 'SimuInvest',
    desc: 'Lo hice para una materia de finanzas. Los estudiantes simulan inversiones, hay un mercado con tiempo límite, portafolio propio y una lógica que evalúa riesgo. Exporta a Excel.',
    tags: ['HTML/JS', 'Supabase', 'Heurística'], acc: '#22c55e', glow: 'rgba(34,197,94,.1)', url: '#',
  },
  {
    id: 'nomada', cat: 'negocios', catLabel: 'Negocios', icon: '🍽️', title: 'NÓMADA Carta Digital',
    desc: 'Carta digital para un restaurante: los clientes ven el menú desde el celular y el dueño administra todo desde un panel. Alpine.js + Express + SQLite.',
    tags: ['Alpine.js', 'Express', 'Prisma'], acc: '#f97316', glow: 'rgba(249,115,22,.1)', url: '#',
  },
  {
    id: 'zvr', cat: 'games', catLabel: 'Juegos', icon: '🤖', title: 'ZVR Arena',
    desc: 'Combate por turnos entre zombies y robots. Hay historial de partidas, win rate y un MVP al final de cada pelea. La estética cyberpunk fue una decisión desde el principio.',
    tags: ['Next.js 16', 'Prisma', 'SSR'], acc: '#a855f7', glow: 'rgba(168,85,247,.1)', url: '#',
  },
  {
    id: 'mjpancito', cat: 'games', catLabel: 'Juegos', icon: '🎮', title: 'MJ Pancito',
    desc: '9 juegos en una sola página: Wordle, Conecta 4, Ahorcado, Memorama, Mastermind y más. Empezó como proyecto de clase y quedó bastante completo.',
    tags: ['HTML/JS', 'Supabase', 'Tailwind'], acc: '#ec4899', glow: 'rgba(236,72,153,.1)', url: '#',
  },
  {
    id: 'tycoon', cat: 'games', catLabel: 'Juegos', icon: '🖥️', title: 'TycoonTerminal',
    desc: 'Simulación económica en Python con tres versiones: terminal pura, app con interfaz gráfica y otra que imita una pantalla hacker de los 80s. Fue un experimento.',
    tags: ['Python', 'tkinter', 'CLI'], acc: '#22d3ee', glow: 'rgba(34,211,238,.1)', url: '#',
  },
  {
    id: 'rifa', cat: 'negocios', catLabel: 'Negocios', icon: '🎟️', title: 'RifaParaMami',
    desc: 'Sistema para organizar rifas con panel de admin. El nombre lo dice todo — lo hice para un caso real, no como ejercicio.',
    tags: ['HTML', 'Tailwind', 'Admin'], acc: '#ef4444', glow: 'rgba(239,68,68,.1)', url: '#',
  },
  {
    id: 'focusmate', cat: 'tools', catLabel: 'Herramientas', icon: '⏱️', title: 'FocusMate',
    desc: 'Pomodoro para Linux que bloquea los juegos mientras trabajas. Manda notificaciones del sistema y guarda las sesiones en CSV. Solo Linux por ahora.',
    tags: ['Python', 'Linux'], acc: '#6366f1', glow: 'rgba(99,102,241,.1)', url: '#',
  },
];

export const FILTERS = [
  { key: 'all', label: 'TODOS' },
  { key: 'edtech', label: 'EDTECH' },
  { key: 'mobile', label: 'MOBILE' },
  { key: 'negocios', label: 'NEGOCIOS' },
  { key: 'games', label: 'JUEGOS' },
  { key: 'tools', label: 'HERRAMIENTAS' },
];
