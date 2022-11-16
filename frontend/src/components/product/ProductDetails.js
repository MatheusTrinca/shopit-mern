import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail, clearErrors } from '../../actions/productsActions';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader';
import Carousel from 'react-bootstrap/Carousel';

const ProductDetails = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { id } = useParams();

  const { product, loading, error } = useSelector(
    state => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetail(id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, id, alert, error]);

  console.log(product);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="row f-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <Carousel>
              {product.images &&
                product.images.map(image => (
                  <Carousel.Item key={image.public_id}>
                    <img
                      className="d-block w-100"
                      src={image.url}
                      alt={product.title}
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>

          <div className="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">Produto # {product._id}</p>

            <hr />

            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Avaliações)</span>

            <hr />

            <p id="product_price">R${product.price}</p>
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus">-</span>

              <input
                type="number"
                className="form-control count d-inline"
                value="1"
                readOnly
              />

              <span className="btn btn-primary plus">+</span>
            </div>
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
            >
              Adcionar ao Carrinho
            </button>

            <hr />

            <p>
              Status:{' '}
              <span
                id="stock_status"
                className={product.stock > 0 ? 'greenColor' : 'redColor'}
              >
                {product.stock > 0 ? 'Em estoque' : 'Indisponível'}
              </span>
            </p>

            <hr />

            <h4 className="mt-2">Descrição:</h4>
            <p>{product.description}</p>
            <hr />
            <p id="product_seller mb-3">
              Vendido por: <strong>{product.seller}</strong>
            </p>

            <button
              id="review_btn"
              type="button"
              className="btn btn-primary mt-4"
              data-toggle="modal"
              data-target="#ratingModal"
            >
              Envie sua Avaliação
            </button>

            <div className="row mt-2 mb-5">
              <div className="rating w-50">
                <div
                  className="modal fade"
                  id="ratingModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="ratingModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="ratingModalLabel">
                          Sua Avaliação
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <ul className="stars">
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                        </ul>

                        <textarea
                          name="review"
                          id="review"
                          className="form-control mt-3"
                        ></textarea>

                        <button
                          className="btn my-3 float-right review-btn px-4 text-white"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          Enviar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
