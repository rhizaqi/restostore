import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dataMenu } from "../features/MenuSlice"
import { Link } from "react-router-dom"

export default function HomeCust(){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(dataMenu())
    },[])

    const menu = useSelector(state => state.menu.list)

    return(
        <div>
            <div className="container" style={{textAlign:"center"}}>
            <h1> HOME BUAT CUSTOMER </h1>
            </div>

           <div className="container">
            <div className="row">
                    {menu.map((el, index) => {
                        return(
                    <div  key={index} className="p-2 g-col-6"style={{width:"18rem"}}>
                        <img src={el.imgUrl} style={{ height:"250px"}}className="card-img-top"/>
                        <div className="card-body"> <br />
                            <h5 className="card-title"> {el.name}</h5>
                            <p className="card-text"> {el.description}</p>
                            <Link to={`/order/${el.id}`}>
                                <button type="button" className="btn btn-primary"> Buy ${el.price} </button>
                            </Link>
                        </div>
                    </div>
                        )
                    })}
            </div>
           </div> <br />

    <div> <h1> DISINI MAP </h1></div>
    </div>
    )
}