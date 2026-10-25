const branches = [
  {
    id: 1,
    name: 'Química Orgánica',
    icon: '🧪',
    description: 'Estudia los compuestos que contienen carbono, que son la base de la vida.',
    whatItStudies: 'Compuestos orgánicos, hidrocarburos, funciones orgánicas, polímeros, biomoléculas.',
    examples: 'Metano, etanol, glucosa, ADN, proteínas, plásticos.',
    relatedFormulas: ['Reacciones orgánicas', 'Estequiometría orgánica', 'Nomenclatura orgánica'],
    relatedProblems: ['Reacciones de sustitución', 'Reacciones de adición', 'Polimerización']
  },
  {
    id: 2,
    name: 'Química Inorgánica',
    icon: '⚗️',
    description: 'Estudia los compuestos que no contienen carbono-hidrógeno, incluyendo metales y minerales.',
    whatItStudies: 'Elementos metálicos y no metálicos, compuestos inorgánicos, minerales, catalizadores.',
    examples: 'Sales, óxidos, ácidos inorgánicos, bases, metales de transición.',
    relatedFormulas: ['Formación de iones', 'Reacciones redox', 'Equilibrio iónico'],
    relatedProblems: ['Balanceo de ecuaciones', 'Reacciones de precipitación', 'Reacciones ácido-base']
  },
  {
    id: 3,
    name: 'Química Analítica',
    icon: '🔬',
    description: 'Se enfoca en el análisis de materiales para determinar su composición química.',
    whatItStudies: 'Técnicas de separación, métodos cuantitativos y cualitativos, instrumentación.',
    examples: 'Titulaciones, cromatografía, espectroscopía, análisis gravimétrico.',
    relatedFormulas: ['pH', 'pOH', 'Diluciones', 'Concentraciones', 'Titulaciones'],
    relatedProblems: ['Cálculo de pH', 'Diluciones', 'Análisis volumétrico']
  },
  {
    id: 4,
    name: 'Fisicoquímica',
    icon: '📊',
    description: 'Aplica la física para entender los fenómenos químicos a nivel molecular.',
    whatItStudies: 'Termodinámica, cinética, mecánica cuántica, equilibrio químico.',
    examples: 'Energía de activación, entalpía, entropía, velocidad de reacción.',
    relatedFormulas: ['Ley de los gases ideales', 'Termodinámica', 'Cinética', 'Equilibrio'],
    relatedProblems: ['Cálculos de gases', 'Energía de reacción', 'Velocidad de reacción']
  },
  {
    id: 5,
    name: 'Bioquímica',
    icon: '🧬',
    description: 'Estudia los procesos químicos en los organismos vivos.',
    whatItStudies: 'Metabolismo, enzimas, ADN, proteínas, carbohidratos, lípidos.',
    examples: 'Fotosíntesis, respiración celular, digestión, síntesis de proteínas.',
    relatedFormulas: ['Estequiometría metabólica', 'Energía bioquímica', 'Enzimas'],
    relatedProblems: ['Balance energético', 'Rutas metabólicas', 'Catalisis enzimática']
  },
  {
    id: 6,
    name: 'Química Nuclear',
    icon: '☢️',
    description: 'Estudia los procesos nucleares y las propiedades de los núcleos atómicos.',
    whatItStudies: 'Radiactividad, fisión, fusión, reacciones nucleares, isótopos.',
    examples: 'Decaimiento radiactivo, reactores nucleares, datación por carbono-14.',
    relatedFormulas: ['Decaimiento radiactivo', 'Energía nuclear', 'Vida media'],
    relatedProblems: ['Cálculo de vida media', 'Energía de fisión', 'Reacciones nucleares']
  },
  {
    id: 7,
    name: 'Química Ambiental',
    icon: '🌍',
    description: 'Estudia los procesos químicos en el ambiente y su impacto.',
    whatItStudies: 'Contaminación, cambio climático, química atmosférica, tratamiento de aguas.',
    examples: 'Lluvia ácida, efecto invernadero, ozono, contaminantes del agua.',
    relatedFormulas: ['Concentraciones ambientales', 'Cinética ambiental', 'Equilibrios ambientales'],
    relatedProblems: ['Cálculo de contaminación', 'Tratamiento de aguas', 'Emisiones']
  },
  {
    id: 8,
    name: 'Química Industrial',
    icon: '🏭',
    description: 'Aplica la química a procesos industriales y manufactura.',
    whatItStudies: 'Procesos químicos a gran escala, catalizadores industriales, ingeniería química.',
    examples: 'Producción de amoníaco, refinación de petróleo, fabricación de plásticos.',
    relatedFormulas: ['Rendimiento', 'Estequiometría industrial', 'Balance de materia'],
    relatedProblems: ['Cálculo de rendimiento', 'Optimización de procesos', 'Balance de masa']
  }
];

module.exports = branches;
