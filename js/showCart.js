class Item{
    constructor(name, deliver, quantity, type, price, img = ""){
        this.name = name;
        this.deliver = deliver;
        this.quantity = quantity;
        this.type = type; 
        this.price = price;
        this.img = img;
    }
}

// Temporary Cart used to demostrate cart concept with preloaded cart items
tempCart = [
    {
        "name": "Osmanthus Tea",
        "deliver": "1 week",
        "quantity": "1",
        "type": "Loose Leaf",
        "img" : "img/herbal/osmanthus_tea.jpeg", 
        "price" : '4.10'
    },

    {
        "name": "Rose Flower Tea",
        "deliver": "2 weeks",
        "quantity": "2",
        "type": "Satchet",
        "img" : "img/herbal/rose_flower_tea.jpeg",
        "price" : '10.97'
    },
]



// Function called by html file to display items in cart and show cart status
function loadCart(){
    if (localStorage.getItem("cart") == null){
        console.log('start');
        localStorage.setItem("cart", JSON.stringify(tempCart));
        console.log("starting cart", localStorage.getItem("cart"));
    }else{
        console.log("cart already made - test");
        console.log(localStorage.getItem("cart"));
    }

    showCartStatus()

    // Only load cart if section for cart to be show
    if (document.getElementById("cart") != null){
        displayCart()
    }
    

}

// Never called testing function only
function unloadCart(){
    localStorage.clear();
}

// Displays the number of items in the cart
function showCartStatus(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    console.log("showing");
    console.log('(' + String(cart.length) + ')');
    document.getElementById("cart-amount").innerHTML = '(' + String(cart.length) + ')';

}

// Display items in the cart
function displayCart(){    
    let cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);

    console.log("displaying");
    cartDiv = document.getElementById("cart");
    removeAllChildNodes(cartDiv);

    // Populate Cart Div with cart items from cart arr
    for (let i = 0; i < cart.length; i++){
        cartItem = createCartItem(cart[i]);
        cartDiv.appendChild(cartItem);
    }
}

// Creates a item for a cart
function createCartItem(item){
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    let prodImg = document.createElement("div");
    prodImg.classList.add("product-img");
    let img = document.createElement("img");
    img.src = item.img;
    prodImg.appendChild(img);

    cartItem.appendChild(prodImg);
    
    
    // details
    let prodDetails = document.createElement("div");
    prodDetails.classList.add("product-details");
    cartItem.appendChild(prodDetails);
   
    // Title
    let title = document.createElement("h4")
    let titleText = document.createTextNode(item.name);
    title.appendChild(titleText);
    title.classList.add("product-title");

    prodDetails.appendChild(title);

    
    // Type
    let br = document.createElement("br")
    br.classList.add("clear");

    let type = document.createElement("p")
    let typeText = document.createTextNode(item.type);
    type.appendChild(typeText);
    
    prodDetails.appendChild(type);
    prodDetails.appendChild(br);

    // Deliver
    let deliver = document.createElement("p")
    let deliverText = document.createTextNode("Deliver Every: " + item.deliver);
    deliver.appendChild(deliverText);

    prodDetails.appendChild(deliver);
    prodDetails.appendChild(br);

    // Quantity
    let quantity = document.createElement("p")
    let quantityText = document.createTextNode(item.quantity + " set(s)");
    quantity.appendChild(quantityText);

    prodDetails.appendChild(quantity);
    prodDetails.appendChild(br);

    //Remove
    let remove = document.createElement("p")
    let removeText = document.createTextNode('Remove Item');
    remove.appendChild(removeText);
    remove.classList.add('remove');

    prodDetails.appendChild(remove);
    prodDetails.appendChild(br);
   
    // Price Div
    let priceDiv = document.createElement("div");
    priceDiv.classList.add("product-price");
    cartItem.appendChild(priceDiv);
   

    // Price
    let price = document.createElement("p")
    let priceText = document.createTextNode('$'+ String(item.price));
    price.appendChild(priceText);

    priceDiv.appendChild(price);
    priceDiv.appendChild(br);

    

    return cartItem

}

// Removes all children from a node
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}