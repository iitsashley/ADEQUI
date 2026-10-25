// API Base URL
const API_BASE = '/api';

// State management
let currentProblemCategory = null;
let currentFormulas = [];
let currentBranches = [];
let currentHistory = [];
let currentElements = [];

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeNavigation();
    initializeMobileMenu();
    loadInitialData();
    initializeProblemCategories();
    initializeSearch();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Navigation
function initializeNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            navigateTo(targetId);
        });
    });
}

function navigateTo(sectionId) {
    // Update active link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
    
    // Show target section
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Close mobile menu
    navMenu.classList.remove('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Mobile Menu
function initializeMobileMenu() {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Load initial data
async function loadInitialData() {
    try {
        await Promise.all([
            loadHistory(),
            loadBranches(),
            loadFormulas(),
            loadPeriodicTable()
        ]);
    } catch (error) {
        console.error('Error loading initial data:', error);
        showToast('Error al cargar los datos iniciales', 'error');
    }
}

// Load History
async function loadHistory() {
    try {
        const response = await fetch(`${API_BASE}/history`);
        const data = await response.json();
        if (data.success) {
            currentHistory = data.history;
            renderHistory();
        }
    } catch (error) {
        console.error('Error loading history:', error);
    }
}

function renderHistory() {
    const container = document.getElementById('timelineContainer');
    container.innerHTML = currentHistory.map(item => `
        <div class="timeline-item">
            <div class="timeline-header">
                <div class="timeline-date">${item.date}</div>
                <h3 class="timeline-title">${item.title}</h3>
            </div>
            <p class="timeline-period">${item.period}</p>
            <p>${item.description}</p>
            <p><strong>Figuras clave:</strong> ${item.keyFigures}</p>
            <p><strong>Descubrimientos:</strong> ${item.discoveries}</p>
        </div>
    `).join('');
}

// Load Branches
async function loadBranches() {
    try {
        const response = await fetch(`${API_BASE}/branches`);
        const data = await response.json();
        if (data.success) {
            currentBranches = data.branches;
            renderBranches();
        }
    } catch (error) {
        console.error('Error loading branches:', error);
    }
}

function renderBranches() {
    const container = document.getElementById('branchesContainer');
    container.innerHTML = currentBranches.map(branch => `
        <div class="branch-card">
            <div class="branch-icon">${branch.icon}</div>
            <h3>${branch.name}</h3>
            <p>${branch.description}</p>
            <div class="branch-details">
                <h4>Qué estudia:</h4>
                <p>${branch.whatItStudies}</p>
                <h4>Ejemplos:</h4>
                <p>${branch.examples}</p>
                <h4>Fórmulas relacionadas:</h4>
                <p>${branch.relatedFormulas.join(', ')}</p>
                <h4>Problemas relacionados:</h4>
                <p>${branch.relatedProblems.join(', ')}</p>
            </div>
        </div>
    `).join('');
}

// Load Formulas
async function loadFormulas() {
    try {
        const response = await fetch(`${API_BASE}/formulas`);
        const data = await response.json();
        if (data.success) {
            currentFormulas = data.formulas;
            renderFormulas(currentFormulas);
        }
    } catch (error) {
        console.error('Error loading formulas:', error);
    }
}

function renderFormulas(formulas) {
    const container = document.getElementById('formulasContainer');
    container.innerHTML = formulas.map(formula => String.raw`
        <div class="formula-card">
            <div class="formula-header">
                <h3 class="formula-name">${formula.name}</h3>
                <span class="formula-category">${formula.category}</span>
            </div>
            <div class="formula-expression">\[${formula.formula}\]</div>
            <div class="formula-variables">
                <h4>Variables:</h4>
                ${Object.entries(formula.variables).map(([key, value]) => `
                    <div class="variable-item">
                        <span><strong>${key}:</strong></span>
                        <span>${value}</span>
                    </div>
                `).join('')}
            </div>
            <div class="formula-info">
                <p><strong>Unidades:</strong> ${formula.units}</p>
                <p><strong>Cuándo usarla:</strong> ${formula.whenToUse}</p>
                <p><strong>Ejemplo:</strong> ${formula.example}</p>
            </div>
        </div>
    `).join('');
    
    // Re-render MathJax
    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise().catch((err) => console.log('MathJax error:', err));
    }
}

// Load Periodic Table
async function loadPeriodicTable() {
    try {
        const response = await fetch(`${API_BASE}/periodic-table`);
        const data = await response.json();
        if (data.success) {
            currentElements = data.elements;
            renderPeriodicTable();
        }
    } catch (error) {
        console.error('Error loading periodic table:', error);
    }
}

function renderPeriodicTable() {
    const container = document.getElementById('periodicTableContainer');
    
    // Create a map of elements by their position (period, group)
    const elementMap = {};
    currentElements.forEach(element => {
        const key = `${element.period}-${element.group}`;
        elementMap[key] = element;
    });

    // Separate lanthanides and actinides
    // Lu y Lr ocupan el grupo 3 en la tabla principal; no deben repetirse en las filas f.
    const lanthanides = currentElements.filter(e => e.category === 'Lantánido' && e.atomicNumber !== 71);
    const actinides = currentElements.filter(e => e.category === 'Actínido' && e.atomicNumber !== 103);
    const mainElements = currentElements.filter(e => e.category !== 'Lantánido' && e.category !== 'Actínido');

    // Create the main table structure (7 periods x 18 groups)
    let tableHTML = '<div class="periodic-table-wrapper">';
    
    // Group numbers header
    tableHTML += '<div class="group-numbers">';
    tableHTML += '<div class="group-number-spacer"></div>'; // Spacer for period numbers column
    for (let g = 1; g <= 18; g++) {
        tableHTML += `<div class="group-number">${g}</div>`;
    }
    tableHTML += '</div>';

    // Main periods (1-7)
    for (let period = 1; period <= 7; period++) {
        tableHTML += '<div class="period-row">';
        
        // Period number
        tableHTML += `<div class="period-number">${period}</div>`;
        
        // Elements for this period
        for (let group = 1; group <= 18; group++) {
            const key = `${period}-${group}`;
            const element = elementMap[key];
            
            if (element) {
                tableHTML += `
                    <div class="element" 
                         data-symbol="${element.symbol}" 
                         data-category="${element.category}"
                         data-block="${element.block}"
                         data-atomic-number="${element.atomicNumber}"
                         onclick="showElementDetails(${element.atomicNumber})">
                        <div class="element-number">${element.atomicNumber}</div>
                        <div class="element-symbol">${element.symbol}</div>
                        <div class="element-name">${element.name}</div>
                    </div>
                `;
            } else {
                // Empty cell for gaps in the table
                tableHTML += '<div class="element empty"></div>';
            }
        }
        
        tableHTML += '</div>';
    }

    // Lanthanides row
    tableHTML += '<div class="period-row lanthanide-row">';
    tableHTML += '<div class="period-number"></div>'; // Empty period number cell
    tableHTML += '<div class="element empty"></div>'; // Gap before lanthanides
    tableHTML += '<div class="element empty"></div>'; // Gap before lanthanides
    
    lanthanides.forEach(element => {
        tableHTML += `
            <div class="element" 
                 data-symbol="${element.symbol}" 
                 data-category="${element.category}"
                 data-block="${element.block}"
                 data-atomic-number="${element.atomicNumber}"
                 onclick="showElementDetails(${element.atomicNumber})">
                <div class="element-number">${element.atomicNumber}</div>
                <div class="element-symbol">${element.symbol}</div>
                <div class="element-name">${element.name}</div>
            </div>
        `;
    });
    
    // Fill remaining empty cells
    const remainingLanthanideCells = 18 - 2 - lanthanides.length;
    for (let i = 0; i < remainingLanthanideCells; i++) {
        tableHTML += '<div class="element empty"></div>';
    }
    tableHTML += '</div>';

    // Actinides row
    tableHTML += '<div class="period-row actinide-row">';
    tableHTML += '<div class="period-number"></div>'; // Empty period number cell
    tableHTML += '<div class="element empty"></div>'; // Gap before actinides
    tableHTML += '<div class="element empty"></div>'; // Gap before actinides
    
    actinides.forEach(element => {
        tableHTML += `
            <div class="element" 
                 data-symbol="${element.symbol}" 
                 data-category="${element.category}"
                 data-block="${element.block}"
                 data-atomic-number="${element.atomicNumber}"
                 onclick="showElementDetails(${element.atomicNumber})">
                <div class="element-number">${element.atomicNumber}</div>
                <div class="element-symbol">${element.symbol}</div>
                <div class="element-name">${element.name}</div>
            </div>
        `;
    });
    
    // Fill remaining empty cells
    const remainingActinideCells = 18 - 2 - actinides.length;
    for (let i = 0; i < remainingActinideCells; i++) {
        tableHTML += '<div class="element empty"></div>';
    }
    tableHTML += '</div>';

    // Block legend below the table
    tableHTML += `
        <div class="block-legend">
            <h4>Bloques de la tabla periódica</h4>
            <div class="legend-items">
                <div class="legend-item">
                    <div class="legend-color block-s"></div>
                    <span>Bloque s</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color block-p"></div>
                    <span>Bloque p</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color block-d"></div>
                    <span>Bloque d</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color block-f"></div>
                    <span>Bloque f</span>
                </div>
            </div>
        </div>
    `;

    tableHTML += '</div>';
    container.innerHTML = tableHTML;
}

function showElementDetails(atomicNumber) {
    const element = currentElements.find(e => e.atomicNumber === atomicNumber);
    if (!element) return;
    
    const container = document.getElementById('elementDetails');
    container.innerHTML = `
        <div class="element-details-header">
            <div>
                <div class="element-symbol-large">${element.symbol}</div>
                <div class="element-name-large">${element.name}</div>
            </div>
            <div style="text-align: right;">
                <p style="color: var(--text-secondary);">Número atómico: ${element.atomicNumber}</p>
                <p style="color: var(--text-secondary);">Masa atómica: ${element.atomicMass}</p>
            </div>
        </div>
        <div class="element-info-grid">
            <div class="element-info-item">
                <h4>Grupo</h4>
                <p>${element.group}</p>
            </div>
            <div class="element-info-item">
                <h4>Período</h4>
                <p>${element.period}</p>
            </div>
            <div class="element-info-item">
                <h4>Estado</h4>
                <p>${element.state}</p>
            </div>
            <div class="element-info-item">
                <h4>Categoría</h4>
                <p>${element.category}</p>
            </div>
            <div class="element-info-item">
                <h4>Bloque</h4>
                <p>${element.block}</p>
            </div>
            <div class="element-info-item">
                <h4>Configuración electrónica</h4>
                <p>${element.electronicConfig}</p>
            </div>
        </div>
    `;
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
}

// Problem Categories
function initializeProblemCategories() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentProblemCategory = button.dataset.category;
            showProblemForm(currentProblemCategory);
        });
    });
}

function showProblemForm(category) {
    const container = document.getElementById('problemInputContainer');
    const form = document.getElementById('problemForm');
    const solutionContainer = document.getElementById('solutionContainer');
    
    solutionContainer.style.display = 'none';
    container.style.display = 'block';
    
    const formConfigs = {
        'molarity': {
            fields: [
                { name: 'moles', label: 'Número de moles (mol)', type: 'number', step: '0.01' },
                { name: 'volume', label: 'Volumen', type: 'number', step: '0.01' },
                { name: 'volumeUnit', label: 'Unidad de volumen', type: 'select', options: ['L', 'mL'] }
            ]
        },
        'moles': {
            fields: [
                { name: 'molarity', label: 'Molaridad (mol/L)', type: 'number', step: '0.01' },
                { name: 'volume', label: 'Volumen', type: 'number', step: '0.01' },
                { name: 'volumeUnit', label: 'Unidad de volumen', type: 'select', options: ['L', 'mL'] }
            ]
        },
        'molar-mass': {
            fields: [
                { name: 'formula', label: 'Fórmula química (ej: H2O, NaCl, CO2)', type: 'text' }
            ]
        },
        'density': {
            fields: [
                { name: 'mass', label: 'Masa (g)', type: 'number', step: '0.01' },
                { name: 'volume', label: 'Volumen', type: 'number', step: '0.01' },
                { name: 'volumeUnit', label: 'Unidad de volumen', type: 'select', options: ['L', 'mL'] }
            ]
        },
        'dilution': {
            fields: [
                { name: 'unknown', label: 'Variable a calcular', type: 'select', options: ['M2', 'V2', 'M1', 'V1'] },
                { name: 'M1', label: 'Molaridad inicial (mol/L)', type: 'number', step: '0.01', optional: true },
                { name: 'V1', label: 'Volumen inicial', type: 'number', step: '0.01', optional: true },
                { name: 'M2', label: 'Molaridad final (mol/L)', type: 'number', step: '0.01', optional: true },
                { name: 'V2', label: 'Volumen final', type: 'number', step: '0.01', optional: true },
                { name: 'volumeUnit', label: 'Unidad de volumen', type: 'select', options: ['L', 'mL'] }
            ]
        },
        'ideal-gas': {
            fields: [
                { name: 'pressure', label: 'Presión (atm)', type: 'number', step: '0.01' },
                { name: 'volume', label: 'Volumen (L)', type: 'number', step: '0.01' },
                { name: 'temperature', label: 'Temperatura', type: 'number', step: '0.01' },
                { name: 'tempUnit', label: 'Unidad de temperatura', type: 'select', options: ['K', 'C'] },
                { name: 'unknown', label: 'Variable a calcular', type: 'select', options: ['n', 'V', 'P', 'T'] },
                { name: 'moles', label: 'Moles (si se calcula V, P o T)', type: 'number', step: '0.01', optional: true }
            ]
        },
        'ph': {
            fields: [
                { name: 'concentration', label: 'Concentración de H+ (mol/L)', type: 'number', step: '0.0001' }
            ]
        },
        'poh': {
            fields: [
                { name: 'concentration', label: 'Concentración de OH- (mol/L)', type: 'number', step: '0.0001' }
            ]
        },
        'mass': {
            fields: [
                { name: 'moles', label: 'Número de moles (mol)', type: 'number', step: '0.01' },
                { name: 'molarMass', label: 'Masa molar (g/mol)', type: 'number', step: '0.01' }
            ]
        },
        'normality': {
            fields: [
                { name: 'equivalents', label: 'Número de equivalentes (eq)', type: 'number', step: '0.01' },
                { name: 'volume', label: 'Volumen', type: 'number', step: '0.01' },
                { name: 'volumeUnit', label: 'Unidad de volumen', type: 'select', options: ['L', 'mL'] }
            ]
        },
        'ppm': {
            fields: [
                { name: 'soluteMass', label: 'Masa del soluto (g)', type: 'number', step: '0.01' },
                { name: 'solutionMass', label: 'Masa de la solución (g)', type: 'number', step: '0.01' }
            ]
        },
        'percent-pv': {
            fields: [
                { name: 'soluteMass', label: 'Masa del soluto (g)', type: 'number', step: '0.01' },
                { name: 'solutionVolume', label: 'Volumen de la solución (mL)', type: 'number', step: '0.01' }
            ]
        },
        'percent-pp': {
            fields: [
                { name: 'soluteMass', label: 'Masa del soluto (g)', type: 'number', step: '0.01' },
                { name: 'solutionMass', label: 'Masa de la solución (g)', type: 'number', step: '0.01' }
            ]
        },
        'percent-vv': {
            fields: [
                { name: 'soluteVolume', label: 'Volumen del soluto (mL)', type: 'number', step: '0.01' },
                { name: 'solutionVolume', label: 'Volumen de la solución (mL)', type: 'number', step: '0.01' }
            ]
        },
        'stoichiometry': {
            fields: [
                { name: 'givenMoles', label: 'Moles dados', type: 'number', step: '0.01' },
                { name: 'givenCoefficient', label: 'Coeficiente dado', type: 'number', step: '1' },
                { name: 'desiredCoefficient', label: 'Coeficiente deseado', type: 'number', step: '1' }
            ]
        },
        'boyle-law': {
            fields: [
                { name: 'P1', label: 'Presión inicial (atm)', type: 'number', step: '0.01' },
                { name: 'V1', label: 'Volumen inicial (L)', type: 'number', step: '0.01' },
                { name: 'V2', label: 'Volumen final (L)', type: 'number', step: '0.01' }
            ]
        },
        'charles-law': {
            fields: [
                { name: 'V1', label: 'Volumen inicial (L)', type: 'number', step: '0.01' },
                { name: 'T1', label: 'Temperatura inicial', type: 'number', step: '0.01' },
                { name: 'T2', label: 'Temperatura final', type: 'number', step: '0.01' },
                { name: 'tempUnit', label: 'Unidad de temperatura', type: 'select', options: ['K', 'C'] }
            ]
        },
        'gay-lussac-law': {
            fields: [
                { name: 'P1', label: 'Presión inicial (atm)', type: 'number', step: '0.01' },
                { name: 'T1', label: 'Temperatura inicial', type: 'number', step: '0.01' },
                { name: 'T2', label: 'Temperatura final', type: 'number', step: '0.01' },
                { name: 'tempUnit', label: 'Unidad de temperatura', type: 'select', options: ['K', 'C'] }
            ]
        }
    };
    
    const config = formConfigs[category];
    if (!config) return;
    
    form.innerHTML = config.fields.map(field => {
        if (field.type === 'select') {
            return `
                <div class="form-group">
                    <label for="${field.name}">${field.label}</label>
                    <select id="${field.name}" name="${field.name}" ${field.optional ? '' : 'required'}>
                        ${field.options.map(option => `<option value="${option}">${option}</option>`).join('')}
                    </select>
                </div>
            `;
        }
        return `
            <div class="form-group">
                <label for="${field.name}">${field.label}</label>
                <input type="${field.type}" 
                       id="${field.name}" 
                       name="${field.name}" 
                       step="${field.step}" 
                       ${field.optional ? '' : 'required'}>
            </div>
        `;
    }).join('');
    
    // Remove HTML5 validation to allow custom validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
}

// Solve Problem
document.getElementById('solveButton').addEventListener('click', async () => {
    if (!currentProblemCategory) {
        showToast('Por favor selecciona una categoría de problema', 'error');
        return;
    }
    const form = document.getElementById('problemForm');

if (!form) {
    console.error('❌ No se encontró el contenedor #problemForm');
    showToast('Error: no se encontró el formulario', 'error');
    return;
}

const data = {};

const inputs = form.querySelectorAll('input, select, textarea');

inputs.forEach(input => {
    if (input.value !== '') {
        const key = input.name || input.id;

        if (
            key !== 'volumeUnit' &&
            key !== 'tempUnit' &&
            key !== 'unknown' &&
            key !== 'formula'
        ) {
            const numericValue = parseFloat(input.value);

            data[key] = isNaN(numericValue)
                ? input.value
                : numericValue;
        } else {
            data[key] = input.value;
        }
    }
});

const validationErrors = validateInputs(currentProblemCategory, data);
if (validationErrors.length > 0) {
    showToast(validationErrors[0], 'error');
    return;
}

console.log('Categoría actual:', currentProblemCategory);
console.log('Datos del formulario:', data);
    
    console.log('Datos procesados:', data);
    
    // Basic validation
    if (Object.keys(data).length === 0) {
        showToast('Por favor ingresa al menos un valor', 'error');
        return;
    }
    
    try {
        console.log('Enviando solicitud a:', `${API_BASE}/solve/${currentProblemCategory}`);
        const response = await fetch(`${API_BASE}/solve/${currentProblemCategory}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        console.log('Respuesta del servidor:', response.status);
        const result = await response.json();
        console.log('Resultado:', result);
        
        if (result.success) {
            displaySolution(result.result);
            showToast('Problema resuelto exitosamente', 'success');
        } else {
            showToast(result.error || 'Error al resolver el problema', 'error');
        }
    } catch (error) {
        console.error('Error solving problem:', error);
        showToast('Error al resolver el problema: ' + error.message, 'error');
    }
});

function validateInputs(category, data) {
    const errors = [];
    
    // Common validations
    const numericFields = ['moles', 'molarity', 'mass', 'volume', 'molarMass', 'pressure', 'temperature',
                          'concentration', 'givenMoles', 'givenCoefficient', 'desiredCoefficient',
                          'soluteMass', 'solutionMass', 'soluteVolume', 'solutionVolume',
                          'P1', 'V1', 'P2', 'V2', 'M1', 'M2', 'T1', 'T2'];
    
    numericFields.forEach(field => {
        if (data[field] !== undefined && data[field] !== '') {
            const num = parseFloat(data[field]);
            if (isNaN(num)) {
                errors.push(`${field} debe ser un número válido`);
            } else if (num < 0) {
                errors.push(`${field} no puede ser negativo`);
            }
        }
    });
    
    // Category-specific validations
    switch (category) {
        case 'molarity':
        case 'moles':
        case 'density':
        case 'mass':
        case 'normality':
        case 'ppm':
            if (data.volume !== undefined && parseFloat(data.volume) <= 0) {
                errors.push('El volumen debe ser mayor a 0');
            }
            break;
        
        case 'percent-pv':
            if (data.soluteMass === undefined || data.soluteMass === '') {
                errors.push('Se requiere la masa del soluto');
            }
            if (data.solutionVolume === undefined || data.solutionVolume === '') {
                errors.push('Se requiere el volumen de la solución');
            }
            if (data.soluteMass !== undefined && parseFloat(data.soluteMass) <= 0) {
                errors.push('La masa del soluto debe ser mayor a 0');
            }
            if (data.solutionVolume !== undefined && parseFloat(data.solutionVolume) <= 0) {
                errors.push('El volumen de la solución debe ser mayor a 0');
            }
            break;
        
        case 'percent-pp':
            if (data.soluteMass === undefined || data.soluteMass === '') {
                errors.push('Se requiere la masa del soluto');
            }
            if (data.solutionMass === undefined || data.solutionMass === '') {
                errors.push('Se requiere la masa de la solución');
            }
            if (data.soluteMass !== undefined && parseFloat(data.soluteMass) <= 0) {
                errors.push('La masa del soluto debe ser mayor a 0');
            }
            if (data.solutionMass !== undefined && parseFloat(data.solutionMass) <= 0) {
                errors.push('La masa de la solución debe ser mayor a 0');
            }
            break;
        
        case 'percent-vv':
            if (data.soluteVolume === undefined || data.soluteVolume === '') {
                errors.push('Se requiere el volumen del soluto');
            }
            if (data.solutionVolume === undefined || data.solutionVolume === '') {
                errors.push('Se requiere el volumen de la solución');
            }
            if (data.soluteVolume !== undefined && parseFloat(data.soluteVolume) <= 0) {
                errors.push('El volumen del soluto debe ser mayor a 0');
            }
            if (data.solutionVolume !== undefined && parseFloat(data.solutionVolume) <= 0) {
                errors.push('El volumen de la solución debe ser mayor a 0');
            }
            break;
            
        case 'ideal-gas':
            if (data.temperature !== undefined && parseFloat(data.temperature) <= -273.15) {
                errors.push('La temperatura no puede ser menor al cero absoluto (-273.15°C)');
            }
            break;
            
        case 'ph':
        case 'poh':
            if (data.concentration !== undefined && parseFloat(data.concentration) <= 0) {
                errors.push('La concentración debe ser mayor a 0');
            }
            break;
            
        case 'boyle-law':
        case 'charles-law':
        case 'gay-lussac-law':
            if (data.T1 !== undefined && parseFloat(data.T1) <= 0) {
                errors.push('La temperatura T1 debe ser mayor a 0');
            }
            if (data.T2 !== undefined && parseFloat(data.T2) <= 0) {
                errors.push('La temperatura T2 debe ser mayor a 0');
            }
            break;
            
        case 'dilution':
            const providedCount = [data.M1, data.V1, data.M2, data.V2].filter(v => v !== undefined && v !== '').length;
            if (providedCount < 3) {
                errors.push('Se requieren al menos 3 valores para diluciones');
            }
            ['M1', 'V1', 'M2', 'V2'].forEach(field => {
                if (data[field] !== undefined && data[field] !== '' && parseFloat(data[field]) <= 0) {
                    errors.push(`${field} debe ser mayor a 0`);
                }
            });
            break;
            
        case 'stoichiometry':
            if (data.givenCoefficient !== undefined && parseFloat(data.givenCoefficient) <= 0) {
                errors.push('El coeficiente dado debe ser mayor a 0');
            }
            if (data.desiredCoefficient !== undefined && parseFloat(data.desiredCoefficient) <= 0) {
                errors.push('El coeficiente deseado debe ser mayor a 0');
            }
            break;
    }
    
    return errors;
}

function displaySolution(solution) {
    const container = document.getElementById('solutionContainer');
    const safeSolution = solution || {};
    const formula = safeSolution.derivedFormula || safeSolution.formula || 'No disponible';
    const substitutions = safeSolution.substitutions || 'No disponible';
    const calculation = safeSolution.calculation || 'No disponible';
    const data = safeSolution.data || {};
    const steps = Array.isArray(safeSolution.steps) && safeSolution.steps.length
        ? safeSolution.steps
        : ['No disponible'];
    const result = safeSolution.result || 'No disponible';
    const unit = safeSolution.unit || '';
    const explanation = safeSolution.explanation || 'No disponible';

    // MathJax interprets "%" as a comment marker, so escape it before rendering.
    const toMathJax = value => String(value).replace(/%/g, '\\%');

    container.innerHTML = `
        <div class="solution-section">
            <h4>📌 Datos proporcionados:</h4>
            <ul>
                ${Object.entries(data).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('') || '<li>No disponible</li>'}
            </ul>
        </div>
        
        <div class="solution-section">
            <h4>📐 Fórmula utilizada:</h4>
            <div class="formula-display">\\[${toMathJax(formula)}\\]</div>
        </div>
        
        <div class="solution-section">
            <h4>🧮 Pasos del procedimiento:</h4>
            <ol>
                ${steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>
        
        <div class="solution-section">
            <h4>🔄 Sustitución de valores:</h4>
            <p>\\[${toMathJax(substitutions)}\\]</p>
        </div>
        
        <div class="solution-section">
            <h4>🔢 Cálculo:</h4>
            <p>\\[${toMathJax(calculation)}\\]</p>
        </div>
        
        <div class="solution-section">
            <h4>✅ Resultado:</h4>
            <div class="result-highlight">
                ${result} ${unit}
            </div>
        </div>
        
        <div class="solution-section">
            <h4>💡 Explicación:</h4>
            <p>${explanation}</p>
        </div>
    `;
    
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
    
    // Re-render MathJax
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
        window.MathJax.typesetPromise([container]).catch(error => {
            console.error('Error al renderizar la solución con MathJax:', error);
        });
    }
}

// Search functionality
function initializeSearch() {
    // Formula search
    const formulaSearch = document.getElementById('formulaSearch');
    const formulaCategoryFilter = document.getElementById('formulaCategoryFilter');
    
    formulaSearch.addEventListener('input', debounce(filterFormulas, 300));
    formulaCategoryFilter.addEventListener('change', filterFormulas);
    
    // Element search
    const elementSearch = document.getElementById('elementSearch');
    elementSearch.addEventListener('input', debounce(filterElements, 300));
}

function filterFormulas() {
    const searchTerm = document.getElementById('formulaSearch').value.toLowerCase();
    const category = document.getElementById('formulaCategoryFilter').value;
    
    let filtered = currentFormulas;
    
    if (searchTerm) {
        filtered = filtered.filter(f => 
            f.name.toLowerCase().includes(searchTerm) ||
            f.formula.toLowerCase().includes(searchTerm) ||
            f.category.toLowerCase().includes(searchTerm)
        );
    }
    
    if (category) {
        filtered = filtered.filter(f => f.category === category);
    }
    
    renderFormulas(filtered);
}

function filterElements() {
    const searchTerm = document.getElementById('elementSearch').value.toLowerCase();
    
    if (!searchTerm) {
        renderPeriodicTable();
        return;
    }
    
    const filtered = currentElements.filter(e =>
        e.name.toLowerCase().includes(searchTerm) ||
        e.symbol.toLowerCase().includes(searchTerm) ||
        e.block.toLowerCase().includes(searchTerm)
    );
    
    const container = document.getElementById('periodicTableContainer');
    container.innerHTML = filtered.map(element => `
        <div class="element" 
             data-symbol="${element.symbol}" 
             data-category="${element.category}"
             data-block="${element.block}"
             data-atomic-number="${element.atomicNumber}"
             onclick="showElementDetails(${element.atomicNumber})">
            <div class="element-number">${element.atomicNumber}</div>
            <div class="element-symbol">${element.symbol}</div>
            <div class="element-name">${element.name}</div>
        </div>
    `).join('');
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Make functions globally available
window.navigateTo = navigateTo;
window.showElementDetails = showElementDetails;
