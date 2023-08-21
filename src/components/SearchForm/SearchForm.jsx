import { useState } from 'react';
import './SearchForm.css';

function SearchForm() {
  const [checked, setChecked] = useState(true);

  return (
    <section className="SearchForm">
      <div className="SearchForm__wrap">
        <form className="SearchForm__form">
          <input className="SearchForm__input reset-txt" type="text" placeholder="Фильм"/>
          <button className="SearchForm__btn" type="submit">Найти</button>
          <div className="SearchForm__search-checkbox">
            <label className="SearchForm__switch">
              <input className="SearchForm__checked-btn" onClick={() => setChecked(!checked) } checked={checked} type="checkbox"/>
              <span className="SearchForm__slider-btn"></span>
            </label>
            <p className="SearchForm__title reset-txt">Короткометражки</p>
          </div>

        </form>
      </div>

    </section>
  );
}
export default SearchForm;
