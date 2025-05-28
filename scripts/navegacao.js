document.addEventListener('DOMContentLoaded', function() {
    // Adiciona a opção Galeria ao menu
    const menuDesktop = document.querySelector('.hidden.md\\:flex.space-x-8');
    const menuMobile = document.getElementById('mobile-menu');
    
    if (menuDesktop) {
        // Encontra o link "Sobre" para inserir "Galeria" antes dele
        const links = menuDesktop.querySelectorAll('a');
        let sobreLink = null;
        
        for (let i = 0; i < links.length; i++) {
            if (links[i].textContent.trim() === 'Sobre') {
                sobreLink = links[i];
                break;
            }
        }
        
        // Cria o novo link "Galeria"
        const galeriaLink = document.createElement('a');
        galeriaLink.href = 'galeria.html';
        galeriaLink.textContent = 'Galeria';
        galeriaLink.className = 'text-petGray hover:text-petBlue font-medium';
        
        // Insere "Galeria" antes de "Sobre"
        if (sobreLink) {
            menuDesktop.insertBefore(galeriaLink, sobreLink);
        }
    }
    
    if (menuMobile) {
        // Encontra o link "Sobre" para inserir "Galeria" antes dele
        const links = menuMobile.querySelectorAll('a');
        let sobreLink = null;
        
        for (let i = 0; i < links.length; i++) {
            if (links[i].textContent.trim() === 'Sobre') {
                sobreLink = links[i];
                break;
            }
        }
        
        // Cria o novo link "Galeria"
        const galeriaLink = document.createElement('a');
        galeriaLink.href = 'galeria.html';
        galeriaLink.textContent = 'Galeria';
        galeriaLink.className = 'block py-2 text-petGray hover:text-petBlue font-medium';
        
        // Insere "Galeria" antes de "Sobre"
        if (sobreLink) {
            menuMobile.insertBefore(galeriaLink, sobreLink);
        }
    }
    
    // Configura navegação suave para links internos
    const configureLink = function(link, targetId) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    };
    
    // Adiciona IDs às seções importantes
        const servicosSection = document.querySelector('h2');
        if (servicosSection && servicosSection.textContent.includes('Nossos Serviços')) {
            let section = servicosSection.closest('section');
            if (section) section.id = 'servicos';
        }

        const produtosSection = document.querySelectorAll('h2')[1];
        if (produtosSection && produtosSection.textContent.includes('Produtos Populares')) {
            let section = produtosSection.closest('section');
            if (section) section.id = 'produtos';
        }

        // Adiciona ID à seção "Sobre a PetSync"
        const sobreHeadings = document.querySelectorAll('h2, h3, h4');
        for (let i = 0; i < sobreHeadings.length; i++) {
            if (sobreHeadings[i].textContent.includes('Sobre a PetSync')) {
                let section = sobreHeadings[i].closest('section');
                if (section) section.id = 'sobre';
                break;
            }
        }

        const footer = document.querySelector('footer');
        if (footer) footer.id = 'contato';
    
    // Configura links do menu
    document.querySelectorAll('nav a').forEach(link => {
    const text = link.textContent.trim();
    if (text === 'Serviços') {
        link.href = '#servicos';
        configureLink(link, 'servicos');
    } else if (text === 'Produtos') {
        link.href = '#produtos';
        configureLink(link, 'produtos');
    } else if (text === 'Contato') {
        link.href = '#contato';
        configureLink(link, 'contato');
    } else if (text === 'Sobre') {
        link.href = '#sobre';
        configureLink(link, 'sobre');
    } else if (text === 'Início') {
        link.href = 'index.html';
    }
});
    
    // Configura botões específicos
    document.querySelectorAll('a').forEach(link => {
        if (link.textContent.includes('Nossos Serviços')) {
            link.href = '#servicos';
            configureLink(link, 'servicos');
        } else if (link.textContent.includes('Ver Todos os Prod')) {
            link.href = '#produtos';
            configureLink(link, 'produtos');
        } else if (link.textContent.includes('Agendar Visita')) {
            link.href = 'agendamento.html';
        }
    });
    
    // Adiciona funcionalidade ao botão do menu mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
            }
        });
    }
});
