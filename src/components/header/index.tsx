import 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
        <p><NavLink to={'https://github.com/gabriel-codart/HAL9000'}>GitHub</NavLink></p>
    </header>
  )
}

export default Header;
