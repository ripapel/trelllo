import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faCheckSquare, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faTimes, faAlignLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './styles.css';

class CardModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
        }
    }
    
    setIsEditing = () => {
        this.setState({
            isEditing: true
        });
    }

    renderDescription = (card, newDescription, handleChangeDescription, handleSaveDescription) => {
        if (this.state.isEditing === true || card.description === '') {
            return (
                <>
                    <div className="description-header">
                        <FontAwesomeIcon icon={faAlignLeft} className="modal-icon" />
                        <span>Description</span>
                    </div>
                    <textarea
                        rows="5" className="card-description-textarea"
                        value={newDescription}
                        placeholder="Add a more detailed description..."
                        onChange={handleChangeDescription}
                    >
                    </textarea>
                    <button
                        className="btn btn-green btn-save-new-card-description"
                        onClick={() => {
                            handleSaveDescription()
                            this.setState({
                                isEditing: false
                            })
                        }}>Save</button>
                </>
            )
        }
        else {
            return (
                <>
                    <div className="description-header">
                        <FontAwesomeIcon icon={faAlignLeft} className="modal-icon" />
                        <span style={{ paddingRight: '20px' }}>Description</span>
                        <button onClick={this.setIsEditing} style={{textDecoration: 'underline'}}>Edit</button>
                    </div>
                    <textarea
                        rows="5" className="card-description-textarea"
                        value={card.description}
                        placeholder="Add a more detailed description..."
                        disabled
                    >
                    </textarea>
                </>
            )
        }
    }

    render() {
        const card = this.props.card;
        const toggleIsShowingModal = this.props.toggleIsShowingModal;
        const newDescription = this.props.newDescription;
        const handleChangeDescription = this.props.handleChangeDescription;
        const handleSaveDescription = this.props.handleSaveDescription;

        return (
            <div className="card-modal-content">
                <div className="card-modal-header">
                    <h4 className="card-modal-title">
                        <FontAwesomeIcon icon={faWindowMaximize} className="modal-icon" />
                        {card.name}
                    </h4>
                    <button className="close-modal" onClick={toggleIsShowingModal}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div className="card-modal-body">
                    <div className="left-col">
                        {this.renderDescription(card, newDescription, handleChangeDescription, handleSaveDescription)}
                    </div>
                    <div className="right-col">
                        <span className="right-col-group-description">ADD TO CARD</span>

                        <button className="btn-secondary inactive">
                            <FontAwesomeIcon icon={faCheckSquare} />
                            Checklist
                        </button>

                        <button className="btn-secondary inactive">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            Due Date
                        </button>

                        <span className="right-col-group-description">ACTIONS</span>

                        <button className="btn-secondary"
                            onClick={this.props.handleDeleteCard}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} />
                            Delete Card
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}

export default CardModal;
