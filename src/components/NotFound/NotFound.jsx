import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = ({ visibleHeader, setVisibleComponent, visibleComponent }) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname !== visibleHeader) {
      setVisibleComponent(location.pathname);
    }
  }, [visibleComponent]);

  return (
    <main>
      <section className="NotFound">
        <div className="NotFound__wrap">
          <h1 className="NotFound__title list">404</h1>
          <p className="NotFound__description list">Страница не найдена</p>
          <a className="NotFound__link" onClick={() => navigate(-1)}>Назад</a>
        </div>
      </section>
    </main>
  );
};
export default NotFound;
