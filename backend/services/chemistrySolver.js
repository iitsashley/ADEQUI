/**
 * Chemistry Solver Service
 * Contains deterministic functions for solving chemistry problems
 */

const periodicTable = require('../data/periodicTable');

class ChemistrySolver {

  /**
   * Calculate molar mass from chemical formula
   * @param {string} formula - Chemical formula (e.g., H2O, NaCl, CO2)
   * @returns {number} Molar mass in g/mol
   */
  static calculateMolarMassFromFormula(formula) {
    const elementMap = {};
    periodicTable.forEach(element => {
      elementMap[element.symbol] = element.atomicMass;
    });

    // Parse the chemical formula
    const regex = /([A-Z][a-z]?)(\d*)/g;
    let match;
    let totalMass = 0;

    while ((match = regex.exec(formula)) !== null) {
      const symbol = match[1];
      const count = match[2] ? parseInt(match[2]) : 1;

      if (!elementMap[symbol]) {
        throw new Error(`Elemento desconocido: ${symbol}`);
      }

      totalMass += elementMap[symbol] * count;
    }

    return totalMass;
  }
  /**
   * Solve molarity problems
   * M = n / V
   */
  static solveMolarity(data) {
    const { moles, volume, volumeUnit } = data;

    // Validation
    if (moles === undefined || volume === undefined) {
      throw new Error('Se requieren moles y volumen');
    }
    if (moles < 0 || volume <= 0) {
      throw new Error('Valores inválidos: moles debe ser positivo y volumen mayor a 0');
    }

    // Convert volume to liters if in mL
    const volumeInLiters = volumeUnit === 'mL' ? volume / 1000 : volume;

    // Calculate
    const molarity = moles / volumeInLiters;

    return {
      formula: 'M = n / V',
      data: {
        n: `${moles} mol`,
        V: `${volume} ${volumeUnit}`
      },
      steps: [
        'Identificar la fórmula de molaridad',
        'Convertir volumen a litros si es necesario',
        'Sustituir los valores en la fórmula',
        'Realizar la división'
      ],
      substitutions: `M = ${moles} / ${volumeInLiters}`,
      calculation: `M = ${molarity.toFixed(4)}`,
      result: molarity.toFixed(4),
      unit: 'mol/L',
      explanation: 'La molaridad representa la cantidad de moles de soluto presentes por cada litro de solución. Se calcula dividiendo el número de moles entre el volumen en litros.'
    };
  }

  /**
   * Solve moles problems
   * n = M * V
   */
  static solveMoles(data) {
    const { molarity, volume, volumeUnit } = data;

    // Validation
    if (molarity === undefined || volume === undefined) {
      throw new Error('Se requieren molaridad y volumen');
    }
    if (molarity < 0 || volume <= 0) {
      throw new Error('Valores inválidos: molaridad debe ser positiva y volumen mayor a 0');
    }

    // Convert volume to liters if in mL
    const volumeInLiters = volumeUnit === 'mL' ? volume / 1000 : volume;

    // Calculate
    const moles = molarity * volumeInLiters;

    return {
      formula: 'n = M * V',
      data: {
        M: `${molarity} mol/L`,
        V: `${volume} ${volumeUnit}`
      },
      steps: [
        'Identificar la fórmula para calcular moles',
        'Convertir volumen a litros si es necesario',
        'Sustituir los valores en la fórmula',
        'Realizar la multiplicación'
      ],
      substitutions: `n = ${molarity} * ${volumeInLiters}`,
      calculation: `n = ${moles.toFixed(4)}`,
      result: moles.toFixed(4),
      unit: 'mol',
      explanation: 'El número de moles se calcula multiplicando la molaridad por el volumen en litros. Esto nos da la cantidad de sustancia en moles.'
    };
  }

  /**
   * Solve molar mass problems
   * Calculate from chemical formula only
   */
  static solveMolarMass(data) {
    const { formula } = data;

    // Validation
    if (!formula) {
      throw new Error('Se requiere la fórmula química');
    }

    try {
      const molarMass = this.calculateMolarMassFromFormula(formula);

      // Parse formula to show breakdown
      const regex = /([A-Z][a-z]?)(\d*)/g;
      let match;
      const breakdown = [];

      while ((match = regex.exec(formula)) !== null) {
        const symbol = match[1];
        const count = match[2] ? parseInt(match[2]) : 1;
        const elementData = periodicTable.find(e => e.symbol === symbol);
        if (elementData) {
          breakdown.push(`${symbol} (${elementData.atomicMass} * ${count}) = ${(elementData.atomicMass * count).toFixed(3)}`);
        }
      }

      return {
        formula: formula,
        data: {
          'Fórmula': formula,
          'Desglose': breakdown.join(' + ')
        },
        steps: [
          'Identificar los elementos en la fórmula',
          'Multiplicar la masa atómica de cada elemento por su número de átomos',
          'Sumar todas las contribuciones'
        ],
        substitutions: breakdown.join(' + '),
        calculation: `${molarMass.toFixed(4)}`,
        result: molarMass.toFixed(4),
        unit: 'g/mol',
        explanation: `La masa molar de ${formula} se calcula sumando las masas atómicas de todos los elementos en la fórmula, multiplicadas por el número de átomos de cada elemento.`
      };
    } catch (error) {
      throw new Error(`Error al calcular masa molar de la fórmula: ${error.message}`);
    }
  }

  /**
   * Solve density problems
   * ρ = m / V
   */
  static solveDensity(data) {
    const { mass, volume, volumeUnit } = data;

    // Validation
    if (mass === undefined || volume === undefined) {
      throw new Error('Se requieren masa y volumen');
    }
    if (mass <= 0 || volume <= 0) {
      throw new Error('Valores inválidos: masa y volumen deben ser mayores a 0');
    }

    // Convert volume to mL if in L
    const volumeInMl = volumeUnit === 'L' ? volume * 1000 : volume;

    // Calculate
    const density = mass / volumeInMl;

    return {
      formula: 'ρ = m / V',
      data: {
        m: `${mass} g`,
        V: `${volume} ${volumeUnit}`
      },
      steps: [
        'Identificar la fórmula de densidad',
        'Convertir volumen a mL si es necesario',
        'Sustituir los valores en la fórmula',
        'Realizar la división'
      ],
      substitutions: `ρ = ${mass} / ${volumeInMl}`,
      calculation: `ρ = ${density.toFixed(4)}`,
      result: density.toFixed(4),
      unit: 'g/mL',
      explanation: 'La densidad es la relación entre la masa y el volumen de una sustancia. Se calcula dividiendo la masa en gramos entre el volumen en mililitros.'
    };
  }

  /**
   * Solve dilution problems
   * M1V1 = M2V2
   */
  static solveDilution(data) {
    const { volumeUnit, unknown } = data;
    const rawValues = { M1: data.M1, V1: data.V1, M2: data.M2, V2: data.V2 };
    const values = {};

    Object.entries(rawValues).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        const numericValue = Number(value);
        if (!Number.isFinite(numericValue)) {
          throw new Error(`${key} debe ser un número válido`);
        }
        values[key] = numericValue;
      }
    });

    const { M1, V1, M2, V2 } = values;

    // Validation - at least 3 of 4 values must be provided
    const providedValues = [M1, V1, M2, V2].filter(v => v !== undefined);
    if (providedValues.length < 3) {
      throw new Error('Se requieren al menos 3 valores (M1, V1, M2, V2)');
    }

    // Validate provided values are positive
    if (M1 !== undefined && M1 <= 0) throw new Error('M1 debe ser mayor a 0');
    if (V1 !== undefined && V1 <= 0) throw new Error('V1 debe ser mayor a 0');
    if (M2 !== undefined && M2 <= 0) throw new Error('M2 debe ser mayor a 0');
    if (V2 !== undefined && V2 <= 0) throw new Error('V2 debe ser mayor a 0');

    let result, formula, substitutions, calculation, unit, explanation, steps;

    // Determine which variable to calculate
    if (M1 === undefined) {
      // Calculate M1: M1 = (M2 * V2) / V1
      result = (M2 * V2) / V1;
      formula = 'M₁ = (M₂ * V₂) / V₁';
      substitutions = `M₁ = (${M2} * ${V2}) / ${V1}`;
      calculation = `M₁ = ${(M2 * V2).toFixed(4)} / ${V1}`;
      unit = 'mol/L';
      explanation = 'La molaridad inicial se calcula usando la fórmula de dilución. Se despeja M1 dividiendo el producto de M2 y V2 entre V1.';
      steps = [
        'Identificar la fórmula de dilución',
        'Despejar M1: M1 = (M2 * V2) / V1',
        'Sustituir los valores en la fórmula',
        'Realizar el cálculo'
      ];
    } else if (V1 === undefined) {
      // Calculate V1: V1 = (M2 * V2) / M1
      result = (M2 * V2) / M1;
      formula = 'V₁ = (M₂ * V₂) / M₁';
      substitutions = `V₁ = (${M2} * ${V2}) / ${M1}`;
      calculation = `V₁ = ${(M2 * V2).toFixed(4)} / ${M1}`;
      unit = volumeUnit || 'L';
      explanation = 'El volumen inicial se calcula usando la fórmula de dilución. Se despeja V1 dividiendo el producto de M2 y V2 entre M1.';
      steps = [
        'Identificar la fórmula de dilución',
        'Despejar V1: V1 = (M2 * V2) / M1',
        'Sustituir los valores en la fórmula',
        'Realizar el cálculo'
      ];
    } else if (M2 === undefined) {
      // Calculate M2: M2 = (M1 * V1) / V2
      result = (M1 * V1) / V2;
      formula = 'M₂ = (M₁ * V₁) / V₂';
      substitutions = `M₂ = (${M1} * ${V1}) / ${V2}`;
      calculation = `M₂ = ${(M1 * V1).toFixed(4)} / ${V2}`;
      unit = 'mol/L';
      explanation = 'La molaridad final se calcula usando la fórmula de dilución. Se despeja M2 dividiendo el producto de M1 y V1 entre V2.';
      steps = [
        'Identificar la fórmula de dilución',
        'Despejar M2: M2 = (M1 * V1) / V2',
        'Sustituir los valores en la fórmula',
        'Realizar el cálculo'
      ];
    } else if (V2 === undefined) {
      // Calculate V2: V2 = (M1 * V1) / M2
      result = (M1 * V1) / M2;
      formula = 'V₂ = (M₁ * V₁) / M₂';
      substitutions = `V₂ = (${M1} * ${V1}) / ${M2}`;
      calculation = `V₂ = ${(M1 * V1).toFixed(4)} / ${M2}`;
      unit = volumeUnit || 'L';
      explanation = 'El volumen final se calcula usando la fórmula de dilución. Se despeja V2 dividiendo el producto de M1 y V1 entre M2.';
      steps = [
        'Identificar la fórmula de dilución',
        'Despejar V2: V2 = (M1 * V1) / M2',
        'Sustituir los valores en la fórmula',
        'Realizar el cálculo'
      ];
    }

    if (!Number.isFinite(result)) {
      throw new Error('No se pudo calcular la dilución con los valores proporcionados');
    }

    return {
      formula: 'M₁V₁ = M₂V₂',
      derivedFormula: formula,
      data: {
        ...(M1 !== undefined && { M1: `${M1} mol/L` }),
        ...(V1 !== undefined && { V1: `${V1} ${volumeUnit || 'L'}` }),
        ...(M2 !== undefined && { M2: `${M2} mol/L` }),
        ...(V2 !== undefined && { V2: `${V2} ${volumeUnit || 'L'}` })
      },
      steps,
      substitutions,
      calculation,
      result: result.toFixed(4),
      unit,
      explanation
    };
  }

  /**
   * Solve ideal gas law problems
   * PV = nRT
   */
  static solveIdealGas(data) {
    const { pressure, volume, temperature, tempUnit, unknown } = data;

    // R = 0.0821 L·atm/(mol·K)
    const R = 0.0821;

    // Validation
    if (pressure === undefined || volume === undefined || temperature === undefined) {
      throw new Error('Se requieren presión, volumen y temperatura');
    }
    if (pressure <= 0 || volume <= 0 || temperature <= 0) {
      throw new Error('Valores inválidos: todos deben ser mayores a 0');
    }

    // Convert temperature to Kelvin if in Celsius
    const tempInK = tempUnit === 'C' ? temperature + 273.15 : temperature;

    let result, formula, substitutions, calculation, unit, explanation;

    switch (unknown) {
      case 'n':
        // n = PV / RT
        result = (pressure * volume) / (R * tempInK);
        formula = 'n = PV / RT';
        substitutions = `n = (${pressure} * ${volume}) / (${R} * ${tempInK.toFixed(2)})`;
        calculation = `n = ${(pressure * volume).toFixed(4)} / ${(R * tempInK).toFixed(4)}`;
        unit = 'mol';
        explanation = 'El número de moles de gas se calcula usando la ley de los gases ideales. Se despeja n dividiendo el producto de presión y volumen entre el producto de R y temperatura.';
        break;
      case 'V':
        // V = nRT / P
        if (!data.moles) throw new Error('Se requieren moles para calcular volumen');
        result = (data.moles * R * tempInK) / pressure;
        formula = 'V = nRT / P';
        substitutions = `V = (${data.moles} * ${R} * ${tempInK.toFixed(2)}) / ${pressure}`;
        calculation = `V = ${(data.moles * R * tempInK).toFixed(4)} / ${pressure}`;
        unit = 'L';
        explanation = 'El volumen de gas se calcula usando la ley de los gases ideales. Se despeja V multiplicando moles por R y temperatura, luego dividiendo por presión.';
        break;
      case 'P':
        // P = nRT / V
        if (!data.moles) throw new Error('Se requieren moles para calcular presión');
        result = (data.moles * R * tempInK) / volume;
        formula = 'P = nRT / V';
        substitutions = `P = (${data.moles} * ${R} * ${tempInK.toFixed(2)}) / ${volume}`;
        calculation = `P = ${(data.moles * R * tempInK).toFixed(4)} / ${volume}`;
        unit = 'atm';
        explanation = 'La presión del gas se calcula usando la ley de los gases ideales. Se despeja P multiplicando moles por R y temperatura, luego dividiendo por volumen.';
        break;
      case 'T':
        // T = PV / nR
        if (!data.moles) throw new Error('Se requieren moles para calcular temperatura');
        result = (pressure * volume) / (data.moles * R);
        formula = 'T = PV / nR';
        substitutions = `T = (${pressure} * ${volume}) / (${data.moles} * ${R})`;
        calculation = `T = ${(pressure * volume).toFixed(4)} / ${(data.moles * R).toFixed(4)}`;
        unit = 'K';
        explanation = 'La temperatura del gas se calcula usando la ley de los gases ideales. Se despeja T dividiendo el producto de presión y volumen entre el producto de moles y R.';
        break;
      default:
        throw new Error('Variable desconocida no válida');
    }

    return {
      formula,
      data: {
        P: `${pressure} atm`,
        V: `${volume} L`,
        T: `${tempInK.toFixed(2)} K`,
        ...(data.moles && { n: `${data.moles} mol` })
      },
      steps: [
        'Identificar la ley de los gases ideales',
        'Convertir temperatura a Kelvin',
        'Despejar la variable desconocida',
        'Sustituir los valores en la fórmula',
        'Realizar el cálculo'
      ],
      substitutions,
      calculation,
      result: result.toFixed(4),
      unit,
      explanation
    };
  }

  /**
   * Solve pH problems
   * pH = -log[H+]
   */
  static solvePH(data) {
    const { concentration } = data;

    // Validation
    if (concentration === undefined) {
      throw new Error('Se requiere la concentración de H+');
    }
    if (concentration <= 0) {
      throw new Error('La concentración debe ser mayor a 0');
    }

    // Calculate pH
    const ph = -Math.log10(concentration);

    return {
      formula: 'pH = -log[H⁺]',
      data: {
        'H+': `${concentration} mol/L`
      },
      steps: [
        'Identificar la fórmula del pH',
        'Sustituir la concentración de H+',
        'Calcular el logaritmo',
        'Aplicar el signo negativo'
      ],
      substitutions: `pH = -log(${concentration})`,
      calculation: `pH = -${Math.log10(concentration).toFixed(4)}`,
      result: ph.toFixed(4),
      unit: '',
      explanation: 'El pH es una medida de la acidez de una solución. Se calcula como el logaritmo negativo de la concentración de iones hidrógeno. Valores menores a 7 indican acidez, 7 es neutro y mayores a 7 indican basicidad.'
    };
  }

  /**
   * Solve pOH problems
   * pOH = -log[OH-]
   */
  static solvePOH(data) {
    const { concentration } = data;

    // Validation
    if (concentration === undefined) {
      throw new Error('Se requiere la concentración de OH-');
    }
    if (concentration <= 0) {
      throw new Error('La concentración debe ser mayor a 0');
    }

    // Calculate pOH
    const poh = -Math.log10(concentration);

    return {
      formula: 'pOH = -log[OH⁻]',
      data: {
        'OH-': `${concentration} mol/L`
      },
      steps: [
        'Identificar la fórmula del pOH',
        'Sustituir la concentración de OH-',
        'Calcular el logaritmo',
        'Aplicar el signo negativo'
      ],
      substitutions: `pOH = -log(${concentration})`,
      calculation: `pOH = -${Math.log10(concentration).toFixed(4)}`,
      result: poh.toFixed(4),
      unit: '',
      explanation: 'El pOH es una medida de la basicidad de una solución. Se calcula como el logaritmo negativo de la concentración de iones hidróxido. pH + pOH = 14 a 25°C.'
    };
  }

  /**
   * Solve mass from moles and molar mass
   * m = n * M
   */
  static solveMass(data) {
    const { moles, molarMass } = data;

    // Validation
    if (moles === undefined || molarMass === undefined) {
      throw new Error('Se requieren moles y masa molar');
    }
    if (moles < 0 || molarMass <= 0) {
      throw new Error('Valores inválidos: moles debe ser positivo y masa molar mayor a 0');
    }

    // Calculate
    const mass = moles * molarMass;

    return {
      formula: 'm = n * M',
      data: {
        n: `${moles} mol`,
        M: `${molarMass} g/mol`
      },
      steps: [
        'Identificar la fórmula de masa',
        'Sustituir los valores en la fórmula',
        'Realizar la multiplicación'
      ],
      substitutions: `m = ${moles} * ${molarMass}`,
      calculation: `m = ${mass.toFixed(4)}`,
      result: mass.toFixed(4),
      unit: 'g',
      explanation: 'La masa se calcula multiplicando el número de moles por la masa molar de la sustancia. Esto nos da la masa en gramos correspondiente a la cantidad de moles dada.'
    };
  }

  /**
   * Solve normality problems
   * N = eq / V
   */
  static solveNormality(data) {
    const { equivalents, volume, volumeUnit } = data;

    // Validation
    if (equivalents === undefined || volume === undefined) {
      throw new Error('Se requieren equivalentes y volumen');
    }
    if (equivalents < 0 || volume <= 0) {
      throw new Error('Valores inválidos: equivalentes debe ser positivo y volumen mayor a 0');
    }

    // Convert volume to liters if in mL
    const volumeInLiters = volumeUnit === 'mL' ? volume / 1000 : volume;

    // Calculate normality
    const normality = equivalents / volumeInLiters;

    return {
      formula: 'N = eq / V',
      data: {
        eq: `${equivalents} eq`,
        V: `${volume} ${volumeUnit}`
      },
      steps: [
        'Identificar la fórmula de normalidad',
        'Convertir volumen a litros si es necesario',
        'Sustituir los valores en la fórmula',
        'Realizar la división'
      ],
      substitutions: `N = ${equivalents} / ${volumeInLiters}`,
      calculation: `N = ${normality.toFixed(4)}`,
      result: normality.toFixed(4),
      unit: 'eq/L',
      explanation: 'La normalidad representa la cantidad de equivalentes de soluto presentes por cada litro de solución. Se calcula dividiendo el número de equivalentes entre el volumen en litros.'
    };
  }

  /**
   * Solve PPM (Parts Per Million) problems
   * PPM = (mass of solute / mass of solution) × 10^6
   */
  static solvePPM(data) {
    const { soluteMass, solutionMass } = data;

    // Validation
    if (soluteMass === undefined || solutionMass === undefined) {
      throw new Error('Se requieren masa del soluto y masa de la solución');
    }
    if (soluteMass <= 0 || solutionMass <= 0) {
      throw new Error('Valores inválidos: ambos deben ser mayores a 0');
    }

    // Calculate PPM
    const ppm = (soluteMass / solutionMass) * 1000000;

    return {
      formula: 'PPM = (masa de soluto / masa de solución) × 10⁶',
      data: {
        'masa de soluto': `${soluteMass} g`,
        'masa de solución': `${solutionMass} g`
      },
      steps: [
        'Identificar la fórmula de PPM',
        'Dividir la masa del soluto entre la masa de la solución',
        'Multiplicar por 10^6'
      ],
      substitutions: `PPM = (${soluteMass} / ${solutionMass}) × 10⁶`,
      calculation: `PPM = ${(soluteMass / solutionMass).toFixed(6)} × 10⁶`,
      result: ppm.toFixed(4),
      unit: 'ppm',
      explanation: 'Las partes por millón (PPM) representan la relación de masa entre el soluto y la solución, multiplicada por un millón. Es una medida de concentración muy utilizada para soluciones muy diluidas.'
    };
  }

  /**
   * Solve % P/V (Percentage weight/volume) problems
   * % P/V = (mass of solute / volume of solution) × 100
   */
  static solvePercentPV(data) {
    const soluteMass = Number(data.soluteMass);
    const solutionVolume = Number(data.solutionVolume);

    // Validation
    if (!Number.isFinite(soluteMass) || !Number.isFinite(solutionVolume)) {
      throw new Error('Se requieren masa del soluto y volumen de la solución');
    }
    if (soluteMass <= 0 || solutionVolume <= 0) {
      throw new Error('Valores inválidos: ambos deben ser mayores a 0');
    }

    // Calculate % P/V
    const percentPV = (soluteMass / solutionVolume) * 100;

    return {
      formula: '% P/V = (masa de soluto / volumen de solución) × 100',
      derivedFormula: '% P/V = (masa de soluto / volumen de solución) × 100',
      data: {
        'masa de soluto': `${soluteMass} g`,
        'volumen de solución': `${solutionVolume} mL`
      },
      steps: [
        'Identificar la fórmula de % P/V',
        'Dividir la masa del soluto entre el volumen de la solución',
        'Multiplicar por 100'
      ],
      substitutions: `% P/V = (${soluteMass} / ${solutionVolume}) × 100`,
      calculation: `% P/V = ${(soluteMass / solutionVolume).toFixed(4)} × 100`,
      result: percentPV.toFixed(4),
      unit: '%',
      explanation: 'El porcentaje peso/volumen (% P/V) representa los gramos de soluto presentes en 100 mL de solución. Se calcula dividiendo la masa del soluto (en gramos) entre el volumen de la solución (en mL) y multiplicando por 100.'
    };
  }

  /**
   * Solve % P/P (Percentage weight/weight) problems
   * % P/P = (mass of solute / mass of solution) × 100
   */
  static solvePercentPP(data) {
    const soluteMass = Number(data.soluteMass);
    const solutionMass = Number(data.solutionMass);

    // Validation
    if (!Number.isFinite(soluteMass) || !Number.isFinite(solutionMass)) {
      throw new Error('Se requieren masa del soluto y masa de la solución');
    }
    if (soluteMass <= 0 || solutionMass <= 0) {
      throw new Error('Valores inválidos: ambos deben ser mayores a 0');
    }

    // Calculate % P/P
    const percentPP = (soluteMass / solutionMass) * 100;

    return {
      formula: '% P/P = (masa de soluto / masa de solución) × 100',
      derivedFormula: '% P/P = (masa de soluto / masa de solución) × 100',
      data: {
        'masa de soluto': `${soluteMass} g`,
        'masa de solución': `${solutionMass} g`
      },
      steps: [
        'Identificar la fórmula de % P/P',
        'Dividir la masa del soluto entre la masa de la solución',
        'Multiplicar por 100'
      ],
      substitutions: `% P/P = (${soluteMass} / ${solutionMass}) × 100`,
      calculation: `% P/P = ${(soluteMass / solutionMass).toFixed(4)} × 100`,
      result: percentPP.toFixed(4),
      unit: '%',
      explanation: 'El porcentaje peso/peso (% P/P) representa los gramos de soluto presentes en 100 gramos de solución. Se calcula dividiendo la masa del soluto entre la masa total de la solución y multiplicando por 100.'
    };
  }

  /**
   * Solve % V/V (Percentage volume/volume) problems
   * % V/V = (volume of solute / volume of solution) × 100
   */
  static solvePercentVV(data) {
    const soluteVolume = Number(data.soluteVolume);
    const solutionVolume = Number(data.solutionVolume);

    // Validation
    if (!Number.isFinite(soluteVolume) || !Number.isFinite(solutionVolume)) {
      throw new Error('Se requieren volumen del soluto y volumen de la solución');
    }
    if (soluteVolume <= 0 || solutionVolume <= 0) {
      throw new Error('Valores inválidos: ambos deben ser mayores a 0');
    }

    // Calculate % V/V
    const percentVV = (soluteVolume / solutionVolume) * 100;

    return {
      formula: '% V/V = (volumen de soluto / volumen de solución) × 100',
      derivedFormula: '% V/V = (volumen de soluto / volumen de solución) × 100',
      data: {
        'volumen de soluto': `${soluteVolume} mL`,
        'volumen de solución': `${solutionVolume} mL`
      },
      steps: [
        'Identificar la fórmula de % V/V',
        'Dividir el volumen del soluto entre el volumen de la solución',
        'Multiplicar por 100'
      ],
      substitutions: `% V/V = (${soluteVolume} / ${solutionVolume}) × 100`,
      calculation: `% V/V = ${(soluteVolume / solutionVolume).toFixed(4)} × 100`,
      result: percentVV.toFixed(4),
      unit: '%',
      explanation: 'El porcentaje volumen/volumen (% V/V) representa los mililitros de soluto presentes en 100 mL de solución. Se calcula dividiendo el volumen del soluto entre el volumen total de la solución y multiplicando por 100.'
    };
  }

  /**
   * Solve stoichiometry problems (simple mole ratio)
   */
  static solveStoichiometry(data) {
    const { givenMoles, givenCoefficient, desiredCoefficient } = data;

    // Validation
    if (givenMoles === undefined || givenCoefficient === undefined || desiredCoefficient === undefined) {
      throw new Error('Se requieren moles dados, coeficiente dado y coeficiente deseado');
    }
    if (givenMoles < 0 || givenCoefficient <= 0 || desiredCoefficient <= 0) {
      throw new Error('Valores inválidos: coeficientes deben ser positivos');
    }

    // Calculate using mole ratio
    const desiredMoles = (givenMoles * desiredCoefficient) / givenCoefficient;

    return {
      formula: 'n2 = n1 * (coef2 / coef1)',
      derivedFormula: 'n2 = n1 * (coef2 / coef1)',
      data: {
        'n1': `${givenMoles} mol`,
        'coef1': givenCoefficient,
        'coef2': desiredCoefficient
      },
      steps: [
        'Identificar la relación estequiométrica',
        'Establecer la proporción de moles',
        'Sustituir los valores',
        'Calcular los moles deseados'
      ],
      substitutions: `n2 = ${givenMoles} * (${desiredCoefficient} / ${givenCoefficient})`,
      calculation: `n2 = ${givenMoles} * ${(desiredCoefficient / givenCoefficient).toFixed(4)}`,
      result: desiredMoles.toFixed(4),
      unit: 'mol',
      explanation: 'La estequiometría usa las proporciones de los coeficientes en la ecuación balanceada para relacionar las cantidades de reactantes y productos. La razón de moles es igual a la razón de coeficientes.'
    };
  }

  /**
   * Solve Boyle's Law (P1V1 = P2V2)
   */
  static solveBoyleLaw(data) {
    const { P1, V1, V2 } = data;

    // Validation
    if (P1 === undefined || V1 === undefined || V2 === undefined) {
      throw new Error('Se requieren P1, V1 y V2');
    }
    if (P1 <= 0 || V1 <= 0 || V2 <= 0) {
      throw new Error('Valores inválidos: todos deben ser mayores a 0');
    }

    // Calculate P2
    const P2 = (P1 * V1) / V2;

    return {
      formula: 'P1V1 = P2V2',
      data: {
        P1: `${P1} atm`,
        V1: `${V1} L`,
        V2: `${V2} L`
      },
      steps: [
        'Identificar la ley de Boyle',
        'Despejar P2: P2 = (P1 * V1) / V2',
        'Sustituir los valores',
        'Realizar el cálculo'
      ],
      substitutions: `P2 = (${P1} * ${V1}) / ${V2}`,
      calculation: `P2 = ${(P1 * V1).toFixed(4)} / ${V2}`,
      result: P2.toFixed(4),
      unit: 'atm',
      explanation: 'La ley de Boyle establece que a temperatura constante, la presión y el volumen de un gas son inversamente proporcionales. Si el volumen aumenta, la presión disminuye.'
    };
  }

  /**
   * Solve Charles's Law (V1/T1 = V2/T2)
   */
  static solveCharlesLaw(data) {
    const { V1, T1, T2, tempUnit } = data;

    // Validation
    if (V1 === undefined || T1 === undefined || T2 === undefined) {
      throw new Error('Se requieren V1, T1 y T2');
    }
    if (V1 <= 0 || T1 <= 0 || T2 <= 0) {
      throw new Error('Valores inválidos: todos deben ser mayores a 0');
    }

    // Convert temperatures to Kelvin
    const T1K = tempUnit === 'C' ? T1 + 273.15 : T1;
    const T2K = tempUnit === 'C' ? T2 + 273.15 : T2;

    // Calculate V2
    const V2 = (V1 * T2K) / T1K;

    return {
      formula: 'V1/T1 = V2/T2',
      data: {
        V1: `${V1} L`,
        T1: `${T1K.toFixed(2)} K`,
        T2: `${T2K.toFixed(2)} K`
      },
      steps: [
        'Identificar la ley de Charles',
        'Convertir temperaturas a Kelvin',
        'Despejar V2: V2 = (V1 * T2) / T1',
        'Sustituir los valores',
        'Realizar el cálculo'
      ],
      substitutions: `V2 = (${V1} * ${T2K.toFixed(2)}) / ${T1K.toFixed(2)}`,
      calculation: `V2 = ${(V1 * T2K).toFixed(4)} / ${T1K.toFixed(2)}`,
      result: V2.toFixed(4),
      unit: 'L',
      explanation: 'La ley de Charles establece que a presión constante, el volumen de un gas es directamente proporcional a su temperatura absoluta (en Kelvin). Si la temperatura aumenta, el volumen también aumenta.'
    };
  }

  /**
   * Solve Gay-Lussac's Law (P1/T1 = P2/T2)
   */
  static solveGayLussacLaw(data) {
    const { P1, T1, T2, tempUnit } = data;

    // Validation
    if (P1 === undefined || T1 === undefined || T2 === undefined) {
      throw new Error('Se requieren P1, T1 y T2');
    }
    if (P1 <= 0 || T1 <= 0 || T2 <= 0) {
      throw new Error('Valores inválidos: todos deben ser mayores a 0');
    }

    // Convert temperatures to Kelvin
    const T1K = tempUnit === 'C' ? T1 + 273.15 : T1;
    const T2K = tempUnit === 'C' ? T2 + 273.15 : T2;

    // Calculate P2
    const P2 = (P1 * T2K) / T1K;

    return {
      formula: 'P1/T1 = P2/T2',
      data: {
        P1: `${P1} atm`,
        T1: `${T1K.toFixed(2)} K`,
        T2: `${T2K.toFixed(2)} K`
      },
      steps: [
        'Identificar la ley de Gay-Lussac',
        'Convertir temperaturas a Kelvin',
        'Despejar P2: P2 = (P1 * T2) / T1',
        'Sustituir los valores',
        'Realizar el cálculo'
      ],
      substitutions: `P2 = (${P1} * ${T2K.toFixed(2)}) / ${T1K.toFixed(2)}`,
      calculation: `P2 = ${(P1 * T2K).toFixed(4)} / ${T1K.toFixed(2)}`,
      result: P2.toFixed(4),
      unit: 'atm',
      explanation: 'La ley de Gay-Lussac establece que a volumen constante, la presión de un gas es directamente proporcional a su temperatura absoluta. Si la temperatura aumenta, la presión también aumenta.'
    };
  }
}

module.exports = ChemistrySolver;
