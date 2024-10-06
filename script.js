// import AudioMotionAnalyzer from "audiomotion-analyzer";

const commandInput = document.getElementById('commandInput');
const output = document.getElementById('output');
const sections = {
    about: document.getElementById('about'),
    projects: document.getElementById('projects'),
    skills: document.getElementById('skills'),
    contact: document.getElementById('contact'),
    help: document.getElementById('help'),
    credits: document.getElementById('credits'),
    abendrot: document.getElementById('abendrot'),
    zwielicht: document.getElementById('zwielicht'),
    streaks: document.getElementById('streaks'),
    bookstack: document.getElementById('bookstack'),
    phasionista: document.getElementById('phasionista'),
    jerma: document.getElementById('jerma'),
};

const videoUrl = "https://youtu.be/8jKMeXYC55c"; // Replace with your YouTube video link

// Function to show the selected section and clear the screen
function showSection(sectionId) {
    // Clear previous output
    output.innerHTML = '';
    // Display the new section
    output.innerHTML += sections[sectionId].innerHTML;
}

commandInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const command = commandInput.value.trim().toLowerCase();
        // Add the command to the terminal output
        output.innerHTML += `<div class="prompt">${command}</div>`;
        // Process the command
        if (command === 'jerma') {
            // Open the video link in a new tab
            window.open(videoUrl, '_blank');
            output.innerHTML += `<p>Opening video in a new tab...</p>`;
        } else if (sections[command]) {
            showSection(command);
        } else {
            output.innerHTML = '';
            output.innerHTML += '<p>Unknown command. Type "help" for a list of commands.</p>';
        }

        // Clear the input field after pressing enter
        commandInput.value = '';
        // Scroll to the bottom of the terminal
        window.scrollTo(0, document.body.scrollHeight);
    }
});

// Mute/Unmute function for the audio
function toggleMute() {
    const audio = document.getElementById('backgroundMusic');
    const muteButton = document.getElementById('muteButton');
    if (audio.muted) {
        audio.muted = false;
        muteButton.innerHTML = '🔊 Mute';
    } else {
        audio.muted = true;
        muteButton.innerHTML = '🔈 Unmute';
    }
}

// Set initial audio volume
var audio = document.getElementById("backgroundMusic");
audio.volume = 0.04;

// // Initialize AudioMotionAnalyzer
// const audioMotion = new AudioMotionAnalyzer(
//     document.getElementById("container-music"),
//     {
//       source: audio,  // Set the source to your backgroundMusic element
//       height: 400,
//       ansiBands: false,
//       showScaleX: false,
//       bgAlpha: 0,
//       overlay: true,
//       smoothing: 0.7,
//       mode: 10,
//       channelLayout: "dual-combined",
//       fillAlpha: 0.25,
//       frequencyScale: "bark",
//       gradientLeft: "steelblue",
//       gradientRight: "orangered",
//       linearAmplitude: true,
//       linearBoost: 1.8,
//       lineWidth: 1.5,
//       mirror: 0,
//       reflexRatio: 0,
//       showPeaks: false,
//       weightingFilter: "D"
//     }
// );
