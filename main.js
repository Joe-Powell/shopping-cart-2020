let carts = document.querySelectorAll('.add-cart');
 

let products = [
    {
        name: 'phone1',
        tag: 'firstItem',
        price: 15,
        inCart: 0
    },
    {
        name: 'phone2',
        tag: 'secondItem',
        price: 85,
        inCart: 0
    },
    {
        name: 'phone3',
        tag: 'thirdItem',
        price: 95,
        inCart: 0
    },
    {
        name: 'phone4',
        tag: 'fourthItem',
        price: 75,
        inCart: 0
    },
    {
        name: 'phone5',
        tag: 'fifthItem',
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
    console.log(' Inside cartNumbers the product clicked is', product);
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
    console.log('Inside of setItems My Product is', product);
    console.log('My cart Items are', cartItems);
    
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







// whenever we load the page, this onLoadCartNumbers() is going to run
onLoadCartNumbers();
