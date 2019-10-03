import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from './CardModal/CardModal';

import './styles.css';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingModal: false,
        };
    }

    handleChangeDescription = event => {
        this.setState({
            newDescription: event.target.value
        });
    }



    handleSaveDescription = () => {
        const newDescription = this.props.newDescription;
        const card = this.props.card;

        if (newDescription === '')
            return;

        card.description = newDescription;

        this.setState({
            card: card,
        });
    }

    toggleIsShowingModal = () => {
        const isShowingModal = this.state.isShowingModal;
        this.setState({
            isShowingModal: !isShowingModal
        })
    }

    render() {
        const card = this.props.card;
        return (
            <Draggable draggableId={card.id} index={this.props.index}>
                {(provided) => (
                    <>
                        <li className="list-card"
                            onClick={this.toggleIsShowingModal}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            {card.name}
                            {provided.placeholder}
                        </li>
                        <div className={this.state.isShowingModal ? 'card-modal' : 'card-modal hidden'}>
                            <CardModal
                                card={card}
                                toggleIsShowingModal={this.toggleIsShowingModal}
                                newDescription={this.props.newDescription}
                                handleChangeDescription={this.handleChangeDescription}
                                handleSaveDescription={this.handleSaveDescription}
                                handleDeleteCard={this.props.handleDeleteCard}
                            />
                        </div>
                    </>

                )}
            </Draggable>
        )
    }
}

export default Card;