import React from 'react';
import styles from './header.module.scss';
import { NavLink } from "react-router-dom";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {

  const activeStyles = ({isActive}: {isActive: boolean}) => {
    return {
      color: isActive ? 'red' : 'white'
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Text Editor</h1>
        </div>
        <nav className={styles.links}>
          <NavLink to='/' style={activeStyles}>Main</NavLink>
          <NavLink to='/edit' style={activeStyles} >Edit File</NavLink>
        </nav>
      </div>
    </header>
  )
};

export default Header