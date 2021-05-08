const OrderItem=({name,qty,price,total_price,status,date,time})=>{
    const customDate=date.split("T");
    return(
        <div>
       <h3>{`${name} `}</h3>
       <h4>{`Quantity:${qty}, Price:${price}`}</h4>
       <h4>{`Total : ${total_price}`}</h4>
       <h4>{`Ordered on :${customDate[0]} at ${time} `}</h4>
       <h4>{`Status : ${status}`}</h4>
       
        </div>
    )

}
export default OrderItem;