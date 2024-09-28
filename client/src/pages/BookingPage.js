import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice.js";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [stylists, setStylists] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/stylist/getStylistById",
        { stylistId: params.stylistId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setStylists(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //booking function
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Please select date and time");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          stylistId: params.stylistId,
          userId: user._id,
          stylistInfo: stylists,
          userInfo: user,
          date: date,
          time: time,
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
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  //availability
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availability",
        { stylistId: params.stylistId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h3 className="ptitle">Book An Appointment</h3>
      <div className="container">
        {stylists && (
          <div>
            <h4 className="inptitle">
              {stylists.firstName} {stylists.lastName}
            </h4>
            <h4 className="inptitle">{stylists.specialization}</h4>
            <h4 className="inptitle">Contact No: {stylists.phone}</h4>
            <h4 className="inptitle">Email Id: {stylists.email}</h4>
            {/* <h4>Timings: {stylists.timings && stylists.timings[0]} - {" "} {stylists.timings && stylists.timings[1]}{" "}</h4> */}

            <p className="m-1 mt-3 fst-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              condimentum velit id sem ornare lobortis. Quisque viverra lorem
              non varius consequat. Curabitur pharetra lacus vitae nibh
              tincidunt malesuada. Orci varius natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus. Nulla non tortor urna.
              Nullam placerat, nisl id dapibus porta, lectus ipsum varius leo,
              id consectetur augue velit nec dolor.
            </p>

            <div className="d-flex flex-column w-50 mt-3 bg-info-subtle p-3 rounded-1 border border-dark-subtle">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                className="m-2"
                format="HH:mm"
                onChange={(value) => {
                  setTime(moment(value).format("HH:mm"));
                }}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button>

              <button className="btn btn-success mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
