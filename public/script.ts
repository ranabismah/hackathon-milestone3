// Function to generate and display the resume preview
function generateResume(data: Record<string, string>): void {
    const resumeContent = document.getElementById('resumeContent') as HTMLDivElement;
    const resumePreview = document.getElementById('resumePreview') as HTMLDivElement;

    // Update the "Your Resume" heading with the full name
    const resumeHeading = document.getElementById('resumeHeading') as HTMLHeadingElement;
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

    // Make the resume preview visible
    resumePreview.style.display = 'block';
}
