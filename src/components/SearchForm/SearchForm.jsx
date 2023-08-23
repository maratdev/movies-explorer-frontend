import { useState } from 'react';
import './SearchForm.css';

function SearchForm() {
  const [checked, setChecked] = useState(true);

  return (
    <section className="SearchForm">
      <div className="SearchForm__wrap">
        <form className="SearchForm__form">
          <input className="SearchForm__input list" type="text" placeholder="Фильм"/>
          <button className="SearchForm__btn" type="submit" aria-label="поиск">Найти</button>
          <div className="SearchForm__search-checkbox">
            <label className="SearchForm__switch">
              <input className="SearchForm__checked-btn" onClick={() => setChecked(!checked)} defaultChecked={checked}
                     type="checkbox"/>
              <span className="SearchForm__slider-btn"></span>
            </label>
            <p className="SearchForm__title list">Короткометражки</p>
          </div>

        </form>
      </div>

    </section>
  );
}

export default SearchForm;
