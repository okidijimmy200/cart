// show cart

// immeditely invoked function expression
(function(){
    // select cart info
    const cartInfo = document.getElementById('cart-info');
    const cart = document.getElementById('cart') // get cart

    // add event listener
    cartInfo.addEventListener('click', function(){
        cart.classList.toggle('show-cart') // show or hide show-cart
    })
})();

// add items to cart
(function(){
    // select store item icon
    const cartBtn = document.querySelectorAll('.store-item-icon');

    // attach event listener
    cartBtn.forEach(function(btn){
        btn.addEventListener('click', function(event){
            // console.log(event.target) 

            // firing the event only once we click the icon
            if(event.target.parentElement.classList.contains('store-item-icon')){
                // get source of image, img & span r children of image-continer
                // prevsibing is used to get the prev child of an element within a parent element
                let fullPath = event.target.parentElement.previousElementSibling.src
                
                //finding img position for cart
                let pos = fullPath.indexOf("img") + 3; // to remove http://127.0.1.23 text b4 name of image ie sweet.jpg, we use 3 bse 'img' is 3 strings
                // slice method to remove http
                let partPath = fullPath.slice(pos)

                // object to hold the img values
                const item = {}
                // add properties to it
                item.img = `img-cart${partPath}`;

                // writiing properties as a name
                let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;

                item.name = name
                // console.log(name)
                // price 
                let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;

                // reomve dollar sign and space
                let finalPrice = price.slice(1).trim(); // since $ 5 ($--index0, 5--index2, space--index1)

                // console.log(finalPrice)
                item.price = finalPrice
                // console.log(item)

                // div for cart
                const cartItem = document.createElement('div')
                cartItem.classList.add( // classes in the div
                    'cart-item', 
                    'd-flex',
                    'justify-content-between', 
                    'text-capitalize',
                    'my-3');
                cartItem.innerHTML =
                `
                  <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                  <div class="item-text">
      
                    <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                    <span>$</span>
                    <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                  </div>
                  <a href="#" id='cart-item-remove' class="cart-item-remove">
                    <i class="fas fa-trash"></i>
                  </a>
                </div>`;
                // select the cart
                const cart = document.getElementById('cart')
                const total = document.querySelector('.cart-total-container')

                cart.insertBefore(cartItem, total);
                alert('item added to the cart')
                // show number of items in cart
                showTotals();
            }
        })
    })

    function showTotals(){
        // create array to hold total of prices
        const total = [];
        const items = document.querySelectorAll('.cart-item-price')

        // loop through the items
        items.forEach(function(item){
            total.push(parseFloat(item.textContent))
        })

        // total money, reduce function has an initial value of 0
        const totalMoney = total.reduce(function(total, item){
            total += item;
            return total;
        }, 0 )
        const finalMoney = totalMoney.toFixed(2)
        //update the totalMoney
        document.getElementById('cart-total').textContent = finalMoney;
        document.querySelector('.item-total').textContent = finalMoney;
        document.getElementById('item-count').textContent = total.length;
    }
})();