import React,{useContext,useEffect,useState} from 'react'
import './MyOrders.css'
import { FoodContext } from '../../context/StoreContext'
import assets from '../../assets/assets';
const MyOrders = () => {
    const {url,token} = useContext(FoodContext);
    const [data,setData] = useState([]);

    const fetchOrders = async() =>{
        const response = await axios.post(url + "/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
    }

    useEffect(()=>{
        if(token){
            fetchOrders();

        }
    },[token])
  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
            return(
                <div className="order" key={index}>
                    <div className="order-id">Order Id: {order._id}</div>
                    <div className="order-items">
                        {order.items.map((item,index)=>{
                            return(
                                <div className="my-orders-order" key={index}>
                                    <img src={assets.parcel_icon} alt=""/>
                                    <p>{order.items.map((item,index)=>{
                                        if(index === order.items.length-1)return item.name + " x " + item.quantity;
                                        else return item.name + " x " + item.quantity + ", ";
                                    }) }</p>
                                    <p>${order.amount}.00</p>
                                    <p>Items:{order.items.length}</p>
                                    <p><span>&#x25cf</span><b>{order.status}</b></p>
                                    <button>Track your order</button>
                                </div>
                            )
                        })}
                    </div>
                    <div className="order-total">Total: {order.total}</div>
                    <div className="order-status">Status: {order.payment ? "Paid" : "Not Paid"}</div>
                </div>
            )
        }
        )}
      </div>
    </div>
  )
}
export default MyOrders
