import React, {useEffect, useState} from 'react';
import Layout from "./../../components/Layout.js"
import axios from 'axios';
import { Table } from 'antd';

const Users = () => {
  const [users, setUsers] = useState([]);

  //get all users
  const getUsers = async() => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getUsers();
  }, []);

  //table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Stylist",
      dataIndex: "isStylist",
      render: (text, record) => <span>{record.isStylist ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2 ptitle">Users List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  )
};

export default Users;