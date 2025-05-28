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

    const contatoHeading = Array.from(document.querySelectorAll('h2, h3, h4')).find(el =>
    el.textContent.trim().toLowerCase().includes('entre em contato')
        );

        if (contatoHeading) {
            const contatoSection = contatoHeading.closest('section');
            if (contatoSection) contatoSection.id = 'contato'; // opcional, só se quiser mudar o ID
        }

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
            link.href = 'produtos.html';
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
    
    // Atualizar menu de navegação baseado no status de login
    updateNavigation();
    
    // Adicionar contador do carrinho ao menu
    addCartCounter();
});

// Função para verificar se o usuário está logado
function isLoggedIn() {
    return localStorage.getItem('petsync_current_user') !== null;
}

// Função para fazer logout
function logout() {
    localStorage.removeItem('petsync_current_user');
    updateNavigation();
    
    // Mostrar notificação se a função existir
    if (typeof showNotification === 'function') {
        showNotification('Logout realizado com sucesso!', 'success');
    }
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Função para verificar se o usuário é administrador
function requireAdmin() {
    const currentUser = JSON.parse(localStorage.getItem('petsync_current_user'));
    return currentUser && currentUser.role === 'admin';
}

// Função para atualizar a navegação baseada no status de login
function updateNavigation() {
    const isUserLoggedIn = isLoggedIn();
    const currentUser = isUserLoggedIn ? JSON.parse(localStorage.getItem('petsync_current_user')) : null;
    
    // Selecionar todos os links de login/perfil no menu desktop e mobile
    const desktopNav = document.querySelector('.hidden.md\\:flex.space-x-6, .hidden.md\\:flex.space-x-8');
    const mobileNav = document.getElementById('mobile-menu');
    
    if (desktopNav) {
        // Procurar link de login no menu desktop
        let loginLink = Array.from(desktopNav.children).find(link => 
            link.href && (link.href.includes('login.html') || link.href.includes('perfil.html') || link.textContent.includes('Entrar') || link.textContent.includes('Meu Perfil'))
        );
        
        // Se não existir, criar um
        if (!loginLink) {
            loginLink = document.createElement('a');
            loginLink.className = 'text-petGray hover:text-petBlue font-medium';
            desktopNav.appendChild(loginLink);
        }
        
        // Atualizar link baseado no status de login
        if (isUserLoggedIn) {
            loginLink.href = 'perfil.html';
            loginLink.textContent = 'Meu Perfil';
        } else {
            loginLink.href = 'login.html';
            loginLink.textContent = 'Entrar';
        }
    }
    
    if (mobileNav) {
        // Procurar link de login no menu mobile
        let mobileLoginLink = Array.from(mobileNav.children).find(link => 
            link.href && (link.href.includes('login.html') || link.href.includes('perfil.html') || link.textContent.includes('Entrar') || link.textContent.includes('Meu Perfil'))
        );
        
        // Se não existir, criar um
        if (!mobileLoginLink) {
            mobileLoginLink = document.createElement('a');
            mobileLoginLink.className = 'block py-2 text-petGray hover:text-petBlue font-medium';
            mobileNav.appendChild(mobileLoginLink);
        }
        
        // Atualizar link baseado no status de login
        if (isUserLoggedIn) {
            mobileLoginLink.href = 'perfil.html';
            mobileLoginLink.textContent = 'Meu Perfil';
        } else {
            mobileLoginLink.href = 'login.html';
            mobileLoginLink.textContent = 'Entrar';
        }
    }
    
    // Se for admin, adicionar link para o painel admin (se estiver na página de perfil)
    const adminLink = document.getElementById('admin-link');
    if (adminLink && currentUser && currentUser.role === 'admin') {
        adminLink.classList.remove('hidden');
    }
}

// Função para adicionar contador do carrinho ao menu
function addCartCounter(forceCount = null) {
    // Verificar se o carrinho existe no localStorage
    if (!localStorage.getItem('petsync_cart')) {
        localStorage.setItem('petsync_cart', JSON.stringify([]));
    }
    
    // Obter carrinho atual
    const cart = JSON.parse(localStorage.getItem('petsync_cart')) || [];
    const itemCount = forceCount !== null ? forceCount : cart.reduce((total, item) => total + item.quantity, 0);
    
    // Verificar se estamos na página do carrinho
    const isCartPage = window.location.pathname.includes('carrinho.html');
    
    // Se estiver na página do carrinho, não mostrar o botão do carrinho
    if (isCartPage) {
        return;
    }
    
    // Adicionar contador ao menu desktop
    const desktopNav = document.querySelector('.hidden.md\\:flex.space-x-6, .hidden.md\\:flex.space-x-8');
    
    if (desktopNav) {
        // Verificar se já existe um link para o carrinho
        let cartLink = Array.from(desktopNav.children).find(link => link.href && link.href.includes('carrinho.html'));
        
        if (itemCount > 0) {
            // Se não existir e tiver itens, criar um
            if (!cartLink) {
                cartLink = document.createElement('a');
                cartLink.href = 'carrinho.html';
                cartLink.className = 'text-petGray hover:text-petBlue font-medium relative';
                cartLink.innerHTML = `
                    <div class="flex items-center">
                        <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        Carrinho
                    </div>
                `;
                
                // Inserir antes do último item (login/perfil)
                desktopNav.insertBefore(cartLink, desktopNav.lastElementChild);
            }
            
            // Verificar se já existe um contador
            let existingCounter = cartLink.querySelector('#cart-counter');
            
            if (existingCounter) {
                // Atualizar contador existente
                existingCounter.textContent = itemCount;
                existingCounter.classList.remove('hidden');
            } else {
                // Adicionar novo contador
                cartLink.style.position = 'relative';
                
                const cartCounter = document.createElement('span');
                cartCounter.id = 'cart-counter';
                cartCounter.className = 'absolute -top-1 -right-1 bg-petOrange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center';
                cartCounter.textContent = itemCount;
                cartLink.appendChild(cartCounter);
            }
        } else {
            // Se não tiver itens e o link existir, remover
            if (cartLink) {
                desktopNav.removeChild(cartLink);
            }
        }
    }
    
    // Adicionar contador ao menu mobile
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenu) {
        // Verificar se já existe um link para o carrinho
        let mobileCartLink = Array.from(mobileMenu.children).find(link => link.href && link.href.includes('carrinho.html'));
        
        if (itemCount > 0) {
            // Se não existir e tiver itens, criar um
            if (!mobileCartLink) {
                mobileCartLink = document.createElement('a');
                mobileCartLink.href = 'carrinho.html';
                mobileCartLink.className = 'block py-2 text-petGray hover:text-petBlue font-medium relative';
                mobileCartLink.innerHTML = `
                    <div class="flex items-center">
                        <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        Carrinho
                    </div>
                `;
                
                // Inserir antes do último item (login/perfil)
                mobileMenu.insertBefore(mobileCartLink, mobileMenu.lastElementChild);
            }
            
            // Verificar se já existe um contador
            let existingMobileCounter = mobileCartLink.querySelector('#cart-counter-mobile');
            
            if (existingMobileCounter) {
                // Atualizar contador existente
                existingMobileCounter.textContent = itemCount;
                existingMobileCounter.classList.remove('hidden');
            } else {
                // Adicionar novo contador
                mobileCartLink.style.position = 'relative';
                
                const mobileCartCounter = document.createElement('span');
                mobileCartCounter.id = 'cart-counter-mobile';
                mobileCartCounter.className = 'absolute top-2 left-16 bg-petOrange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center';
                mobileCartCounter.textContent = itemCount;
                mobileCartLink.appendChild(mobileCartCounter);
            }
        } else {
            // Se não tiver itens e o link existir, remover
            if (mobileCartLink) {
                mobileMenu.removeChild(mobileCartLink);
            }
        }
    }
}

// Adicionar evento para verificar o status de login periodicamente
setInterval(function() {
    updateNavigation();
    addCartCounter();
}, 1000);
