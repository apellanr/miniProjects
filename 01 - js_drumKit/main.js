window.addEventListener('keydown', function(event){
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    if(!audio) return; // stop the function from running
    audio.currentTime = 0; // rewinds to the start
    audio.play(); // if you double click btn it wont play bc audio is playing already
});