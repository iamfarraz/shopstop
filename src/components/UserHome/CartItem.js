
const CartItem=({name,qty,price,total_price})=>{
   
        return(
            <div>
           <h3>{`${name} `}</h3>
           <h4>{`Quantity:${qty}, Price:${price}`}</h4>
           <h4>{`Total : ${total_price}`}</h4>
            </div>
        )
    
}
export default CartItem;