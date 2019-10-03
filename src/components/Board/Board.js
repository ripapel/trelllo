import React, { Component } from 'react';
import List from '../List';
import BoardHeader from '../BoardHeader';
import Header from '../Header';
import Menu from '../Menu';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';

import API from '../../services/api';

import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            lists: null,
            name: null,
            members: [],
            isFavorite: false,
            listsOrder: [],
            showMenu: false,
            isAddingList: false,
            newListTitle: '',
            newBoardName: null
        };

    }

    handleSaveNewBoardName = () => {
        this.setState({
            name: this.state.newBoardName
        })
    }

    handleChangeNewListTitle = (event) => {
        this.setState({ newListTitle: event.target.value });
    }

    handleCreateNewCard = (cardTitle, listToUpdateId) => {
        const uuidv1 = require('uuid/v1');
        const lists = this.state.lists;
        const list = lists.find(l => l.id === listToUpdateId);
        list.cards.push({ id: uuidv1(), name: cardTitle, description: '' });
        this.setState({ lists: lists });

    }

    handleDeleteCard = (listId, cardId) => {
        const lists = [...this.state.lists];
        const list = lists.find(l => l.id === listId);
        const cardIndex = list.cards.findIndex(c => c.id === cardId);
        
        if(cardIndex < 0)
            return;

        list.cards.splice(cardIndex, 1);

        this.setState({
            lists: lists
        });

    }

    handleMakeCopyOfList = (id, name) => {
        const lists = this.state.lists;
        const listCopy = { ...lists.find(l => l.id === id) };
        const uuid = require('uuid/v1');
        listCopy.id = uuid();
        console.log(name);
        listCopy.name = name;
        lists.push(listCopy);

        const index = this.state.listsOrder.indexOf(id);
        const listsOrder = this.state.listsOrder.slice(0, index + 1).concat(listCopy.id).concat(this.state.listsOrder.slice(index + 1));

        this.setState({
            lists: lists,
            listsOrder: listsOrder
        });
    }

    handleDeleteList = (id) => {
        const lists = [...this.state.lists];
        const deletingListIndex = lists.findIndex(l => l.id === id);

        if (deletingListIndex < 0)
            return;

        const deletingList = lists[deletingListIndex];
        lists.splice(deletingListIndex, 1);

        const listOrderDeletingListIndex = this.state.listsOrder.indexOf(deletingList.id);
        const listsOrder = [...this.state.listsOrder];
        listsOrder.splice(listOrderDeletingListIndex, 1);

        this.setState({
            lists: lists,
            listsOrder: listsOrder
        });
    }

    handleChangeBoardName = (event) => {
        this.setState({
            newBoardName: event.target.value
        });
    }

    handleCreateNewList = () => {
        const lists = this.state.lists;
        let newListId = lists[lists.length - 1].id;
        newListId = `list-${+newListId.split('-')[1] + 1}`;
        lists.push({
            id: newListId,
            cards: [],
            name: this.state.newListTitle
        });

        const listsOrder = this.state.listsOrder;
        listsOrder.push(newListId);

        this.setState({
            lists: lists,
            listsOrder: listsOrder,
            newListTitle: ''
        });
    }

    handleToggleShowMenu = () => {
        const showMenu = this.state.showMenu;
        this.setState({ showMenu: !showMenu });
    }

    toggleIsAddingList = () => {
        const isAddingList = this.state.isAddingList;
        this.setState({ isAddingList: !isAddingList });
    }

    componentDidMount = () => {
        const board = API.getBoard(this.state.id);
        this.setState({
            lists: board.lists,
            name: board.name,
            members: board.members,
            isFavorite: board.isFavorite,
            listsOrder: board.listsOrder,
            newBoardName: board.name
        });
    }

    onDragEnd = result => {

        const { destination, source, type } = result;
        if (!destination)
            return;

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index)
            return;
        
        console.log(type);


        if (type === 'cards') {
            //Workaround to make a copy of state.lists and not modify state directly when manipulating the copied object
            const lists = JSON.parse(JSON.stringify(this.state.lists));

            const listSource = lists.find(l => l.id === source.droppableId);
            const card = listSource.cards.splice(source.index, 1)[0];

            const listDestination = lists.find(l => l.id === destination.droppableId);
            listDestination.cards.splice(destination.index, 0, card);
            this.setState({ lists: lists });
        } else {
            const newListsOrder = JSON.parse(JSON.stringify(this.state.listsOrder));
            const listId = newListsOrder.splice(source.index, 1)[0];
            newListsOrder.splice(destination.index, 0, listId);
            this.setState({ listsOrder: newListsOrder });
        }
    }

    renderLists() {

        const lists = this.state.lists;
        if (lists) {
            return (
                <Droppable droppableId="all-lists" direction="horizontal" type="list" >
                    {(provided) => (

                        <div id="board" {...provided.droppableProps} ref={provided.innerRef}
                            className={this.state.showMenu === true ? 'board-menu-isShowing' : ''}

                        >
                            {this.state.listsOrder.map((listId, index) => {
                                const list = lists.find(l => l.id === listId);
                                return <List
                                    handleCreateNewCard={this.handleCreateNewCard}
                                    key={list.id}
                                    list={list}
                                    index={index}
                                    handleMakeCopyOfList={this.handleMakeCopyOfList}
                                    handleDeleteList={this.handleDeleteList}
                                    handleDeleteCard={this.handleDeleteCard}
                                />
                            })}
                            {provided.placeholder}
                            {this.renderAddListBtn(lists)}
                        </div>
                    )}
                </Droppable>
            );
        }
        else {
            return (<></>);
        }
    }

    renderAddListBtn(boardLists) {
        if (this.state.isAddingList) {
            return (
                <div className="list-wrapper add-list" style={{ backgroundColor: '#ebecf0' }}>
                    <div className="new-list-composer-container">
                        <div className="new-list-composer-input-container">
                            <input
                                onChange={this.handleChangeNewListTitle}
                                value={this.state.newListTitle}
                                type="text" className="new-list-composer" ref={input => input && input.focus()} placeholder="Enter list title..." />
                        </div>
                        <div className="new-list-composer-controllers-container">
                            <button
                                onClick={this.handleCreateNewList}
                                className="btn btn-green">
                                Add List
                            </button>
                            <button onClick={this.toggleIsAddingList}>
                                <FontAwesomeIcon className="discard-compose-icon" icon={faTimes} />
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        let buttonText = 'Add a list';
        if (boardLists)
            buttonText = 'Add another list';


        return (
            <div className="list-wrapper add-list">
                <button className="btn" id="add-list-btn" onClick={this.toggleIsAddingList}>
                    <FontAwesomeIcon style={{ paddingRight: '4px' }} icon={faPlus} />
                    {buttonText}
                </button>
            </div>
        );

    }

    render() {
        return (
            <div id="app-root">
                <Header />
                <main>

                    <div id="board-canvas">
                        <BoardHeader 
                            handleToggleShowMenu={this.handleToggleShowMenu} 
                            boardName={this.state.name}
                            handleSaveNewBoardName={this.handleSaveNewBoardName}
                            members={this.state.members}
                            newBoardName={this.state.newBoardName}
                            handleChangeBoardName={this.handleChangeBoardName}
                            />
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            {this.renderLists()}
                        </DragDropContext>


                        <Menu
                            showMenu={this.state.showMenu}
                            handleToggleShowMenu={this.handleToggleShowMenu}
                            handleBackgroundColor={this.props.handleBackgroundColor}
                            handleBackgroundImage={this.props.handleBackgroundImage}
                            handleBackgroundChange={this.props.handleBackgroundChange}
                        />
                    </div>
                </main>
            </div>
        );
    }
}

export default Board;