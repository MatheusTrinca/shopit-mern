import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const searchHandler = useCallback(
    e => {
      e.preventDefault();
      if (keyword.trim()) {
        navigate(`/search/${keyword}`);
      } else {
        navigate('/');
      }
    },
    [keyword, navigate]
  );

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Digite o Nome do Produto ..."
          onChange={e => setKeyword(e.target.value)}
          value={keyword}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
