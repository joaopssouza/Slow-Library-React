import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ContentWrapper from './components/ContentWrapper';
import Footer from './components/Footer';

// Layout Componente (Define a estrutura e o toggle)
const Layout = ({ isToggled, activeSection, onSectionChange, onToggleSidebar }) => {
    return (
        // Aplica a classe 'toggled' se o estado for verdadeiro
        <div className={`d-flex ${isToggled ? 'toggled' : ''}`} id="wrapper">
            <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />
            <div id="page-content-wrapper">
                <Navbar onToggleSidebar={onToggleSidebar} />
                <ContentWrapper activeSection={activeSection} />
            </div>
        </div>
    );
};

// App Componente (Gerencia o estado global de navegação e sidebar)
const App = () => {
    // Estado para controlar se a sidebar está recolhida/aberta
    const [isToggled, setIsToggled] = useState(false);
    // Estado para controlar a seção ativa (simula o roteamento estático)
    const [activeSection, setActiveSection] = useState('dashboard');

    // Lógica do Toggle da Sidebar
    const handleToggleSidebar = () => {
        setIsToggled(prev => !prev);
    };

    // Lógica de Mudança de Seção (Roteamento Estático)
    const handleSectionChange = (section) => {
        setActiveSection(section);
        // Oculta a sidebar em mobile ao selecionar uma seção
        if (window.innerWidth < 768) {
            setIsToggled(false);
        }
    };

    return (
        <>
            <Layout 
                isToggled={isToggled}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                onToggleSidebar={handleToggleSidebar}
            />
            <Footer />
        </>
    );
};

export default App;