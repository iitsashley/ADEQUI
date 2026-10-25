const formulas = [
  // General Chemistry
  {
    id: 1,
    name: 'Molaridad',
    formula: 'M = n / V',
    category: 'Química General',
    variables: {
      M: 'Molaridad (mol/L)',
      n: 'Número de moles (mol)',
      V: 'Volumen de solución (L)'
    },
    units: 'mol/L',
    whenToUse: 'Para calcular la concentración de una solución en moles por litro',
    example: 'Calcular la molaridad de 2 moles de NaCl en 0.5 L de solución'
  },
  {
    id: 2,
    name: 'Molalidad',
    formula: 'm = n / kg_solvente',
    category: 'Química General',
    variables: {
      m: 'Molalidad (mol/kg)',
      n: 'Número de moles (mol)',
      kg_solvente: 'Masa de solvente (kg)'
    },
    units: 'mol/kg',
    whenToUse: 'Para calcular la concentración en moles por kilogramo de solvente',
    example: 'Calcular la molalidad de 3 moles en 2 kg de agua'
  },
  {
    id: 3,
    name: 'Número de Moles',
    formula: 'n = m / M',
    category: 'Química General',
    variables: {
      n: 'Número de moles (mol)',
      m: 'Masa (g)',
      M: 'Masa molar (g/mol)'
    },
    units: 'mol',
    whenToUse: 'Para calcular la cantidad de sustancia en moles',
    example: 'Calcular los moles en 58.5 g de NaCl (M = 58.5 g/mol)'
  },
  {
    id: 4,
    name: 'Masa Molar',
    formula: 'M = m / n',
    category: 'Química General',
    variables: {
      M: 'Masa molar (g/mol)',
      m: 'Masa (g)',
      n: 'Número de moles (mol)'
    },
    units: 'g/mol',
    whenToUse: 'Para calcular la masa de un mol de sustancia',
    example: 'Calcular la masa molar si 2 moles pesan 116 g'
  },
  {
    id: 5,
    name: 'Densidad',
    formula: 'ρ = m / V',
    category: 'Química General',
    variables: {
      ρ: 'Densidad (g/mL)',
      m: 'Masa (g)',
      V: 'Volumen (mL)'
    },
    units: 'g/mL',
    whenToUse: 'Para calcular la densidad de una sustancia',
    example: 'Calcular la densidad de 100 g en 20 mL'
  },
  // Physical Chemistry
  {
    id: 6,
    name: 'Ley de los Gases Ideales',
    formula: 'PV = nRT',
    category: 'Fisicoquímica',
    variables: {
      P: 'Presión (atm)',
      V: 'Volumen (L)',
      n: 'Número de moles (mol)',
      R: 'Constante de gases (0.0821 L·atm/mol·K)',
      T: 'Temperatura (K)'
    },
    units: 'varía según la variable desconocida',
    whenToUse: 'Para relacionar presión, volumen, temperatura y moles de un gas ideal',
    example: 'Calcular el volumen de 2 moles de gas a 1 atm y 273 K'
  },
  {
    id: 7,
    name: 'Ley de Boyle',
    formula: 'P₁V₁ = P₂V₂',
    category: 'Fisicoquímica',
    variables: {
      P1: 'Presión inicial (atm)',
      V1: 'Volumen inicial (L)',
      P2: 'Presión final (atm)',
      V2: 'Volumen final (L)'
    },
    units: 'atm, L',
    whenToUse: 'Para relacionar presión y volumen a temperatura constante',
    example: 'Calcular la presión final si el volumen se duplica a temperatura constante'
  },
  {
    id: 8,
    name: 'Ley de Charles',
    formula: 'V₁/T₁ = V₂/T₂',
    category: 'Fisicoquímica',
    variables: {
      V1: 'Volumen inicial (L)',
      T1: 'Temperatura inicial (K)',
      V2: 'Volumen final (L)',
      T2: 'Temperatura final (K)'
    },
    units: 'L, K',
    whenToUse: 'Para relacionar volumen y temperatura a presión constante',
    example: 'Calcular el volumen final si la temperatura se duplica a presión constante'
  },
  {
    id: 9,
    name: 'Ley de Gay-Lussac',
    formula: 'P₁/T₁ = P₂/T₂',
    category: 'Fisicoquímica',
    variables: {
      P1: 'Presión inicial (atm)',
      T1: 'Temperatura inicial (K)',
      P2: 'Presión final (atm)',
      T2: 'Temperatura final (K)'
    },
    units: 'atm, K',
    whenToUse: 'Para relacionar presión y temperatura a volumen constante',
    example: 'Calcular la presión final si la temperatura aumenta a volumen constante'
  },
  {
    id: 10,
    name: 'Entalpía',
    formula: 'ΔH = H_products - H_reactants',
    category: 'Fisicoquímica',
    variables: {
      ΔH: 'Cambio de entalpía (J/mol)',
      H_products: 'Entalpía de productos (J/mol)',
      H_reactants: 'Entalpía de reactivos (J/mol)'
    },
    units: 'J/mol',
    whenToUse: 'Para calcular el cambio de calor en una reacción a presión constante',
    example: 'Calcular ΔH si los productos tienen -200 kJ y los reactivos -150 kJ'
  },
  {
    id: 11,
    name: 'Energía Libre de Gibbs',
    formula: 'ΔG = ΔH - TΔS',
    category: 'Fisicoquímica',
    variables: {
      ΔG: 'Energía libre de Gibbs (J/mol)',
      ΔH: 'Cambio de entalpía (J/mol)',
      T: 'Temperatura (K)',
      ΔS: 'Cambio de entropía (J/mol·K)'
    },
    units: 'J/mol',
    whenToUse: 'Para determinar espontaneidad de una reacción',
    example: 'Calcular ΔG si ΔH = -100 kJ, T = 298 K, ΔS = 50 J/K'
  },
  // Analytical Chemistry
  {
    id: 12,
    name: 'pH',
    formula: 'pH = -log[H⁺]',
    category: 'Química Analítica',
    variables: {
      pH: 'Potencial de hidrógeno',
      'H+': 'Concentración de iones hidrógeno (mol/L)'
    },
    units: 'adimensional',
    whenToUse: 'Para calcular la acidez de una solución',
    example: 'Calcular el pH de una solución con [H+] = 0.01 M'
  },
  {
    id: 13,
    name: 'pOH',
    formula: 'pOH = -log[OH⁻]',
    category: 'Química Analítica',
    variables: {
      pOH: 'Potencial de hidróxido',
      'OH-': 'Concentración de iones hidróxido (mol/L)'
    },
    units: 'adimensional',
    whenToUse: 'Para calcular la basicidad de una solución',
    example: 'Calcular el pOH de una solución con [OH-] = 0.001 M'
  },
  {
    id: 14,
    name: 'Relación pH-pOH',
    formula: 'pH + pOH = 14',
    category: 'Química Analítica',
    variables: {
      pH: 'Potencial de hidrógeno',
      pOH: 'Potencial de hidróxido'
    },
    units: 'adimensional',
    whenToUse: 'Para relacionar pH y pOH a 25°C',
    example: 'Calcular pOH si el pH es 3'
  },
  {
    id: 15,
    name: 'Dilución',
    formula: 'M₁V₁ = M₂V₂',
    category: 'Química Analítica',
    variables: {
      M1: 'Molaridad inicial (mol/L)',
      V1: 'Volumen inicial (L)',
      M2: 'Molaridad final (mol/L)',
      V2: 'Volumen final (L)'
    },
    units: 'mol/L, L',
    whenToUse: 'Para calcular concentraciones después de diluir una solución',
    example: 'Calcular la molaridad final al diluir 1 L de 2 M a 2 L'
  },
  // Electrochemistry
  {
    id: 16,
    name: 'Ley de Faraday',
    formula: 'm = (M * I * t) / (n * F)',
    category: 'Electroquímica',
    variables: {
      m: 'Masa depositada (g)',
      M: 'Masa molar (g/mol)',
      I: 'Corriente (A)',
      t: 'Tiempo (s)',
      n: 'Número de electrones',
      F: 'Constante de Faraday (96485 C/mol)'
    },
    units: 'g',
    whenToUse: 'Para calcular la masa depositada en electrólisis',
    example: 'Calcular la masa de cobre depositada con 5 A durante 3600 s'
  },
  {
    id: 17,
    name: 'Ecuación de Nernst',
    formula: 'E = E° - (RT/nF) * ln(Q)',
    category: 'Electroquímica',
    variables: {
      E: 'Potencial de celda (V)',
      E0: 'Potencial estándar (V)',
      R: 'Constante de gases (8.314 J/mol·K)',
      T: 'Temperatura (K)',
      n: 'Número de electrones',
      F: 'Constante de Faraday (96485 C/mol)',
      Q: 'Cociente de reacción'
    },
    units: 'V',
    whenToUse: 'Para calcular el potencial de celda en condiciones no estándar',
    example: 'Calcular E si E° = 1.23 V, T = 298 K, n = 2, Q = 0.1'
  },
  // Kinetics
  {
    id: 18,
    name: 'Velocidad de Reacción',
    formula: 'v = -Δ[A]/Δt = Δ[B]/Δt',
    category: 'Cinética Química',
    variables: {
      v: 'Velocidad de reacción (M/s)',
      A: 'Concentración de reactivo (M)',
      B: 'Concentración de producto (M)',
      t: 'Tiempo (s)'
    },
    units: 'M/s',
    whenToUse: 'Para calcular la velocidad de una reacción química',
    example: 'Calcular la velocidad si [A] disminuye 0.1 M en 10 s'
  },
  {
    id: 19,
    name: 'Ley de Velocidad',
    formula: 'v = k[A]^m[B]^n',
    category: 'Cinética Química',
    variables: {
      v: 'Velocidad de reacción (M/s)',
      k: 'Constante de velocidad',
      A: 'Concentración de reactivo A (M)',
      B: 'Concentración de reactivo B (M)',
      m: 'Orden con respecto a A',
      n: 'Orden con respecto a B'
    },
    units: 'varía según el orden total',
    whenToUse: 'Para relacionar velocidad con concentraciones',
    example: 'Calcular v si k = 0.5, [A] = 0.1, [B] = 0.2, m = 1, n = 2'
  },
  {
    id: 20,
    name: 'Ecuación de Arrhenius',
    formula: 'k = A * e^(-Ea/RT)',
    category: 'Cinética Química',
    variables: {
      k: 'Constante de velocidad',
      A: 'Factor de frecuencia',
      Ea: 'Energía de activación (J/mol)',
      R: 'Constante de gases (8.314 J/mol·K)',
      T: 'Temperatura (K)'
    },
    units: 'varía según el orden de reacción',
    whenToUse: 'Para calcular la constante de velocidad a diferentes temperaturas',
    example: 'Calcular k si A = 10^13, Ea = 50000 J/mol, T = 298 K'
  },
  // Thermodynamics
  {
    id: 21,
    name: 'Cambio de Entalpía',
    formula: 'ΔH = ΣH_products - ΣH_reactants',
    category: 'Termodinámica',
    variables: {
      ΔH: 'Cambio de entalpía (J/mol)',
      H_products: 'Suma de entalpías de productos (J/mol)',
      H_reactants: 'Suma de entalpías de reactivos (J/mol)'
    },
    units: 'J/mol',
    whenToUse: 'Para calcular el calor absorbido o liberado en una reacción',
    example: 'Calcular ΔH para una reacción exotérmica'
  },
  {
    id: 22,
    name: 'Cambio de Entropía',
    formula: 'ΔS = ΣS_products - ΣS_reactants',
    category: 'Termodinámica',
    variables: {
      ΔS: 'Cambio de entropía (J/mol·K)',
      S_products: 'Suma de entropías de productos (J/mol·K)',
      S_reactants: 'Suma de entropías de reactivos (J/mol·K)'
    },
    units: 'J/mol·K',
    whenToUse: 'Para calcular el cambio de desorden en una reacción',
    example: 'Calcular ΔS para una reacción que aumenta el número de moléculas'
  },
  {
    id: 23,
    name: 'Cambio de Energía Libre',
    formula: 'ΔG = ΔH - TΔS',
    category: 'Termodinámica',
    variables: {
      ΔG: 'Cambio de energía libre (J/mol)',
      ΔH: 'Cambio de entalpía (J/mol)',
      T: 'Temperatura (K)',
      ΔS: 'Cambio de entropía (J/mol·K)'
    },
    units: 'J/mol',
    whenToUse: 'Para determinar espontaneidad de una reacción',
    example: 'Calcular ΔG para predecir si una reacción es espontánea'
  },
  // Concentration Formulas
  {
    id: 24,
    name: 'PPM — Partes por Millón',
    formula: 'PPM = (masa del soluto / masa de la solución) × 10⁶',
    category: 'Química Analítica',
    variables: {
      PPM: 'Partes por millón',
      'masa del soluto': 'Masa del soluto (g)',
      'masa de la solución': 'Masa de la solución (g)',
      '10⁶': 'Factor de conversión (un millón)'
    },
    units: 'ppm',
    whenToUse: 'Para calcular concentraciones muy diluidas',
    example: 'Calcular PPM de 0.005 g de soluto en 1000 g de solución'
  },
  {
    id: 25,
    name: '% P/V — Porcentaje Peso/Volumen',
    formula: '\\%\\,P/V = \\frac{\\text{masa del soluto}}{\\text{volumen de la solución}} \\times 100',
    category: 'Química Analítica',
    variables: {
      '% P/V': 'Porcentaje peso/volumen',
      'masa del soluto': 'Masa del soluto (g)',
      'volumen de la solución': 'Volumen de la solución (mL)',
      '100': 'Factor de conversión a porcentaje'
    },
    units: 'g/100 mL',
    whenToUse: 'Para calcular gramos de soluto por cada 100 mL de solución',
    example: '5 % P/V = 5 g de soluto por cada 100 mL de solución'
  },
  {
    id: 26,
    name: '% P/P — Porcentaje Peso/Peso',
    formula: '\\%\\,P/P = \\frac{\\text{masa del soluto}}{\\text{masa de la solución}} \\times 100',
    category: 'Química Analítica',
    variables: {
      '% P/P': 'Porcentaje peso/peso',
      'masa del soluto': 'Masa del soluto (g)',
      'masa de la solución': 'Masa de la solución (g)',
      '100': 'Factor de conversión a porcentaje'
    },
    units: 'g/100 g',
    whenToUse: 'Para calcular gramos de soluto por cada 100 g de solución',
    example: '10 % P/P = 10 g de soluto por cada 100 g de solución'
  },
  {
    id: 27,
    name: '% V/V — Porcentaje Volumen/Volumen',
    formula: '\\%\\,V/V = \\frac{\\text{volumen del soluto}}{\\text{volumen de la solución}} \\times 100',
    category: 'Química Analítica',
    variables: {
      '% V/V': 'Porcentaje volumen/volumen',
      'volumen del soluto': 'Volumen del soluto (mL)',
      'volumen de la solución': 'Volumen de la solución (mL)',
      '100': 'Factor de conversión a porcentaje'
    },
    units: 'mL/100 mL',
    whenToUse: 'Para calcular mililitros de soluto por cada 100 mL de solución',
    example: '20 % V/V = 20 mL de soluto por cada 100 mL de solución'
  }
];

module.exports = formulas;
