
//displaying products on load
// window.addEventListener('load', async (event) => {

const displayProducts = async () => {
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

};




// //filter by search
const searchProducts = async () => {
    
    let products = await getdata();

    let inputValue = document.getElementById("inputSearch").value;
    let lowerCaseInputValue = inputValue.toLowerCase();
    let filteredProducts;

    if (JSON.parse(localStorage.getItem('isPriceChanged')) === true) {
        let getPriceFilteredProducts = JSON.parse(localStorage.getItem('PriceFilteredProducts'));
        filteredProducts = getPriceFilteredProducts.filter(function (product) {
            return product.product_name.toLowerCase().includes(lowerCaseInputValue);
        });
    }
    else if (JSON.parse(localStorage.getItem('iscompanySelected')) === true) {
        let getcompanyFilteredProducts = JSON.parse(localStorage.getItem('companyFilteredProducts'));
        filteredProducts = getcompanyFilteredProducts.filter(function (product) {
            return product.product_name.toLowerCase().includes(lowerCaseInputValue);
        });
    }
    else {

        filteredProducts = products.filter(function (product) {
            return product.product_name.toLowerCase().includes(lowerCaseInputValue);
        });
    }

    // console.log(filteredProducts);


    localStorage.setItem('isSearchInputChanged', 'true');
    localStorage.setItem('searchFilteredProducts', JSON.stringify(filteredProducts));


    let card = '';
    filteredProducts.map((item) => {

        card += cards(item);
    });
    document.getElementById('display').innerHTML = card;

    if (inputValue == '') {
        localStorage.setItem('isSearchInputChanged', 'false');
        location.reload();
    }

}


// //filter by company name
const getfilteredData = async (id) => {
    let products = await getdata();
    // console.log(products);
    console.log(id);

    const companyName = document.getElementById(id).innerHTML;
    // console.log(companyName);


    let allproducts;
    let allFilteredproducts;

    if (JSON.parse(localStorage.getItem('isPriceChanged')) === true) {
        let getPriceFilteredProducts = JSON.parse(localStorage.getItem('PriceFilteredProducts'));
        allFilteredproducts = getPriceFilteredProducts.filter(item => item.company === companyName)
    }
    else if (JSON.parse(localStorage.getItem('isSearchInputChanged')) === true) {
        let getSearchFilteredProducts = JSON.parse(localStorage.getItem('searchFilteredProducts'));
        allFilteredproducts = getSearchFilteredProducts.filter(item => item.company === companyName)
    }
    else {

        allFilteredproducts = products.filter(item => item.company === companyName)
    }

    localStorage.setItem('iscompanySelected', true);
    localStorage.setItem('companyFilteredProducts', JSON.stringify(allFilteredproducts));



    // const filteredDataSearch = products.filter(item => item.company === companyName)
    // console.log(filteredData);
    if (companyName === 'All') {
        allproducts = products;

    }
    else {
        allproducts = allFilteredproducts;
    }
    // console.log(allproducts);






    let card = '';
    allproducts.map((item) => {

        card += cards(item);
    });

    //assign to html
    document.getElementById('display').innerHTML = card;

    if (companyName === 'All') {
        localStorage.setItem('iscompanySelected', 'false');
        displayProducts();
    }
};



// //filter products by price
const searchByPrice = async () => {
    // console.log('In search filter');

    let products = await getdata();
    // console.log(products);
    let newfilterProducts;
    //input from onkeyup
    let rangeValue = document.getElementById('rangeInput').value;
    // console.log(rangeValue);
    // console.log(typeof(rangeValue));
    document.getElementById('value').innerHTML = rangeValue;
// 
    if (JSON.parse(localStorage.getItem('isSearchInputChanged'))) {
        let searchFilteredProducts = JSON.parse(localStorage.getItem('searchFilteredProducts'));
        newfilterProducts = searchFilteredProducts.filter((item) => parseInt(item.product_price) <= rangeValue);

    }
    else if(JSON.parse(localStorage.getItem('iscompanySelected')) === true){
        let getCompanyFilteredProducts = JSON.parse(localStorage.getItem('companyFilteredProducts'));
        newfilterProducts = getCompanyFilteredProducts.filter((item) => parseInt(item.product_price) <= rangeValue);
    }

    // else {
        newfilterProducts = products.filter((item) => parseInt(item.product_price) <= rangeValue);

    // }



    localStorage.setItem('isPriceChanged', 'true');
    localStorage.setItem('PriceFilteredProducts', JSON.stringify(newfilterProducts))


    let card = '';
    newfilterProducts.map((item) => {

        card += cards(item);
    });
    // store in a varibale 500
    document.getElementById('display').innerHTML = card;
    if (rangeValue <= 500) {
        localStorage.setItem('isPriceChanged', 'false');
        displayProducts();
    }

    // console.log("after filtering: ", newfilterProducts);
    //   console.log(filteredbyPrice);
}


// setting the data of clicked card into localstorage





    
// const filtering = () =>{
//     console.log("inside filtering...");

//     // search wise filtering....
//     const searchInputValue = document.getElementById('inputSearch').value;
//     console.log("",searchInputValue);







//     // company wise filtering.......
//     let checks = document.getElementsByClassName('checks');
//     // console.log(checks.length); //returns the length of checks
//     let companyName = [];
//     for(let i=0;i< checks.length;i++){
//         if(checks[i].checked === true){
//             // console.log(checks[i].value);
//             companyName.push(checks[i].value);
//         }
//     }
//     console.log(companyName);


//     // price wise filtering






// }


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
