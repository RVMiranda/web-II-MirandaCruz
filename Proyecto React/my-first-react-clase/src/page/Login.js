import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/login.css";

export default function Login() {
    const [user, setUSer] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUserChange = (event) => {
        setUSer(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            username: user,
            password: password,
            expiresInMins: 30,
        };
        fetLogIn(data, navigate);
    };

    return (
        <div>
            <h1>Login</h1>
            <form className="formLogin" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input className="Login-input" type="text" placeholder="enter your user name" name="username" onChange={handleUserChange} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input className="Login-input" type="password" placeholder="Password" name="password" onChange={handlePasswordChange} />
                </div>   
                <div className="Login-button-container">
                    <button className="Login-button" type="submit">Login</button>
                </div>
            </form>

        </div>
  );
}

function fetLogIn(data,  navigate){
    fetch('https://dummyjson.com/user/login',{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),

    })
    .then(response => response.json())
    .then(response => {
        const token = response?.accessToken === undefined;
        if(token){
            alert("Creedenciales incorrectas")
            return
        }
        localStorage.setItem("token", response.accessToken);
        navigate("/products");
    })
    .catch(error => {
        alert("Error al iniciar sesion")
    })
}