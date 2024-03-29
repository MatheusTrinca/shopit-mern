import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div key={product.id} className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img
          alt="Product"
          className="card-img-top mx-auto"
          src={product.images[0].url}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Avaliações)</span>
          </div>
          <p className="card-text">R${product.price}</p>
          <Link
            to={`/products/${product._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
