document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', playClickSound);
    });
    function playClickSound() {
        const audio = new Audio('assets/soundEffects/click.mp3');
        audio.volume = 0.7;
        audio.play();
    }
    const playSpotifyButton = document.getElementById('play-spotify');
    const spotifyContainer = document.getElementById('spotify-container');
    const spotifyIframe = document.getElementById('spotify-iframe');

    playSpotifyButton.addEventListener('click', () => {
        spotifyContainer.classList.toggle('hidden');
        if (!spotifyContainer.classList.contains('hidden')) {
            spotifyIframe.src += "&autoplay=1"; // Aggiungi autoplay alla fine dell'URL
        }
    });
});
