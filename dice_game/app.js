/*
GAME RULES:

- 2 player game / application
- Each turn, a player rolls a dice as many times as they wish. Each result is added to the round score
- If player rolls a 1, all his ROUND score gets is erased. Next players turn
- Player can 'Hold', which means that the ROUND score gets added to their GLOBAL score. 
- The first player to reach 100 points wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDiceValue;

initGame(); // initialize game

// EVENT HANDLER for dice roll
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying) {
        // generate random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // display result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'imgs/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'imgs/dice-' + dice2 + '.png';

        /*
        if(diceNum === 6 && lastDiceValue === 6) {
            // player loses entire score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            switchPlayer();            
        }
        */

        // update round score ONLY IF the rolled number was not 1
        if(dice1 !== 1 && dice2 !== 1) { 
            roundScore += dice1 + dice2; // add score
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            switchPlayer(); // change players
        }
        
        // lastDiceValue = diceNum;

    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying) {
        // add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore; 
        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        var winningScore;
        // undefined, 0, null, or "" are coerced to false
        // any other value is coerced to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // check if player has won the game
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'; 
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            switchPlayer();
        }
    }
});

function switchPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0; // roll 1, opponent becomes active player; round score to 0
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // toggle active class when switching
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //hide dice again when player rolls a 1
    hideDice();
}

function hideDice() {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', initGame);

function initGame() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    hideDice(); // hides the dice on game load
    
    //sets scores to 0 initially
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

/*
ADDITIONAL RULES

1. player loses entire score when rolling two 6's in a row. Next player turn
(Note: Always save the previous dice roll in a separate variable)

2. Add input field to DOM where players can set the winning score.
(Note: Try utilizing .value property)

3. Add another dice to the game, so that there are dices.
- same rules when rolling a 1. 
(Note: need CSS to position the second dice)

*/

//document.querySelector('.player-0-panel').classList.remove('active');
//document.querySelector('.player-1-panel').classList.toggle('active');
// var x = document.querySelector('#score-0').textContent;
// console.log(x);