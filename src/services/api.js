const API = {
    boards: [
        {
            id: 1,
            isFavorite: false,
            name: 'Trello clone',
            lists: [
                {
                    id: 'list-1',
                    name: 'TO-DO',
                    cards: [
                        {
                            id: 1,
                            name: 'Finish html mockup for trello clone',
                            description: ''
                        },
                        {
                            id: 2,
                            name: 'Style the app', 
                            description: '',

                        },
                        {
                            id: 3,
                            name: 'Add javascript', 
                            description: '',
                        },
                    ]
                },
                {
                    id: 'list-2',
                    name: 'DOING',
                    cards: [
                        {
                            id: 4,
                            name: 'Listen to an awesome cheerful upbeat playlist',
                            description: '',
                        },
                    ]
                },
                {
                    id: 'list-3',
                    name: 'DONE',
                    cards: [
                        {
                            id: 5,
                            name: 'Paper mockup',
                            description: '',
                        },
                    ]
                }
            ],
            listsOrder: ['list-1', 'list-2', 'list-3'],
            members: ['Richard Lopes', 'Lélio Cossa', 'John Doe', 'Shiumatsu Yoruka', 'Jean-Pierre Baudelaire', 'Teresa Ferrão'],
        },

        {
            id: 2,
            isFavorite: false,
            name: 'Random board',
            lists: [
                {
                    id: 'list-1',
                    listName: 'TO-DO',
                    cards: [
                        {
                            id: 1,
                            name: 'Finish html mockup for trello clone',
                            description: '',
                            
                        }
                    ]
                }
            ],
            members: ['Richard Lopes', 'Lélio Cossa', 'John Doe', 'Shiumatsu Yoruka', 'Jean-Pierre Baudelaire', 'Teresa Ferrão'],
        },
    ],

    getBoard: function (id) {
        return this.boards.find(board => board.id === id);
    },

    getAllBoards: function () {
        return this.boards;
    }

};

export default API;