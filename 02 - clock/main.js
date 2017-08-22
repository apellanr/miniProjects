const secondHand = document.querySelector('.second-hand');

function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90; // add 90deg to offset default 90deg
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`; // ES6 template literals
    console.log(seconds);
    
}

setInterval(setDate, 1000);