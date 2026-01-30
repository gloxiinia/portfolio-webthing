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
    tula: document.getElementById('tula'),
    saturated: document.getElementById('saturated'),
    // bookstack: document.getElementById('bookstack'),
    // phasionista: document.getElementById('phasionista'),
    jerma: document.getElementById('jerma'),
};

const videoUrl = "https://youtu.be/8jKMeXYC55c";

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

window.showSection = function (sectionId) {
  output.innerHTML = '';
  output.innerHTML = sections[sectionId].innerHTML;

  // Notify 3d.js
  window.dispatchEvent(
    new CustomEvent('section-change', { detail: sectionId })
  );
};

