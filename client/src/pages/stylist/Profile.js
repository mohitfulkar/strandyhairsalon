import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout.js";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/alertSlice.js";
import { Form, Row, Col, Input, TimePicker, message } from "antd";
import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [stylist, setStylist] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //update details
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/stylist/updateProfile",
        { ...values, userId: user._id, 
            timings: [
                moment(values.timings[0]).format("HH:mm"),
                moment(values.timings[1]).format("HH:mm"),
              ], },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  //get stylist details
  const getStylistInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/stylist/getStylistInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setStylist(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStylistInfo();
  }, []);

  return (
    <Layout>
      <h1 className="ptitle">Manage your Profile</h1>
      {stylist && (
        <Form
          layout="vertical"
          className="m-3"
          onFinish={handleFinish}
          initialValues={{
            ...stylist,
            timings: [
                moment(stylist.timings[0], "HH:mm"),
                moment(stylist.timings[1], "HH:mm"),
              ],
          }}
        >
          <h4 className="inptitle">Your Details:</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Enter your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Enter your last name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Contact No"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Enter your contacct no" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email Id"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Enter your email id" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Enter your address" />
              </Form.Item>
            </Col>
          </Row>

          <h4 className="mt-4 inptitle">Your Professional Details:</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  placeholder="Enter your specialization field"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Enter your experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Preferred Shift"
                name="timings"
                required
                rules={[{ required: true }]}
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <p className="mt-2">*Please fill all the details carefully.</p>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary mt-5 form-btn" type="submit">
                  Update
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
