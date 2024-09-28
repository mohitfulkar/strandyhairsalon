import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Layout from '../components/Layout.js';
import { Row } from 'antd';
import StylistList from '../components/StylistList.js';

const Home = () => {
  const [stylists, setStylists] = useState([]);

  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.get('/api/v1/user/getAllStylists', {
        headers: {
          Authorization : "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success){
        setStylists(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1 className='text-center ptitle'>Home</h1>
      <Row>
        {stylists && stylists.map(stylist => (
          <StylistList stylist={stylist}/>
        ))}
      </Row>
    </Layout>
  )
}

export default Home;