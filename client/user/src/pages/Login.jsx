import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const loginHandler = (event)=>{
        const {name, value} = event.target
        setUser({
            ...user,
            [name] : value
        })
    }

    async function submitLogin(event){
        event.preventDefault()
        try {
            
            const response = await axios({
                method: "post",
                url: "http://localhost:3456/user/login",
                data: user
            })

            console.log(user);

            localStorage.setItem('access_token', response.data.access_token)


            navigate("/home")

        } catch (error) {
            console.log(error);
        }
    }

    async function handleCredentialResponse(response) {
        try {
            console.log('handle credential');
            console.log(response);
            let tokenGoogle = await axios({
                method: "post",
                url: "http://localhost:3456/user/googleLogin",
                headers: {
                    [`google-token`] : response.credential
                }
            })

            console.log(response);

            localStorage.setItem('access_token', tokenGoogle.data.access_token)

            navigate('/home')

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        window.onload = function () {
            google.accounts.id.initialize({
              client_id: "928577377664-2dkpv75ij6legacnhkfgbb07qo3ddfcd.apps.googleusercontent.com",
              callback: handleCredentialResponse
            });
        google.accounts.id.renderButton(
              document.getElementById("buttonDiv"),
              { theme: "outline", size: "large" }
            )};
    }, [])

    return(
        <div>
        <div className="container">
            <div>
                <form style={{margin: "auto", width:"400px", marginTop:"20vh"}} onSubmit={submitLogin}>
                    <h1 style={{textAlign:"center"}}> LOGIN </h1>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                        name="email"
                        type="email"
                        className="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={loginHandler}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                        name="password"
                        type="password"
                        className="form-control" id="exampleInputPassword1"
                        onChange={loginHandler}/>
                    </div>

                    <div style={{textAlign:"center"}} >
                        You don't have account ?
                        Let's <a href="/register"> register</a> here
                    </div> <br />

                    <div style={{textAlign:"center"}}>
                        <button type="submit" className="btn btn-primary">Submit</button>

                        <div id="buttonDiv"/>
                    </div>
                </form>
            </div> 
        </div>
        </div>
    )
}