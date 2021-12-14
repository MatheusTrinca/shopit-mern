import React, { useCallback, useEffect, useState } from 'react';
import MetaData from './layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productsActions';
import Product from '../components/product/Product';
import Loader from '../components/layout/Loader';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const { productsCount, loading, error, products, resPerPage } = useSelector(
    state => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(currentPage));
  }, [dispatch, alert, error, currentPage]);

  const setCurrentPageNo = useCallback(pageNum => {
    setCurrentPage(pageNum);
  }, []);

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

      {resPerPage <= productsCount && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText={'Próxima'}
            prevPageText={'Anterior'}
            firstPageText={'Inicio'}
            lastPageText={'Final'}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </>
  );
};

export default Home;
