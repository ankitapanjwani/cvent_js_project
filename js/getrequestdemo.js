// const axios = require('axios');

//displaying products on load
window.addEventListener('load', async (event) => {
    // console.log('page is fully loaded');
    let products = await getdata();
    console.log(products);
    console.log("in on load");
    //map
    let card = '';

    products.map((item) => {

        card += cards(item);
    });
    document.getElementById('display').innerHTML = card;

});

//filter by company name
const getfilteredData = async (id) => {
    let products = await getdata();
    // console.log(products);
    console.log(id);

    const companyName = document.getElementById(id).innerHTML;
    console.log(companyName);


    const filteredData = products.filter(item => item.company === companyName)
    console.log(filteredData);
    let allproducts;
    if (companyName === 'All') {
        allproducts = products;

    }
    else {
        allproducts = filteredData;
    }
    console.log(allproducts);
    let card = '';
    allproducts.map((item) => {

        card += cards(item);
    });

    //assign to html
    document.getElementById('display').innerHTML = card;


};


//filter by search
const searchProducts = async () => {

    let products = await getdata();

    let inputValue = document.getElementById("inputSearch").value;
    let lowerCaseInputValue = inputValue.toLowerCase();

    let filteredProducts = products.filter(function (product) {
        return product.product_name.toLowerCase().includes(lowerCaseInputValue);
    });

    // console.log(filteredProducts);

    let card = '';
    filteredProducts.map((item) => {

        card += cards(item);
    });
    document.getElementById('display').innerHTML = card;

}


//filter products by price
const searchByPrice = async () => {
    // console.log('In search filter');

    let products = await getdata();
    // console.log(products);
    let rangeValue = document.getElementById('rangeInput').value;
    console.log(rangeValue);
    // console.log(typeof(rangeValue));
    document.getElementById('value').innerHTML = rangeValue;


    const newfilterProducts = products.filter((item) => parseInt(item.product_price) <= rangeValue);

    let card = '';
    newfilterProducts.map((item) => {

        card += cards(item);
    });
    document.getElementById('display').innerHTML = card;
    console.log("after filtering: ", newfilterProducts);
    //   console.log(filteredbyPrice);
}


// setting the data of clicked card into localstorage
const cardDataset = async (itemId) => {
    // console.log(typeof(item));
    console.log("In card data set method");
    console.log("item id: ", itemId);

    let products = await getdata();
    // console.log(products);
    let product = products[itemId];
    // console.log(product);
    // localStorage.setItem('products',JSON.stringify(products))
    // localStorage.setItem("PID",product.product_id);
    localStorage.setItem('ProductName', JSON.stringify(product));
    window.location.href = "../pages/productDetailsPage.html";
}

//Getting products from db.json
const getdata = () => {

    const productsList = axios.get('http://localhost:3000/products')
        .then(resp => {
            data = resp.data;
            return data;
        })
        .catch(error => {
            console.log(error);
        });
    return productsList;
};

//Reusable Card
const cards = (item) => {
    let cardData;
    cardData = '<div class="card-div mt-5" onclick="cardDataset(\''
        + item.product_id + '\')">'
        + `
        <div class="product-image-div">
         <img src=${item.imageUrl} class="product_image" alt="...">
         </div>
       <div class="card-body-content">
         <h5 class="card-title product_name">${item.product_name}</h5>
          <p class="card-text product_price">&#8377; ${item.product_price}</p>
   
        </div>
      </div>`;
    return cardData;
}





   //   <p class="card-text product_company">${item.company}</p>








//=========================done with AJAX ======================
// $(document).ready(async function () {
//     const products = await getProductsList();
//     // console.log(products[0].product_name);

//     let card = '';
//     $.each(products, function (index, value) {
//         // const categorytitle = '<h5 class="card-title  category-title">' + value.categoryname + '</h5>';

//         card += `
//              <div class="card mt-5" style="width: 18rem; margin-left: 10px; margin-right: 10px;">
//                  <img src=${value.imageUrl} class="card-img-top" alt="...">
//                 <div class="card-body">
//                   <h5 class="card-title">${value.product_name}</h5>
//                    <p class="card-text">${value.product_price}</p>

//                  </div>
//                </div>`;

//     });

//     $('#display').html(card);
// });


// async function getProductsList() {
//     const productsList = await $.ajax({
//         method: 'GET',
//         url: 'http://localhost:3000/products/',
//         success: function (x) {
//             // (x);
//             return x;
//         },
//     });
//     return productsList;
// }
