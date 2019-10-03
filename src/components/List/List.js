import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import Card from '../Card';
import './styles.css';
import ListMenu from './ListMenu/ListMenu';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComposing: false,
            isShowingListMenu: false,
            newCardTitle: '',
            listCopyName: this.props.list.name
        }
    }

    handleDeleteCard = (cardId) => {
        this.props.handleDeleteCard(this.props.list.id, cardId);
    }

    handleChangeListCopyTitle = (e) => {
        this.setState({
            listCopyName: e.target.value
        })
    }

    handleMakeCopyOfList = () => {
        const list = this.props.list;
        this.props.handleMakeCopyOfList(list.id, this.state.listCopyName);
        this.toggleShowListMenu();
    }

    handleDeleteList = () => {
        this.props.handleDeleteList(this.props.list.id);
    }

    handleChangeNewCardTitle = (event) => {
        this.setState({ newCardTitle: event.target.value });
    }

    toggleShowListMenu = () => {
        const isShowingListMenu = this.state.isShowingListMenu;
        this.setState({ isShowingListMenu: !isShowingListMenu });
    }

    handleToggleIsComposing = () => {
        const isComposing = this.state.isComposing;
        this.setState({ isComposing: !isComposing });
    }

    renderCardComposer = () => {
        if (this.state.isComposing === true) {
            const handleCreateNewCard = this.props.handleCreateNewCard;
            return (
                <div className="card-composer">
                    <div className="composer-textarea-container">
                        <textarea
                            // onBlur={this.handleToggleIsComposing}
                            ref={input => input && input.focus()}
                            onChange={this.handleChangeNewCardTitle}
                            value={this.state.newCardTitle}
                            id="composer-textarea" className="list-card" placeholder="Enter a title for this card…" >
                        </textarea>
                    </div>
                    <div className="composer-controllers-container">
                        <button
                            className="btn btn-green save-compose"
                            onClick={() => {
                                handleCreateNewCard(this.state.newCardTitle, this.props.list.id);
                                this.setState({ newCardTitle: '' });
                            }
                            }
                        >Save Card</button>
                        <button className="discard-compose" onClick={this.handleToggleIsComposing}>
                            <FontAwesomeIcon icon={faTimes} className="discard-compose-icon" />
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <button type="button" className="open-compose" onClick={this.handleToggleIsComposing}>
                    <i className="fas fa-plus open-compose-icon"></i>
                    Add another card
                </button>
            );
        }
    }

    render() {
        const list = this.props.list;
        const cards = list.cards;
        return (
            <Draggable draggableId={list.id} index={this.props.index}>
                {(provided) => (
                    <div className="list-wrapper"
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <section className="list-content">
                            <div className="list-header"
                                {...provided.dragHandleProps}
                            >
                                <h3 className="list-title">{list.name}</h3>
                                <button
                                    onClick={this.toggleShowListMenu}
                                    type="button" className="open-list-menu-btn">
                                    <FontAwesomeIcon icon={faEllipsisH} />
                                </button>
                                <ListMenu
                                    isShowing={this.state.isShowingListMenu}
                                    toggleShowListMenu={this.toggleShowListMenu}
                                    handleMakeCopyOfList={this.handleMakeCopyOfList}
                                    handleChangeListCopyTitle={this.handleChangeListCopyTitle}
                                    listCopyName={this.state.listCopyName}
                                    handleDeleteList={this.handleDeleteList}
                                />
                            </div>
                            <Droppable droppableId={list.id} type="cards">
                                {
                                    (provided) => (
                                        <ul className="list-cards-container"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {cards.map((card, index) =>

                                                <Card key={card.id} card={card}
                                                 handleDeleteCard={() => {this.handleDeleteCard(card.id)}} 
                                                 index={index} />)
                                            }
                                            {provided.placeholder}
                                        </ul>
                                    )
                                }
                            </Droppable>

                            {this.renderCardComposer()}
                        </section>
                    </div>

                )}

            </Draggable>
        )
    }
}

export default List;