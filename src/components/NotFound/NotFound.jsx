import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <main>
    <section className="NotFound">
      <div className="NotFound__wrap">
        <h1 className="NotFound__title list">404</h1>
        <p className="NotFound__description list">Страница не найдена</p>
        <Link className="NotFound__link" to='/'>Назад</Link>
      </div>
    </section>
  </main>
);
export default NotFound;
