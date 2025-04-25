// Wait until the full DOM is loaded before executing any code
document.addEventListener('DOMContentLoaded', function() {
  // Array of song objects with source file and display title
  const songs = [
    { src: './music/lofijam.mp3', title: 'Lofi Jams' },
    { src: './music/blackholesun.mp3', title: 'Cornell Jams' },

  ];
  let currentSongIndex = 0;

  // Create an AudioContext for advanced audio features
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // Get the audio element from the DOM
  var audioElement = document.getElementById('backgroundMusic');

  // Connect the audio element to the Web Audio API
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();

  // Connect the audio source to the analyser and the audio output
  audioSrc.connect(analyser);
  analyser.connect(audioCtx.destination);

  // Set up analyser properties
  analyser.fftSize = 256; // Controls frequency resolution
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength); // Will hold frequency data

  // Get DOM elements for controlling music
  var bgMusic = document.getElementById('backgroundMusic');
  var toggleCheckbox = document.getElementById('toggleMusic');
  var nowPlaying = document.getElementById('nowPlaying');

  // Function to play a song by index from the songs array
  function playSong(index) {
    bgMusic.src = songs[index].src;
    bgMusic.play()
      .then(() => nowPlaying.textContent = "Now playing... " + songs[index].title)
      .catch(e => console.log("Error playing the song: " + e));
  }

  // Toggle play/pause using the checkbox input
  toggleCheckbox.addEventListener('change', function() {
    if (this.checked) {
      // If checkbox is checked, pause the music
      bgMusic.pause();
      nowPlaying.textContent = "Now playing... Nothing!";
      nextSongBtn.disabled = true;
      prevSongBtn.disabled = true;
    } else {
      // If checkbox is unchecked, resume music
      bgMusic.play();
      nowPlaying.textContent = "Now playing... " + songs[currentSongIndex].title;
      nextSongBtn.disabled = false;
      prevSongBtn.disabled = false;
    }
  });

  // Automatically start playing the first song on load
  playSong(currentSongIndex); 
});