import React from 'react';
import Metadata from './layout/Metadata';

const Home = () => {
  return (
    <>
      <Metadata title="Compre os Melhores Produtos Online" />
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" class="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
              <img
                alt="Product"
                className="card-img-top mx-auto"
                src="https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <a href="/">
                    128GB Solid Storage Memory card - SanDisk Ultra
                  </a>
                </h5>
                <div className="ratings mt-auto">
                  <div className="rating-outer">
                    <div className="rating-inner"></div>
                  </div>
                  <span id="no_of_reviews">(5 Reviews)</span>
                </div>
                <p className="card-text">$45.67</p>
                <a href="/" id="view_btn" className="btn btn-block">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
