import 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
        <p>Aqui é o <NavLink to={''}>Header</NavLink></p>
    </header>
  )
}

export default Header;