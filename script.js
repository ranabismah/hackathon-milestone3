// Get all the form steps
var formSteps = document.querySelectorAll('.form-step');
// Get all the "Next" buttons
var nextButtons = document.querySelectorAll('.nextBtn');
var submitButton = document.getElementById('submitForm');
// Initialize the current step to the first step
var currentStep = 0;
// Function to show the next step based on the clicked button's `data-next` attribute
function goToNextStep(nextStepId) {
    var currentStepElement = formSteps[currentStep];
    currentStepElement.classList.remove('active'); // Hide current step
    // Find the next step element by ID and show it
    var nextStepElement = document.getElementById(nextStepId);
    if (nextStepElement) {
        nextStepElement.classList.add('active'); // Show the next step
    }
    // Update the currentStep index manually by iterating over formSteps using forEach
    formSteps.forEach(function (step, index) {
        if (step.id === nextStepId) {
            currentStep = index;
        }
    });
}
// Attach event listeners to each "Next" button
nextButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var nextStepId = button.getAttribute('data-next');
        if (nextStepId) {
            goToNextStep(nextStepId);
        }
    });
});
// Handle form submission and generate resume preview
submitButton.addEventListener('click', function () {
    var formData = new FormData(document.getElementById('resumeForm'));
    var resumeData = {};
    // Collect form data into a JavaScript object
    formData.forEach(function (value, key) {
        resumeData[key] = value;
    });
    // Generate and display the resume preview
    generateResume(resumeData);
});
// Function to generate and display the resume preview
function generateResume(data) {
    var resumeContent = document.getElementById('resumeContent');
    resumeContent.innerHTML = "\n        <div class=\"resume-section\">\n            <h3>Personal Information</h3>\n            <p><strong>Name:</strong> ".concat(data.fullName, "</p>\n            <p><strong>Email:</strong> ").concat(data.email, "</p>\n            <p><strong>Phone:</strong> ").concat(data.phone, "</p>\n        </div>\n\n        <div class=\"resume-section\">\n            <h3>Education</h3>\n            <p><strong>Degree:</strong> ").concat(data.degree, "</p>\n            <p><strong>School:</strong> ").concat(data.school, "</p>\n            <p><strong>Graduation Year:</strong> ").concat(data.gradYear, "</p>\n        </div>\n\n        <div class=\"resume-section\">\n            <h3>Work Experience</h3>\n            <p><strong>Job Title:</strong> ").concat(data.jobTitle, "</p>\n            <p><strong>Company:</strong> ").concat(data.company, "</p>\n            <p><strong>Work Dates:</strong> ").concat(data.workDates, "</p>\n        </div>\n\n        <div class=\"resume-section\">\n            <h3>Skills</h3>\n            <p><strong>Skills:</strong> ").concat(data.skills, "</p>\n        </div>\n    ");
    // Display the resume preview section
    document.getElementById('resumePreview').style.display = 'block';
}
