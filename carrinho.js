document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o carrinho
    initCart();
    
    // Carregar itens do carrinho
    loadCartItems();
    
    // Configurar opções de entrega
    setupDeliveryOptions();
    
    // Configurar botão de checkout
    setupCheckoutButton();
    
    // Configurar notificações
    setupNotifications();
});

// Função para inicializar o carrinho
function initCart() {
    // Verificar se o carrinho já existe no localStorage
    if (!localStorage.getItem('petsync_cart')) {
        localStorage.setItem('petsync_cart', JSON.stringify([]));
    }
}

// Função para adicionar item ao carrinho
function addToCart(product, quantity = 1) {
    // Verificar se o usuário está logado
    if (!isLoggedIn()) {
        showNotification('Você precisa estar logado para adicionar produtos ao carrinho', 'error');
        setTimeout(() => {
            window.location.href = 'login.html?redirect=produtos.html';
        }, 2000);
        return;
    }
    
    // Obter carrinho atual
    const cart = JSON.parse(localStorage.getItem('petsync_cart')) || [];
    
    // Verificar se o produto já está no carrinho
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
        // Atualizar quantidade se o produto já estiver no carrinho
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Adicionar novo item ao carrinho
        cart.push({
            ...product,
            quantity
        });
    }
    
    // Salvar carrinho atualizado
    localStorage.setItem('petsync_cart', JSON.stringify(cart));
    
    // Mostrar notificação
    showNotification(`${product.name} adicionado ao carrinho!`, 'success');
    
    // Atualizar contador do carrinho (se existir)
    updateCartCounter();
}

// Função para remover item do carrinho
function removeFromCart(productId) {
    // Obter carrinho atual
    const cart = JSON.parse(localStorage.getItem('petsync_cart')) || [];
    
    // Filtrar o item a ser removido
    const updatedCart = cart.filter(item => item.id !== productId);
    
    // Salvar carrinho atualizado
    localStorage.setItem('petsync_cart', JSON.stringify(updatedCart));
    
    // Recarregar itens do carrinho
    loadCartItems();
    
    // Mostrar notificação
    showNotification('Item removido do carrinho', 'success');
    
    // Atualizar contador do carrinho
    updateCartCounter();
}

// Função para atualizar quantidade de um item no carrinho
function updateCartItemQuantity(productId, quantity) {
    // Obter carrinho atual
    const cart = JSON.parse(localStorage.getItem('petsync_cart')) || [];
    
    // Encontrar o item
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        // Atualizar quantidade
        cart[itemIndex].quantity = quantity;
        
        // Se a quantidade for 0 ou menor, remover o item
        if (quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        // Salvar carrinho atualizado
        localStorage.setItem('petsync_cart', JSON.stringify(cart));
        
        // Recarregar itens do carrinho
        loadCartItems();
        
        // Atualizar contador do carrinho
        updateCartCounter();
    }
}

// Função para carregar itens do carrinho na página
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    
    if (!cartItemsContainer || !emptyCartMessage) return;
    
    // Obter carrinho atual
    const cart = JSON.parse(localStorage.getItem('petsync_cart')) || [];
    
    // Verificar se o carrinho está vazio
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCartMessage.classList.remove('hidden');
        
        // Desabilitar botão de checkout
        const checkoutButton = document.getElementById('checkout-button');
        if (checkoutButton) {
            checkoutButton.disabled = true;
            checkoutButton.classList.add('opacity-50', 'cursor-not-allowed');
        }
        
        // Zerar valores
        updateCartTotals(0, 0);
        return;
    }
    
    // Esconder mensagem de carrinho vazio
    emptyCartMessage.classList.add('hidden');
    
    // Habilitar botão de checkout
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.disabled = false;
        checkoutButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    
    // Limpar container
    cartItemsContainer.innerHTML = '';
    
    // Variável para armazenar o subtotal
    let subtotal = 0;
    
    // Adicionar cada item ao container
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item p-6 border-b border-gray-200 flex flex-col md:flex-row items-start md:items-center';
        itemElement.innerHTML = `
            <div class="md:w-1/6 mb-4 md:mb-0">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
            </div>
            <div class="md:w-3/6 md:pl-4">
                <h3 class="font-bold text-petGray">${item.name}</h3>
                <p class="text-sm text-gray-500">${item.category}</p>
            </div>
            <div class="md:w-1/6 flex items-center mt-2 md:mt-0">
                <button class="decrease-quantity px-2 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200" data-id="${item.id}">-</button>
                <input type="number" value="${item.quantity}" min="1" class="item-quantity w-12 text-center border-t border-b border-gray-300" data-id="${item.id}">
                <button class="increase-quantity px-2 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200" data-id="${item.id}">+</button>
            </div>
            <div class="md:w-1/6 text-right mt-2 md:mt-0">
                <p class="font-bold text-petBlue">R$ ${(itemTotal).toFixed(2)}</p>
                <p class="text-sm text-gray-500">R$ ${item.price.toFixed(2)} cada</p>
            </div>
            <div class="md:w-1/12 text-right mt-2 md:mt-0">
                <button class="remove-item text-red-500 hover:text-red-700" data-id="${item.id}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        `;
        
        cartItemsContainer.appendChild(itemElement);
    });
    
    // Adicionar eventos aos botões após adicionar ao DOM
    addCartItemEvents();
    
    // Calcular frete (exemplo: R$ 10,00 fixo se subtotal < 100, grátis se >= 100)
    const shipping = subtotal >= 100 ? 0 : 10;
    
    // Atualizar totais
    updateCartTotals(subtotal, shipping);
}

// Função para adicionar eventos aos itens do carrinho
function addCartItemEvents() {
    // Botões de diminuir quantidade
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const quantityInput = document.querySelector(`.item-quantity[data-id="${productId}"]`);
            let newQuantity = parseInt(quantityInput.value) - 1;
            
            if (newQuantity < 1) newQuantity = 1;
            
            quantityInput.value = newQuantity;
            updateCartItemQuantity(productId, newQuantity);
        });
    });
    
    // Botões de aumentar quantidade
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const quantityInput = document.querySelector(`.item-quantity[data-id="${productId}"]`);
            const newQuantity = parseInt(quantityInput.value) + 1;
            
            quantityInput.value = newQuantity;
            updateCartItemQuantity(productId, newQuantity);
        });
    });
    
    // Inputs de quantidade
    document.querySelectorAll('.item-quantity').forEach(input => {
        input.addEventListener('change', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            let newQuantity = parseInt(this.value);
            
            if (isNaN(newQuantity) || newQuantity < 1) {
                newQuantity = 1;
                this.value = 1;
            }
            
            updateCartItemQuantity(productId, newQuantity);
        });
    });
    
    // Botões de remover item
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Função para atualizar os totais do carrinho
function updateCartTotals(subtotal, shipping) {
    const subtotalElement = document.getElementById('cart-subtotal');
    const shippingElement = document.getElementById('cart-shipping');
    const totalElement = document.getElementById('cart-total');
    
    if (subtotalElement && shippingElement && totalElement) {
        subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
        shippingElement.textContent = shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`;
        
        const total = subtotal + shipping;
        totalElement.textContent = `R$ ${total.toFixed(2)}`;
    }
}

// Função para configurar opções de entrega
function setupDeliveryOptions() {
    const deliveryOptions = document.querySelectorAll('.delivery-option');
    
    deliveryOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remover seleção anterior
            deliveryOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Selecionar opção clicada
            this.classList.add('selected');
            
            // Marcar radio button
            const radio = this.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });
}

// Função para configurar botão de checkout
function setupCheckoutButton() {
    const checkoutButton = document.getElementById('checkout-button');
    const confirmationModal = document.getElementById('confirmation-modal');
    const closeConfirmation = document.getElementById('close-confirmation');
    
    if (checkoutButton && confirmationModal && closeConfirmation) {
        checkoutButton.addEventListener('click', function() {
            // Verificar se uma opção de entrega foi selecionada
            const selectedDelivery = document.querySelector('input[name="delivery-option"]:checked');
            
            if (!selectedDelivery) {
                showNotification('Por favor, selecione uma opção de entrega', 'error');
                return;
            }
            
            // Obter detalhes do pedido
            const cart = JSON.parse(localStorage.getItem('petsync_cart')) || [];
            
            if (cart.length === 0) {
                showNotification('Seu carrinho está vazio', 'error');
                return;
            }
            
            // Gerar número de pedido aleatório
            const orderNumber = Math.floor(100000 + Math.random() * 900000);
            
            // Obter data atual formatada
            const orderDate = new Date().toLocaleDateString('pt-BR');
            
            // Obter total do pedido
            const subtotalElement = document.getElementById('cart-subtotal');
            const shippingElement = document.getElementById('cart-shipping');
            const totalElement = document.getElementById('cart-total');
            
            // Obter opção de entrega selecionada
            const deliveryOption = selectedDelivery.id;
            let deliveryText = '';
            
            switch (deliveryOption) {
                case 'option-address':
                    deliveryText = 'Receber no meu endereço';
                    break;
                case 'option-pet':
                    deliveryText = 'Receber junto do pet';
                    break;
                case 'option-pickup':
                    deliveryText = 'Irei buscar pessoalmente';
                    break;
            }
            
            // Preencher modal de confirmação
            document.getElementById('order-number').textContent = `#${orderNumber}`;
            document.getElementById('order-date').textContent = orderDate;
            document.getElementById('order-total').textContent = totalElement.textContent;
            document.getElementById('order-delivery').textContent = deliveryText;
            
            // Mostrar modal de confirmação
            confirmationModal.classList.remove('hidden');
            
            // Salvar pedido no histórico
            saveOrder({
                id: orderNumber,
                date: orderDate,
                total: totalElement.textContent,
                delivery: deliveryText,
                items: cart,
                status: 'Processando'
            });
            
            // Limpar carrinho
            localStorage.setItem('petsync_cart', JSON.stringify([]));
            
            // Atualizar contador do carrinho
            updateCartCounter();
        });
        
        // Fechar modal de confirmação
        closeConfirmation.addEventListener('click', function() {
            confirmationModal.classList.add('hidden');
            
            // Redirecionar para a página inicial
            window.location.href = 'index.html';
        });
    }
}

// Função para salvar pedido no histórico
function saveOrder(order) {
    // Obter histórico de pedidos atual
    const orders = JSON.parse(localStorage.getItem('petsync_orders')) || [];
    
    // Adicionar novo pedido
    orders.push(order);
    
    // Salvar histórico atualizado
    localStorage.setItem('petsync_orders', JSON.stringify(orders));
}

// Função para atualizar contador do carrinho
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('petsync_cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Atualizar contador em todas as páginas
    if (typeof addCartCounter === 'function') {
        addCartCounter(itemCount);
    }
}

// Função para configurar notificações
function setupNotifications() {
    const notification = document.getElementById('notification');
    const closeNotification = document.getElementById('close-notification');
    
    if (closeNotification) {
        closeNotification.addEventListener('click', function() {
            notification.classList.remove('show');
        });
    }
}

// Função para mostrar notificação
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
    if (notification && notificationMessage) {
        // Definir mensagem
        notificationMessage.textContent = message;
        
        // Definir tipo (success ou error)
        notification.className = `notification ${type}`;
        
        // Mostrar notificação
        notification.classList.add('show');
        
        // Esconder notificação após 5 segundos
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
}
