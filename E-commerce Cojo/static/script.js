document.addEventListener('DOMContentLoaded', function () {
    const cartButton = document.querySelector('.cart-button');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalValue = document.querySelector('.total-value');
    const totalVATValue = document.querySelector('.total-vat-value');
    const addedItems = {};
  
    cartButton.addEventListener('mouseenter', function () {
      cartDropdown.classList.add('show');
    });
  
    cartButton.addEventListener('mouseleave', function () {
      cartDropdown.classList.remove('show');
    });
  
    function updateTotal() {
      const cartItems = Object.values(addedItems);
      let totalPrice = 0;
  
      cartItems.forEach(function (item) {
        const quantity = parseInt(item.dataset.quantity);
        const price = parseInt(item.dataset.price);
        totalPrice += quantity * price;
      });
  
      totalValue.textContent = `${totalPrice} RON`;
      totalVATValue.textContent = `${totalPrice + (totalPrice * 0.19)} RON`;
    }
  
    function createCartItem(name, quantity, price, cartItemID) {
      const item = document.createElement('div');
      item.classList.add('cart-item');
      item.dataset.quantity = quantity;
      item.dataset.price = price;
      item.dataset.id = cartItemID;
  
      const itemName = document.createElement('h3');
      itemName.textContent = name;
      item.appendChild(itemName);
  
      const quantityContainer = document.createElement('div');
      quantityContainer.classList.add('item-quantity');
  
      const decreaseBtn = document.createElement('button');
      decreaseBtn.textContent = '-';
      decreaseBtn.classList.add('quantity-button');
      decreaseBtn.addEventListener('click', function () {
        if (quantity > 1) {
          quantity--;
          quantityValue.textContent = quantity;
          item.dataset.quantity = quantity;
          updateTotal();
        }
      });
  
      const quantityValue = document.createElement('span');
      quantityValue.textContent = quantity;
      quantityValue.classList.add('quantity-value');
  
      const increaseBtn = document.createElement('button');
      increaseBtn.textContent = '+';
      increaseBtn.classList.add('quantity-button');
      increaseBtn.addEventListener('click', function () {
        quantity++;
        quantityValue.textContent = quantity;
        item.dataset.quantity = quantity;
        updateTotal();
      });
  
      quantityContainer.appendChild(decreaseBtn);
      quantityContainer.appendChild(quantityValue);
      quantityContainer.appendChild(increaseBtn);
  
      item.appendChild(quantityContainer);
  
      return item;
    }
  
    function generateCartItemID() {
      return 'cart-item-' + Date.now();
    }
  
function addToCart(itemName, quantity, price) {
    var cartItemID = generateCartItemID();
  
    var existingItem = addedItems[cartItemID];
  
    if (existingItem) {
      var quantityElement = existingItem.querySelector('.quantity-value');
      var currentQuantity = parseInt(quantityElement.textContent);
      var newQuantity = currentQuantity + quantity;
      quantityElement.textContent = newQuantity;
    } else {
      cartItemsContainer.innerHTML = '';
  
      var cartItem = createCartItem(itemName, quantity, price, cartItemID);
  
      addedItems[cartItemID] = cartItem;
  
      Object.values(addedItems).forEach(function (item) {
        cartItemsContainer.appendChild(item);
      });
    }
  
    updateTotal();
  }
      
    const ospatarButton = document.getElementById('ospt');
    ospatarButton.addEventListener('click', function () {
      addToCart('Personal - Ospătar', 1, 400);
      showPopupMessage();
    });
  
    const barmanButton = document.getElementById('bar');
    barmanButton.addEventListener('click', function () {
      addToCart('Personal - Barman/Barista', 1, 500);
      showPopupMessage();
    });

    const fumButton = document.getElementById('fum');
    fumButton.addEventListener('click', function () {
      addToCart('Produs - Masină de fum', 1, 300);
      showPopupMessage();
    });

    const oglindaButton = document.getElementById('ogl');
    oglindaButton.addEventListener('click', function () {
      addToCart('Produs - Oglindă foto /4h', 1, 800);
      showPopupMessage();
    });

    const djButton = document.getElementById('dj');
    djButton.addEventListener('click', function () {
      addToCart('Personal - DJ', 1, 2000);
      showPopupMessage();
    });

    const fvButton = document.getElementById('fv');
    fvButton.addEventListener('click', function () {
      addToCart('Personal - Fotograf&Cameraman /8h', 1, 6000);
      showPopupMessage();
    });

    const MCButton = document.getElementById('MC');
    MCButton.addEventListener('click', function () {
      addToCart('Personal - MC', 1, 5000);
      showPopupMessage();
    });

    const soundButton = document.getElementById('sound');
    soundButton.addEventListener('click', function () {
      addToCart('Serviciu - Sonorizări profesionale', 1, 1500);
      showPopupMessage();
    });

    const schButton = document.getElementById('sch');
    schButton.addEventListener('click', function () {
      addToCart('Produs - Schelă lumini', 1, 1000);
      showPopupMessage();
    });

    const lumButton = document.getElementById('lum');
    lumButton.addEventListener('click', function () {
      addToCart('Produs - Lumini arhitecturale', 1, 1000);
      showPopupMessage();
    });

    const ghcButton = document.getElementById('ghc');
    ghcButton.addEventListener('click', function () {
      addToCart('Produs - Gheață carbonică', 1, 500);
      showPopupMessage();
    });

    const solButton = document.getElementById('sol');
    solButton.addEventListener('click', function () {
      addToCart('Personal - Solist/Solistă /2h', 1, 1000);
      showPopupMessage();
    });

    const karButton = document.getElementById('kar');
    karButton.addEventListener('click', function () {
      addToCart('Produs/Serviciu - Karaoke /1h', 1, 500);
      showPopupMessage();
    });

    const heliButton = document.getElementById('heli');
    heliButton.addEventListener('click', function () {
      addToCart('Produs/Serviciu - Personaje din baloane cu heliu', 1, 2000);
      showPopupMessage();
    });

    const animButton = document.getElementById('anim');
    animButton.addEventListener('click', function () {
      addToCart('Personal - Animatori/Animatoare (1h)', 1, 80);
      showPopupMessage();
    });

    const ursButton = document.getElementById('urs');
    ursButton.addEventListener('click', function () {
      addToCart('Personal - 3 Ursitoare (1h)', 1, 300);
      showPopupMessage();
    });

    const sapuButton = document.getElementById('sapu');
    sapuButton.addEventListener('click', function () {
      addToCart('Produs - Mașină de baloane de săpun', 1, 300);
      showPopupMessage();
    });

    const cetzButton = document.getElementById('cetz');
    cetzButton.addEventListener('click', function () {
      addToCart('Produs - Mașină de ceață', 1, 500);
      showPopupMessage();
    });

    const flButton = document.getElementById('fl');
    flButton.addEventListener('click', function () {
      addToCart('Produs - Panou floral', 1, 700);
      showPopupMessage();
    });


    
    document.getElementById('place-order').addEventListener('click', function () {
  const emptyCartMessage = document.querySelector('.cart-items h1');
  if (emptyCartMessage) {
    alert('Adăugați servicii în coș pentru a continua sau vizitați pagina de contact pentru a plasa o comandă telefonic');
    return;
  }


        const cartItemsArray = [];
      
        Object.values(addedItems).forEach(function (item) {
          const itemName = item.querySelector('h3').textContent;
          const quantity = parseInt(item.dataset.quantity);
          const price = parseInt(item.dataset.price);
          const cartItemID = item.dataset.id;
          
          const cartItem = {
            itemName: itemName,
            quantity: quantity,
            price: price,
            cartItemID: cartItemID
          };
      
          cartItemsArray.push(cartItem);
        });


        const cartItemsTotal = cartItemsArray.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        const totalPriceTVA = cartItemsTotal + (cartItemsTotal * 0.19);
      
        const order = {
            items: cartItemsArray,
            totalPrice: cartItemsTotal,
            totalPriceTVA: totalPriceTVA
            };


        const orderJSON = JSON.stringify(order);
      
        const filename = `Comanda - ${randomNumber}.json`;
        const blob = new Blob([orderJSON], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      
        cartItemsContainer.innerHTML = '<h1> Cosul dvs. este gol </h1>';
      
        alert(`NU ÎNCHIDEȚI FEREASTRA\n - Comanda dvs. cu nr. #${randomNumber} a fost înregistrată -\nNotați numărul comenzii și sunați la (+40)748.459.540 pentru un preț croit pentru nevoile dvs.`);
      
        totalValue.textContent = '0 RON';
        totalVATValue.textContent = '0 RON';
      });
    });      
  
    function generateRandomNumber() {
    const min = 100000;
    const max = 999999;
  
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return randomNumber;
  }
const randomNumber = generateRandomNumber();  

function showPopupMessage() {
  const popupMessage = document.querySelector('.popup-message');
  popupMessage.classList.add('show');

  setTimeout(function () {
    hidePopupMessage();
  }, 5000);

  setTimeout(function () {
    const cartButton = document.querySelector('.cart-button');
    const cartDropdown = document.querySelector('.cart-dropdown');
    cartDropdown.classList.add('show');
    cartButton.focus();
  }, 500);
}

function hidePopupMessage() {
  const popupMessage = document.querySelector('.popup-message');
  popupMessage.classList.remove('show');
  cartElement.scrollIntoView({ behavior: 'smooth' });

}

document.querySelector('.popup-message a').addEventListener('click', function(event) {
  event.preventDefault(); 
  const cartElement = document.getElementById('cart');
  cartElement.scrollIntoView({ behavior: 'smooth' });
  hidePopupMessage(); 
});

document.querySelector('.popup-message').addEventListener('click', function() {
  hidePopupMessage();
});