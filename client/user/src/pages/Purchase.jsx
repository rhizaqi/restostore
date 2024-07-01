import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { menuById } from "../features/MenuSlice"
import { Link, useParams } from "react-router-dom"
import Navbar from '../components/Navbar'
import axios from "axios"


export default function Purchase(){

    const dispatch = useDispatch()
    const {menuId} = useParams()

    const detail = useSelector(state => state.menu.one)
    
    const handlePurchase = async ()=>{

        const {data} = await axios({
            method: 'get',
            url: `http://localhost:3456/order/${menuId}/payment/midtrans/initiate`,
            headers: {
                Authorization: `Bearer ` + localStorage.getItem("access_token")
            }

        })

        console.log(data, `ini mau bayar`);

        window.snap.pay(data.transactionToken, {
            onSuccess:  async function(result){
              /* You may add your own implementation here */
              alert("payment success!"); console.log(result);

              await axios({
                method: 'patch',
                url: 'http://localhost:3456/order/payment/success',
                data: {orderId: data.idOrder},
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("access_token")
                }
              })
            },

          })
    }

    useEffect(()=>{
        dispatch(menuById(menuId))
    }, [])
    
    return(
        <div>
            <Navbar/>
            <div className="card mb-3" style={{width: "540px", marginTop:"20px", marginLeft:"20px"}}>
                <div className="row g-0">
                <div className="col-md-4">
                <img src={detail.imgUrl} style={{width:"200px", height:"200px"}} className="img-fluid rounded-start"/>
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title"> {detail.name}</h5>
                    <p className="card-text"> {detail.description}</p>
                    <Link>
                        <button onClick={handlePurchase} type="button" className="btn btn-primary"> Buy: ${detail.price} </button>
                    </Link>
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}