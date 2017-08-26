/*
GAME RULES:

- 2 player game / application
- Each turn, a player rolls a dice as many times as they wish. Each result is added to the round score
- If player rolls a 1, all his ROUND score gets is erased. Next players turn
- Player can 'Hold', which means that the ROUND score gets added to their GLOBAL score. 
- The first player to reach 100 points wins the game

*/

var scores, roundScore, activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none'; // hides the dice on game load

//sets scores to 0 initially
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

// EVENT HANDLER for dice roll
document.querySelector('.btn-roll').addEventListener('click', function(){
    // generate random number
    var diceNum = Math.floor(Math.random() * 6) + 1;
    
    // display result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'imgs/dice-' + diceNum + '.png';
    
    // update round score ONLY IF the rolled number was not 1
    if(diceNum !== 1) {
        // add score
        roundScore += diceNum;
    } else {
        // change players
    }
});



// document.querySelector('#current-' + activePlayer).textContent = diceNum;
// var x = document.querySelector('#score-0').textContent;
// console.log(x);