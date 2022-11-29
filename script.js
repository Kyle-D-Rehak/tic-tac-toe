const playerFactory = (name, marker) => {
    return {name, marker};
}

const GameModule = (()=>{
    const _gameGrid = document.getElementById('gameGrid');
    const resetButton = document.getElementById('resetButton');

    let _gameboard = [];
    let _players = [];
    let _turn;
    let _turnCounter = 0;


    const createNewBoard = (player1, player2) => {
        _gameboard = ['', '', '', '', '', '', '', '', ''];
        _displayController(_gameboard);
        _turn = player1;
        _turnCounter = 0;
        _players = [player1, player2];
        document.querySelector('.modalBlur').remove();
        document.querySelector('.gameOverDiv').remove();
    };

    const updateBoard = (index) => {
        _gameboard[index] = _turn.marker;
        console.log(`UPDATE BOARD: index ${index} updated to ${_turn.marker}`);
        _displayController(_gameboard);
        _updateTurn();
        _checkBoard(_gameboard);
    };

    const resetBoard = () => {
        createNewBoard(..._players);
    };

    const _displayController = (gameboard) => {
        _gameGrid.innerHTML = '';
        gameboard.forEach((value, index) => {
            console.log(`index: ${index} value: ${value}`); 
            if (value === 'x') {
                _createX();
            } else if (value === 'o') {
                _createO();
            } else if (value === '') {
                _createBlank(index);
            }
        })
    };

    const _createX = () => {
        console.log('creating new X');
        const newX = document.createElement('div');
        newX.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
      </svg>`;
        _gameGrid.appendChild(newX);
    };

    const _createO = () => {
        console.log('creating new O');
        const newO = document.createElement('div');
        newO.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      </svg>`;
        _gameGrid.appendChild(newO);
    };

    const _createBlank = (index) => {
        console.log(`Create blank called with ${index}`);
        const newBlank = document.createElement('div');
        newBlank.innerHTML = `<button class="addMarkerButton"></button>`;
        _gameGrid.appendChild(newBlank);
        newBlank.addEventListener('click', function () {updateBoard(index); console.log(`eventListner called Update Board with ${index}`);});
    };

    const _updateTurn = () => {
        if (_turn === _players[0]) {
            _turn = _players[1];
            _turnCounter++;
        } else {
            _turn = _players[0];
            _turnCounter++;
        }
    };

    const _checkBoard = (gameboard) => {
        if (gameboard[0] === _players[0].marker && gameboard[1] === _players[0].marker && gameboard[2] === _players[0].marker) {
            _gameOver('wins', _players[0]);
        } else if (gameboard[3] === _players[0].marker && gameboard[4] === _players[0].marker && gameboard[5] === _players[0].marker) {
            _gameOver('wins', _players[0]);
        } else if (gameboard[6] === _players[0].marker && gameboard[7] === _players[0].marker && gameboard[8] === _players[0].marker) {
            _gameOver('wins', _players[0]);
        }  else if (gameboard[0] === _players[0].marker && gameboard[3] === _players[0].marker && gameboard[6] === _players[0].marker) {
            _gameOver('wins', _players[0]);
        }  else if (gameboard[1] === _players[0].marker && gameboard[4] === _players[0].marker && gameboard[7] === _players[0].marker) {
            _gameOver('wins', _players[0]);
        }  else if (gameboard[2] === _players[0].marker && gameboard[5] === _players[0].marker && gameboard[8] === _players[0].marker) {
            _gameOver('wins', _players[0]);
        }  else if (gameboard[0] === _players[0].marker && gameboard[4] === _players[0].marker && gameboard[8] === _players[0].marker) {
            _gameOver('wins', _players[0]);
        }  else if (gameboard[2] === _players[0].marker && gameboard[4] === _players[0].marker && gameboard[6] === _players[0].marker) {
            _gameOver('wins', _players[0]);
        } else  if (gameboard[0] === _players[1].marker && gameboard[1] === _players[1].marker && gameboard[2] === _players[1].marker) {
            _gameOver('wins', _players[1]);
        } else if (gameboard[3] === _players[1].marker && gameboard[4] === _players[1].marker && gameboard[5] === _players[1].marker) {
            _gameOver('wins', _players[1]);
        } else if (gameboard[6] === _players[1].marker && gameboard[7] === _players[1].marker && gameboard[8] === _players[1].marker) {
            _gameOver('wins', _players[1]);
        }  else if (gameboard[0] === _players[1].marker && gameboard[3] === _players[1].marker && gameboard[6] === _players[1].marker) {
            _gameOver('wins', _players[1]);
        }  else if (gameboard[1] === _players[1].marker && gameboard[4] === _players[1].marker && gameboard[7] === _players[1].marker) {
            _gameOver('wins', _players[1]);
        }  else if (gameboard[2] === _players[1].marker && gameboard[5] === _players[1].marker && gameboard[8] === _players[1].marker) {
            _gameOver('wins', _players[1]);
        }  else if (gameboard[0] === _players[1].marker && gameboard[4] === _players[1].marker && gameboard[8] === _players[1].marker) {
            _gameOver('wins', _players[1]);
        }  else if (gameboard[2] === _players[1].marker && gameboard[4] === _players[1].marker && gameboard[6] === _players[1].marker) {
            _gameOver('wins', _players[1]);
        } else if (_turnCounter === 9) {
            _gameOver('Draw');
        };
    };

    const _gameOver = (result, player = {}) => {
        const blur = document.createElement('div');
        const modal = document.createElement('div');

        blur.classList.add('modalBlur');
        modal.classList.add('gameOverDiv');
        if (result === 'Draw') {
            modal.innerHTML =`<p>${result}!`;
        } else {
            modal.innerHTML =`<p>${player.name} ${result}!`;
        };

        mainContainer.appendChild(blur);
        mainContainer.appendChild(modal);

        console.log(modal);
    };

    resetButton.addEventListener('click', resetBoard);

    createNewBoard(playerFactory('Player One', 'x'), playerFactory('Player Two', 'o'));

    return {createNewBoard, updateBoard, resetBoard, _createX, _createBlank};
})();