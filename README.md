# ChemiaLab

Plataforma web educativa interactiva para aprender química. Una aplicación completa que permite a los estudiantes explorar conceptos químicos, calcular problemas paso a paso, y acceder a recursos educativos como fórmulas, tabla periódica, historia de la química y más.

## 🎯 Características Principales

- **Calculadora Interactiva de Problemas**: Resuelve problemas químicos con explicaciones paso a paso
- **Sistema de Fórmulas**: Base de datos de fórmulas organizadas por categorías con búsqueda y filtrado
- **Tabla Periódica Interactiva**: Explora elementos químicos con información detallada
- **Historia de la Química**: Línea de tiempo interactiva de la evolución de la química
- **Ramas de la Química**: Exploración detallada de las diferentes áreas de la química
- **Diseño Responsive**: Funciona en desktop, tablet y dispositivos móviles
- **Modo Claro/Oscuro**: Tema personalizable con persistencia en localStorage
- **API REST**: Backend completo con endpoints para todas las funcionalidades

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con variables CSS para temas
- **JavaScript**: Funcionalidad interactiva y API integration
- **MathJax**: Renderizado de fórmulas matemáticas
- **Font Awesome**: Iconos

### Backend
- **Node.js**: Entorno de ejecución
- **Express.js**: Framework web
- **SQLite**: Base de datos ligera (fácil migración a PostgreSQL/MySQL)
- **CORS**: Cross-Origin Resource Sharing
- **Helmet**: Seguridad HTTP headers
- **Express Rate Limiting**: Protección contra abuso de API

## 📋 Requisitos Previos

Antes de instalar ChemiaLab, asegúrate de tener instalado:

- **Node.js** (v14.0.0 o superior)
- **npm** (viene con Node.js)

### Instalación de Node.js

1. Ve a [https://nodejs.org/](https://nodejs.org/)
2. Descarga la versión LTS recomendada para tu sistema operativo
3. Ejecuta el instalador y sigue las instrucciones
4. Verifica la instalación abriendo una terminal y ejecutando:
   ```bash
   node --version
   npm --version
   ```

## 🚀 Instalación

1. **Clona o descarga el proyecto**
   ```bash
   cd Quimica
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   
   El archivo `.env` ya está configurado con valores por defecto:
   ```
   PORT=3000
   NODE_ENV=development
   DB_PATH=./database/chemialab.db
   ```

## ▶️ Ejecución

### Modo Desarrollo (con auto-restart)
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

La aplicación estará disponible en: `http://localhost:3000`

## 📁 Estructura del Proyecto

```
chemialab/
│
├── frontend/                 # Frontend application
│   ├── index.html           # Página principal
│   ├── css/
│   │   └── styles.css       # Estilos con temas claro/oscuro
│   ├── js/
│   │   └── app.js           # Lógica del frontend
│   └── assets/              # Imágenes y recursos estáticos
│
├── backend/                  # Backend application
│   ├── server.js            # Servidor Express principal
│   ├── routes/              # Definición de rutas API
│   │   ├── solveRoutes.js
│   │   ├── formulaRoutes.js
│   │   ├── branchRoutes.js
│   │   ├── historyRoutes.js
│   │   └── periodicTableRoutes.js
│   ├── controllers/         # Lógica de controladores
│   │   ├── solveController.js
│   │   ├── formulaController.js
│   │   ├── branchController.js
│   │   ├── historyController.js
│   │   └── periodicTableController.js
│   ├── services/            # Lógica de negocio
│   │   └── chemistrySolver.js  # Motor de cálculos químicos
│   ├── data/                # Datos estáticos
│   │   ├── formulas.js
│   │   ├── branches.js
│   │   ├── history.js
│   │   └── periodicTable.js
│   ├── models/              # Modelos de base de datos
│   ├── middleware/          # Middleware personalizado
│   └── utils/               # Utilidades
│
├── database/                # Base de datos SQLite
│
├── package.json            # Dependencias del proyecto
├── .env                    # Variables de entorno
├── .gitignore              # Archivos ignorados por Git
└── README.md               # Esta documentación
```

## 🔧 API Endpoints

### Solución de Problemas

- `POST /api/solve/molarity` - Calcular molaridad
- `POST /api/solve/moles` - Calcular moles
- `POST /api/solve/molar-mass` - Calcular masa molar
- `POST /api/solve/density` - Calcular densidad
- `POST /api/solve/dilution` - Calcular diluciones
- `POST /api/solve/ideal-gas` - Ley de gases ideales
- `POST /api/solve/ph` - Calcular pH
- `POST /api/solve/poh` - Calcular pOH
- `POST /api/solve/mass` - Calcular masa
- `POST /api/solve/concentration` - Calcular concentración
- `POST /api/solve/stoichiometry` - Problemas estequiométricos
- `POST /api/solve/boyle-law` - Ley de Boyle
- `POST /api/solve/charles-law` - Ley de Charles
- `POST /api/solve/gay-lussac-law` - Ley de Gay-Lussac

### Fórmulas

- `GET /api/formulas` - Obtener todas las fórmulas
- `GET /api/formulas/category/:category` - Filtrar por categoría
- `GET /api/formulas/search?query=` - Buscar fórmulas

### Ramas de la Química

- `GET /api/branches` - Obtener todas las ramas
- `GET /api/branches/:id` - Obtener rama por ID

### Historia

- `GET /api/history` - Obtener toda la historia
- `GET /api/history/:id` - Obtener evento por ID

### Tabla Periódica

- `GET /api/periodic-table` - Obtener todos los elementos
- `GET /api/periodic-table/symbol/:symbol` - Obtener elemento por símbolo
- `GET /api/periodic-table/atomic-number/:atomicNumber` - Obtener elemento por número atómico
- `GET /api/periodic-table/search?query=` - Buscar elementos

## 🧮 Tipos de Problemas Soportados

### Química General
- **Molaridad**: M = n / V
- **Moles**: n = M * V
- **Masa Molar**: M = m / n
- **Densidad**: ρ = m / V
- **Diluciones**: M₁V₁ = M₂V₂

### Fisicoquímica
- **Ley de Gases Ideales**: PV = nRT
- **Ley de Boyle**: P₁V₁ = P₂V₂
- **Ley de Charles**: V₁/T₁ = V₂/T₂
- **Ley de Gay-Lussac**: P₁/T₁ = P₂/T₂

### Química Analítica
- **pH**: pH = -log[H⁺]
- **pOH**: pOH = -log[OH⁻]
- **Concentración**: C = m / (M * V)

### Estequiometría
- **Relaciones Molares**: n₂ = n₁ * (coef₂ / coef₁)

## 🎨 Personalización

### Agregar Nuevas Fórmulas

Para agregar una nueva fórmula, edita el archivo `backend/data/formulas.js`:

```javascript
{
  id: 24,
  name: 'Nombre de la Fórmula',
  formula: 'Fórmula matemática',
  category: 'Categoría',
  variables: {
    var1: 'Descripción variable 1',
    var2: 'Descripción variable 2'
  },
  units: 'Unidades del resultado',
  whenToUse: 'Cuándo utilizar esta fórmula',
  example: 'Ejemplo de uso'
}
```

### Agregar Nuevos Tipos de Problemas

1. Agrega la función de cálculo en `backend/services/chemistrySolver.js`:

```javascript
static solveNewProblem(data) {
  // Validación
  // Cálculos
  return {
    formula,
    data,
    steps,
    substitutions,
    calculation,
    result,
    unit,
    explanation
  };
}
```

2. Agrega el controlador en `backend/controllers/solveController.js`:

```javascript
static solveNewProblem(req, res) {
  try {
    const result = ChemistrySolver.solveNewProblem(req.body);
    res.json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
```

3. Agrega la ruta en `backend/routes/solveRoutes.js`:

```javascript
router.post('/new-problem', SolveController.solveNewProblem);
```

4. Agrega el formulario en `frontend/js/app.js` en la función `showProblemForm`.

## 🔒 Seguridad

La aplicación implementa varias medidas de seguridad:

- **Helmet**: Headers HTTP seguros
- **CORS**: Configurado correctamente para el frontend
- **Rate Limiting**: Límite de 100 solicitudes por 15 minutos para endpoints públicos
- **Validación de Entradas**: Validación en el backend para todos los datos
- **Manejo de Errores**: Manejo adecuado de errores sin exponer información sensible

## 🌱 Migración a PostgreSQL/MySQL

La arquitectura está diseñada para facilitar la migración a bases de datos más robustas:

1. Instala el driver correspondiente:
   ```bash
   npm install pg  # Para PostgreSQL
   # o
   npm install mysql2  # Para MySQL
   ```

2. Crea los modelos correspondientes en `backend/models/`

3. Actualiza los controladores para usar el nuevo sistema de base de datos

4. Actualiza la variable de entorno `DB_PATH` a la cadena de conexión correspondiente

## 📱 Diseño Responsive

La aplicación está optimizada para:

- **Desktop**: 1200px+
- **Laptop**: 992px - 1199px
- **Tablet**: 768px - 991px
- **Móvil**: < 768px

El diseño utiliza:
- CSS Grid y Flexbox
- Media queries para breakpoints
- Mobile-first approach
- Touch-friendly buttons en móvil

## 🎨 Sistema de Temas

La aplicación incluye dos temas:

- **☀️ Modo Claro**: Tema por defecto con fondo blanco
- **🌙 Modo Oscuro**: Tema oscuro para uso en ambientes con poca luz

La preferencia del usuario se guarda en `localStorage` y persiste entre sesiones.

## 🐛 Solución de Problemas

### El servidor no inicia
- Verifica que Node.js esté instalado correctamente
- Asegúrate de que el puerto 3000 esté disponible
- Revisa el archivo `.env` para configuración correcta

### Los cálculos dan resultados incorrectos
- Verifica que los datos de entrada sean correctos
- Revisa las unidades seleccionadas
- Consulta la documentación de la fórmula específica

### El frontend no carga
- Verifica que el servidor backend esté corriendo
- Revisa la consola del navegador para errores JavaScript
- Asegúrate de que las rutas API sean correctas

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

ChemiaLab - Plataforma educativa de química

## 🙏 Agradecimientos

- MathJax por el renderizado de fórmulas matemáticas
- Font Awesome por los iconos
- La comunidad de química por recursos y documentación

## 📞 Soporte

Para soporte, questions o sugerencias, por favor abre un issue en el repositorio del proyecto.

---

**¡Explora la química de una forma diferente con ChemiaLab!** 🧪⚗️🔬
