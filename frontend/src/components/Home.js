import React, { useEffect, useState } from 'react';
import Metadata from './layout/Metadata';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../actions/productsActions';
import Product from './product/Product';
import Loader from './layout/Loader';
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';

const Home = () => {
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    dispatch(getAllProducts(currentPage));
  }, [dispatch, error, currentPage]);

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
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
          {productsCount >= resPerPage && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPage}
                firstPageText={'Primeira'}
                lastPageText={'Última'}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
