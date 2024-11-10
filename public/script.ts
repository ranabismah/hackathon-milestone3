// Interface to define the resume data structure
interface ResumeData {
    fullName: string;
    email: string;
    phone: string;
    degree: string;
    school: string;
    gradYear: string;
    skills: string;
    jobTitle: string;
    company: string;
    workDates: string;
    [key: string]: string;  // Index signature to allow any additional string keys
}

// Get all form steps and buttons
const formSteps: NodeListOf<HTMLElement> = document.querySelectorAll('.form-step');
const nextButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.nextBtn');
const generateResumeBtn: HTMLButtonElement | null = document.getElementById('generateResumeBtn') as HTMLButtonElement;
const resumePreview: HTMLElement = document.getElementById('resumePreview') as HTMLElement;
const resumeContent: HTMLElement = document.getElementById('resumeContent') as HTMLElement;

let currentStep = 0; // To keep track of the current form step

// Function to navigate between form steps
function goToNextStep(nextStepId: string): void {
    const currentStepElement = formSteps[currentStep];
    currentStepElement.classList.remove('active'); // Hide current step
    
    const nextStepElement = document.getElementById(nextStepId);
    if (nextStepElement) {
        nextStepElement.classList.add('active'); // Show the next step
    }

    formSteps.forEach((step, index) => {
        if (step.id === nextStepId) {
            currentStep = index;
        }
    });
}

// Add event listeners for the "Next" buttons
nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        const nextStepId = button.getAttribute('data-next');
        if (nextStepId) {
            goToNextStep(nextStepId);
        }
    });
});

// Handle the "Generate Resume" button click event
generateResumeBtn?.addEventListener('click', () => {
    const formData = new FormData(document.getElementById('resumeForm') as HTMLFormElement);
    const resumeData: ResumeData = {} as ResumeData;

    // Collect data from the form fields
    formData.forEach((value, key) => {
        resumeData[key] = value as string;
    });

    // Generate and display the resume
    generateResume(resumeData);
});

// Function to generate the resume and display it
function generateResume(data: ResumeData): void {
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
            <h3>Skills</h3>
            <p><strong>Skills:</strong> ${data.skills}</p>
        </div>

        <div class="resume-section">
            <h3>Work Experience</h3>
            <p><strong>Job Title:</strong> ${data.jobTitle}</p>
            <p><strong>Company:</strong> ${data.company}</p>
            <p><strong>Work Dates:</strong> ${data.workDates}</p>
        </div>
    `;

    // Show the generated resume
    resumePreview.style.display = 'block';
}
