import React from 'react';
import logo from './../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import './styles.css';

function Header() {
    return (
        <header id="app-header">
            <div className="app-header-group app-header-group-left">
                <nav id="app-header-navigation">
                    <ul id="app-header-navigation-list">
                        <li className="app-header-navigation-list-item">
                            <a href="#" className="app-header-navigation-list-item-link btn btn-primary inactive">
                                <FontAwesomeIcon icon={faHome} />
                            </a>
                        </li>
                        <li className="app-header-navigation-list-item">
                            <a href="#" className="app-header-navigation-list-item-link btn btn-primary inactive">
                                Boards
                        </a>
                        </li>
                    </ul>
                </nav>
                <form id="search-board-form" role="search">
                    <input type="search" id="search-board-input" disabled className="inactive" />
                    <button type="button" id="search-board-btn" className="inactive">
                        <FontAwesomeIcon icon={faSearch} className="app-header-icon" />
                    </button>
                </form>
            </div>
            <img src={logo} alt="Logo" id="logo" />
            <div className="app-header-group app-header-group-right">
                <button type="button" className="btn btn-primary inactive" id="extras">
                    <FontAwesomeIcon icon={faPlus} className="app-header-icon" />
                </button>
                <button type="button" className="btn btn-primary inactive" id="info">
                    <FontAwesomeIcon icon={faInfoCircle} className="app-header-icon" />
                </button>
                <button type="button" id="notifications" className="btn btn-blue inactive">
                    <FontAwesomeIcon icon={faBell} className="app-header-icon"/>
                </button>
                <button type="button" className="inactive" id="profile-btn">RL</button>
            </div>
        </header>
    );
}

export default Header;