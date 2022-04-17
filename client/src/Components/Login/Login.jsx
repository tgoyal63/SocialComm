import React, { useState, useEffect } from "react"
import "./Login.scss"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../Context/appContext"
import { toast } from "react-toastify"

const initialState = {
  username: "",
  password: "",
}

export const Login = (props) => {
  const [values, setValues] = useState(initialState)
  const navigate = useNavigate()
  const { token, loginUser, isLogin } = useAppContext()
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const { username, password } = values
    const currentUser = { username, password }
    const data = await loginUser(currentUser);
    if (data.statusCode === 200)
      toast("Login Success");
    else
      toast(data.message);
  }

  useEffect(() => {
    setTimeout(() => {
      if (token) {
        navigate("/dashboard")
      }
    }, 900)

  }, [token, navigate])

  return (
    <>
      <div className='loginBox text-center'>
        <form onSubmit={onSubmit}>
          <div className='inputBox'>
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={values.username}
              onChange={handleChange}
              required
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className=' loginbtn' type='submit'>
            SIGNIN
          </button>
        </form>
      </div>
    </>
  )
}
