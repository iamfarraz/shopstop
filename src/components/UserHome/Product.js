import { Component } from "react";

class Product extends Component{
    constructor(props){
        super(props);
        this.state={
            qty:this.props.qty
        }

    }
    onSubmitChange=()=>{
        fetch("https://api-shopstop.herokuapp.com/buy",{
            method:'post',
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({
          cust_id:this.props.cust_id,
            
            })
        })
            .then(res=>res.json())
                .then(curproducts=>{
                   console.log(curproducts)
                })
                .catch(console.log)

    }
    handlePlus=()=>{
        // shopid,cust_id,pid,quantity_purchased,price
        fetch("https://api-shopstop.herokuapp.com/addCart",{
        method:'post',
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({
      shopid:this.props.shopid,
      cust_id:this.props.cust_id,
         pid:this.props.pid,
         quantity_purchased:1,
          price:this.props.price
        })
    })
        .then(res=>res.json())
            .then(curproducts=>{
                this.setState(preState=>({
                    qty:preState.qty-1
                }))
            })
            .catch(console.log)

    }
    handleMinus=()=>{
        fetch("https://api-shopstop.herokuapp.com/removeProductCart",{
            method:'post',
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({
          shopid:this.props.shopid,
          cust_id:this.props.cust_id,
             pid:this.props.pid,
             quantity_removed:1,
              price:this.props.price
            })
        })
            .then(res=>res.json())
                .then(curproducts=>{
                    this.setState(preState=>({
                        qty:preState.qty+1
                    }))
                })
                .catch(console.log)

    }
   
    render(){
        const { description,price}=this.props
      return(
        <div >
            
                 <h3>{description}</h3>
            <h4>{`Price :${price} , Qty available:${this.state.qty}`}</h4>
            <button  onClick={this.handlePlus}>+</button>
            <button  onClick={this.handleMinus}>-</button>
        </div>
    )   
    }
   


}
export default Product;