import { useNavigate } from "react-router-dom"

export default function Navbar(){
    const navigate = useNavigate()

    function LogOut(){
        localStorage.clear()

        navigate("/login")
    }

    return(
        <div>
            <nav className="navbar bg-danger" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                <img src="/Untitled-1.jpg" alt="Logo" width="50" height="50" className="d-inline-block align-text-top"/>
                </a>
                {/* <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-light" type="submit"> Search </button>
                </form> */}
                <div>
                    <button style={{marginLeft:"10px"}} className="btn border border-light" type="submit" onClick={LogOut}> Logout </button>
                </div>
            </div>
            </nav>
        </div>
    )
}
