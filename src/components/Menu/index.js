import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/Logo.png';
import './Menu.css';
import Button from '../Button';

function Menu() {
  return (
    <nav className="Menu">
      <Link to="/">
        <img className="Logo" src={Logo} alt="Devflix logo" />
      </Link>
      <div className="Buttons">
        <Button as={Link} className="ButtonLink" to="/cadastro/categoria">
          Nova Categoria
        </Button>

        <Button as={Link} className="ButtonLink" to="/cadastro/video">
          Novo Vídeo
        </Button>
      </div>

    </nav>
  );
}

export default Menu;
