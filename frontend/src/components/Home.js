import React, { useEffect } from 'react';
import Metadata from './layout/Metadata';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../actions/productsActions';
import Product from './product/Product';
import Loader from './layout/Loader';
import { useAlert } from 'react-alert';

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, products, error, productsCount } = useSelector(
    state => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getAllProducts());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="Compre os Melhores Produtos Online" />
          <h1 id="products_heading">Últimas novidades</h1>

          <section id="products" class="container mt-5">
            <div className="row">
              {products &&
                products.map(product => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
