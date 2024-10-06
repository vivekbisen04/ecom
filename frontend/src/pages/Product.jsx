// frontend/src/pages/Product.js

import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/actions";
import axios from "axios"; // Import axios

import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Represents a single product
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState(null); // To handle errors
  const [error2, setError2] = useState(null); // To handle errors for similar products

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch single product from your backend using axios
        const response = await axios.get(`/api/products/${id}`);
        const data = response.data;
        setProduct(data);
        setLoading(false);

        // Fetch similar products based on category
        setLoading2(true);
        setError2(null);
        const response2 = await axios.get(
          `/api/products/category/${encodeURIComponent(data.category)}`
        );
        const data2 = response2.data;

        // Exclude the current product from similar products
        const filteredSimilar = data2.filter((item) => item._id !== data._id);
        setSimilarProducts(filteredSimilar);
        setLoading2(false);
      } catch (err) {
        console.error(err);
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        setLoading(false);
        setLoading2(false);
      }
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 py-3">
            <Skeleton height={400} width={400} />
          </div>
          <div className="col-md-6 py-5">
            <Skeleton height={30} width={250} />
            <Skeleton height={90} />
            <Skeleton height={40} width={70} />
            <Skeleton height={50} width={110} />
            <Skeleton height={120} />
            <Skeleton height={40} width={110} inline={true} />
            <Skeleton className="mx-3" height={40} width={110} />
          </div>
        </div>
      </div>
    );
  };

  const ShowProduct = () => {
    if (!product) {
      return <p>Product not found</p>;
    }

    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 col-sm-12 py-3">
            <img
              className="img-fluid"
              src={product.image}
              alt={product.name}
              width="400px"
              height="400px"
            />
          </div>
          <div className="col-md-6 py-5">
            <h4 className="text-uppercase text-muted">{product.category}</h4>
            <h1 className="display-5">{product.name}</h1>
            <p className="lead">
              {product.rating && product.rating.rate}{" "}
              <i className="fa fa-star"></i>
            </p>
            <h3 className="display-6 my-4">${product.price}</h3>
            <p className="lead">{product.description}</p>
            <button
              className="btn btn-outline-dark"
              onClick={() => addProduct(product)}
            >
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-dark mx-3">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const Loading2 = () => {
    return (
      <div className="my-4 py-4">
        <div className="d-flex">
          <div className="mx-4">
            <Skeleton height={400} width={250} />
          </div>
          <div className="mx-4">
            <Skeleton height={400} width={250} />
          </div>
          <div className="mx-4">
            <Skeleton height={400} width={250} />
          </div>
          <div className="mx-4">
            <Skeleton height={400} width={250} />
          </div>
        </div>
      </div>
    );
  };

  const ShowSimilarProduct = () => {
    if (similarProducts.length === 0) {
      return <p>No similar products found.</p>;
    }

    return (
      <div className="py-4 my-4">
        <div className="d-flex">
          {similarProducts.map((item) => (
            <div
              key={item._id}
              className="card mx-4 text-center"
              style={{ minWidth: "250px" }}
            >
              <img
                className="card-img-top p-3"
                src={item.image}
                alt={item.name}
                height={300}
                width={300}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {item.name.substring(0, 15)}...
                </h5>
              </div>
              {/* Uncomment if you want to display price
              <ul className="list-group list-group-flush">
                <li className="list-group-item lead">${item.price}</li>
              </ul>
              */}
              <div className="card-body">
                <Link
                  to={`/product/${item._id}`}
                  className="btn btn-dark m-1"
                >
                  Buy Now
                </Link>
                <button
                  className="btn btn-dark m-1"
                  onClick={() => addProduct(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        {/* Display error if any */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="row">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2>You may also Like</h2>
            {/* Display error for similar products if any */}
            {error2 && (
              <div className="alert alert-danger" role="alert">
                {error2}
              </div>
            )}
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
