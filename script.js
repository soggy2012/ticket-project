document.addEventListener("DOMContentLoaded", function() {

    // References to form input elements
    const generateTicket = document.getElementById("generateTicket");
    const fullName = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const githubName = document.getElementById("githubName");
    const avatarInput = document.getElementById("avatar");
    const ticketForm = document.getElementById("ticketForm");

    // References to ticket display elements
    const ticketDisplay = document.getElementById("ticketDisplay"); // The main container for the ticket area

    // Elements in congrats message
    const ticketFullNameSpan = document.getElementById("ticketFullName");
    const ticketEmailSpan = document.getElementById("ticketEmail");

    // Elements on the ticket visual itself
    const ticketUserName = document.getElementById('ticketUserName');
    const ticketGithubName = document.getElementById('ticketGithubName'); // Corrected ID from HTML
    const ticketAvatarImg = document.getElementById('ticketAvatarImg');
    const ticketNumberSpan = document.getElementById('ticketNumber');

    // Button EventListener
    if (generateTicket) {
        generateTicket.addEventListener("click", function(event) {
            // Prevent default form submission (stops page reload)
            event.preventDefault();

            // Read input values
            const fullNameValue = fullName.value.trim();
            const emailValue = emailInput.value.trim();
            const githubUsername = githubName.value.trim();
            const avatarFile = avatarInput.files[0]; // Get the File object

            //All fields must be filled
            if (!fullNameValue || !emailValue || !githubUsername) {
                alert("Please fill in all fields before generating your ticket.");
                return;
            }
            // Update the "Congrats" message
            ticketUserName.textContent = fullNameValue || 'Your Name';
            ticketFullNameSpan.textContent = fullNameValue || 'Coder';
            ticketEmailSpan.textContent = emailValue || 'your.email@example.com';

            if (githubUsername) {
                ticketGithubName.innerHTML = `<i class="fab fa-github"></i> ${githubUsername}`;
            } else {
                ticketGithubName.innerHTML = `<i class="fab fa-github"></i> @yourgithub`; // Fallback
            }

            // Handle avatar image display using FileReader API
            if (avatarFile) {
                const reader = new FileReader(); // Create a new FileReader instance
                reader.onload = function(e) {
                    // When the file is loaded, set the src of the <img> tag
                    ticketAvatarImg.src = e.target.result; // e.target.result is the base64 encoded image data
                };
                reader.readAsDataURL(avatarFile); // Read the file content as a Data URL (base64 string)
            } else {
                // If no file is uploaded, set a default or clear the image
                ticketAvatarImg.src = 'assets/images/default-avatar.png'; // Path to your default avatar
                ticketAvatarImg.alt = 'User Avatar'; // Ensure alt text
            }

            // Generate and update a random ticket number
            const randomNumber = Math.floor(10000 + Math.random() * 90000); // 5-digit number
            ticketNumberSpan.textContent = String(randomNumber);

            //  Show the ticket display section
            ticketDisplay.style.display = 'block'; // Make it visible

            // Optional: Scroll to the ticket display
            ticketDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });

            ticketForm.style.display = 'none';
        });
    } else {
        console.error("Generate Ticket Button not found!");
    }
})