var userId;
var cartId;
var quantity = 1;
var products = [];



function getProducts() {
  fetch("http://localhost:8080/postbook/webapi/amazon/products/viewProducts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((res) => res.json())
    .then((data) => {
      products = data;
      mapProductsToCard(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function mapProductsToCard(products) {
  var cardString = "";

  for (let i = 0; i < products.length; i++) {
    cardString += `<div class="product-card">
          <div class="product-header">
              <img
                  src="${products[i].productImage}"
                  alt="Product Image"
                  class="product-image"
              />
              <div class="product-info">
                  <div class="product-name">${products[i].productName}</div>
                  <div class="product-price">$${products[i].productPrice}</div>
              </div>
          </div>

          <div class="product-description">
              ${products[i].productDescription}
          </div>

          <div class="product-actions">
              <button class="btn btn-primary" onclick="addToCart(${products[i].productId})">Add to Cart</button>
          </div>
      </div>`;
  }

  document.getElementById("productsList").innerHTML = cardString;
}




function signUp() {
  const userData = {
    userName: document.getElementById("signUpName").value,
    userEmail: document.getElementById("signUpEmail").value,
    userPassword: document.getElementById("signUpPassword").value,
  };

  document.getElementById("signUpEmail").value = "";
  document.getElementById("signUpName").value = "";
  document.getElementById("signUpPassword").value = "";

  fetch("http://localhost:8080/postbook/webapi/amazon/users/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((resp) => {
      if (resp.status === 200) {
        $('#signupSuccessModal').modal('show');
      } else {
        $('#signupFailModal').modal('show');
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


function signIn() {
  const userEmailInput = document.getElementById("signInEmail");
  const userPasswordInput = document.getElementById("signInPassword");
  const userData = {
    userEmail: userEmailInput.value,
    userPassword: userPasswordInput.value,
  };

  userEmailInput.value = "";
  userPasswordInput.value = "";

  fetch("http://localhost:8080/postbook/webapi/amazon/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((resp) => {
      if (resp.status === 200) {
        console.log("success");
        $('#signInSuccessModal').modal('show');
        document.getElementById("feed-tab").disabled = false;
        document.getElementById("profile-tab").disabled = false;
        document.getElementById("my-tweets-tab").disabled = false;
        document.getElementById("sign-in-tab").hidden = true;
        document.getElementById("sign-up-tab").hidden = true;
        document.getElementById("logout-tab").hidden = false;
        getProducts();
        const feedTabButton = document.getElementById("feed-tab");
        feedTabButton.click();
        return resp.json();
      } else if (resp.status === 204) {
        // No content
        throw new Error("Wrong email or password");
      }
    })
    .then((data) => {
      userId = data.userId; 
      console.log(userId);
    })
    .catch((error) => {
      console.error("Error:", error);
      $('#signInFailureModal').modal('show');
    });
}

function addToCart(product_id) {
  console.log(product_id);
  const cartData = {
    productId: product_id,
    users: {
      userId: userId
    },
    quantity,
  };

  fetch("http://localhost:8080/postbook/webapi/amazon/cart/addtocart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartData),
  })
    .then((resp) => {
      if (resp.ok) {
        $('#addToCartSuccessModal').modal('show');
      } else {
        $('#addToCartFailModal').modal('show');
        console.error("Failed to add product to cart:", resp.statusText);
      }
    })
    .catch((error) => {
      console.error("Error adding product to cart:", error);
      $('#addToCartFailModal').modal('show');
    });
}


function getCartItems() {
  fetch(`http://localhost:8080/postbook/webapi/amazon/cart/viewcart/${userId}`).then(resp => resp.json())
    .then(data => {
      displayCartItems(data);
      console.log(data);
    })
    .catch(err => console.log(err))
}

function displayCartItems(cartItems) {
  var cartString = "";

  for (let i = 0; i < cartItems.length; i++) {
    cartString += `<div class="cart-item">
        <div class="cart-product">
          <img src="${cartItems[i].productImage}" alt="Product Image" class="cart-product-image" />
          <div class="cart-product-info">
            <div class="cart-product-name">${cartItems[i].productName}</div>
            <div class="cart-product-price">$${cartItems[i].productPrice}</div>
            <div class="cart-product-quantity">Quantity: ${cartItems[i].quantity}</div>
          </div>
        </div>
        <div class="cart-actions">
          <button class="btn btn-danger" onclick="removeFromCart(${cartItems[i].cartItemId})">Remove</button>
        </div>
      </div>`;
  }

  document.getElementById("cartItems").innerHTML = cartString;
}

function removeFromCart(cartItemId) {
  fetch(`http://localhost:8080/postbook/webapi/amazon/cart/removeCartItem/${cartItemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((res) => {
      if (res.ok) {
        // Refresh cart items after removal
        getCartItems();
        // Optionally, show a success message
        console.log("Product removed from cart successfully");
      } else {
        // Optionally, show an error message
        console.error("Failed to remove product from cart:", res.statusText);
      }
    })
    .catch((error) => {
      console.error("Error removing product from cart:", error);
    });
}


function logout() {
  userId = undefined;
  cartId = undefined;

  document.getElementById("feed-tab").disabled = true;
  document.getElementById("profile-tab").disabled = true;
  document.getElementById("my-tweets-tab").disabled = true;
  document.getElementById("sign-in-tab").hidden = false;
  document.getElementById("sign-up-tab").hidden = false;
  document.getElementById("logout-tab").hidden = true;

  document.getElementById("productsList").innerHTML = "";
  document.getElementById("logout-tab").addEventListener("click", logout);
}
