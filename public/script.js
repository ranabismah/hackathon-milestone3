"use strict";
// Get all the form steps
const formSteps = document.querySelectorAll('.form-step');
const nextButtons = document.querySelectorAll('.nextBtn');
const submitButton = document.getElementById('submitForm');
let currentStep = 0;
// Function to show the next step based on the clicked button's `data-next` attribute
function goToNextStep(nextStepId) {
    const currentStepElement = formSteps[currentStep];
    currentStepElement.classList.remove('active'); // Hide current step
    const nextStepElement = document.getElementById(nextStepId);
    if (nextStepElement) {
        nextStepElement.classList.add('active');
    }
    // Update the currentStep index manually by iterating over formSteps
    formSteps.forEach((step, index) => {
        if (step.id === nextStepId) {
            currentStep = index;
        }
    });
}
// Attach event listeners to each "Next" button
nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        const nextStepId = button.getAttribute('data-next');
        if (nextStepId) {
            goToNextStep(nextStepId);
        }
    });
});
// Handle form submission and generate resume preview
submitButton.addEventListener('click', () => {
    const formData = new FormData(document.getElementById('resumeForm'));
    const resumeData = {};
    // Collect form data into a JavaScript object
    formData.forEach((value, key) => {
        resumeData[key] = value;
    });
    // Generate and display the resume preview
    generateResume(resumeData);
});
// Function to generate and display the resume preview
function generateResume(data) {
    const resumeContent = document.getElementById('resumeContent');
    const resumePreview = document.getElementById('resumePreview');
    // Set the "Your Resume" heading to include the user's name
    const resumeHeading = document.getElementById('resumeHeading');
    resumeHeading.innerHTML = `Resume of ${data.fullName}`;
    // Set the content of the resume preview
    resumeContent.innerHTML = `
        <div class="resume-section">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> ${data.fullName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
        </div>

        <div class="resume-section">
            <h3>Education</h3>
            <p><strong>Degree:</strong> ${data.degree}</p>
            <p><strong>School:</strong> ${data.school}</p>
            <p><strong>Graduation Year:</strong> ${data.gradYear}</p>
        </div>

        <div class="resume-section">
            <h3>Work Experience</h3>
            <p><strong>Job Title:</strong> ${data.jobTitle}</p>
            <p><strong>Company:</strong> ${data.company}</p>
            <p><strong>Work Dates:</strong> ${data.workDates}</p>
        </div>

        <div class="resume-section">
            <h3>Skills</h3>
            <p><strong>Skills:</strong> ${data.skills}</p>
        </div>
    `;
    // Display the resume preview section
    resumePreview.style.display = 'block';
}
