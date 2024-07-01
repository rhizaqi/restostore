import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register(){
    const navigate = useNavigate()

    const [reg, setReg] = useState({
        fullname: "",
        email: "",
        password: "",
        address: "",
        role: "Customer",
    })

    const [user, setUser] = useState([])

    const regUser = (event)=>{
        const {name, value} = event.target

        setReg({
            ...reg,
            [name]: value
        })
    }

    async function newUser(event){
        event.preventDefault()

        try {
            const {update} = await axios({
                method: "post",
                url: "http://localhost:3456/user/register",
                data: reg,
            })

            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    }

    return(
    <div>
        <div className="container">
            <div>
                <form style={{
                margin: "auto",
                width:"400px",
                marginTop:"5vh"}}
                onSubmit={newUser}
                >
                    <h2 style={{textAlign:"center"}} > Lets create an account </h2> <br />
                    
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"> Fullname </label>
                    <input
                    type="text"name="fullname"
                    value={user.fullname}
                    className="form-control" id="fullname"
                    aria-describedby="emailHelp"
                    onChange={regUser}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"> Email </label>
                    <input
                    type="text" name="email"
                    value={user.email}
                    className="form-control" id="email"
                    onChange={regUser}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"> Password </label>
                    <input
                    type="password" name="password"
                    value={user.password}
                    className="form-control" id="password"
                    onChange={regUser}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"> Address </label>
                    <input
                    type="text" name="address"
                    value={user.address}
                    className="form-control" id="address"
                    onChange={regUser}
                    />
                </div>
               <div style={{textAlign:"center"}}>
                    I already have account, let's <a href="/login"> login</a>
               </div> <br />
                <div style={{textAlign:"center"}}>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                </form>
            </div>
        </div>
    </div>
    )
}