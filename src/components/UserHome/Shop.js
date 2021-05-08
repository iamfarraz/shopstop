import ShopProducts from './ShopProducts';
import {Component} from 'react';
class Shop extends Component{
     constructor(props){
         super(props);
     }
    handleClick=()=>{
        console.log(this.props.shop.shopid)  
        this.props.handleUserRouteChange("shopproduct",this.props.shop.shopid);
     
    }
    render(){
       const { name, pincode, address, category}=this.props;
     return(
        <div onClick={this.handleClick}>
           
            <h3>{name}</h3>
            <h4>{`${address}  ${pincode}`}</h4>
            <h4>{category}</h4>
        </div>
    )    
    }
   


}
export default Shop;