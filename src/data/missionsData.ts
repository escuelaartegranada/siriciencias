import { Medal } from '../types';

export interface MissionInfo {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  badgeName: string;
  badgeIcon: string;
  color: string;
  bookPages: { pageNum: number; imagePath: string; title: string }[];
  narrationIntro: string;
}

export const MISSIONS: MissionInfo[] = [
  {
    id: 'mission_1',
    order: 1,
    title: '¿Vivos o espantapájaros?',
    subtitle: 'Las 3 funciones vitales',
    badgeName: 'Exploradora de la Vida',
    badgeIcon: '🌱',
    color: 'emerald',
    narrationIntro: '¡Hola! ¿Sabías que los espantapájaros se parecen a nosotros pero no están vivos? Vamos a descubrir las 3 funciones vitales: nutrición, relación y reproducción.',
    bookPages: [
      { pageNum: 9, imagePath: '/assets/aistudio/TrabajoCiencias_0004_18_38929178.png', title: 'Ficha 1: ¿Podríamos vivir como un espantapájaros?' },
      { pageNum: 10, imagePath: '/assets/aistudio/TrabajoCiencias_0001_21_b040863e.png', title: 'Página 10: ¿Qué permite cada función vital?' }
    ]
  },
  {
    id: 'mission_2',
    order: 2,
    title: 'Nuestra energía para funcionar',
    subtitle: 'La función de nutrición y los 4 aparatos',
    badgeName: 'Gran Nutróloga',
    badgeIcon: '⚡',
    color: 'amber',
    narrationIntro: 'Igual que un coche necesita gasolina o batería, nuestro cuerpo necesita energía. ¡Descubre los 4 aparatos de la nutrición: digestivo, respiratorio, circulatorio y excretor!',
    bookPages: [
      { pageNum: 11, imagePath: '/assets/aistudio/TrabajoCiencias_0005_17_6fc622ba.png', title: 'Ficha 2: ¿Cómo consigo la energía para funcionar?' },
      { pageNum: 12, imagePath: '/assets/aistudio/TrabajoCiencias_0003_19_534a7fbe.png', title: 'Página 12: Órganos de la nutrición y detective de errores' }
    ]
  },
  {
    id: 'mission_3',
    order: 3,
    title: 'El taller de Tina',
    subtitle: '¿Podemos vivir con un solo pulmón?',
    badgeName: 'Científica de Laboratorio',
    badgeIcon: '🔬',
    color: 'sky',
    narrationIntro: '¡Bienvenida al taller de ciencias de Tina! Construiremos una maqueta con pajitas y bolsas para ver cómo respiramos el oxígeno del aire.',
    bookPages: [
      { pageNum: 13, imagePath: '/assets/aistudio/TrabajoCiencias_0002_20_d0aadcdc.png', title: 'Ficha 3: El taller de Tina. ¿Podemos vivir con un pulmón?' },
      { pageNum: 14, imagePath: '/assets/aistudio/TrabajoCiencias_0000_22_e5aeca9a.png', title: 'Página 14: Experimento y conclusiones científicas' }
    ]
  },
  {
    id: 'mission_4',
    order: 4,
    title: '¿Solo la mano mueve la raqueta?',
    subtitle: 'La función de relación, sentidos, huesos y músculos',
    badgeName: 'Atleta del Movimiento',
    badgeIcon: '🎾',
    color: 'indigo',
    narrationIntro: 'Para golpear una pelota pasan muchas cosas muy rápido: ¡los sentidos ven la bola, el cerebro piensa y los huesos y músculos se mueven!',
    bookPages: [
      { pageNum: 15, imagePath: '/assets/aistudio/TrabajoCiencias_0021_1_b6caa858.png', title: 'Ficha 4: ¿Solo utilizamos la mano para mover la raqueta?' },
      { pageNum: 16, imagePath: '/assets/aistudio/TrabajoCiencias_0020_2_fb966a01.png', title: 'Página 16: Aparato locomotor y el esternocleidomastoideo' }
    ]
  },
  {
    id: 'mission_5',
    order: 5,
    title: '¿Una persona con dos corazones?',
    subtitle: 'La reproducción humana y la intimidad',
    badgeName: 'El Milagro de la Vida',
    badgeIcon: '❤️',
    color: 'rose',
    narrationIntro: '¿Sabías que una mamá embarazada tiene dos corazones latiendo a la vez? Aprenderemos cómo crecemos en el vientre y cuidamos nuestra intimidad.',
    bookPages: [
      { pageNum: 17, imagePath: '/assets/aistudio/TrabajoCiencias_0019_3_64f67641.png', title: 'Ficha 5: ¿Una persona puede tener más de un corazón?' },
      { pageNum: 18, imagePath: '/assets/aistudio/TrabajoCiencias_0018_4_4af5295d.png', title: 'Página 18: Órganos reproductores y las etapas del embarazo' }
    ]
  },
  {
    id: 'mission_6',
    order: 6,
    title: 'El entorno influye en mi salud',
    subtitle: 'Los 5 hábitos saludables y la amistad',
    badgeName: 'Campeona de la Salud',
    badgeIcon: '🍎',
    color: 'teal',
    narrationIntro: 'Los 5 pilares para crecer fuertes y felices: higiene, descanso, deporte, tiempo libre en la naturaleza y comida sana.',
    bookPages: [
      { pageNum: 19, imagePath: '/assets/aistudio/TrabajoCiencias_0017_5_7ec4667c.png', title: 'Ficha 6: ¿El entorno influye en mi salud?' },
      { pageNum: 20, imagePath: '/assets/aistudio/TrabajoCiencias_0016_6_ae610300.png', title: 'Página 20: El cartel de la salud y hábitos diarios' }
    ]
  },
  {
    id: 'mission_7',
    order: 7,
    title: 'Kathrine Switzer y su dorsal 261',
    subtitle: 'Igualdad en el deporte para niños y niñas',
    badgeName: 'Heroína de la Igualdad',
    badgeIcon: '🏃‍♀️',
    color: 'purple',
    narrationIntro: 'Conoce la historia real de Kathrine Switzer. En 1967 demostró al mundo entero que las mujeres y las niñas pueden correr y hacer cualquier deporte.',
    bookPages: [
      { pageNum: 21, imagePath: '/assets/aistudio/TrabajoCiencias_0015_7_33bb9a0b.png', title: 'Ficha 7: Descubre a Kathrine Switzer' },
      { pageNum: 22, imagePath: '/assets/aistudio/TrabajoCiencias_0014_8_94c91b7b.png', title: 'Página 22: Un dorsal por la igualdad en el recreo' }
    ]
  },
  {
    id: 'mission_8',
    order: 8,
    title: 'Gran Reto: Patios de Todos y para Todos',
    subtitle: 'Diseña el recreo saludable y Quiz Maestro',
    badgeName: 'Superestrella de Ciencias',
    badgeIcon: '🏆',
    color: 'yellow',
    narrationIntro: '¡El reto final del tema! Diseñaremos un patio escolar divertido e inclusivo donde nadie se quede solo, y demostraremos todo lo aprendido.',
    bookPages: [
      { pageNum: 23, imagePath: '/assets/aistudio/TrabajoCiencias_0013_9_c7a2e5fd.png', title: 'Página 23: Nuestro Reto - Paso 1 y Paso 2' },
      { pageNum: 24, imagePath: '/assets/aistudio/TrabajoCiencias_0012_10_af2726c9.png', title: 'Página 24: Plano del patio inclusivo y autoevaluación' },
      { pageNum: 25, imagePath: '/assets/aistudio/TrabajoCiencias_0011_11_125d782c.png', title: 'Página 25: En resumen - Nutrición' },
      { pageNum: 26, imagePath: '/assets/aistudio/TrabajoCiencias_0010_12_7b29f19a.png', title: 'Página 26: En resumen - Relación, Reproducción y Hábitos' },
      { pageNum: 27, imagePath: '/assets/aistudio/TrabajoCiencias_0009_13_36e4955e.png', title: 'Página 27: Repasamos los órganos y funciones' },
      { pageNum: 28, imagePath: '/assets/aistudio/TrabajoCiencias_0008_14_642040ad.png', title: 'Página 28: Caso Nerea y Adrián' }
    ]
  }
];

export const ALL_MEDALS: Medal[] = MISSIONS.map(m => ({
  id: m.id,
  title: m.badgeName,
  subtitle: m.subtitle,
  icon: m.badgeIcon,
  color: m.color,
}));
