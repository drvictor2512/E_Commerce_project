import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import './LoginPage.css'
import {z} from 'zod' 
import { zodResolver } from '@hookform/resolvers/zod'
import { getUser, login } from '../../services/userServices'
import { Navigate, useLocation } from 'react-router-dom'
const schema = z.object({
    email: z.string().email({message: "Invalid Email"}).min(6),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
})
const LoginPage = () => {
    const {register, handleSubmit, formState : {errors}} = useForm({resolver: zodResolver(schema)});
    const [formError, setFormError] = useState("");
    const location = useLocation();
    const onSubmit = async (formData) => {
        try {
           const {data} = await login(formData);
            localStorage.setItem('token', data.token);
            const {state} = location;
            window.location = state? state.from : '/';
        } catch (err) {
            if(err.response && err.response.status === 400){
                setFormError(err.response.data.message)
            }
        }
    }
    if(getUser()){
        return <Navigate to='/' />
    }
  return (
    <section className="align_center form_page">
        <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Login Form</h2>
            <div className="form_input">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' className='form_text_input' {...register("email")} placeholder='Enter your email'/>
                    {errors.email && (<em className='form_error'>{errors.email.message}</em>)}
                    
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' className='form_text_input' {...register("password")} placeholder='Enter your phone number'/>
                    {errors.password && (<em className='form_error'>{errors.password.message}</em>)}
                </div>
                {formError && <em className='form_error'>{formError}</em>}
                <button type='submit' className='search_button form_submit'>Submit</button>
            </div>
        </form>
    </section>
  )
}

export default LoginPage