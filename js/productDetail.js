
window.addEventListener('load', async (event) => {
    console.log("In Load");


    // const pId = localStorage.getItem('PID');
    // console.log(pId);

    // const RetrievedProducts = localStorage.getItem('products');
    // const products = JSON.parse(RetrievedProducts);
    // console.log(products);

    const finalProduct = localStorage.getItem('ProductName');
    const productname = JSON.parse(finalProduct);
    // console.log(productname);


    card = ` <div class="product-detail-section">
    <div class="product-detail-image-div">
    <img class="product-detail-image" src="${productname.imageUrl}" alt="product Image"></div>
    <div class="product-detail-content">
        <h1>${productname.product_name}</h1>
        <p>By ${productname.company}</p>
        <div class="product-detail-price">&#8377; ${productname.product_price}</div>
        <div> <span class="dot1"></span><span class="dot2"></span></div>
        <div class="product-detail-description">${productname.description}</div>
        <button  class="product-detail-addtocart" onclick="cartdatasave(); openNav();" data_Id=${productname.product_id}>Add to Cart</button>
    </div>
</div>`;

    document.getElementById('display').innerHTML = card;
 
    document.getElementById('cart-items').innerHTML =  totalItemsInCart();
});



function closeNav() {
    console.log("inside close nav");
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById('backdrops').style.display ="none";

}

cart = JSON.parse(localStorage.getItem('cartItems'));









const cartdatasave = () => {
    console.log("inside cart save function");
    const finalProduct = localStorage.getItem('ProductName');
    const product = JSON.parse(finalProduct);
    console.log(product);


    if (cart === null) {
        cart = [];
        cart.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cart));
        document.getElementById('cart-items').innerHTML =  totalItemsInCart();
    }

    else {
        setCartItem(product);
    }


    // console.log("inside cart: ", cart);
}

const totalItemsInCart = () =>{
    let value = 0;
    cart.map((item)=>{
        value += item.quantity ;
    });
    return value;
}
// console.log(totalItemsCart);


const setCartItem = (product) => {

    /*    if (cart === null) {
           cart = [];
           cart.push(product);
           localStorage.setItem('cartItems', JSON.stringify(cart));
           console.log(" IN IF")
       } else { */
    console.log(" in FIRST ELSE")
    let currentProduct = cart.filter((itm) => itm.product_id === product.product_id);
    if (currentProduct.length > 0) {

        console.log(" INNESTED IF")


        // console.log(currentProduct[0].);
        increment(currentProduct[0].product_id);
        // currentProduct[0].quantity++;

        // console.log("after increase quantity", currentProduct);

        // localStorage.setItem('cartItems', JSON.stringify(cart));
        // openNav()
    } else {
        console.log(" INNESTED ELSEE")
        cart.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cart));
       
        openNav();
    }
    /*  } */

}

const openNav = () => {
    document.getElementById('backdrops').style.display ="block";

    console.log("Inside drawer..")
    document.getElementById("mySidenav").style.width = "350px";

    //getting cart data from local storage and display
    const cart = localStorage.getItem('cartItems');
    const cartItemsarray = JSON.parse(cart);
    console.log("cart items after get:", cartItemsarray);


    let cartCard = '';

    cartItemsarray.map((item) => {
        cartCard += `<div class="product-drawer-page">
        <div class="image-div">
            <img src="${item.imageUrl}" class="product_image">
        </div>
        <div class="product-div">
            <div class="product-details">
                <p>${item.product_name}</p>
                <p>&#8377; ${item.product_price}</p>
                <p onclick="removeCartItem(\'` + item.product_id + `\')">remove</p>
            </div>
        </div>
        <div class="quantity-div">
            <p onclick="increment(\'` + item.product_id + `\')">&Hat;</p>
            <p>${item.quantity}</p>
            <p onclick="decrement(\'` + item.product_id + `\')">&#8964;</p>
        </div>
    </div>`;
    })
    if (cartItemsarray) {

        document.getElementById('displayCartItems').innerHTML = cartCard;
    }
    else {
        document.getElementById('displayCartItems').innerHTML = 'No items in cart';
    }

    document.getElementById('price').innerHTML = totalPrice();
    document.getElementById('cart-items').innerHTML =  totalItemsInCart();

}




const increment = (id) => {
    console.log("INc Id: ", id);
    let currentProduct = cart.filter((itm) => itm.product_id === id);
    console.log("product to be INCREMNETED: ", currentProduct);
    currentProduct[0].quantity++;
    console.log("after increase quantity", currentProduct);
    localStorage.setItem('cartItems', JSON.stringify(cart));
    openNav()
}

const decrement = (id) => {
    console.log("INc Id: ", id);
    let currentProduct = cart.filter((itm) => itm.product_id === id);
    console.log("product to be DECREMNETED: ", currentProduct);
    if(currentProduct[0].quantity >1){

        currentProduct[0].quantity--;
    }
    console.log("after decrease quantity", currentProduct);
    localStorage.setItem('cartItems', JSON.stringify(cart));
    openNav()
}
const removeCartItem = (id) => {
    console.log("In remove cart");
    let currentProduct = cart.filter((itm) => itm.product_id === id);
    console.log("product to be removed ", currentProduct);
    // currentProduct = [];
    cart.splice(currentProduct[0].id,1);
    console.log("after removing product: ", cart);
    localStorage.setItem('cartItems', JSON.stringify(cart));
    openNav();
}

const totalPrice = () =>{
    console.log("Items Preset IN CART:  ",cart);
    let value = 0;
    let newItem;
    cart.map((item) => {
        newItem = parseFloat(item.product_price);
        value += newItem * item.quantity;
      });
      return (value);
}
const clearcart = () => {
    console.log("in clear cart");
    localStorage.removeItem('cartItems');
    // cart = [];
    // localStorage.setItem('cartItems', cart);
    document.getElementById('displayCartItems').innerHTML = 'No items in cart';
    openNav();
}

















// const getdata = () => {

//     const productsList = axios.get('http://localhost:3000/products')
//         .then(resp => {
//             data = resp.data;
//             return data;
//         })
//         .catch(error => {
//             console.log(error);
//         });
//     return productsList;
// };
