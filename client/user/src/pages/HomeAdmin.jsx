import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dataMenu } from "../features/MenuSlice"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

export default function HomeCust(){
    const dispatch = useDispatch()
    
    const menu = useSelector(state => state.menu.list)
    
    async function deleteBang(event, id){
        event.preventDefault()
        try {
            await axios({
                method: "delete",
                url: `http://localhost:3456/menu/delete/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            dispatch(dataMenu())
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        dispatch(dataMenu())
    },[])

    return(
        <div>
            <div className="container" style={{textAlign:"center"}}>
            <h1> LIST MENU'S </h1>
            <Link to={'/add'}>
                <button style={{marginLeft:"10px"}} className="btn border border-danger" type="submit"> Add New Menu </button>
            </Link>
            </div> <br />
            
            <div className="container" style={{width:"100vw", margin:"auto"}}>
            <table className="table">
                <thead style={{textAlign:"center"}}>
                    <tr className="table-warning">
                        <th> No </th>
                        <th> Name </th>
                        <th> Price </th>
                        <th> Description </th>
                        <th> Image </th>
                        <th> Action </th>
                    </tr>
                </thead>
                <tbody style={{textAlign:"center"}}>
                    {menu.map((el,i)=>{
                        return (
                        <tr key={i}>
                            <td> {i + 1} </td>
                            <td> {el.name} </td>
                            <td> $ {el.price} </td>
                            <td> {el.description} </td>
                            <td> <img  src={el.imgUrl} style={{width:"70px"}}/></td>
                            <td> <div className='d-inline-flex gap-1'>
                                    <Link to={`/edit/${el.id}`}>
                                        <button type="button" className="btn btn-warning"> Edit </button>
                                    </Link>

                                    <Link onClick={(event)=>deleteBang(event, el.id)} >
                                        <button type="button" className="btn btn-secondary"> Delete </button>
                                    </Link>

                                </div>
                            </td>
                        </tr>
                            )
                        })}
                </tbody>
            </table>
            </div>
    </div>
    )
}