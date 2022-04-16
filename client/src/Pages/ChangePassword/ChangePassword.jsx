import React, { useState, useEffect } from "react"
import { useAppContext } from "../../Context/appContext"
import "./ChangePassword.scss"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import NavbarComponent from "../../Components/Navbar/NavbarComponent"

const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

const ChangePassword = () => {
  const [values, setValues] = useState(initialState)
  const { token, changePassword, isError } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      if (!token) {
        navigate("/")
      }
    }, 2000)
  }, [token, navigate])

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const { currentPassword, newPassword, confirmPassword } = values
    const pwdata = { currentPassword, newPassword }

    if (newPassword !== confirmPassword) {
      toast("Password didn't matched")
    } else {
      await changePassword(pwdata)
      setTimeout(() => {
        if (isError) {
          toast("Invalid Password")
        } else {
          toast("Password Changed Successfully")
        }
      }, 600)
    }
  }
  return (
    <div className='landing-cp'>
      <NavbarComponent />
      <div className='loginBoxabc-cp'>
        <img
          className='userabc-cp'
          src='https://cdn1.iconfinder.com/data/icons/avatars-55/100/avatar_profile_user_music_headphones_shirt_cool-512.png'
          height='100px'
          width='100px'
        />
        <h3 className='cp-heading'>Change Your Password</h3>
        <div className='loginBox-cp text-center'>
          <form onSubmit={onSubmit}>
            <div className='inputBox-cp'>
              <input
                type='password'
                name='currentPassword'
                placeholder='Current Password'
                value={values.currentPassword}
                onChange={handleChange}
                required
              />
              <input
                type='password'
                name='newPassword'
                placeholder='New Password'
                value={values.newPassword}
                onChange={handleChange}
                required
              />
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                required
                value={values.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button className='loginbtn-cp' type='submit'>
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ChangePassword
