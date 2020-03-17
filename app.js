/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let scores, gamePlaying, activePlayer, winning_score, last_dice;


const init = () => {
    winning_score = +prompt("Enter win score");
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    while (winning_score > 100 || isNaN(winning_score)) {
        alert('Winning score should be less or equal 100 and numeric');
        winning_score = prompt("Enter win score");
    }

    /*
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    */

    document.querySelector('.win-score').textContent = winning_score;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};

const nextPlayer = () => {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    /*
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none'; */

    document.querySelector('.dice').style.display = 'none';
};

const diceOneMode = () => {
    document.querySelector('.btn-roll').addEventListener('click', () => {
        if (gamePlaying) {
            let dice = Math.floor(Math.random() * 6) + 1;
            last_dice = dice;

            let diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';

            if (last_dice === 6 && dice === 6) {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = '0';
                nextPlayer();
            } else if (dice !== 1) {
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                nextPlayer();
            }
        }
    });

    document.querySelector('.btn-hold').addEventListener('click', () => {
        if (gamePlaying) {
            scores[activePlayer] += roundScore;

            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            if (scores[activePlayer] >= winning_score) {
                document.querySelector('#name-' + activePlayer).textContent = 'WINNER';
                document.querySelector('.dice').style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                gamePlaying = false;
            } else {
                nextPlayer();
            }
        }
    });

    document.querySelector('.btn-new').addEventListener('click', () => {
        init();
    });
};

/*const diceTwoMode = () => {
    document.querySelector('.btn-roll').addEventListener('click', () => {
        if (gamePlaying) {
            let dice_1 = Math.floor(Math.random() * 6) + 1;
            let dice_2 = Math.floor(Math.random() * 6) + 1;

            document.getElementById('dice-1').style.display = 'block';
            document.getElementById('dice-2').style.display = 'block';

            document.getElementById('dice-1').src = 'dice-' + dice_1 + '.png';
            document.getElementById('dice-2').src = 'dice-' + dice_2 + '.png';

            if (dice_1 !== 1 && dice_2 !== 1) {
                roundScore += dice_1 + dice_2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                nextPlayer();
            }

        }
    });

    document.querySelector('.btn-hold').addEventListener('click', () => {
        if (gamePlaying) {
            scores[activePlayer] += roundScore;

            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            if (scores[activePlayer] >= winning_score) {
                document.querySelector('#name-' + activePlayer).textContent = 'WINNER';
                document.getElementById('dice-1').style.display = 'none';
                document.getElementById('dice-2').style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                gamePlaying = false;
            } else {
                nextPlayer();
            }
        }
    });

    document.querySelector('.btn-new').addEventListener('click', () => {
        init();
    });
};
 */

init();

diceOneMode();