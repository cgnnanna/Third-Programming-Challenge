let products = [];
let cartItems = [];
const addProduct = (e) => {
    e.preventDefault();
    let product = {
        name: e.target[1].value,
        price: e.target[2].value,
        description: e.target[3].value,
        isAvailable: e.target[4].checked
    }
    if(checkDuplicateName(product.name)){
        alert("Product with name already exists!")
    }
    else{
        products.push(product);
        console.log(products);
        e.target[1].value = "";
        e.target[2].value = "";
        e.target[3].value = "";
        e.target[5].click();
        displayProducts();
    }
}

const checkDuplicateName = (name) =>{
    for(i=0; i<products.length; i++){
        if(products[i].name===name){
            console.log("here")
            return true;
        }
    }
    return false;
}

const displayProducts = () => {
    let card = "";
    products.forEach((product, index) => {
        let stock = product.isAvailable ? `<span class="badge bg-success">In Stock</span>` : `<span class="badge bg-warning">Out of Stock</span>`;
        let disabled = product.isAvailable ? "" : "disabled";
        card += `<div class="col">
                        <div class="card border-primary mb-3 h-100">
                        <div class="card-header flex-row" id="product-name"><h2>${product.name}</h2>  <div>${stock}</div></div>
                        <div class="card-body text-primary">
                            <h5 class="card-title">$${product.price}</h5>
                            <p class="card-text">${product.description}</p>
                        </div>
                        <div class="card-footer bg-transparent border-primary text-end">
                            <button type="button" class="btn btn-outline-danger" name="${index}" onclick="deleteProduct(this)">Delete</button>
                            <button type="button" class="btn btn-outline-primary" name="${index}" ${disabled} onclick="addToCart(this)">Buy</button>
                        </div>
                        </div>
                    </div>`;
    })
    document.getElementById("card-row").innerHTML = card;
}

const deleteProduct = (element) => {
    let productId = element.name;
    deleteFromCart(products[productId].name);
    products.splice(productId, 1);
    displayProducts();
    displayCart();
}

const deleteFromCart = (name) => {
    let tempCartItems = [];
    cartItems.forEach((product) => {
        if(product.name!==name){
            tempCartItems.push(product);
        }
    });
    console.log(tempCartItems);
    cartItems = tempCartItems
}

const addToCart = (element) => {
    let productId = element.name;
    cartItems.push(products[productId]);
    displayCart();
}

const displayCart = () => {
    document.getElementById("cart").innerText = cartItems.length>0 ? cartItems.length : "";
}