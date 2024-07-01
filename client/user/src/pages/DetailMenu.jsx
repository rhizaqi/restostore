import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { menuById } from "../features/MenuSlice"
import { Link, useParams } from "react-router-dom"


export default function DetailMenu(){

    const dispatch = useDispatch()
    const {id} = useParams()

    const detail = useSelector(state => state.menu.one)
    
    useEffect(()=>{
        dispatch(menuById(id))
    }, [])
    
    return(
        <div>
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
                        <button type="button" className="btn btn-primary"> Buy: ${detail.price} </button>
                    </Link>
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}