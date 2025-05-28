/**
 * PetSync - Script de Navegação Suave
 * Este script adiciona rolagem suave aos links internos e botões do site
 * sem modificar o HTML original.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Função para rolagem suave
    function scrollToElement(element, duration = 1000) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Função de easing para suavizar a rolagem
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Adiciona evento de clique a todos os links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                scrollToElement(targetElement);
            }
        });
    });

    // Adiciona navegação para botões específicos
    function setupSpecificButtons() {
        // Botão "Ver Todos os Produtos"
        const productButtons = document.querySelectorAll('a, button');
        productButtons.forEach(button => {
            if (button.textContent.includes('Ver Todos os Produtos')) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const productsSection = document.querySelector('#produtos');
                    if (productsSection) {
                        scrollToElement(productsSection);
                    }
                });
            }
        });

        // Botão "Nossos Serviços"
        const serviceButtons = document.querySelectorAll('a, button');
        serviceButtons.forEach(button => {
            if (button.textContent.includes('Nossos Serviços')) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const servicesSection = document.querySelector('#servicos');
                    if (servicesSection) {
                        scrollToElement(servicesSection);
                    }
                });
            }
        });

        // Botão "Agendar Visita"
        const bookingButtons = document.querySelectorAll('a, button');
        bookingButtons.forEach(button => {
            if (button.textContent.includes('Agendar Visita')) {
                button.addEventListener('click', function(e) {
                    // Redireciona para a página de agendamento
                    window.location.href = 'agendamento.html';
                });
            }
        });
    }

    // Adiciona IDs às seções principais se não existirem
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
    }

    // Adiciona links para as novas páginas no menu de navegação
    function enhanceNavigation() {
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            // Atualiza link da Galeria
            if (link.textContent.includes('Galeria')) {
                link.href = 'galeria.html';
            }
            
            // Atualiza link de Início
            if (link.textContent.includes('Início')) {
                link.href = 'index.html';
            }
        });
    }

    // Inicializa as funcionalidades
    addSectionIds();
    setupSpecificButtons();
    enhanceNavigation();
});
