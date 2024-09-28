import React from "react";
import { useNavigate } from "react-router-dom";

const StylistList = ({ stylist }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="hcard"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/stylist/book-appointment/${stylist._id}`)}
      >
        <div className="hcard-header">
          {stylist.firstName} {stylist.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>{stylist.specialization}</b>
          </p>
          <p>
            <b>Experience: </b> {stylist.experience}
          </p>
          <p>
            <b>Contact No: </b>
            {stylist.phone}
          </p>
          <p>
            <b>Timings: </b>
            {stylist.timings[0]} - {stylist.timings[1]}
          </p>
        </div>
      </div>
    </>
  );
};

export default StylistList;
