window.onscroll = function() {stickyNavbar()};

var header = document.getElementById("header");
var sticky = header.offsetTop;

function stickyNavbar() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}


let cartCount = 0;

function count() {
  cartCount++;
  document.getElementById('cart-count').textContent = 'Cart (' + cartCount + ')';
}

fetch('http://localhost:3000/api/products') 
  .then(response => response.json())
  .then(products => {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
      const listItem = document.createElement('li');
      listItem.classList.add('product-card'); // Add product-card class
      listItem.innerHTML = `
        <img src="images/proteinLogo.png" alt="${product.product_name}">
        <h3 class="product_name">${product.product_name}</h3>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Recusandae, vitae eveniet. Accusantium cupiditate rerum, 
        pariatur sapiente dignissimos omnis deleniti. 
        Similique voluptates, quos dolor rem maxime libero explicabo. Eius, et obcaecati?</p>
        <p class="product_price">$${product.price}</p>
        <button onclick="addToCart('${product.product_name}', ${product.price})" class="cart-btn">Add to Cart</button>
      `;
      productList.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });

  let cartItems = [];

  // Function to add item to cart
  function addToCart(name, price) {
    cartItems.push({ name, price });
    updateCart();
    alert(`${name} added to cart!`);
  }

  // Function to remove item from cart
  function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
  }
  
  // Function to update cart modal content
  function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    let totalPrice = 0;
    
    cartItems.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.innerHTML = `
        <p>${item.name} - $${item.price.toFixed(2)}</p>
        <button onclick="removeFromCart(${index})" class="cart-btn">Remove</button>
      `;
      cartItemsDiv.appendChild(itemElement);
      totalPrice += item.price;
    });

    document.getElementById('cart-total').textContent = `$${totalPrice.toFixed(2)}`;
  }
  
  // Function to open cart modal
  function openCartModal() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'block';
  }
  
  // Function to close cart modal
  function closeCartModal() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'none';
  }
  
  // Function to handle checkout button click
  function checkout() {
    // Calculate total price
    let totalPrice = 0;
    cartItems.forEach(item => {
        totalPrice += item.price;
  });

  // Display total price to the user
  const confirmation = confirm(`Total price: $${totalPrice.toFixed(2)}. Do you want to proceed with the purchase?`);

  // If confirmed, proceed with checkout
  if (confirmation) {
      // Clear the cart
      cartItems = [];
      updateCart();

      // Display a confirmation message to the user
      alert('Thank you for your purchase! Your order has been successfully processed.');
  }
}

  