document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalAmount = document.getElementById('total-amount');
    const cartVatAmount = document.getElementById('vat-amount');
    const totalPriceElement = document.getElementById('total-vat-amount');
    const clearCartButton = document.getElementById('clear-cart');
    const proceedToPaymentButton = document.getElementById('proceed-to-payment');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    function renderCartItems() {
      cartItemsContainer.innerHTML = '';
  
      if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Coșul tău este gol.</p>';
      } else {
        cartItems.forEach(function(item) {
          const itemElement = document.createElement('div');
          itemElement.innerHTML = `<p>${item.name} - ${item.price} RON - Size: ${item.size}</p>`;
          cartItemsContainer.appendChild(itemElement);
        });
      }
  
      const total = calculateTotal();
      const vat = calculateVAT();
      const totalPrice = total + vat;
  
      cartTotalAmount.textContent = `${total.toFixed(2)} RON`;
      cartVatAmount.textContent = `${vat.toFixed(2)} RON`;
      totalPriceElement.textContent = `Preț total (incl. TVA): ${totalPrice.toFixed(2)} RON`;
    }
  
    function addToCart(name, price, size) {
      cartItems.push({ name, price, size });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      renderCartItems();
    
      // Send email
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "send_order.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.responseText);
        }
      };
      sendEmail(cartItemsContainer.children, totalPriceElement); 
    }
          
  
    function clearCart() {
      cartItems = [];
      localStorage.removeItem('cartItems');
      renderCartItems();
    }
  
    function calculateTotal() {
      return cartItems.reduce((total, item) => total + item.price, 0);
    }

    
  
    function calculateVAT() {
      const total = calculateTotal();
      const vatRate = 0.19; 
      return total * vatRate;
    }
  
    renderCartItems();
  
    clearCartButton.addEventListener('click', clearCart);
  

    document.addEventListener('addToCart', function(event) {
      const { name, price, size } = event.detail;
      addToCart(name, price, size);
    });

    addToCart("Tricou placeholder", 99.99, "M");
  
    proceedToPaymentButton.addEventListener('click', function() {
      const total = calculateTotal();
      const vat = calculateVAT();
 
      console.log('Proceeding to payment...');
      console.log('Total de plată:', total.toFixed(2));
      console.log('TVA:', vat.toFixed(2));
    });
  });
  

  function sendOrderEmail() {
    const sendEmail = async (cartItems, totalVatAmount) => {
      const formattedCartItems = Array.from(cartItems).map(item => item.querySelector('div p').textContent).join('\n');

  const data = {
    cartItems: formattedCartItems,
    totalVatAmount: totalVatAmount.textContent
  };
      try {
        const response = await fetch('/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
    
        if (response.ok) {
          console.log('Email sent successfully');
        } else {
          console.log('Failed to send email');
        }
      } catch (error) {
        console.log('Error sending email:', error);
      }
    }
    

    const cartItems = Array.from(document.querySelectorAll('div'));
    const totalVatAmount = document.getElementById('total-vat-amount');
    
    sendEmail(cartItems, totalVatAmount);
              }
  