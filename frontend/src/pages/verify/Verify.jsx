import React, { useContext, useEffect } from 'react'
import './Verify.css'
import  {useNavigate, useSearchParams} from 'react-router-dom'
import {FoodContext} from '../../context/StoreContext'
const Verify = () => {
    const [searchParams,setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const {url} = useContext(FoodContext)
   const navigate =  useNavigate();
    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", {orderId, success})
        if(response.data.success){
            navigate('/myorders')
        }
        else{
            navigate('/')
        }

        useEffect(() => {
            verifyPayment()
        }, [])
  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}
}
export default Verify
