function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.querySelector('.basket-sos-table');
    
        const itemsContainer = document.createElement('div');
        
        cart.forEach(item => {
            const itemElement = createCartItemElement(item);
            itemsContainer.appendChild(itemElement);
        });
        
        container.insertBefore(itemsContainer, container.querySelector('.finalcost'));
    
    updateOrderSummary();
}

function createCartItemElement(item) {
    const itemElement = document.createElement('div');
    itemElement.className = 'pizza-block';
    itemElement.dataset.itemId = item.cartItemId;
    itemElement.innerHTML = `
        <img class="pizza-img" src="${item.image}" alt="${item.name}">
        <div class="pizza-txt">
            <div class="pizzatxt3">
                <h3>${item.name}</h3>
            </div>
        </div>
        <div class="buttons1">
            <button class="decrease-btn">-</button>
            <p class="item-quantity">${item.quantity}</p>
            <button class="increase-btn">+</button>
        </div>
        <div class="sale-cost-txt">
            <p>Цена: <span>${item.price}</span></p>
        </div>
        <button class="krestik remove-btn"><img src="assets/Vector.png" alt=""></button>
    `;

    itemElement.querySelector('.decrease-btn').addEventListener('click', () => {
        updateQuantity(item.cartItemId, -1, itemElement);
    });
    
    itemElement.querySelector('.increase-btn').addEventListener('click', () => {
        updateQuantity(item.cartItemId, 1, itemElement);
    });
    
    itemElement.querySelector('.remove-btn').addEventListener('click', () => {
        removeItem(item.cartItemId);
        itemElement.remove();
    });

    return itemElement;
}

function calculateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(' руб.', ''));
        return sum + (price * item.quantity);
    }, 0);
}

function updateQuantity(itemId, change, itemElement) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.cartItemId === itemId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
            itemElement.remove();
        } else {
            itemElement.querySelector('.item-quantity').textContent = cart[itemIndex].quantity;
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateOrderSummary();
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCounter = document.querySelector('.cart-counter');
    if (cartCounter) {
        cartCounter.textContent = totalItems;
    }
}

function removeItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.cartItemId !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateOrderSummary();
}

function updateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = calculateTotal();
    const deliveryCost = cart.length > 0 ? 400 : 0; 
    
    document.querySelector('.product-cost:nth-child(2) p:last-child').textContent = `${total} руб`;
    document.querySelector('.k-oplate-cost').textContent = `${total + deliveryCost} руб`;
    document.querySelector('.finalcost .costs p:first-child').textContent = `${total} руб.`;
    document.querySelector('.final-cost-w-delivery-section h3').textContent = `${total + deliveryCost} руб.`;
    document.querySelector('.product-cost:nth-child(4) p:last-child').textContent = `${deliveryCost} руб`;
}

document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    
    document.querySelector('.place-an-order-btn')?.addEventListener('click', () => {
    });
    
    document.querySelector('.place-an-order-btn-main')?.addEventListener('click', () => {
    });
    
    document.querySelector('.promo-textarea-apply-btn')?.addEventListener('click', applyPromoCode);
});

function applyPromoCode() {
    alert('Промокод применен!');
    updateOrderSummary();
}

function updateCartTotals() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const productsTotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(' руб.', ''));
        return sum + (price * item.quantity);
    }, 0);
    
    const deliveryCost = cart.length > 0 ? 400 : 0;

    document.getElementById('total-without-delivery').textContent = `${productsTotal} руб.`;
    document.getElementById('original-total').textContent = `${productsTotal} руб.`;
    document.getElementById('products-total').textContent = `${productsTotal} руб`;
    document.getElementById('delivery-cost').textContent = `${deliveryCost} руб`;
    document.getElementById('total-to-pay').textContent = `${productsTotal + deliveryCost} руб`;
    document.getElementById('final-total-with-delivery').textContent = `${productsTotal + deliveryCost} руб.`;
}

function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartTotals();
    updateCartCount();
    
    document.querySelectorAll('.increase-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.closest('.pizza-block').dataset.itemId;
            changeQuantity(itemId, 1);
        });
    });
    
    document.querySelectorAll('.decrease-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.closest('.pizza-block').dataset.itemId;
            changeQuantity(itemId, -1);
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.closest('.pizza-block').dataset.itemId;
            removeItem(itemId);
            this.closest('.pizza-block').remove();
        });
    });
});