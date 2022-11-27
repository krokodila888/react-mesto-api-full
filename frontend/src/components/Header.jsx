import logo from '../images/logo-white.svg';
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

function Header(props) {

  const {email, exitProfile} = props;

  return (
    <header className="header">
      <img src={logo} alt="Логотип Mesto" className="header__logo" />
      <div className="header__right-block">
        <Routes>
          <Route path="/sign-up" element={
              <Link to="/sign-in" className="sign__link">Войти</Link>
          }/>
          <Route path="/sign-in" element={
            <Link to="/sign-up"className="sign__link">Регистрация</Link>
          }/>
          <Route path="/" element={
            <>
              <p className='header__text'>{email}</p>
              <Link to="/sign-in" className="sign__link" onClick={exitProfile}>Выйти</Link>
            </>
          }/>
        </Routes> 
      </div>
    </header>
    );
  }

export default Header;
