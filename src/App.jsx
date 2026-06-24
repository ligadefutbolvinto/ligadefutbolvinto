import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Calendar, Trophy, Users, Phone, Home, Shield, ChevronRight, MapPin, Clock, Mail, Lock, LogOut, Edit2, Upload, CheckCircle2, AlertCircle, Eye } from 'lucide-react';
import { supabase } from './supabaseClient';

// --- MOCK DATA ---

const clubesData = [
    { nombre: "Atletico Pumas", logo: "/logos/atletico_pumas.png" },
    { nombre: "Media Naranja F.C.", logo: "/logos/media_naranja.jpeg" },
    { nombre: "Futbol Club Brothers", logo: "/logos/futbol_club_brothers.jpeg" },
    { nombre: "C. D. Amanecer", logo: "/logos/c_d_amanecer.png" },
    { nombre: "Estudiantes Lazarte", logo: "/logos/estudiantes_lazarte.jpeg" },
    { nombre: "Atomos F. C.", logo: "/logos/atomos_fc.jpeg" },
    { nombre: "Club Deportivo Kali", logo: "/logos/club_deportivo_kali.jpeg" },
    { nombre: "Ninjas JAB", logo: "/logos/ninjas_jab.jpeg" }
];

const tablaData = [
    { equipo: "Avaroa", pts: 25, pj: 10, pg: 8, pe: 1, pp: 1, dg: 15 },
    { equipo: "Bush Vinto", pts: 22, pj: 10, pg: 7, pe: 1, pp: 2, dg: 10 },
    { equipo: "Peñarol", pts: 20, pj: 10, pg: 6, pe: 2, pp: 2, dg: 8 },
    { equipo: "Bush Vinto Junior", pts: 18, pj: 10, pg: 5, pe: 3, pp: 2, dg: 5 },
    { equipo: "Millonarios", pts: 15, pj: 10, pg: 4, pe: 3, pp: 3, dg: 2 },
    { equipo: "Amanecer", pts: 12, pj: 10, pg: 3, pe: 3, pp: 4, dg: -2 },
    { equipo: "J Yana", pts: 10, pj: 10, pg: 3, pe: 1, pp: 6, dg: -5 },
    { equipo: "The Strongest", pts: 8, pj: 10, pg: 2, pe: 2, pp: 6, dg: -8 },
    { equipo: "Olimpic", pts: 5, pj: 10, pg: 1, pe: 2, pp: 7, dg: -12 },
    { equipo: "Deportivo Kali", pts: 3, pj: 10, pg: 1, pe: 0, pp: 9, dg: -17 }
];

const fixtureData = [
    { fecha: "2025-12-01", hora: "15:00", equipoA: "Avaroa", equipoB: "Bush Vinto" },
    { fecha: "2025-12-01", hora: "17:00", equipoA: "Peñarol", equipoB: "Bush Vinto Junior" },
    { fecha: "2025-12-02", hora: "15:00", equipoA: "Millonarios", equipoB: "Amanecer" },
    { fecha: "2025-12-02", hora: "17:00", equipoA: "J Yana", equipoB: "The Strongest" },
    { fecha: "2025-12-03", hora: "15:00", equipoA: "Olimpic", equipoB: "Deportivo Kali" }
];

const jugadoresData = [
    {
        id: "1111",
        nombre: "Juan Pérez",
        equipoActual: "Avaroa",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
        historial: [
            { año: 2023, equipo: "Bush Vinto" },
            { año: 2024, equipo: "Avaroa" }
        ]
    },
    {
        id: "2222",
        nombre: "Carlos Mamani",
        equipoActual: "Bush Vinto",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
        historial: [
            { año: 2024, equipo: "Bush Vinto" }
        ]
    },
    {
        id: "3333",
        nombre: "Luis Fernández",
        equipoActual: "Peñarol",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luis",
        historial: [
            { año: 2022, equipo: "Amanecer" },
            { año: 2023, equipo: "Peñarol" }
        ]
    },
    {
        id: "4444",
        nombre: "Marcelo Garron Otalora",
        equipoActual: "Sixers",
        foto: "/jugadores/marcelo-garron-otalora.jpg",
        historial: [
            { año: 2024, equipo: "Amanecer" },
            { año: 2025, equipo: "Sixers" }
        ]
    },
    {
        id: "5555",
        nombre: "Brayan Vargas Zeballos",
        equipoActual: "Sixers",
        foto: "/jugadores/brayan-vargas-zeballos.jpg",
        historial: [
            { año: 2023, equipo: "The Strongest" },
            { año: 2024, equipo: "The Strongest" },
            { año: 2025, equipo: "Sixers" }
        ]
    },
    {
        id: "6666",
        nombre: "Gabriel Choque",
        equipoActual: "Amanecer",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel",
        historial: [
            { año: 2024, equipo: "Amanecer" }
        ]
    },
    {
        id: "7777",
        nombre: "Miguel Ángel",
        equipoActual: "J Yana",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel",
        historial: [
            { año: 2022, equipo: "Olimpic" },
            { año: 2024, equipo: "J Yana" }
        ]
    },
    {
        id: "8888",
        nombre: "Roberto Carlos",
        equipoActual: "The Strongest",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
        historial: [
            { año: 2024, equipo: "The Strongest" }
        ]
    },
    {
        id: "9999",
        nombre: "Diego Maradona",
        equipoActual: "Olimpic",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego",
        historial: [
            { año: 2023, equipo: "Deportivo Kali" },
            { año: 2024, equipo: "Olimpic" }
        ]
    },
    {
        id: "1010",
        nombre: "Lionel Messi",
        equipoActual: "Deportivo Kali",
        foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lionel",
        historial: [
            { año: 2024, equipo: "Deportivo Kali" }
        ]
    }
];

// --- COMPONENTS ---

const Navbar = ({ activeTab, setActiveTab }) => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { id: 'inicio', label: 'Inicio', icon: <Home size={20} /> },
        { id: 'institucional', label: 'Institucional', icon: <Users size={20} /> },
        { id: 'clubes', label: 'Clubes', icon: <Shield size={20} /> },
        { id: 'fixture', label: 'Fixture', icon: <Calendar size={20} /> },
        { id: 'tabla', label: 'Posiciones', icon: <Trophy size={20} /> },
        { id: 'panel-equipo', label: 'Panel de Equipo', icon: <Users size={20} /> },
        { id: 'contacto', label: 'Contacto', icon: <Phone size={20} /> },
    ];

    return (
        <nav className="bg-green-800 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('inicio')}>
                        <div className="bg-white rounded-full p-1 shadow-lg border-2 border-green-400 hover:scale-105 transition-transform duration-300">
                            <img
                                src="/logo.png"
                                alt="Liga Vinto"
                                className="h-20 w-20 rounded-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${activeTab === item.id
                                        ? 'bg-green-700 text-white'
                                        : 'text-green-100 hover:bg-green-600'
                                        }`}
                                >
                                    <span className="mr-2">{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-green-100 hover:text-white hover:bg-green-600 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-green-800 pb-4">
                    <div className="px-2 pt-2 space-y-1 sm:px-3">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center w-full px-3 py-3 rounded-md text-base font-medium ${activeTab === item.id
                                    ? 'bg-green-700 text-white'
                                    : 'text-green-100 hover:bg-green-600'
                                    }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

const Inicio = () => (
    <div className="animate-fade-in">
        <div className="relative bg-green-800 text-white py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
            <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                    Liga de Fútbol Vinto
                </h1>
                <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
                    Pasión, disciplina y talento en el corazón de Cochabamba.
                </p>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
                    <p className="text-lg text-gray-600 mb-4">
                        Fundada el 13 de mayo de 1963, bajo la Personería Jurídica R. S. Nº 128155, la Liga de Fútbol Vinto ha sido el semillero de grandes talentos
                        y el punto de encuentro para las familias vinteñas. Promovemos el deporte sano
                        y la competencia leal.
                    </p>
                    <p className="text-lg text-gray-600">
                        Hoy en día, contamos con 60 clubes inscritos distribuidos en tres categorías:
                        Primeras de Honor, Primeras de Ascenso y Segundas de Ascenso, consolidándonos
                        como una de las ligas más importantes del valle bajo.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-green-600">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Misión</h3>
                    <p className="text-gray-600 mb-6">
                        Fomentar la práctica del fútbol en Vinto, inculcando valores de respeto,
                        trabajo en equipo y superación personal en todos nuestros deportistas.
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Visión</h3>
                    <p className="text-gray-600">
                        Ser la liga referente de Cochabamba por su organización, nivel competitivo
                        y aporte al desarrollo social de la comunidad.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const Clubes = ({ onClubClick }) => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-green-500 pb-2 inline-block">
            Clubes Afiliados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clubesData.map((club, index) => (
                <div
                    key={index}
                    onClick={() => club.nombre === 'J Yana' && onClubClick ? onClubClick(club.nombre) : null}
                    className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center group ${club.nombre === 'J Yana' ? 'cursor-pointer ring-2 ring-green-400 ring-offset-2' : ''}`}
                >
                    <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-55 transition-colors overflow-hidden p-4">
                        <img
                            src={club.logo}
                            alt={club.nombre}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{club.nombre}</h3>
                    <p className="text-sm text-gray-550 mt-2">Fundado en 1990</p>
                    {club.nombre === 'J Yana' && (
                        <span className="mt-4 text-green-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                            Ver Historia &rarr;
                        </span>
                    )}
                </div>
            ))}
        </div>
    </div>
);

const ClubJYana = ({ onBack }) => (
    <div className="animate-fade-in bg-white min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img
                src="/j-yana/j-yana-portada.jpg"
                alt="J Yana Portada"
                className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-16 bg-gradient-to-t from-black/80 to-transparent">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end md:items-center gap-8">
                    <img
                        src="/j-yana/j-yana-logo.jpg"
                        alt="J Yana Logo"
                        className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white shadow-2xl"
                    />
                    <div className="text-white mb-4">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-2">CLUB J YANA</h1>
                        <p className="text-xl md:text-2xl font-light opacity-90">Orgullo y Tradición Vinteña</p>
                    </div>
                </div>
            </div>
            <button
                onClick={onBack}
                className="absolute top-4 left-4 md:top-8 md:left-8 z-30 bg-white/20 backdrop-blur-md hover:bg-white/45 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full font-bold text-sm md:text-base transition-all flex items-center border border-white/30 shadow-lg"
            >
                &larr; Volver a Clubes
            </button>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-24">

            {/* Section 1: Origins */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="prose prose-lg text-gray-600">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-green-600 pl-4">Nuestros Orígenes</h2>
                    <p className="mb-4">
                        Fundado en el corazón de Vinto, el Club J Yana nació de la pasión de un group de jóvenes
                        que soñaban con llevar el fútbol de su barrio a lo más alto. Lo que comenzó como
                        partidos amistosos en canchas de tierra, pronto se transformó en una institución
                        respetada.
                    </p>
                    <p>
                        El nombre "J Yana" evoca fuerza y misterio, una identidad que ha perdurado a través
                        de las décadas, convirtiéndose en sinónimo de garra y buen fútbol.
                    </p>
                </div>
                <div className="relative group">
                    <div className="absolute -inset-2 bg-green-200 rounded-lg rotate-3 group-hover:rotate-6 transition-transform"></div>
                    <img
                        src="/j-yana/1.jpg"
                        alt="Orígenes del Club"
                        className="relative rounded-lg shadow-xl w-full h-80 object-cover transform transition-transform group-hover:-translate-y-2"
                    />
                </div>
            </div>

            {/* Section 2: Golden Era */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 relative group">
                    <div className="absolute -inset-2 bg-yellow-200 rounded-lg -rotate-3 group-hover:-rotate-6 transition-transform"></div>
                    <img
                        src="/j-yana/2.jpg"
                        alt="Época Dorada"
                        className="relative rounded-lg shadow-xl w-full h-80 object-cover transform transition-transform group-hover:-translate-y-2"
                    />
                </div>
                <div className="order-1 md:order-2 prose prose-lg text-gray-600">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-yellow-500 pl-4">La Época Dorada</h2>
                    <p className="mb-4">
                        Los años 90 marcaron un hito en nuestra historia. Con un equipo conformado casi
                        exclusivamente por talento local, J Yana dominó la liga, encadenando campeonatos
                        y ganándose el respeto de rivales en todo el valle bajo.
                    </p>
                    <p>
                        Fue una época de estadios llenos, donde la camiseta se defendía con el alma y cada
                        gol era una celebración comunitaria.
                    </p>
                </div>
            </div>

            {/* Section 3: Featured Image */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="px-3 bg-white text-lg font-medium text-gray-900">
                        Nuestra Pasión
                    </span>
                </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <img
                    src="/j-yana/3.jpg"
                    alt="Equipo Actual"
                    className="w-full h-64 sm:h-80 md:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8">
                    <p className="text-white text-xl font-medium">
                        "Más que un equipo, somos una familia que comparte un mismo sueño."
                    </p>
                </div>
            </div>

            {/* Section 4: The Future */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="prose prose-lg text-gray-600">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">Mirando al Futuro</h2>
                    <p className="mb-4">
                        Hoy, J Yana sigue escribiendo su historia. Con una nueva generación de jugadores
                        y una directiva comprometida, buscamos no solo títulos, sino formar personas
                        íntegras a través del deporte.
                    </p>
                    <p>
                        El legado continúa, y cada fin de semana, cuando el balón rueda,
                        el espíritu de J Yana vuelve a cobrar vida en la cancha.
                    </p>
                </div>
                <div className="relative group">
                    <div className="absolute -inset-2 bg-blue-200 rounded-lg rotate-2 group-hover:rotate-4 transition-transform"></div>
                    <img
                        src="/j-yana/4.jpg"
                        alt="El Futuro"
                        className="relative rounded-lg shadow-xl w-full h-80 object-cover transform transition-transform group-hover:-translate-y-2"
                    />
                </div>
            </div>

        </div>
    </div>
);

const Fixture = () => {
    const [subTab, setSubTab] = useState('honor');

    const subTabs = [
        { id: 'honor', label: 'Primera de Honor' },
        { id: 'ascenso_1', label: 'Primera de Ascenso' },
        { id: 'ascenso_2', label: 'Segunda de Ascenso' }
    ];

    const renderPartidosVacios = () => (
        <div className="space-y-4">
            {[1, 2, 3].map((num) => (
                <div key={num} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-350 flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse">
                    <div className="flex items-center gap-4 text-gray-400">
                        <Calendar className="w-5 h-5" />
                        <span className="font-medium text-sm">Fecha y Hora por programar</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-gray-400 text-lg">Equipo A</span>
                        <span className="font-black text-gray-300">VS</span>
                        <span className="font-bold text-gray-400 text-lg">Equipo B</span>
                    </div>
                    <div>
                        <span className="px-3 py-1 bg-gray-100 text-gray-400 text-xs font-bold rounded-full uppercase tracking-wide">
                            Por definir
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-green-500 pb-2 inline-block">
                Próximos Partidos
            </h2>
            
            {/* Subpestañas */}
            <div className="flex bg-gray-100 rounded-lg p-1.5 mb-8 max-w-2xl">
                {subTabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setSubTab(tab.id)}
                        className={`flex-1 py-2.5 text-center font-bold text-sm rounded-md transition-all ${
                            subTab === tab.id
                                ? 'bg-green-700 text-white shadow'
                                : 'bg-transparent text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {renderPartidosVacios()}
        </div>
    );
};

const TablaPosiciones = () => {
    const [subTab, setSubTab] = useState('honor');

    const subTabs = [
        { id: 'honor', label: 'Primera de Honor' },
        { id: 'ascenso_1', label: 'Primera de Ascenso' },
        { id: 'ascenso_2', label: 'Segunda de Ascenso' }
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-green-500 pb-2 inline-block">
                Tabla de Posiciones
            </h2>

            {/* Subpestañas */}
            <div className="flex bg-gray-100 rounded-lg p-1.5 mb-8 max-w-2xl">
                {subTabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setSubTab(tab.id)}
                        className={`flex-1 py-2.5 text-center font-bold text-sm rounded-md transition-all ${
                            subTab === tab.id
                                ? 'bg-green-700 text-white shadow'
                                : 'bg-transparent text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-green-700 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Pos</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Club</th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">PJ</th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">PG</th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">PE</th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">PP</th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">DG</th>
                                <th className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider">PTS</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td colSpan="8" className="px-6 py-12 text-center text-gray-400 font-medium">
                                    No hay datos registrados en esta categoría aún.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 bg-gray-50 text-sm text-gray-550">
                    * Los primeros 4 clasifican a la siguiente fase de la liguilla.
                </div>
            </div>
        </div>
    );
};

const Institucional = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-green-500 pb-2 inline-block">
            Institucional
        </h2>

        {/* Directorio - Featured Card */}
        <div className="mb-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-green-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Users className="w-8 h-8 mr-3 text-green-600" />
                    Directorio
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="border-b pb-4">
                        <span className="text-gray-600 text-sm font-semibold block mb-2">Presidente:</span>
                        <span className="text-gray-900 font-bold text-lg">Enrique Uribe</span>
                    </div>
                    <div className="border-b pb-4">
                        <span className="text-gray-600 text-sm font-semibold block mb-2">Vicepresidente:</span>
                        <span className="text-gray-900 font-bold text-lg">Victor Carvajal</span>
                    </div>
                    <div className="border-b pb-4">
                        <span className="text-gray-600 text-sm font-semibold block mb-2">Secretario de Actas:</span>
                        <span className="text-gray-900 font-bold text-lg">Javier Quispe</span>
                    </div>
                    <div className="border-b pb-4">
                        <span className="text-gray-600 text-sm font-semibold block mb-2">Tesorero:</span>
                        <span className="text-gray-900 font-bold text-lg">Carlos Garcia</span>
                    </div>
                    <div className="border-b pb-4">
                        <span className="text-gray-600 text-sm font-semibold block mb-2">Secretario de Matrículas:</span>
                        <span className="text-gray-900 font-bold text-lg">Marcelo Donaire</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Other Committees */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Comité Técnico */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-green-600" />
                    Comité Técnico
                </h3>
                <ul className="space-y-3">
                    <li className="flex flex-col border-b pb-2">
                        <span className="text-gray-600 text-sm">Presidente del Comité:</span>
                        <span className="font-medium">Carlos Garcia</span>
                    </li>
                    <li className="flex flex-col border-b pb-2">
                        <span className="text-gray-600 text-sm">Vocal:</span>
                        <span className="font-medium">Merlyn Rodriguez</span>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-gray-600 text-sm">Vocal:</span>
                        <span className="font-medium">Juan Rodriguz</span>
                    </li>
                </ul>
            </div>

            {/* Comité de Penas */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-red-650" />
                    Comité de Penas
                </h3>
                <ul className="space-y-3">
                    <li className="flex flex-col border-b pb-2">
                        <span className="text-gray-600 text-sm">Presidente del Comité:</span>
                        <span className="font-medium">Jose Gonzales</span>
                    </li>
                    <li className="flex flex-col border-b pb-2">
                        <span className="text-gray-600 text-sm">Vocal:</span>
                        <span className="font-medium">Marco Antonio Gonzales</span>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-gray-600 text-sm">Vocal:</span>
                        <span className="font-medium">Gerardo Teran</span>
                    </li>
                </ul>
            </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Documentación Oficial</h3>
            <p className="text-gray-600 mb-6">
                Descarga la convocatoria oficial de la temporada 2026 y los estatutos de la liga.
            </p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors shadow-lg flex items-center mx-auto">
                <Shield className="w-5 h-5 mr-2" />
                Descargar Convocatoria 2026 (PDF)
            </button>
        </div>
    </div>
);

// --- DELEGADO & PANEL DE EQUIPOS SIMULATION DATA ---

const jyanaFixtureData = [
    { fecha: "Domingo 07/06/2026", hora: "09:30", rival: "Avaroa", cancha: "Cancha Licenciada", condicion: "Local" },
    { fecha: "Domingo 14/06/2026", hora: "15:30", rival: "Bush Vinto", cancha: "Stadium Vinto", condicion: "Visitante" },
    { fecha: "Domingo 21/06/2026", hora: "11:00", rival: "Peñarol", cancha: "Cancha Licenciada", condicion: "Local" },
    { fecha: "Domingo 28/06/2026", hora: "14:00", rival: "Bush Vinto Junior", cancha: "Stadium Vinto", condicion: "Visitante" },
    { fecha: "Domingo 05/07/2026", hora: "08:30", rival: "Millonarios", cancha: "Cancha Licenciada", condicion: "Local" },
    { fecha: "Domingo 12/07/2026", hora: "16:30", rival: "Amanecer", cancha: "Stadium Vinto", condicion: "Visitante" },
    { fecha: "Domingo 19/07/2026", hora: "13:00", rival: "The Strongest", cancha: "Cancha Licenciada", condicion: "Local" },
    { fecha: "Domingo 26/07/2026", hora: "10:00", rival: "Olimpic", cancha: "Stadium Vinto", condicion: "Visitante" },
    { fecha: "Domingo 02/08/2026", hora: "15:00", rival: "Deportivo Kali", cancha: "Cancha Licenciada", condicion: "Local" }
];

const LoginPanel = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Por favor, ingrese su usuario del club y su contraseña (C.I.).');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const email = `${username.trim().toLowerCase()}@ligadefutbolvinto.com`;
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password: password.trim()
            });

            if (authError) {
                throw new Error(authError.message === 'Invalid login credentials' 
                    ? 'Usuario o contraseña (C.I.) incorrectos.' 
                    : authError.message);
            }

            // Fetch delegate info
            const { data: delegado, error: delError } = await supabase
                .from('delegados')
                .select('equipo_id, nombre_completo, username')
                .eq('user_id', authData.user.id)
                .single();

            if (delError || !delegado) {
                await supabase.auth.signOut();
                throw new Error('El usuario no está registrado como delegado de ningún equipo.');
            }

            // Fetch team name
            const { data: equipo, error: eqError } = await supabase
                .from('equipos')
                .select('nombre')
                .eq('id', delegado.equipo_id)
                .single();

            const nombreEquipo = equipo ? equipo.nombre : 'Mi Equipo';

            onLoginSuccess(authData.session, {
                ...delegado,
                nombreEquipo
            });
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message || 'Ocurrió un error al intentar iniciar sesión.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-16 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-105 font-sans">
                <div className="bg-green-800 p-8 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="bg-white/20 p-3 rounded-full mb-3 backdrop-blur-md">
                            <Lock className="w-8 h-8 text-white animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-bold">Portal Privado de Delegados</h2>
                        <p className="text-green-200 text-sm mt-1">Ingresa con tus credenciales de delegado</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-550 p-4 rounded-r-lg animate-fade-in flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-red-550 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700 font-medium">{error}</p>
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-semibold text-gray-705 mb-2">Usuario del Club</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <Users size={18} />
                            </span>
                            <input
                                type="text"
                                placeholder="Ej: clubpenarol"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-705 mb-2">Contraseña (C.I.)</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <Lock size={18} />
                            </span>
                            <input
                                type="password"
                                placeholder="Ingrese su C.I."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-700 text-white py-3 px-4 rounded-lg font-bold hover:bg-green-800 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center transform active:scale-[0.98] duration-100 disabled:bg-gray-400 disabled:cursor-not-allowed text-base"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Iniciando sesión...</span>
                            </div>
                        ) : (
                            <span>Ingresar al Portal</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

const PanelEquipo = ({ delegateInfo, onLogout }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [playersCache, setPlayersCache] = useState([]);
    const [loadingCache, setLoadingCache] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchMode, setSearchMode] = useState('predictive'); // 'predictive' | 'full'
    const [player, setPlayer] = useState(null);
    const [activeSubTab, setActiveSubTab] = useState('nomina');
    
    // Roster (Nomina) States
    const [nomina, setNomina] = useState([]);
    const [loadingNomina, setLoadingNomina] = useState(false);
    const [nominaError, setNominaError] = useState('');

    // Editing Player States
    const [editingPlayer, setEditingPlayer] = useState(null);
    const [editForm, setEditForm] = useState({
        ci: '',
        nombres: '',
        apellidos: '',
        fecha_nacimiento: '',
        categoria_jugador: '',
        foto_url: ''
    });
    const [newPhotoFile, setNewPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState('');
    const [savingEdit, setSavingEdit] = useState(false);
    const [editError, setEditError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Load Nomina and Players Cache on mount or team change
    useEffect(() => {
        if (delegateInfo && delegateInfo.equipo_id) {
            fetchNomina();
            fetchPlayersCache();
        }
    }, [delegateInfo]);

    // Handle click outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (e) => {
            const searchInput = document.getElementById('search-player');
            const suggestions = document.getElementById('search-suggestions');
            const triggerBtn = document.getElementById('btn-search-trigger');
            const clearBtn = document.getElementById('btn-clear-search');
            
            if (
                searchInput && !searchInput.contains(e.target) &&
                suggestions && !suggestions.contains(e.target) &&
                triggerBtn && !triggerBtn.contains(e.target) &&
                clearBtn && !clearBtn.contains(e.target)
            ) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const fetchPlayersCache = async () => {
        setLoadingCache(true);
        try {
            const { data, error } = await supabase
                .from('jugadores')
                .select(`
                    ci,
                    nombres,
                    apellidos,
                    fecha_nacimiento,
                    foto_url,
                    historial_participacion (
                        id,
                        año,
                        categoria_jugador,
                        equipos:equipos!historial_participacion_equipo_id_fkey (
                            id,
                            nombre
                        )
                    )
                `);

            if (error) throw error;
            setPlayersCache(data || []);
        } catch (err) {
            console.error("Error loading players cache:", err);
        } finally {
            setLoadingCache(false);
        }
    };

    const fetchNomina = async () => {
        setLoadingNomina(true);
        setNominaError('');
        try {
            const { data, error } = await supabase
                .from('historial_participacion')
                .select(`
                    id,
                    categoria_jugador,
                    jugadores (
                        ci,
                        nombres,
                        apellidos,
                        fecha_nacimiento,
                        foto_url
                    )
                `)
                .eq('equipo_id', delegateInfo.equipo_id)
                .eq('año', 2026);

            if (error) throw error;

            const mapped = (data || []).map(item => ({
                participacion_id: item.id,
                categoria_jugador: item.categoria_jugador,
                ...(item.jugadores || {
                    ci: 'Sin C.I.',
                    nombres: 'Desconocido',
                    apellidos: '',
                    fecha_nacimiento: '',
                    foto_url: ''
                })
            }));
            setNomina(mapped);
        } catch (err) {
            console.error("Error loading nomina:", err);
            setNominaError('Error al cargar la nómina de jugadores. Por favor intente de nuevo.');
        } finally {
            setLoadingNomina(false);
        }
    };

    // Local Predictive Search Utilities
    const normalizeString = (str) => {
        if (!str) return '';
        return str.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setSearchMode('predictive');
        
        if (value.trim().length >= 2) {
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const getMatches = () => {
        const query = normalizeString(searchTerm.trim());
        if (query.length < 2) return [];
        
        return playersCache.filter(player => {
            const nameMatch = normalizeString(player.nombres).includes(query);
            const surnameMatch = normalizeString(player.apellidos).includes(query);
            const ciMatch = player.ci ? player.ci.toLowerCase().includes(query) : false;
            return nameMatch || surnameMatch || ciMatch;
        });
    };

    const performFullSearch = (e) => {
        if (e) e.preventDefault();
        const query = normalizeString(searchTerm.trim());
        if (query.length < 2) return;
        
        setSearchMode('full');
        setShowSuggestions(true);
    };

    const selectPlayer = (p) => {
        setPlayer(p);
        setSearchTerm(`${p.nombres} ${p.apellidos}`);
        setShowSuggestions(false);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setShowSuggestions(false);
        setPlayer(null);
        setSearchMode('predictive');
        const inputEl = document.getElementById('search-player');
        if (inputEl) inputEl.focus();
    };

    // Edit Modal opening
    const handleOpenEdit = (p) => {
        setEditingPlayer(p);
        const resolvedFotoUrl = p.foto_url || (p.ci ? `https://flwrkxufkknrqbdlkvvp.supabase.co/storage/v1/object/public/fotos_jugadores/${p.ci.toString().trim()}.jpg` : '');
        setEditForm({
            ci: p.ci,
            nombres: p.nombres || '',
            apellidos: p.apellidos || '',
            fecha_nacimiento: p.fecha_nacimiento || '',
            categoria_jugador: p.categoria_jugador || '',
            foto_url: resolvedFotoUrl
        });
        setPhotoPreview(resolvedFotoUrl);
        setNewPhotoFile(null);
        setEditError('');
        setSuccessMessage('');
    };

    // Handle photo file change
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewPhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Save Edit Player
    const handleSaveEdit = async (e) => {
        e.preventDefault();
        if (!editForm.ci || !editForm.nombres || !editForm.apellidos || !editForm.fecha_nacimiento) {
            setEditError('Todos los campos son obligatorios.');
            return;
        }

        setSavingEdit(true);
        setEditError('');
        setSuccessMessage('');

        try {
            let finalFotoUrl = editForm.foto_url;

            // 1. Upload photo if selected
            if (newPhotoFile) {
                const fileName = `${editForm.ci.trim()}.jpg`; // overwrite with [ci].jpg

                const { error: uploadError } = await supabase.storage
                    .from('fotos_jugadores')
                    .upload(fileName, newPhotoFile, { upsert: true });

                if (uploadError) {
                    throw new Error(`Error al subir la foto: ${uploadError.message}`);
                }

                // Get public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('fotos_jugadores')
                    .getPublicUrl(fileName);
                
                // Add timestamp to break cache
                finalFotoUrl = `${publicUrl}?t=${Date.now()}`;
            }

            // 2. Update players table
            const { error: updateError } = await supabase
                .from('jugadores')
                .update({
                    ci: editForm.ci.trim(),
                    nombres: editForm.nombres.trim(),
                    apellidos: editForm.apellidos.trim(),
                    fecha_nacimiento: editForm.fecha_nacimiento,
                    foto_url: finalFotoUrl
                })
                .eq('ci', editingPlayer.ci); // original CI

            if (updateError) {
                throw new Error(`Error al actualizar los datos: ${updateError.message}`);
            }

            setSuccessMessage('Datos del jugador actualizados correctamente.');
            
            // Reload roster and search cache
            await fetchNomina();
            await fetchPlayersCache();

            // Auto close modal after 1.5 seconds
            setTimeout(() => {
                setEditingPlayer(null);
            }, 1500);

        } catch (err) {
            console.error("Save error:", err);
            setEditError(err.message || 'Ocurrió un error al guardar los cambios.');
        } finally {
            setSavingEdit(false);
        }
    };

    const getLogo = (teamName) => {
        if (!teamName) return null;
        const club = clubesData.find(c => c.nombre.toLowerCase().trim() === teamName.toLowerCase().trim());
        return club ? club.logo : null;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in space-y-12 font-sans">
            
            {/* Header del Panel */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-slide-up">
                <div className="bg-gradient-to-r from-green-800 to-green-950 px-6 py-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-white rounded-full p-1 shadow-lg w-16 h-16 flex items-center justify-center overflow-hidden">
                            {(() => {
                                const logo = getLogo(delegateInfo.nombreEquipo);
                                return logo ? (
                                    <img
                                        src={logo}
                                        alt={delegateInfo.nombreEquipo}
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <Shield className="w-10 h-10 text-green-800 animate-pulse" />
                                );
                            })()}
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight">Administración: {delegateInfo.nombre_completo}</h3>
                            <p className="text-green-300 text-sm">Panel de Control del Club: <span className="font-extrabold text-white uppercase">{delegateInfo.nombreEquipo}</span></p>
                        </div>
                    </div>
                    
                    <button
                        onClick={onLogout}
                        className="bg-red-650 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors duration-200 shadow-md transform active:scale-95"
                    >
                        <LogOut size={16} />
                        Cerrar Sesión
                    </button>
                </div>
            </div>
                    {/* Buscador de Jugadores (Subsección Superior) */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative z-30">
                <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <Search className="w-5 h-5 mr-2 text-green-600" />
                    Buscador Global (Scouting)
                </h4>
                <p className="text-gray-500 text-sm mb-6">
                    Consulta el registro nacional de pases y habilitación de jugadores de cualquier equipo ingresando su C.I. o nombre.
                </p>
                
                <div className="search-input-wrapper">
                    <div className="search-input-inner">
                        {/* Input principal */}
                        <input
                            type="text"
                            id="search-player"
                            placeholder="Escribe para buscar..."
                            autoComplete="off"
                            value={searchTerm}
                            onChange={handleSearchInput}
                            onFocus={() => {
                                if (searchTerm.trim().length >= 2) {
                                    setShowSuggestions(true);
                                }
                            }}
                        />
                        {/* Icono decorativo o botón de limpiar */}
                        <button
                            id="btn-clear-search"
                            className={`clear-input-btn ${searchTerm.trim() ? '' : 'hidden'}`}
                            type="button"
                            onClick={handleClearSearch}
                        >
                            ×
                        </button>
                    </div>
                    {/* Botón para forzar búsqueda completa */}
                    <button
                        id="btn-search-trigger"
                        className="btn btn-primary bg-green-700 text-white font-bold px-6 rounded-xl hover:bg-green-800 transition-colors shadow-md active:scale-98"
                        type="button"
                        onClick={performFullSearch}
                    >
                        Buscar
                    </button>
                </div>

                {/* Contenedor flotante para las sugerencias predictivas */}
                {showSuggestions && (
                    <div id="search-suggestions" className="suggestions-container">
                        {(() => {
                            const matches = getMatches();
                            if (matches.length === 0) {
                                return <div className="no-suggestions">No se encontraron resultados</div>;
                            }
                            
                            const limit = searchMode === 'full' ? 100 : 25;
                            const topMatches = matches.slice(0, limit);
                            
                            return (
                                <>
                                    {searchMode === 'full' && (
                                        <div className="suggestions-header">
                                            Resultados de búsqueda: {matches.length} encontrados
                                        </div>
                                    )}
                                    {topMatches.map((pCache) => (
                                        <div
                                            key={pCache.ci}
                                            className="suggestion-item"
                                            onClick={() => selectPlayer(pCache)}
                                        >
                                            <div className="suggestion-info flex items-center gap-3">
                                                <img 
                                                    src={pCache.foto_url || (pCache.ci ? `https://flwrkxufkknrqbdlkvvp.supabase.co/storage/v1/object/public/fotos_jugadores/${pCache.ci.toString().trim()}.jpg` : '') || 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(pCache.nombres)} 
                                                    alt={pCache.nombres}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(pCache.nombres);
                                                    }}
                                                    className="w-8 h-8 rounded-full border border-gray-205 object-cover bg-white flex-shrink-0"
                                                />
                                                <div>
                                                    <span className="suggestion-name block">
                                                        {pCache.nombres} {pCache.apellidos}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400 font-semibold">
                                                        C.I. {pCache.ci}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded flex-shrink-0">
                                                {pCache.historial_participacion && pCache.historial_participacion.length > 0
                                                    ? [...pCache.historial_participacion].sort((a, b) => b.año - a.año)[0]?.equipos?.nombre || 'Sin Club'
                                                    : 'Sin Club'}
                                            </span>
                                        </div>
                                    ))}
                                </>
                            );
                        })()}
                    </div>
                )}

                {/* Selected Player Details Card */}
                {player && (
                    <div className="mt-8 bg-gray-50 border border-gray-205 rounded-2xl p-6 animate-slide-up max-w-2xl mx-auto relative">
                        <button 
                            onClick={() => setPlayer(null)}
                            className="absolute top-4 right-4 text-xs font-bold text-gray-400 hover:text-red-600 transition-colors"
                        >
                            &times; Cerrar Ficha
                        </button>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <img
                                src={player.foto_url || (player.ci ? `https://flwrkxufkknrqbdlkvvp.supabase.co/storage/v1/object/public/fotos_jugadores/${player.ci.toString().trim()}.jpg` : '') || 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(player.nombres)}
                                alt={player.nombres}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(player.nombres);
                                }}
                                className="w-28 h-28 rounded-full border-4 border-white bg-white shadow-md object-cover flex-shrink-0"
                            />
                            <div className="text-center sm:text-left flex-1">
                                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                                    <span className="bg-green-100 text-green-800 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                        Registro Oficial Habilitado
                                    </span>
                                </div>
                                <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">{player.nombres} {player.apellidos}</h3>
                                <div className="text-gray-600 font-semibold mt-2 flex flex-col sm:flex-row sm:gap-4 justify-center sm:justify-start text-sm">
                                    <span>C.I. <strong className="text-gray-900">{player.ci}</strong></span>
                                    <span>Nacimiento: <strong className="text-gray-900">{player.fecha_nacimiento}</strong></span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-gray-205 pt-6">
                            <h5 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
                                <Trophy size={16} className="text-green-600" />
                                Trayectoria Histórica
                            </h5>
                            {player.historial_participacion && player.historial_participacion.length > 0 ? (
                                <div className="relative pl-6 border-l border-gray-300 space-y-6">
                                    {[...player.historial_participacion].sort((a, b) => b.año - a.año).map((item, idx) => (
                                        <div key={idx} className="relative">
                                            <div className="absolute -left-[30px] top-1.5 bg-green-800 rounded-full w-4 h-4 border-2 border-white shadow-sm"></div>
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white p-3.5 rounded-xl border border-gray-205 shadow-sm">
                                                <div className="flex items-center gap-2">
                                                    {(() => {
                                                        const teamName = item.equipos ? item.equipos.nombre : 'Sin Club';
                                                        const cLogo = getLogo(teamName);
                                                        return cLogo ? (
                                                            <img src={cLogo} alt={teamName} className="w-6 h-6 object-contain" />
                                                        ) : (
                                                            <Shield className="w-4 h-4 text-green-600" />
                                                        );
                                                    })()}
                                                    <div>
                                                        <span className="font-bold text-gray-800 text-sm">{item.equipos ? item.equipos.nombre : 'Sin Club'}</span>
                                                        <span className="text-[10px] text-gray-455 ml-2 uppercase">({item.categoria_jugador})</span>
                                                    </div>
                                                </div>
                                                <span className="bg-green-700 text-white font-black text-xs px-2.5 py-1 rounded w-max">
                                                    {item.año}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-gray-400 italic">No registra participaciones anteriores.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Pestañas Paralelas Inferiores */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="flex border-b border-gray-200 bg-gray-50">
                    <button
                        onClick={() => setActiveSubTab('nomina')}
                        className={`flex-1 py-4 md:py-5 text-center font-extrabold border-b-2 text-sm sm:text-base md:text-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
                            activeSubTab === 'nomina'
                                ? 'border-green-700 text-green-700 bg-white'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
                        }`}
                    >
                        <Users size={18} className="flex-shrink-0" />
                        <span>Nómina de Jugadores</span>
                    </button>
                    <button
                        onClick={() => setActiveSubTab('fixture')}
                        className={`flex-1 py-4 md:py-5 text-center font-extrabold border-b-2 text-sm sm:text-base md:text-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
                            activeSubTab === 'fixture'
                                ? 'border-green-700 text-green-700 bg-white'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
                        }`}
                    >
                        <Calendar size={18} className="flex-shrink-0" />
                        <span>Fixture {delegateInfo.nombreEquipo}</span>
                    </button>
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                    {activeSubTab === 'nomina' ? (
                        /* PESTAÑA: NÓMINA DE JUGADORES */
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-4 flex-wrap gap-3">
                                <div>
                                    <h4 className="text-lg sm:text-xl font-bold text-gray-900">Nómina Oficial Habilitada - Gestión 2026</h4>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                        Jugadores registrados oficialmente en la base de datos de la liga para este club durante la gestión 2026.
                                    </p>
                                </div>
                                <button
                                    onClick={fetchNomina}
                                    className="text-xs font-bold text-green-700 hover:text-green-800 hover:underline flex items-center gap-1"
                                >
                                    Refrescar Plantilla
                                </button>
                            </div>

                            {loadingNomina ? (
                                <div className="py-16 flex flex-col items-center justify-center">
                                    <div className="w-10 h-10 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-gray-550 text-sm mt-3 font-semibold">Cargando nómina...</p>
                                </div>
                            ) : nominaError ? (
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-center justify-between">
                                    <p className="text-sm text-red-750 font-medium">{nominaError}</p>
                                    <button onClick={fetchNomina} className="text-xs font-black text-red-800 hover:underline">Reintentar</button>
                                </div>
                            ) : nomina.length === 0 ? (
                                <div className="text-center py-16 bg-gray-50 border border-dashed border-gray-300 rounded-2xl">
                                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <h5 className="font-bold text-gray-700 mb-1">Sin Registros</h5>
                                    <p className="text-gray-400 text-xs">No hay jugadores inscritos en la nómina 2026 de su club.</p>
                                </div>
                            ) : (
                                <div className="bg-white border border-gray-205 rounded-2xl overflow-hidden shadow-md max-w-7xl mx-auto my-4">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 align-middle">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Foto</th>
                                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Jugador</th>
                                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">C.I.</th>
                                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha Nac.</th>
                                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Categoría</th>
                                                    <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-100">
                                                {[...nomina].sort((a, b) => a.nombres.localeCompare(b.nombres)).map((j, index) => {
                                                    const playerPhoto = j.foto_url || (j.ci ? `https://flwrkxufkknrqbdlkvvp.supabase.co/storage/v1/object/public/fotos_jugadores/${j.ci.toString().trim()}.jpg` : '');
                                                    return (
                                                        <tr key={index} className="hover:bg-green-50/40 transition-colors duration-150">
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <img 
                                                                    src={playerPhoto || 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(j.nombres)}
                                                                    alt={j.nombres}
                                                                    onError={(e) => {
                                                                        e.target.onerror = null;
                                                                        e.target.src = 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(j.nombres);
                                                                    }}
                                                                    className="w-12 h-12 rounded-full border border-green-700 bg-gray-50 object-cover shadow-sm"
                                                                />
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="font-extrabold text-gray-900 text-sm">
                                                                    {j.nombres} {j.apellidos}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className="font-bold text-gray-800 text-sm">{j.ci}</span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className="text-gray-700 text-sm">{j.fecha_nacimiento}</span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                                    j.categoria_jugador === 'refuerzo'
                                                                        ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                                                        : j.categoria_jugador === 'juvenil'
                                                                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                                                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                                                }`}>
                                                                    {j.categoria_jugador}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                                <button
                                                                    onClick={() => handleOpenEdit(j)}
                                                                    className="inline-flex items-center gap-1.5 bg-gray-55 border border-gray-205 hover:bg-green-50 hover:border-green-450 hover:text-green-750 py-1.5 px-3 rounded-xl transition-all shadow-sm text-xs font-bold text-gray-600"
                                                                    title="Editar Datos"
                                                                >
                                                                    <Edit2 size={12} />
                                                                    <span>Editar</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* PESTAÑA: FIXTURE DEL EQUIPO */
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-4 flex-wrap gap-2">
                                <h4 className="text-lg sm:text-xl font-bold text-gray-900">Fixture de Partidos - Temporada 2026</h4>
                                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
                                    Categoría Honor
                                </span>
                            </div>
                            
                            <div className="grid gap-4">
                                {jyanaFixtureData.map((partido, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 border border-gray-205 rounded-xl p-4 sm:p-5 hover:shadow-md transition-shadow flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6"
                                    >
                                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 flex-1 w-full">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider text-center w-20 sm:w-24 flex-shrink-0 ${
                                                partido.condicion === 'Local' 
                                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                                                    : 'bg-indigo-100 text-indigo-805 border border-indigo-200'
                                            }`}>
                                                {partido.condicion}
                                            </span>

                                            <div className="flex items-center justify-center gap-2 xs:gap-4 flex-1 w-full sm:w-auto">
                                                <div className="flex items-center gap-1.5 xs:gap-2 justify-end text-right w-24 xs:w-28 sm:w-36">
                                                    <span className="font-extrabold text-gray-800 text-xs xs:text-sm md:text-base truncate">{delegateInfo.nombreEquipo}</span>
                                                    {(() => {
                                                        const logo = getLogo(delegateInfo.nombreEquipo);
                                                        return logo ? (
                                                            <img src={logo} alt={delegateInfo.nombreEquipo} className="w-8 h-8 xs:w-10 xs:h-10 object-contain flex-shrink-0" />
                                                        ) : (
                                                            <Shield className="w-8 h-8 text-green-700 flex-shrink-0" />
                                                        );
                                                    })()}
                                                </div>
                                                <span className="font-black text-gray-300 text-xs xs:text-sm">VS</span>
                                                <div className="flex items-center gap-1.5 xs:gap-2 justify-start text-left w-24 xs:w-28 sm:w-36">
                                                    {getLogo(partido.rival) ? (
                                                        <img src={getLogo(partido.rival)} alt={partido.rival} className="w-8 h-8 xs:w-10 xs:h-10 object-contain flex-shrink-0" />
                                                    ) : (
                                                        <Shield className="w-8 h-8 text-green-700 flex-shrink-0" />
                                                    )}
                                                    <span className="font-extrabold text-gray-800 text-xs xs:text-sm md:text-base truncate">{partido.rival}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 w-full md:w-auto text-xs sm:text-sm text-gray-600 border-t md:border-t-0 pt-3 md:pt-0">
                                            <div className="flex items-center gap-1.5 font-medium">
                                                <Calendar className="w-4 h-4 text-green-600 flex-shrink-0" />
                                                <span>{partido.fecha}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 font-bold text-gray-800">
                                                <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
                                                <span>{partido.hora}</span>
                                            </div>
                                            <span className={`px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                                                partido.cancha === 'Stadium Vinto'
                                                    ? 'bg-amber-100 text-amber-805 border border-amber-200'
                                                    : 'bg-teal-100 text-teal-800 border border-teal-200'
                                            }`}>
                                                {partido.cancha}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL DE EDICIÓN DE JUGADOR */}
            {editingPlayer && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-w-md w-full transform transition-all duration-300 animate-slide-up">
                        <div className="bg-green-800 text-white px-6 py-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold">Modificar Jugador</h3>
                            <button 
                                onClick={() => !savingEdit && setEditingPlayer(null)}
                                className="text-white/80 hover:text-white transition-colors"
                                disabled={savingEdit}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveEdit} className="p-6 space-y-5">
                            {editError && (
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-2 animate-fade-in">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-red-700 font-medium">{editError}</p>
                                </div>
                            )}

                            {successMessage && (
                                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg flex items-start gap-2 animate-fade-in">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-emerald-700 font-medium">{successMessage}</p>
                                </div>
                            )}

                            <div className="flex flex-col items-center justify-center gap-2">
                                <div className="relative group w-24 h-24 rounded-full overflow-hidden border-2 border-green-700 bg-gray-50 shadow-md">
                                    <img 
                                        src={photoPreview || (editForm.ci ? `https://flwrkxufkknrqbdlkvvp.supabase.co/storage/v1/object/public/fotos_jugadores/${editForm.ci.toString().trim()}.jpg` : '') || 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(editForm.nombres)}
                                        alt="Vista previa"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(editForm.nombres);
                                        }}
                                        className="w-full h-full object-cover"
                                    />
                                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[10px] font-bold cursor-pointer transition-opacity">
                                        <Upload size={16} className="mb-1" />
                                        <span>Nueva Foto</span>
                                        <input 
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handlePhotoChange}
                                            disabled={savingEdit}
                                        />
                                    </label>
                                </div>
                                <span className="text-[9px] text-gray-400">Reemplaza con el nombre del C.I.</span>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-705 mb-1">Nombres</label>
                                    <input 
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                        value={editForm.nombres}
                                        onChange={(e) => setEditForm({ ...editForm, nombres: e.target.value })}
                                        disabled={savingEdit}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-705 mb-1">Apellidos</label>
                                    <input 
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                        value={editForm.apellidos}
                                        onChange={(e) => setEditForm({ ...editForm, apellidos: e.target.value })}
                                        disabled={savingEdit}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-705 mb-1">Fecha de Nacimiento</label>
                                    <input 
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                        value={editForm.fecha_nacimiento}
                                        onChange={(e) => setEditForm({ ...editForm, fecha_nacimiento: e.target.value })}
                                        disabled={savingEdit}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-705 mb-1">Número de Carnet (C.I.)</label>
                                    <input 
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all font-semibold"
                                        value={editForm.ci}
                                        onChange={(e) => setEditForm({ ...editForm, ci: e.target.value })}
                                        disabled={savingEdit}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Categoría (Solo Lectura)</label>
                                    <input 
                                        type="text"
                                        className="w-full px-3 py-2 bg-gray-100 border border-gray-250 rounded-lg text-sm text-gray-500 font-bold uppercase cursor-not-allowed"
                                        value={editForm.categoria_jugador}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setEditingPlayer(null)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    disabled={savingEdit}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-green-750 hover:bg-green-800 text-white rounded-lg text-sm font-bold shadow transition-colors flex items-center justify-center disabled:bg-gray-400"
                                    disabled={savingEdit}
                                >
                                    {savingEdit ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Guardando...</span>
                                        </div>
                                    ) : (
                                        <span>Guardar Cambios</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const Contacto = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in font-sans">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-green-500 pb-2 inline-block font-sans">
            Contacto
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
            <div>
                <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <MapPin className="w-6 h-6 text-green-600 mt-1 mr-4" />
                            <div>
                                <h4 className="font-bold text-gray-800">Dirección</h4>
                                <p className="text-gray-600">Av. Principal s/n, Plaza Principal de Vinto<br />Cochabamba, Bolivia</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Phone className="w-6 h-6 text-green-600 mt-1 mr-4" />
                            <div>
                                <h4 className="font-bold text-gray-800">Teléfono</h4>
                                <p className="text-gray-600">+591 4 444-1234</p>
                                <p className="text-gray-600">+591 777-88899 (WhatsApp)</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Mail className="w-6 h-6 text-green-600 mt-1 mr-4" />
                            <div>
                                <h4 className="font-bold text-gray-800">Email</h4>
                                <p className="text-gray-600">contacto@ligavinto.com</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Clock className="w-6 h-6 text-green-600 mt-1 mr-4" />
                            <div>
                                <h4 className="font-bold text-gray-800">Horario de Atención</h4>
                                <p className="text-gray-600">Lunes a Viernes: 08:00 - 16:00</p>
                                <p className="text-gray-600">Sábados: 09:00 - 12:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-full min-h-[400px] bg-gray-200 rounded-xl overflow-hidden shadow-lg relative">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                    <div className="text-center p-6">
                        <MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <p className="text-xl font-bold text-gray-600">Mapa de Ubicación</p>
                        <p className="text-gray-505">(Integración con Google Maps)</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Footer = () => (
    <footer className="bg-gray-900 text-white py-12 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-2xl font-bold mb-4 flex flex-col">
                        <span className="uppercase tracking-wide text-gray-300 text-sm">Liga de Fútbol</span>
                        <span className="text-5xl text-green-500 font-black tracking-tighter -mt-1">VINTO</span>
                    </h3>
                    <p className="text-gray-400">
                        Promoviendo el fútbol y los valores deportivos en nuestra comunidad desde 1985.
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-4">Enlaces Rápidos</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">Reglamento</a></li>
                        <li><a href="#" className="hover:text-white">Noticias</a></li>
                        <li><a href="#" className="hover:text-white">Galería</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-4">Síguenos</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                            <span className="sr-only">Facebook</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                        <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                            <span className="sr-only">Instagram</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-550 text-sm">
                © 2026 Liga de Fútbol Vinto. Todos los derechos reservados.
            </div>
        </div>
    </footer>
);

const App = () => {
    const [activeTab, setActiveTab] = useState('inicio');
    const [selectedClub, setSelectedClub] = useState(null);
    const [session, setSession] = useState(null);
    const [delegateInfo, setDelegateInfo] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) {
                fetchDelegateInfo(session.user.id);
            } else {
                setLoadingAuth(false);
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            if (session) {
                await fetchDelegateInfo(session.user.id);
            } else {
                setDelegateInfo(null);
                setLoadingAuth(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchDelegateInfo = async (userId) => {
        setLoadingAuth(true);
        try {
            const { data: delegado, error: delError } = await supabase
                .from('delegados')
                .select('equipo_id, nombre_completo, username')
                .eq('user_id', userId)
                .single();

            if (delError || !delegado) {
                console.error("Error fetching delegate info:", delError);
                await supabase.auth.signOut();
                setSession(null);
                setDelegateInfo(null);
            } else {
                // Fetch team name
                const { data: equipo, error: eqError } = await supabase
                    .from('equipos')
                    .select('nombre')
                    .eq('id', delegado.equipo_id)
                    .single();

                setDelegateInfo({
                    ...delegado,
                    nombreEquipo: equipo ? equipo.nombre : 'Mi Equipo'
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingAuth(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
        setDelegateInfo(null);
    };

    const renderContent = () => {
        if (selectedClub) {
            if (selectedClub === 'J Yana') {
                return <ClubJYana onBack={() => setSelectedClub(null)} />;
            }
            // Fallback for other clubs if we add them later
            return <Clubes onClubClick={setSelectedClub} />;
        }

        switch (activeTab) {
            case 'inicio': return <Inicio />;
            case 'clubes': return <Clubes onClubClick={setSelectedClub} />;
            case 'fixture': return <Fixture />;
            case 'tabla': return <TablaPosiciones />;
            case 'institucional': return <Institucional />;
            case 'panel-equipo': 
                if (loadingAuth) {
                    return (
                        <div className="max-w-md mx-auto py-32 flex flex-col items-center justify-center font-sans">
                            <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-500 mt-4 font-semibold">Verificando credenciales...</p>
                        </div>
                    );
                }
                return session && delegateInfo ? (
                    <PanelEquipo delegateInfo={delegateInfo} onLogout={handleLogout} />
                ) : (
                    <LoginPanel onLoginSuccess={(sess, info) => {
                        setSession(sess);
                        setDelegateInfo(info);
                    }} />
                );
            case 'contacto': return <Contacto />;
            default: return <Inicio />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col justify-between">
            <div className="flex-grow">
                <Navbar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setSelectedClub(null); }} />
                <main className="pb-20">
                    {renderContent()}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default App;
