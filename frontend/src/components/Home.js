import React, { useEffect } from 'react';
import MetaData from './layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productsActions';

const Home = () => {
  const dispatch = useDispatch();

  const { productsCount, loading, error, products } = useSelector(
    state => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <MetaData title="Compre Produtos Online" />
      <h1 id="products_heading">Útimos Produtos</h1>
      <section id="products" className="container mt-5">
        <div className="row">
          {products &&
            products.map(product => (
              <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                <div className="card p-3 rounded">
                  <img
                    className="card-img-top mx-auto"
                    src={product.images[0].url}
                    alt="Product"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      <a href="#link">{product.name}</a>
                    </h5>
                    <div className="ratings mt-auto">
                      <div className="rating-outer">
                        <div className="rating-inner"></div>
                      </div>
                      <span id="no_of_reviews">(5 Reviews)</span>
                    </div>
                    <p className="card-text">$45.67</p>
                    <a href="#link" id="view_btn" className="btn btn-block">
                      Detalhes
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default Home;
