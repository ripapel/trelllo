import React, { Component } from 'react';

import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faInfoCircle, faBrush, faStickyNote, faEllipsisH, faCheckSquare, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import BackgroundType from '../Background';

const menuTitles = ['Menu', 'Change Background', ['Colors', 'Photos']];

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            changeBackground: false,
            colorMenu: false,
            imageMenu: false,
            menuTitle: menuTitles[0]
        }
    }

    toggleMenuControl = () => {
        if (this.state.colorMenu || this.state.imageMenu) {
            this.setState(() => ({
                colorMenu: false,
                imageMenu: false
            }));
        } else this.toggleBackgroundMenu()
    }


    toggleBackgroundMenu = () => {
        this.setState((prevState) => ({
            changeBackground: !prevState.changeBackground,
            menuTitle: prevState.changeBackground ? menuTitles[0] : menuTitles[1]
        }))
    }

    toggleColorMenu = () => {
        this.setState((prevState) => ({
            colorMenu: !prevState.colorMenu,
            menuTitle: !prevState.colorMenu ? menuTitles[2][0] : menuTitles[1]
        }));
        this.props.handleBackgroundColor();
    }

    toggleImageMenu = () => {
        this.setState((prevState) => ({
            imageMenu: !prevState.imageMenu,
            menuTitle: !prevState.imageMenu ? menuTitles[2][1] : menuTitles[1]
        }));
        this.props.handleBackgroundImage();
    }

    renderMainMenuOptions() {
        if (this.state.changeBackground)
            return;
        else
            return (<>
                <ul id="board-main-menu-navigation">
                    <li className="board-main-menu-navigation-item">
                        <button type="button" className="board-main-menu-navigation-btn inactive">
                            <FontAwesomeIcon className="board-main-menu-navigation-btn-icon" icon={faInfoCircle} />
                            <div className="navigation-btn-description-group">
                                <span className="board-main-menu-btn-name">
                                    About This Board
                                        </span>
                                <span className="board-main-menu-navigation-summary">
                                    Add a description to your board
                                        </span>
                            </div>
                        </button>
                    </li>
                    <li className="board-main-menu-navigation-item">
                        <button
                            type="button"
                            className="board-main-menu-navigation-btn"
                            onClick={this.toggleBackgroundMenu}
                        >
                            <FontAwesomeIcon icon={faBrush} className="board-main-menu-navigation-btn-icon" />
                            <span className="board-main-menu-btn-name">
                                Change Background
                                    </span>
                        </button>
                    </li>
                    <li className="board-main-menu-navigation-item">
                        <button type="button" className="board-main-menu-navigation-btn inactive">
                            <FontAwesomeIcon icon={faInfoCircle} className="board-main-menu-navigation-btn-icon" />
                            <span className="board-main-menu-btn-name">
                                Search Cards
                                    </span>
                        </button>
                    </li>
                    <li className="board-main-menu-navigation-item">
                        <button type="button" className="board-main-menu-navigation-item-btn inactive">
                            <FontAwesomeIcon icon={faStickyNote} className="board-main-menu-navigation-btn-icon" />
                            <span className="board-main-menu-btn-name">
                                Stickers
                                    </span>
                        </button>
                    </li>
                    <li className="board-main-menu-navigation-item">
                        <button type="button" className="board-main-menu-navigation-btn inactive">
                            <FontAwesomeIcon icon={faEllipsisH} className="board-main-menu-navigation-btn-icon" />
                            <span className="board-main-menu-btn-name">
                                More
                                    </span>
                        </button>

                    </li>
                </ul>
                <hr />
                <div className="board-main-menu-open-section-activity">
                    <FontAwesomeIcon icon={faCheckSquare} className="board-main-menu-open-section-activity-icon" />
                    <span className="board-main-menu-btn-name">
                        Activity
                            </span>
                </div></>)
    }

    render() {
        const showMenu = this.props.showMenu;
        return (
            <div id="board-main-menu" className={showMenu === true ? '' : 'hidden'}>
                <div id="board-main-menu-header">
                    <button
                        className={this.state.changeBackground ? '' : 'hidden'}
                        onClick={this.toggleMenuControl}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <h3 id="board-main-menu-header-title">{this.state.menuTitle}</h3>
                    <button type="button" id="close-board-main-menu" onClick={this.props.handleToggleShowMenu}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <hr />
                <div id="board-main-menu-content">
                    <BackgroundType
                        changeBackground={this.state.changeBackground}
                        imageMenu={this.state.imageMenu}
                        colorMenu={this.state.colorMenu}
                        toggleColorMenu={this.toggleColorMenu}
                        toggleImageMenu={this.toggleImageMenu}
                        handleBackgroundChange={this.props.handleBackgroundChange}
                    />
                    {this.renderMainMenuOptions()}
                </div>
            </div>
        )
    }
}

export default Menu;