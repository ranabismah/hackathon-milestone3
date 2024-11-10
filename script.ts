
// Select all form steps
const formSteps = document.querySelectorAll<HTMLElement>('.form-step');

// Get all the "Next" buttons
const nextButtons = document.querySelectorAll<HTMLButtonElement>('.nextBtn');
const submitButton = document.getElementById('submitForm') as HTMLButtonElement | null;

// Initialize the current step to the first step
let currentStep = 0;

// Function to show the next step based on the clicked button's `data-next` attribute
function goToNextStep(nextStepId: string) {
    const currentStepElement = formSteps[currentStep];
    currentStepElement.classList.remove('active'); // Hide current step

    const nextStepElement = document.getElementById(nextStepId);
    if (nextStepElement) {
        nextStepElement.classList.add('active'); 
    }

    // Update the currentStep index manually by iterating over formSteps using forEach
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
if (submitButton) {
    submitButton.addEventListener('click', () => {
        const formData = new FormData(document.getElementById('resumeForm') as HTMLFormElement);
        const resumeData: Record<string, string> = {};

        // Collect form data into a JavaScript object
        formData.forEach((value, key) => {
            resumeData[key] = value as string;
        });

        // Generate and display the resume preview
        generateResume(resumeData);
    });
}

// Function to generate and display the resume preview
function generateResume(data: Record<string, string>) {
    const resumeContent = document.getElementById('resumeContent') as HTMLDivElement | null;
    if (resumeContent) {
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
    } else {
        console.error('Resume content element not found');
    }

    // Display the resume preview section
    const resumePreview = document.getElementById('resumePreview') as HTMLDivElement | null;
    if (resumePreview) {
        resumePreview.style.display = 'block';
    }
}
