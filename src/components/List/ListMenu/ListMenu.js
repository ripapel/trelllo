import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

class ListMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'List Actions',
            isMakingCopy: false
        }
    }

    toggleIsCopyingList = () => {
        this.setState((prevState) => ({
            isMakingCopy: !prevState.isMakingCopy,
            title: prevState.title === 'List Actions' ? 'Copy List' : 'List Actions'
        }));
    }

    renderBody = () => {
        if (this.state.isMakingCopy === true) {
            return (
                <div className="list-body change-list-name">
                    <label>Name </label>
                    <textarea defaultValue={this.props.listCopyName} onChange={this.props.handleChangeListCopyTitle}></textarea>
                    <button
                        className="btn btn-green"
                        onClick={this.props.handleMakeCopyOfList}
                    >Copy List</button>
                </div>
            );
        }
        else {
            return (
                <div className="list-body">
                    <button className="list-menu-action-list-btn" onClick={this.toggleIsCopyingList}>Copy List...</button>
                    <button className="list-menu-action-list-btn" onClick={this.props.handleDeleteList} >Delete List...</button>
                </div>
            );
        }
    }


    render() {
        return (
            <div className={this.props.isShowing ? 'list-menu' : 'list-menu hidden'}>
                <div className="list-menu-header">
                    <span className="list-menu-header-title">List Actions</span>
                    <button
                        onClick={() => {
                            this.props.toggleShowListMenu()
                            if (this.state.isMakingCopy)
                                this.toggleIsCopyingList()
                        }
                        }
                        className="list-menu-header-close-btn">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                {
                    this.renderBody()
                }

            </div>
        );
    }

}

export default ListMenu;