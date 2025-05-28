/**
 * PetSync - Script de Integração de Menu
 * Este script adiciona links para as novas páginas no menu de navegação
 * sem modificar o HTML original.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Função para atualizar os links do menu
    function updateNavigationLinks() {
        // Encontra todos os links de navegação
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const linkText = link.textContent.trim().toLowerCase();
            
            // Atualiza link da Galeria
            if (linkText === 'galeria') {
                link.href = 'galeria.html';
            }
            
            // Atualiza link de Início
            if (linkText === 'início') {
                link.href = 'index.html';
            }
            
            // Atualiza links de Serviços e Produtos para usar âncoras
            if (linkText === 'serviços') {
                link.href = '#servicos';
            }
            
            if (linkText === 'produtos') {
                link.href = '#produtos';
            }
            
            // Atualiza link de Contato
            if (linkText === 'contato') {
                link.href = '#contato';
            }
        });
    }

    // Função para adicionar ID às seções principais se não existirem
    function addSectionIds() {
        // Encontra a seção de serviços
        const serviceSections = document.querySelectorAll('h2');
        serviceSections.forEach(section => {
            if (section.textContent.includes('Nossos Serviços') && !section.parentElement.id) {
                let parent = section.parentElement;
                while (parent && parent.tagName !== 'SECTION') {
                    parent = parent.parentElement;
                }
                if (parent && !parent.id) {
                    parent.id = 'servicos';
                }
            }
        });

        // Encontra a seção de produtos
        const productSections = document.querySelectorAll('h2');
        productSections.forEach(section => {
            if (section.textContent.includes('Produtos Populares') && !section.parentElement.id) {
                let parent = section.parentElement;
                while (parent && parent.tagName !== 'SECTION') {
                    parent = parent.parentElement;
                }
                if (parent && !parent.id) {
                    parent.id = 'produtos';
                }
            }
        });
        
        // Encontra a seção de contato (footer)
        const footer = document.querySelector('footer');
        if (footer && !footer.id) {
            footer.id = 'contato';
        }
    }

    // Função para adicionar link de agendamento ao botão existente
    function setupBookingButton() {
        // Procura por botões ou links com texto "Agendar Visita"
        const bookingButtons = document.querySelectorAll('a, button');
        bookingButtons.forEach(button => {
            if (button.textContent.includes('Agendar Visita')) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Redireciona para a página de agendamento
                    window.location.href = 'agendamento.html';
                });
            }
        });
    }

    // Inicializa as funcionalidades
    addSectionIds();
    updateNavigationLinks();
    setupBookingButton();
});
