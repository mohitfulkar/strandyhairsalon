import React from "react";
import Layout from "./../components/Layout.js";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  //   handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("somthing went wrong");
    }
  };

  //delete notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Error deleting all read notifications");
    }
  };

  const items = [
    {
      key: "0",
      label: "New",
      children: (
        <div>
          <div className="d-flex justify-content-end">
            <h4 className="p-2 text-success markbut" style={{ cursor: 'pointer' }} onClick={handleMarkAllRead}>
              Mark all as read
            </h4>
          </div>
          {user?.notification.map((notificationMsg) => (
            <div
              key={notificationMsg.id}
              className="apcard"
              style={{ cursor: "pointer" }}
            >
              <div
                className="card-text"
                onClick={() => navigate(notificationMsg.onClickPath)}
              >
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "1",
      label: "Read",
      children: (
        <div>
          <div className="d-flex justify-content-end">
            <h4 className="p-2 text-danger delbut" style={{ cursor: 'pointer' }} onClick={handleDeleteAllRead}>
              Delete
            </h4>
          </div>
          {user?.seenNotification.map((notificationMsg) => (
            <div
              key={notificationMsg.id}
              className="apcard"
              style={{ cursor: "pointer" }}
            >
              <div
                className="card-text"
                onClick={() => navigate(notificationMsg.onClickPath)}
              >
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h4 className="p-3">Notifications</h4>
      <Tabs items={items} />
    </Layout>
  );
};

export default NotificationPage;
