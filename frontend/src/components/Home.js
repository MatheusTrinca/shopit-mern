import React, { useEffect } from 'react';
import MetaData from './layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productsActions';
import Product from '../components/product/Product';
import Loader from '../components/layout/Loader';
import { useAlert } from 'react-alert';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { productsCount, loading, error, products } = useSelector(
    state => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, alert, error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <MetaData title="Compre Produtos Online" />
      <h1 id="products_heading">Útimos Produtos</h1>
      <section id="products" className="container mt-5">
        <div className="row">
          {products &&
            products.map(product => (
              <Product key={product._id} product={product} />
            ))}
        </div>
      </section>
    </>
  );
};

export default Home;
