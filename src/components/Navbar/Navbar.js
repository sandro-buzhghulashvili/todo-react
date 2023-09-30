import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Styles from './Navbar.module.css';

const Navbar = (props) => {
  return (
    <nav>
      <h1 className={Styles.header}>todo</h1>
      <FontAwesomeIcon
        onClick={props.displayForm}
        icon={faPlus}
        className={Styles.plus}
      />
    </nav>
  );
};

export default Navbar;
