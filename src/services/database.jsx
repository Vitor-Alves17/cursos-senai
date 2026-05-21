import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';

let db = null;

// Função para garantir que o banco está inicializado
const getDb = () => {
    if (!db) {
        db = SQLite.openDatabaseSync('senai_cursos.db');
    }
    return db;
};

// Inicializa o banco e popula com dados
export const initDatabase = async () => {
    try {
        const database = getDb();

        await database.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        subtitle TEXT NOT NULL,
        level TEXT NOT NULL,
        duration TEXT NOT NULL,
        area TEXT NOT NULL,
        professor TEXT NOT NULL,
        rating REAL NOT NULL
      );
    `);
        console.log('✅ Database initialized');

        // Verifica se já existem cursos
        const result = await database.getAllAsync('SELECT COUNT(*) as count FROM courses;');
        console.log('Quantidade de cursos encontrados:', result[0].count);

        if (result[0].count === 0) {
            console.log('Populando banco de dados...');
            await populateCourses();
        } else {
            console.log('Banco já possui cursos cadastrados');
        }

        return true;
    } catch (error) {
        console.error('❌ Error initializing DB:', error);
        throw error;
    }
};

// Popula o banco com cursos (mínimo 3 por área)
const populateCourses = async () => {
    const database = getDb();

    const mockCourses = [
        // Front-End (3 cursos)
        {
            title: "React Avançado",
            subtitle: "Hooks, Context API e Performance",
            level: "Intermediário",
            duration: "40h",
            area: "front-end",
            professor: "Ana Souza",
            rating: 4.8
        },
        {
            title: "UI/UX Design",
            subtitle: "Figma, Prototipação e Design System",
            level: "Básico",
            duration: "30h",
            area: "front-end",
            professor: "Carlos Lima",
            rating: 4.9
        },
        {
            title: "Vue.js 3",
            subtitle: "Composition API e Vuex",
            level: "Intermediário",
            duration: "35h",
            area: "front-end",
            professor: "Mariana Dias",
            rating: 4.7
        },

        // Back-End (3 cursos)
        {
            title: "Node.js com TDD",
            subtitle: "APIs RESTful e Testes",
            level: "Avançado",
            duration: "50h",
            area: "back-end",
            professor: "Rafael Nunes",
            rating: 4.9
        },
        {
            title: "Python com Flask",
            subtitle: "Microservices e APIs",
            level: "Intermediário",
            duration: "40h",
            area: "back-end",
            professor: "Beatriz Campos",
            rating: 4.8
        },
        {
            title: "PHP Moderno",
            subtitle: "POO e Padrões de Projeto",
            level: "Básico",
            duration: "25h",
            area: "back-end",
            professor: "João Pedro",
            rating: 4.5
        },

        // Banco de Dados (3 cursos)
        {
            title: "SQL Avançado",
            subtitle: "Performance, Índices e Procedures",
            level: "Avançado",
            duration: "20h",
            area: "banco de dados",
            professor: "Juliana Maia",
            rating: 5.0
        },
        {
            title: "Modelagem de Dados",
            subtitle: "DER, Normalização e MER",
            level: "Básico",
            duration: "30h",
            area: "banco de dados",
            professor: "Roberto Sá",
            rating: 4.6
        },
        {
            title: "NoSQL com MongoDB",
            subtitle: "Agregações e Indexação",
            level: "Intermediário",
            duration: "35h",
            area: "banco de dados",
            professor: "Fernanda Lopes",
            rating: 4.7
        },

        // UI/UX (3 cursos)
        {
            title: "Design Thinking",
            subtitle: "Metodologias Ágeis para UI/UX",
            level: "Básico",
            duration: "25h",
            area: "UI/UX",
            professor: "Patrícia Oliveira",
            rating: 4.8
        },
        {
            title: "Prototipação Avançada",
            subtitle: "Figma com Componentes",
            level: "Intermediário",
            duration: "35h",
            area: "UI/UX",
            professor: "André Santos",
            rating: 4.9
        },
        {
            title: "Testes de Usabilidade",
            subtitle: "Métricas e Ferramentas",
            level: "Avançado",
            duration: "30h",
            area: "UI/UX",
            professor: "Camila Rocha",
            rating: 4.7
        },

        // Projetos com Scrum (3 cursos)
        {
            title: "Scrum Master",
            subtitle: "Certificação e Práticas",
            level: "Intermediário",
            duration: "40h",
            area: "projetos com scrum",
            professor: "Fernando Almeida",
            rating: 4.8
        },
        {
            title: "Product Owner",
            subtitle: "Gestão de Backlog e Stakeholders",
            level: "Avançado",
            duration: "35h",
            area: "projetos com scrum",
            professor: "Renata Martins",
            rating: 4.9
        },
        {
            title: "Scrum para Equipes",
            subtitle: "Cerimônias e Artefatos",
            level: "Básico",
            duration: "20h",
            area: "projetos com scrum",
            professor: "Thiago Costa",
            rating: 4.6
        },

        // DevOps com Nuvem (3 cursos)
        {
            title: "Docker e Kubernetes",
            subtitle: "Containerização e Orquestração",
            level: "Avançado",
            duration: "45h",
            area: "devops com nuvem",
            professor: "Lucas Ferreira",
            rating: 5.0
        },
        {
            title: "CI/CD com GitHub Actions",
            subtitle: "Automação de Deploy",
            level: "Intermediário",
            duration: "30h",
            area: "devops com nuvem",
            professor: "Amanda Lima",
            rating: 4.8
        },
        {
            title: "AWS Fundamentals",
            subtitle: "EC2, S3 e Lambda",
            level: "Básico",
            duration: "35h",
            area: "devops com nuvem",
            professor: "Ricardo Nogueira",
            rating: 4.7
        }
    ];

    try {
        for (const course of mockCourses) {
            await database.runAsync(
                `INSERT INTO courses (title, subtitle, level, duration, area, professor, rating) VALUES (?, ?, ?, ?, ?, ?, ?);`,
                [course.title, course.subtitle, course.level, course.duration, course.area, course.professor, course.rating]
            );
        }
        console.log('✅ Database populated with 18 courses!');
    } catch (error) {
        console.error('❌ Error populating database:', error);
        throw error;
    }
};

// Busca todos os cursos
export const getCourses = async () => {
    try {
        const database = getDb();
        const allCourses = await database.getAllAsync('SELECT * FROM courses ORDER BY title ASC;');
        return allCourses;
    } catch (error) {
        console.error('❌ Error getting courses:', error);
        return [];
    }
};

// Busca cursos por área
export const filterCoursesByArea = async (area) => {
    try {
        const database = getDb();
        const filtered = await database.getAllAsync('SELECT * FROM courses WHERE area = ? ORDER BY title ASC;', [area]);
        return filtered;
    } catch (error) {
        console.error('❌ Error filtering courses:', error);
        return [];
    }
};