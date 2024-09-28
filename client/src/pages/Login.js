import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { FaRegFaceSmileWink } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   //form handler
   const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/login', values);
      dispatch(hideLoading());
      //generate token
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success('Logged in successfully');
        navigate('/');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Error Occurred! Please Try Again');
    }
  };

  return (
    <div className='authentication'>
      <div className='auth-container card p-4'>
        <h1 className='card-title'>Login <FaRegFaceSmileWink /></h1>
        <Form layout='vertical' onFinish={onfinishHandler}>
          <Form.Item className='label' label="Email Id:" name='email'>
            <Input className='input' placeholder='Enter your email id' />
          </Form.Item>
          <Form.Item className='label' label="Password:" name='password'>
            <Input className='input' placeholder='Enter your password' type='password' />
          </Form.Item>

          <Button className='primary-but my-2' htmlType='submit'>LOGIN</Button>

          <Link to='/register' className='anch mt-3'>New Here? <span className='log'>REGISTER</span></Link>
        </Form>
      </div>
    </div>
  )
}

export default Login;