import React,{Component} from 'react';
import Shop from './Shop'
import ShopProducts from './ShopProducts'
import './UserHome.css'
import Cart from './Cart'
import UserOrder from '../UserOrders/UserOrders'

class UserHome extends Component {
    constructor(props){
        super(props);
        this.state={
           search:"",
          userRoute:"home",
          shopid:"",
           currentshop:[]
        }
    }
    componentDidMount(){
         let  {currentshop}=this.state;
        fetch("https://api-shopstop.herokuapp.com/checkshop",{
            method:'get',
            headers:{'Content-Type':"application/json"},
        })
        .then(res=>res.json())
            .then(shop=>{
                this.setState({currentshop:shop})
                console.log(currentshop)
            })
            .catch(console.log)
            console.log(currentshop)

    }
    handleChange=(evt)=>{
        this.setState({[evt.target.name]:evt.target.value})
    }
    onSubmitChange=(evt)=>{
        evt.preventDefault();
         fetch("https://api-shopstop.herokuapp.com/locality",{
        method:'post',
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({
      locality_pin_code:this.state.search
        })
    })
    .then(res=>res.json())
        .then(shop=>{
            console.log("inside submit", shop, shop.length)
             this.setState({currentshop:shop})   
        })
        .catch(console.log)
       
    }
    handleClearState=(evt)=>{
        this.props.clearState();

    }
    // https://api-shopstop.herokuapp.com/
    handleAllShop=()=>{
        let  {currentshop}=this.state;
        // fetch("http://localhost:3001/checkshop",{
            fetch("https://api-shopstop.herokuapp.com/checkshop",{
            method:'get',
            headers:{'Content-Type':"application/json"},
        })
        .then(res=>res.json())
            .then(shop=>{
                this.setState({currentshop:shop})
                console.log(currentshop)
            })
            .catch(console.log)
            console.log(currentshop)

    }
    handleUserRouteChange=(route,shopid)=>{
        console.log("inside handle user", route,shopid)
         this.setState({userRoute:route,shopid:shopid})
    }
    handleCart=()=>{
        this.handleUserRouteChange('cart',"")
    }
  
   

 
    render(){
        const {onRouteChange,user}=this.props;
        let  {currentshop,userRoute}=this.state;
        let now;
        if(userRoute==="home"){
            now=  <div className="userhome">
            <div className="background">
               

         <div className="input-group container-fluid w-50 tc ">
             <form  onSubmit={this.onSubmitChange}>
                  <input
                onChange={this.handleChange}
                 type="search"
                name="search"
                value={this.state.search}
                 className="form-control rounded w-50 search-bar" 
                 placeholder="Search Pincode" 
                 aria-label="Search"
                 aria-describedby="search-addon" />
                 <button
                     type="submit" 
                     onClick={this.onSubmitChange}  
                 className="ttu bn ph4 f6 bg-orange white b br-pill pointer grow" >
                   Search
                    </button>      
             </form>

        </div>
        <button
        onClick={this.handleAllShop}
        >All shops</button>
          <button
            onClick={this.handleClearState} >
               Log out 
            </button>
            <button onClick={()=>this.handleUserRouteChange("orders","")}>
                   MY orders</button>
            <button onClick={this.handleCart}>
                Cart
            </button>
             
             {
                 currentshop.map((cur_shop,ind)=>{
                     return <Shop 
                     key={ind}
                     shop={cur_shop}
                     name={cur_shop.shop_name}
                     pincode={cur_shop.locality_pin_code}
                     address={cur_shop.address}
                     category={cur_shop.category}
                     handleUserRouteChange={this.handleUserRouteChange}
                    
                     />
                 })
             }
            
                <div className="mb3 tc f6 home">
                    <p onClick={() => onRouteChange('userorders')} 
                    className="blue di pointer underline ph1">Orders</p>
                </div>
            </div>
        </div>;
        }
        else if(userRoute==="shopproduct"){
           now= 
           <div>
             <button onClick={this.handleCart}>
                Cart
            </button>
            <button onClick={()=>this.handleUserRouteChange("orders","")}>
                   MY orders</button>
                <button
                onClick={this.handleClearState}>
               Log out 
               </button>

            <ShopProducts 
            shopid={this.state.shopid} 
            cust_id={this.props.user.cust_id}
            handleUserRouteChange={this.handleUserRouteChange}
            />
           </div>
           
        }
        else if(userRoute==="cart"){
            now=
            <div>
                 <button
                onClick={this.handleClearState}>
               Log out 
               </button>
               <button onClick={()=>this.handleUserRouteChange("orders","")}>
                   MY orders</button>
               <button onClick={()=>this.handleUserRouteChange("home","")}>
                   back to shops</button>
               <Cart cust_id={user.cust_id}/>

            </div>

        }
        else if(userRoute==='orders'){
            now=
            <div>
                 <button
                onClick={this.handleClearState}>
               Log out 
               </button>
               <button onClick={()=>this.handleUserRouteChange("home","")}>
                   back to shops</button>
               <button onClick={this.handleCart}>  Cart  </button>
              <UserOrder cust_id={user.cust_id}/>

            </div>

        }

        return (
          <div>{now}</div>
        )

    }

   
}
export default UserHome;