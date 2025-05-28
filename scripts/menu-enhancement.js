/**
 * PetSync - Script de Aprimoramento de Menu
 * Este script adiciona a opção "Galeria" ao menu e corrige a navegação
 * sem modificar o HTML original.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Função para adicionar a opção "Galeria" ao menu
    function addGalleryToMenu() {
        // Encontra o menu de navegação
        const navMenu = document.querySelector('nav .hidden.md\\:flex.space-x-8');
        
        if (navMenu) {
            // Encontra o link "Sobre" para inserir "Galeria" antes dele
            const links = navMenu.querySelectorAll('a');
            let sobreLink = null;
            let contatoLink = null;
            
            for (let i = 0; i < links.length; i++) {
                if (links[i].textContent.trim() === 'Sobre') {
                    sobreLink = links[i];
                }
                if (links[i].textContent.trim() === 'Contato') {
                    contatoLink = links[i];
                }
            }
            
            // Cria o novo link "Galeria"
            const galeriaLink = document.createElement('a');
            galeriaLink.href = 'galeria.html';
            galeriaLink.textContent = 'Galeria';
            galeriaLink.className = 'text-petGray hover:text-petBlue';
            
            // Insere "Galeria" antes de "Sobre" ou "Contato" se "Sobre" não existir
            if (sobreLink) {
                navMenu.insertBefore(galeriaLink, sobreLink);
            } else if (contatoLink) {
                navMenu.insertBefore(galeriaLink, contatoLink);
            } else {
                // Se não encontrar nenhum dos dois, adiciona ao final
                navMenu.appendChild(galeriaLink);
            }
        }
    }
    
    // Função para corrigir os links do menu
    function fixMenuNavigation() {
        // Encontra todos os links de navegação
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const linkText = link.textContent.trim();
            
            // Configura cada link baseado no texto
            switch(linkText) {
                case 'Início':
                    link.href = 'index.html';
                    break;
                case 'Serviços':
                    link.href = '#servicos';
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const servicosSection = document.querySelector('h2:contains("Nossos Serviços")');
                        if (servicosSection) {
                            let parent = servicosSection.parentElement;
                            while (parent && parent.tagName !== 'SECTION') {
                                parent = parent.parentElement;
                            }
                            if (parent) {
                                parent.id = 'servicos';
                                scrollToElement(parent);
                            }
                        }
                    });
                    break;
                case 'Produtos':
                    link.href = '#produtos';
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const produtosSection = document.querySelector('h2:contains("Produtos Populares")');
                        if (produtosSection) {
                            let parent = produtosSection.parentElement;
                            while (parent && parent.tagName !== 'SECTION') {
                                parent = parent.parentElement;
                            }
                            if (parent) {
                                parent.id = 'produtos';
                                scrollToElement(parent);
                            }
                        }
                    });
                    break;
                case 'Sobre':
                    link.href = '#sobre';
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const sobreSection = document.querySelector('footer');
                        if (sobreSection) {
                            scrollToElement(sobreSection);
                        }
                    });
                    break;
                case 'Contato':
                    link.href = '#contato';
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const contatoSection = document.querySelector('footer');
                        if (contatoSection) {
                            contatoSection.id = 'contato';
                            scrollToElement(contatoSection);
                        }
                    });
                    break;
                case 'Galeria':
                    link.href = 'galeria.html';
                    break;
            }
        });
    }
    
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
    
    // Adiciona o método :contains para seletores jQuery-like
    Element.prototype.matches = Element.prototype.matches || Element.prototype.msMatchesSelector;
    
    document.querySelectorAll = document.querySelectorAll || function(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
    };
    
    // Adiciona seletor personalizado :contains
    document.querySelector = document.querySelector || function(selector) {
        return document.querySelectorAll(selector)[0];
    };
    
    // Implementa seletor :contains
    if (!document.querySelector(':contains')) {
        // Adiciona seletor personalizado
        document.querySelectorAll = function(selector) {
            if (selector.includes(':contains')) {
                // Parse o seletor para extrair o texto
                const parts = selector.split(':contains(');
                const baseSelector = parts[0];
                const searchText = parts[1].slice(0, -1).replace(/["']/g, '');
                
                // Encontra elementos que correspondem ao seletor base
                const elements = Array.prototype.slice.call(document.querySelectorAll(baseSelector));
                
                // Filtra elementos que contêm o texto
                return elements.filter(el => el.textContent.includes(searchText));
            } else {
                // Usa o querySelectorAll padrão para outros seletores
                return Array.prototype.slice.call(document.querySelectorAll(selector));
            }
        };
    }
    
    // Função para configurar botões específicos
    function setupSpecificButtons() {
        // Botão "Ver Todos os Produtos"
        const productButtons = document.querySelectorAll('a, button');
        productButtons.forEach(button => {
            if (button.textContent.includes('Ver Todos os Prod')) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const produtosSection = document.querySelector('h2:contains("Produtos Populares")');
                    if (produtosSection) {
                        let parent = produtosSection.parentElement;
                        while (parent && parent.tagName !== 'SECTION') {
                            parent = parent.parentElement;
                        }
                        if (parent) {
                            parent.id = 'produtos';
                            scrollToElement(parent);
                        }
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
                    const servicosSection = document.querySelector('h2:contains("Nossos Serviços")');
                    if (servicosSection) {
                        let parent = servicosSection.parentElement;
                        while (parent && parent.tagName !== 'SECTION') {
                            parent = parent.parentElement;
                        }
                        if (parent) {
                            parent.id = 'servicos';
                            scrollToElement(parent);
                        }
                    }
                });
            }
        });

        // Botão "Agendar Visita"
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
    addGalleryToMenu();
    fixMenuNavigation();
    setupSpecificButtons();
});
