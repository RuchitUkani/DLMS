import React, { useState } from 'react'
import axios from 'axios'
import "./login.css"
import { useHistory, withRouter, } from 'react-router-dom/cjs/react-router-dom.min'
import { bindActionCreators } from 'redux'
import {actionCreators} from "../state/index.js"
import { useDispatch } from 'react-redux'

function Login() {

    const dispatch = useDispatch()

    const history = useHistory()

    const [user, setUser] = useState({
        userName: "",
        password: ""
    })

    const [error, setError] = useState("")

    const handleChange = (e) =>{
        const {post, name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8000/api/v1/users/login", user)
            console.log(response.data.data.user.userName);
            dispatch(actionCreators.loginUser(response.data.data.user.userName))
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('user', JSON.stringify(response.data.data.user.userName));
            console.log(response.data.data.user.post);
            const post = response.data.data.user.post
            if(post=="manager"){
                history.push(`/manager`)
            }else{
                history.push("/worker")
            }
        } catch (error) {
            console.log("Invalide username or password",error);
            setError("Invalid username or password")
        }
    }

  return (
    <form className='login-container' onSubmit={handleSubmit}>

        <h1>Welcome To DLMS System</h1>

        {/* <div class="mb-3">
            <label htmlFor="post" class="form-label">Post</label>
            <select 
                id="post" 
                className="form-select"
                name='post'
                value={user.post}
                onChange={handleChange}
            >
                <option value="">select</option>
                <option value="worker" >Worker</option>
                <option value="manager">Manager</option>
            </select>
        </div> */}
        <div className="mb-3">
            <label htmlFor="userName" className="form-label">Username</label>
            <input
                type="text" 
                className="form-control" 
                id="userName" 
                name='userName'
                value={user.userName}
                onChange={handleChange}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="password" class="form-label">Password</label>
            <input 
                type="password" 
                id="password" 
                className="form-control" 
                name='password'
                aria-describedby="passwordHelpBlock"
                value={user.password}
                onChange={handleChange}
            />
        </div>
        {error && <p style={{color:'red'}}>{error}</p>}
        <button type="submit" className="btn btn-primary">Login</button>
    </form>
  )
}

export default withRouter(Login)