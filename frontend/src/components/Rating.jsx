import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ rating }) => {
  return (
    <div>
      <span>
        {rating >= 1 ? (
          <FaStar color="orange" />
        ) : rating >= 0.5 ? (
          <FaStarHalfAlt color="orange" />
        ) : (
          <FaRegStar color="orange" />
        )}
      </span>
      <span>
        {rating >= 2 ? (
          <FaStar color="orange" />
        ) : rating >= 1.5 ? (
          <FaStarHalfAlt color="orange" />
        ) : (
          <FaRegStar color="orange" />
        )}
      </span>
      <span>
        {rating >= 3 ? (
          <FaStar color="orange" />
        ) : rating >= 2.5 ? (
          <FaStarHalfAlt color="orange" />
        ) : (
          <FaRegStar color="orange" />
        )}
      </span>
      <span>
        {rating >= 4 ? (
          <FaStar color="orange" />
        ) : rating >= 3.5 ? (
          <FaStarHalfAlt color="orange" />
        ) : (
          <FaRegStar color="orange" />
        )}
      </span>
      <span>
        {rating >= 5 ? (
          <FaStar color="orange" />
        ) : rating >= 4.5 ? (
          <FaStarHalfAlt color="orange" />
        ) : (
          <FaRegStar color="orange" />
        )}
      </span>
    </div>
  );
};

export default Rating;
