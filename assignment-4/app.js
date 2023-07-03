let myproduct=document.querySelector('.product');
let mycartItems=document.querySelector('.purcheseSection');
let subtotal=document.querySelector('.subtotal');
function renderProduct(){
 products.forEach((element) => {
 myproduct.innerHTML+= ` <div class="col-md-4  col-lg-3 col-11 bg-light shadow rounded-3 border border-danger mt-4  lh-1 text-center item">
  <p class="fw-bold fs-4 text-primary">'Product ID: ${element.id} '</p>
  <div class='product_img mx-auto'><img src="${element.imgSrc}" alt="" class="img-fluid mb-3"></div>
  <p class="fw-bold mb-1">'Name: ${element.name}'</p>
  <p class="mb-1">'Price: ${element.price}'</p>
  <p class="mb-1">'Instoke: ${element.instock}'</p>
  <p class="mb-3 ">Description: ' ${element.description}'</p>
  <button type="btn" class="btn btn-primary mb-2" onclick="addToCart(${element.id})">Add to Cart</button>
</div>`
});}
renderProduct();
// add to cart section start
// let cartItems= localStorage.getItem("CART")||[];
let cartItems = JSON.parse(localStorage.getItem("CART")) || [];


addToCart=(id)=>{
  // check if  product alredeay in cart or not
  if(cartItems.some((x)=>x.id===id)){
    alert('Product alreay in your cart')
  }
  else{
    let cartItem=products.find((item)=>item.id===id);
    cartItems.push({...cartItem, numberofUnit:0})
    mycartItems.scrollIntoView({behavior: "smooth"})
     }
 updatecart()
}

// add to cart section end
// updatecart funciton start
function updatecart(){
  renderCartItems();
  renderSubtotal();
  // add data to localStorage
  localStorage.setItem("CART", JSON.stringify(cartItems));
}
// updatecart funciton end
// renderCartItems function start
renderCartItems=()=>{
  mycartItems.innerHTML='';
  cartItems.forEach((elm)=>{
    mycartItems.innerHTML+=`  <div class="col-4 text-center" )">
    <img src="${elm.imgSrc}" alt="${elm.name}" class="cartImage"> 
    <h4>"${elm.name}"</h4>                   
</div>
<div class="col-4 text-center">
    <h4><small>$</small>${elm.price}</h4>
</div>
<div class="col-4">
 <div class="row border">
    <div class="col-3"></div>
      <div class="col-2 btn minus" onclick="incDecrement('minus', ${elm.id})" >-</div>
      <div class="col-2 number">${elm.numberofUnit}</div>
      <div class="col-2 btn plus" onclick="incDecrement('plus', ${elm.id})">+</div>
      <div class="col-2 btn plus"><button class="btn btn-primary" onclick="removeItem(${elm.id})">Delete</button></div>
  </div>
  </div>`
  })
} 
// incDecrement counter
incDecrement=(action, id)=>{
  
  cartItems=cartItems.map((elm)=>{
    let numberofUnit=elm.numberofUnit;
    let instock=elm.instock;
    if(elm.id===id){
      if(action==='minus' && numberofUnit>1 ){
        numberofUnit--
      }
      if(action==='plus'&& numberofUnit<instock){
        numberofUnit++
        }
        else{
          alert('our stoke is over please not give more order this product')
        }
    }
     return {
      ...elm,
      numberofUnit,
     };
  })
  updatecart()
 }


// renderSubtotal function start 
renderSubtotal=()=>{
  let totalItem=0;
  let totalPrice=0;
  cartItems.forEach((item)=>{
       totalItem+=item.numberofUnit;
       totalPrice+=item.price* item.numberofUnit;
         })
         subtotal.innerHTML=`Subtotal (${totalItem} items): $${totalPrice}`
}
// rendersubtotal function end
// removing item function start
removeItem=(ids)=>{
  cartItems=cartItems.filter((elm)=>elm.id !==ids)
  updatecart()
}