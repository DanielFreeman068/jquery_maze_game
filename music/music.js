document.addEventListener('DOMContentLoaded', function() {
  const songs = [
    { src: './music/lofijam.mp3', title: 'Lofi Jams' },
  ];
  let currentSongIndex = 0;

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.getElementById('backgroundMusic');
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();

  audioSrc.connect(analyser);
  analyser.connect(audioCtx.destination);

  analyser.fftSize = 256;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);


  var bgMusic = document.getElementById('backgroundMusic');
  var toggleCheckbox = document.getElementById('toggleMusic');
  var nowPlaying = document.getElementById('nowPlaying');

  function playSong(index) {
    bgMusic.src = songs[index].src;
    bgMusic.play()
      .then(() => nowPlaying.textContent = "Now playing... " + songs[index].title)
      .catch(e => console.log("Error playing the song: " + e));
  }

  toggleCheckbox.addEventListener('change', function() {
    if (this.checked) {
      bgMusic.play();
      nowPlaying.textContent = "Now playing... " + songs[currentSongIndex].title;
      nextSongBtn.disabled = false;
      prevSongBtn.disabled = false;
    } else {
      bgMusic.pause();
      nowPlaying.textContent = "Now playing... Nothing!";
      nextSongBtn.disabled = true;
      prevSongBtn.disabled = true;
    }
  });

  
  document.getElementById('startAudio').addEventListener('click', function() {
    audioCtx.resume().then(() => {
      playSong(currentSongIndex);
    });
  });

  
  playSong(currentSongIndex);
});