import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import './styles.css';

class BoardHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChangingName: false,
            newBoardName: ''
        };
        this.toggleChangeName = this.toggleChangeName.bind(this);
    }

    getInitials = (text) => {
        return text.split(' ').map(s => s.charAt(0)).join('').toUpperCase();
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter')
            this.toggleChangeName()
    }

  

    handleSaveBoardName = () => {
        this.props.handleSaveNewBoardName();
        this.setState({
            isChangingName: false
        })
    }


    toggleChangeName() {
        const isChangingName = this.state.isChangingName;
        this.setState({ isChangingName: !isChangingName });
    }

    render() {
        return (
            <header id="board-header">
                <div id="board-header-group-mod-left">
                    <button type="button" className={this.state.isChangingName === false ? "btn" : "btn hidden"} id="change-board-name-btn" onClick={this.toggleChangeName}>
                        <span className="board-name" >{this.props.boardName}</span>
                    </button>
                    <input type="text"
                        onBlur={() => {
                            this.handleSaveBoardName()
                        }}
                        className={this.state.isChangingName === true ? "board-name" : "board-name hidden"}
                        value={this.props.newBoardName}
                        ref={input => input && input.focus()}
                        onKeyPress={this.handleKeyPress}
                        onChange={this.props.handleChangeBoardName}
                    />
                    <button className="btn btn-primary inactive" id="btn-star-board">
                        <FontAwesomeIcon icon={faStar} />
                    </button>

                    <span className="board-header-group-divider"></span>

                    <button className="btn btn-primary inactive" id="btn-personal-board">Personal</button>
                    <span className="board-header-group-divider"></span>
                    <button className="btn btn-primary inactive">Private</button>
                    <span className="board-header-group-divider"></span>
                    <div id="board-members-group">{
                        this.props.members.map((m, index) =>
                            <button type="button" key={index} className="board-member">{this.getInitials(m)}</button>)
                    }
                    </div>
                </div>

                <div id="board-header-group-mod-right">
                    <button type="button" className="btn btn-primary inactive">Calendar</button>
                    <button type="button" className="btn btn-primary" onClick={this.props.handleToggleShowMenu}>Show Menu</button>
                </div>
            </header>
        );
    }
}

export default BoardHeader;