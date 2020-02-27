let carts = document.querySelectorAll('.add-cart');
 

let products = [
    { 
        name: 'Phone 1',
        tag: 'phone1',
        price: 15,
        inCart: 0
    },
    {
        name: 'Phone 2',
        tag: 'phone2',
        price: 85,
        inCart: 0
    },
    {
        name: 'Phone 3',
        tag: 'phone3',
       price: 95,
        inCart: 0
    },
    {
        name: 'Phone 4',
        tag: 'phone4',
        price: 75,
        inCart: 0
    },
    {
        name: 'Phone 5',
        tag: 'phone5',
        price: 55,
        inCart: 0
    }

];

        // this loop grabs all the .add-cart elements ex. cart[1] cart[2]...
        // as long as i is less than carts.length it will ++
for (let i=0; i < carts.length; i++) {

    carts[i].addEventListener('click', () => {
        // console.log('added to cart');
        cartNumbers(products[i]);
        totalCost(products[i]);

    })

}

   /* this function will make sure that even if you refresh page,
   you will still have items in shopping cart invoked at bottom of page..  */

        function onLoadCartNumbers() {
            let productNumbers = localStorage.getItem('cartNumbers');
            
            if (productNumbers){
            document.querySelector('.cart span').textContent= productNumbers;
            }
        }





function cartNumbers(product) {
    // console.log(' Inside cartNumbers the product clicked is', product);
    let productNumbers = localStorage.getItem('cartNumbers');
    // console.log(productNumbers);
    // console.log(typeof productNumbers);
    productNumbers = parseInt(productNumbers);
    // console.log(typeof productNumbers);

   
    document.querySelector('.cart span').textContent=1;
    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent= productNumbers + 1;

    }else{
        localStorage.setItem('cartNumbers',  1)

    }

    setItems(product)


}


function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
     cartItems = JSON.parse(cartItems);
    // console.log('Inside of setItems My Product is', product);
    // console.log('My cart Items are', cartItems);
    
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems  = {
                // rest operator ... will update cartItems add new product
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{
    product.inCart = 1;
     cartItems = {
        [product.tag]: product
    }
}
    localStorage.setItem('productsInCart', JSON.stringify(cartItems) );


}

function totalCost(product) {
    //console.log("the product price is", product.price);

    // you need to get the totalCost and put in variable named cartCost
    
    let cartCost = localStorage.getItem('totalCost');
    


    //     console.log('my CartCost is', cartCost );
            //   console.log(typeof cartCost);
              // gets parsed to number only if cart has something inside already

        /* != null meaning that if the totalCost is Not EMPTY so it does have
         contents. The reason we parse below instead of above is because it's
          only when the cart is not empty... */
       if(cartCost != null){
       cartCost = parseInt(cartCost);
        // console.log(typeof cartCost);
            localStorage.setItem('totalCost', cartCost + product.price )
       } else {
        cartCost = parseInt(cartCost);
        // console.log(typeof cartCost);
        localStorage.setItem('totalCost', product.price);

       }      

}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
        let productContainer = document.querySelector('.products');
        let cartCost = localStorage.getItem('totalCost');

        if(cartItems && productContainer ) {
            productContainer.innerHTML= '';
            Object.values(cartItems).map(item => {
                productContainer.innerHTML += `
                <div class='product'>
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src='./images/${item.tag}.jpg'>
                <span>${item.name}</span>
                </div>
                <div class='price'>$${item.price}.00</div>
                <div class = 'quantity'>
                <ion-icon class='decrease'name="arrow-back-circle-outline"></ion-icon>   
                <span>${item.inCart}</span>
                <ion-icon class='increase' name="arrow-forward-circle-outline"></ion-icon>
                </div>
                <div class='total'>
                $${item.inCart * item.price}.00
                </div> 

                `; 
            }) 
            productContainer.innerHTML += `
             <div class = 'basketTotalContainer'>
                 <h4 class='basketTotalTitle'>
                 Basket Total
                 </h4>
                  <h4 class='basketTotal'>
                     $${cartCost}.00
                  </h4>
            
            
             </div>
        `;
            
        }


            // deleteButtons has an event listener in the function for when you click on the delete buttonwithin the function
            deleteButtons();
            manageQuantity(); 
}


//////// delete button
 function deleteButtons(){
     let deleteButtons = document.querySelectorAll('.product ion-icon');
     let productName;
     let productNumbers = localStorage.getItem('cartNumbers');
     let cartItems = localStorage.getItem('productsInCart')
      cartItems = JSON.parse(cartItems);
     let cartCost = localStorage.getItem('totalCost');


    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
        // console.log('clicked');

        productName = deleteButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '');
        console.log(productName);
        console.log('we have  '+ productNumbers+ ' total products in cart' );
            console.log(cartItems[productName].name + ' had ' + cartItems[productName].inCart+ ' in cart');
         localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price  * cartItems[productName].inCart ));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }

}

// increasing and decreasing product quantities 
function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let currentQuantity = 0;
    currentProduct = "";
   
   
    for(let i=0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
        currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
        console.log(currentQuantity);
        // this below currentProduct grabs the span 2 elements up inside product
        currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();
        console.log(currentProduct);

        if(cartItems[currentProduct].inCart > 1) {
            cartItems[currentProduct].inCart = cartItems[currentProduct].inCart - 1;

        //pass updated cartItems into productsInCart 
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));

        // call displayCart so page is re-rendered
        displayCart();
            }
        });

    }

    for(let i=0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', () => {
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
        })

    }
}





// whenever we load the page, this onLoadCartNumbers() is going to run
onLoadCartNumbers();
displayCart();

