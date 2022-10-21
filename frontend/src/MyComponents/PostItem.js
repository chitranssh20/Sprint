import React from 'react'
import uuid from 'react-uuid'

const cardStyle = {
    height: "800px",
    width: "30%",
    marginLeft: "1%",
    marginRight: "1%",
    marginTop: "20px",
    // height: "150px"
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    flexDirection: 'column',
}

const upgradeCart = (id, name, price,image, qty, isCartNull  ) =>{

  if(isCartNull === true){

    localStorage.setItem('cart', JSON.stringify(
      
      [{
        id: id,
        name: name,
        price: price,
        image: image,
        qty: qty+1  
      }])
      )
    }
    else{
        let cart = JSON.parse(localStorage.getItem('cart'));
        let exist = false
        cart.forEach((el) => {
          if(el.id === id){
            el.qty = el.qty + 1;
            localStorage.setItem('cart', JSON.stringify(cart)  )
            exist = true;
          }
        });
        if (exist === false){
          let item = {
            id: id,
            name: name,
            price: price,
            image: image,
            qty: 1  
            
          }
          
          
          cart.push(item);
          localStorage.setItem('cart', JSON.stringify(cart)  )
      }
    }
}
const checkQty = (id,name, price, image) =>{
  let cart = JSON.parse(localStorage.getItem('cart'));
  let qty = 0;
      cart.forEach(element => {
        if(element.id === id){
          qty = element.qty;
        }
      });
      upgradeCart(id, name, price, image, qty, false)
}
const addToCart = (e, id, name, price, image) => {
  let cart = localStorage.getItem('cart');
  cart==null?upgradeCart(id, name, price, image, 0, true):checkQty(id, name, price, image);
}
let NoProduct = {
  textAlign: "center",
  color: "red",
  width: "100%"
}

const PostItem = ({post}) => {
    if(post.length ==0 ){
      return <h3 style={NoProduct} >No Products...</h3>
    }
    else{
        return post.map((posts)=>{
            let url = 'http://127.0.0.1:8000'
            return <>
             <div className="card" key={posts.prodId} style= {cardStyle} >
            <img src= {url+ posts.prodImg} width= "50px" height= '50%'  className="card-img-top" alt= {posts.name} />
            <div className="card-body  ">
              <h5 className="card-title ">{posts.name}</h5>
              <p className="card-text lead ">{posts.desc}</p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item border-white " >Ratings: {posts.ratings} out of 5</li>
              <li className="list-group-item text-danger  ">Price: {posts.price}</li>
              <li className="list-group-item">Category: {posts.category} </li>
            </ul>
            <div className="card-body">
              <button className= 'btn btn-danger rounded-0 mx-2 my-2' onClick={ (e) =>{addToCart(e, posts.prodId, posts.name, posts.price, posts.prodImg  )}   }  >Add to Cart</button>
              <a href=  {'/product/'+ posts.prodId}  target= '_blank'  className="card-link"><button className='btn btn-outline-danger rounded-0 mx-2' >Details</button> </a>
            </div>
          </div>
            </div>
            </>
        })
    }

}

export default PostItem