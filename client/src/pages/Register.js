import React from "react";
import { Form, Button, Input, message } from "antd";
import { LuSmilePlus } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice.js';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/register', values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registered Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Error occurred while registering");
    }
  };
  return (
    <>
      <div className="authentication">
        <div className="auth-container card p-4">
          <h1 className="card-title">
            Register <LuSmilePlus />
          </h1>
          <Form layout="vertical" onFinish={onfinishHandler}>
            <Form.Item className="label" label="Username:" name="name">
              <Input
                type="text"
                className="input"
                placeholder="Enter your username"
                required
              />
            </Form.Item>
            <Form.Item className="label" label="Email Id:" name="email">
              <Input
                type="email"
                className="input"
                placeholder="Enter your email id"
                required
              />
            </Form.Item>
            <Form.Item className="label" label="Contact No:" name="contactno">
              <Input
                className="input"
                placeholder="Enter your contact no"
                required
              />
            </Form.Item>
            <Form.Item className="label" label="Password:" name="password">
              <Input
                className="input"
                placeholder="Enter your password"
                type="password"
                required
              />
            </Form.Item>

            <Button className="primary-but my-2" htmlType="submit">
              REGISTER
            </Button>

            <Link to="/login" className="anch mt-3">
              Already have an account? <span className="log">LOGIN</span>
            </Link>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
