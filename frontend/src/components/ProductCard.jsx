import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductCard = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded " style={{ height: "365px" }}>
      <Link to={`product/${product._id}`}>
        <Card.Img src={product.image} variant="top" height="200px" />
      </Link>
      <Card.Text as="div">
        <Rating rating={product.rating} />
      </Card.Text>

      <Card.Body>
        <Link to={`product/${product._id}`}>
          <Card.Title as="div" className="text-black">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h6">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
