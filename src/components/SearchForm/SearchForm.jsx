import { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({
  movieQuery, shortMovies, handleShortFilms, searchText,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!searchValue) return;
    movieQuery(searchValue.trim());
  };
  const onChangeSearchInput = (evt) => setSearchValue(evt.target.value);

  return (
    <section className="SearchForm">
      <div className="SearchForm__wrap">
        <form className="SearchForm__form" onSubmit={handleSubmit}>
          <input className="SearchForm__input list" onChange={onChangeSearchInput} defaultValue={searchText} required
                 type="text" placeholder="Фильм"/>
          <button className="SearchForm__btn" type="submit" aria-label="поиск">Найти</button>
          <div className="SearchForm__search-checkbox">
            <label className="SearchForm__switch">
              <input className="SearchForm__checked-btn" onChange={handleShortFilms} checked={!!shortMovies}
                     type="checkbox"/>
              <span className="SearchForm__slider-btn"></span>
            </label>
            <p className="SearchForm__title list">Короткометражки</p>
          </div>

        </form>
      </div>

    </section>
  );
};

export default SearchForm;
