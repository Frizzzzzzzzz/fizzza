async function loadPizzas() {
    try {
        const response = await fetch('/all-food');
        const data = await response.json();
        const pizzas = data.pizzas;
        const pizzaCardsContainer = document.getElementById('pizza-cards');
        pizzaCardsContainer.innerHTML = '';
        pizzas.forEach(pizza => {
            const pizzaCard = createFoodCard(pizza);
            pizzaCardsContainer.appendChild(pizzaCard);
        });
    } catch (error) {
        console.error('Ошибка при загрузке пиц:', error);
    }
}

async function loadSalads() {
    try {
        const response = await fetch('/all-food');
        const data = await response.json();
        const salads = data.salads;
        const saladCardsContainer = document.getElementById('salad-cards');
        saladCardsContainer.innerHTML = '';
        salads.forEach(salad => {
            const saladCard = createFoodCard(salad);
            saladCardsContainer.appendChild(saladCard);
        });
    } catch (error) {
        console.error('Ошибка при загрузке салатов:', error);
    }
}

async function loadSnacks() {
    try {
        const response = await fetch('/all-food');
        const data = await response.json();
        const snacks = data.snacks;
        const snackCardsContainer = document.getElementById('snack-cards');
        snackCardsContainer.innerHTML = '';
        snacks.forEach(snack => {
            const snackCard = createFoodCard(snack);
            snackCardsContainer.appendChild(snackCard);
        });
    } catch (error) {
        console.error('Ошибка при загрузке снэков:', error);
    }
}

async function loadBurgers() {
    try {
        const response = await fetch('/all-food');
        const data = await response.json();
        const burgers = data.burgers;
        const burgerCardsContainer = document.getElementById('burger-cards');
        burgerCardsContainer.innerHTML = '';
        burgers.forEach(burger => {
            const burgerCard = createFoodCard(burger);
            burgerCardsContainer.appendChild(burgerCard);
        });
    } catch (error) {
        console.error('Ошибка при загрузке бургеров:', error);
    }
}

async function loadDrinks() {
    try {
        const response = await fetch('/all-food');
        const data = await response.json();
        const drinks = data.drinks;
        const drinkCardsContainer = document.getElementById('drink-cards');
        drinkCardsContainer.innerHTML = '';
        drinks.forEach(drink => {
            const drinkCard = createFoodCard(drink);
            drinkCardsContainer.appendChild(drinkCard);
        });
    } catch (error) {
        console.error('Ошибка при загрузке напитков:', error);
    }
}

function createStars(orange, white) {
    const starsContainer = document.createElement('div');

    for (let i = 0; i < orange; i++) {
        const star = document.createElement('img');
        star.src = '../assets/starOrange.png';
        star.className = 'star';
        starsContainer.appendChild(star);
    }


    for (let i = 0; i < white; i++) {
        const star = document.createElement('img');
        star.src = '../assets/starWhite.png';
        star.className = 'star';
        starsContainer.appendChild(star);
    }
    return starsContainer;
}

function createFoodCard(item) {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.innerHTML = `
        <img class="food-image" src="${item.image}" alt="${item.name}">
        <div class="food-card-block">
            <p>${item.name}</p>
            <div class="stars">${createStars(Math.floor(item.rating), 5 - Math.floor(item.rating)).outerHTML}</div>
            <div class="cost">
                <p>${item.price}</p>
                <img class="plus" src="assets/Add to cart Icon.png" alt="">
            </div>
        </div>
    `;
    return card;
}

function showSection(sectionId) {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = '';
    switch (sectionId) {
        case 'pizza-container':
            contentContainer.innerHTML = `
                <div class="pizzas-cards" id="pizza-cards"></div>
            `;
            loadPizzas();
            break;
        case 'salad-container':
            contentContainer.innerHTML = `
                <div class="pizzas-cards" id="salad-cards"></div>
            `;
            loadSalads();
            break;
        case 'snack-container':
            contentContainer.innerHTML = `
                <div class="pizzas-cards" id="snack-cards"></div>
            `;
            loadSnacks();
            break;
        case 'burger-container':
            contentContainer.innerHTML = `
                <div class="pizzas-cards" id="burger-cards"></div>
            `;
            loadBurgers();
            break;
        case 'drink-container':
            contentContainer.innerHTML = `
                <div class="pizzas-cards" id="drink-cards"></div>
            `;
            loadDrinks();
            break;
        default:
            contentContainer.innerHTML = '<p>Выберите категорию.</p>';
    }
}

window.onload = function() {
    showSection('pizza-container');
};