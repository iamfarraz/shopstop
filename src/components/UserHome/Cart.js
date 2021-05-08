import {Component} from 'react'
import CartItem from './CartItem'
class Cart extends Component{
    constructor(props){
        super(props);
        this.state={
            item:[]
        }
    }
    componentDidMount(){
        fetch("https://api-shopstop.herokuapp.com/displayCart",{
            method:'post',
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({
             cust_id:this.props.cust_id
            })
        })
        .then(res=>res.json())
            .then(cartItem=>{
                console.log("inside", cartItem)
                 this.setState({item:cartItem})   
            })
            .catch(console.log)

    }
    onBuy=()=>{
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
           this.setState({item:[]})     

    }
    render(){
        const {item}=this.state
        let grandTotal=0;
        return(
            <div>
                {
                    item.map((cur_item,ind)=>{
                      {grandTotal+=cur_item.total_price}
                        return <CartItem
                        key={ind}
                          name={cur_item.description}
                          qty={cur_item.quantity_purchased}
                          price={cur_item.price}
                          total_price={cur_item.total_price}
 
                        />

                    })
                }
          <h2>Grand Total {`${grandTotal}`}</h2>
          <button onClick={this.onBuy}> Buy Now</button>
            </div>
        )
    }

}
export default Cart;