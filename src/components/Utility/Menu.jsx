import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = ({ setFilter, data, isDarkTheme, filmText, category }) => {
    const textClassName = isDarkTheme ? 'textColorDark' : 'textColorLight';
    const location = useLocation();

    let activeMenuItem = '';

    if (location.pathname === '/about') {
        activeMenuItem = 'About';
    } else if (location.pathname === '/contact') {
        activeMenuItem = 'Contact';
    } else if (location.pathname === '/') {
        if (category === 'Film' || category === 'Artist Film' || category === 'Commercial Film') {
            activeMenuItem = 'Film';
        } else {
            activeMenuItem = 'Art';
        }
    }

    return (
        <div id="overlay-menu-desktop" className="menu">
            <div id="menu-desktop-top">
                <p className={textClassName}>
                    <span>LUCA ASTA </span>
                    {data?.[0]?.short_bio}
                </p>
                <Link
                    className={`${textClassName} ${activeMenuItem === 'Art' ? 'activeMenuItem' : ''}`} to="/" onClick={() => setFilter('Art')}
                >
                    Art
                </Link>
                <br />
                <Link
                    className={`${textClassName} ${activeMenuItem === 'Film' ? 'activeMenuItem' : ''}`} to="/" onClick={() => setFilter('Film')}
                >
                    Film
                </Link>
                <br />
                <Link className={`${textClassName} ${activeMenuItem === 'About' ? 'activeMenuItem' : ''}`} to="/about"
                >
                    About
                </Link>
                <br />
                <Link className={`${textClassName} ${activeMenuItem === 'Contact' ? 'activeMenuItem' : ''}`} to="/contact"
                >
                    Contact
                </Link>
            </div>
            <div id="menu-desktop-bottom">
                <p className={filmText === '' ? textClassName + ' filmText' : textClassName + ' filmText activeFilmText'}>{filmText}</p>
            </div>
        </div>
    );
};

export default Menu;