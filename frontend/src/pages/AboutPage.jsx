import React from 'react'
import { Footer, Navbar } from "../components";
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
          At Shopme, we are dedicated to providing a seamless
          online shopping experience, offering a diverse range of high-quality
          products at competitive prices. Founded in [Year], our mission is to
          make top-notch products accessible to everyone while prioritizing
          customer satisfaction and sustainability. From fashion and electronics
          to home essentials, we carefully curate items that meet the needs and
          preferences of our customers. With a strong focus on innovation,
          eco-friendly practices, and community engagement, we strive to be more
          than just a store—we aim to be a trusted partner in enhancing your
          lifestyle. Join us on this journey and discover a better way to shop!
        </p>

        <h2 className="text-center py-4">Our Products</h2>
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img
                className="card-img-top img-fluid"
                src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                height={160}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Mens's Clothing</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img
                className="card-img-top img-fluid"
                src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                height={160}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Women's Clothing</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img
                className="card-img-top img-fluid"
                src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                height={160}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Jewelery</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img
                className="card-img-top img-fluid"
                src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                height={160}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Electronics</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage