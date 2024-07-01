import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Add(){
    const {id} = useParams()
    const navigate = useNavigate()

    const [input, setInput] = useState({
        name: "",
        price: "",
        description: "",
        imgUrl: ""
    })

    async function menuById(id){
        try {
            const {data} = await axios({
                method: "get",
                url: `http://localhost:3456menu/listMenu/${id}`,
                headers : {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setInput({
                name: data.name,
                price: data.price,
                description: data.description,
                imgUrl: data.imgUrl
            })


        } catch (error) {
            console.log(error);
        }
    }

    const handlerUpdate = (event)=>{
        const {name, value} = event.target

        setInput({
            ...input,
            [name]: value
        })
    }

    async function update(event, id){

        event.preventDefault()
        try {
            
            if(id){
                await axios({
                    method: "put",
                    url: `http://localhost:3456/menu/edit/${id}`,
                    data: input,
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem("access_token")
                    }
                })
            }else{
                await axios({
                    method: "post",
                    url: "http://localhost:3456/menu/add",
                    data: input,
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem("access_token")
                    } 
                })
            }

            navigate("/home/adm")

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(id){
            menuById(id)
        }
    },[])

    return(
        <div>
        <div className="container">
            <div>
                <form style={{
                margin: "auto",
                width:"400px",
                marginTop:"10"}} onSubmit={(event)=> update(event, id)} >
                    <h2 style={{textAlign:"center"}} > Add New </h2>
                    
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input
                    type="text" name="name" value={input.name}
                    className="form-control" id="name"
                    aria-describedby="emailHelp"
                    onChange={handlerUpdate}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"> Price </label>
                    <input
                    type="text" name="price" value={input.price}
                    className="form-control" id="price"
                    onChange={handlerUpdate}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"> Image Url </label>
                    <input
                    type="text" name="imgUrl" value={input.imgUrl}
                    className="form-control" id="imgUrl"
                    onChange={handlerUpdate}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"> Description </label>
                    <input
                    type="text" name="description" value={input.description}
                    className="form-control" id="description"
                    onChange={handlerUpdate}
                    />
                </div>
                <div style={{textAlign:"center"}}>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                </form>
            </div>
        </div>
        </div>
    )
}