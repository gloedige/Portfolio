const form = document.querySelector('form');


/**
 * This event listener handles the form submission for the contact form. It prevents the default form submission behavior, 
 * disables the submit button to prevent multiple submissions, and then attempts to send the form data to the server using 
 * the handleFetchMail function. If the request is successful, it processes the response with handleResponse. If there is 
 * an error during the fetch operation, it catches the error and handles it with handleResponseError. 
 * Finally, it re-enables the submit button regardless of the outcome.
 */
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    disableSubmitButton(); 
    try {
        const response = await handleFetchMail(form);
        await handleResponse(response);
    } catch (error) {
        handleResponseError(error);
    } finally {
        enableSubmitButton();
    }
});


/**
 * This function clears all input fields in the form after a successful submission. 
 */
function disableSubmitButton() {
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
}


/**
 * This function enables the submit button after the form submission process is complete, allowing the user to submit the form again if needed.
 */
function enableSubmitButton() {
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = false;
}


/**
 * This function sends the form data to the server using a POST request.
 * @param {HTMLFormElement} form - The form element containing the data to be sent.
 * @returns {Promise<Response>} - A promise that resolves to the server's response.
 */
async function handleFetchMail(form) {
    const contactData = getFormData(form);
    const response = await fetch('/send_mail.php', {
        method: 'POST',
        body: JSON.stringify(contactData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}


/**
 * This function extracts the form data and converts it into a plain object.
 * @param {HTMLFormElement} form - The form element containing the data.
 * @returns {Object} - An object containing the form data.
 */
function getFormData(form) {
    const formData = new FormData(form);
    const contactData = Object.fromEntries(formData.entries());
    return contactData;
}


/**
 * This function handles the server response after submitting the form.
 * @param {Response} response - The response object from the fetch request.
 */
async function handleResponse(response) {
    const result = await response.json();
    if (response.ok && result.success) {
        clearAllInputs();
        showSuccessOverlay();
    } else {
        alert('Error: ' + (result.error || 'Failed to send message.'));
    }
}


/**
 * This function clears all input fields in the form after a successful submission.
 */
function showSuccessOverlay() {
    const overlay = document.getElementById('send_mail_overlay');
    if (overlay) {
        overlay.classList.add('active');
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 2000); // Adjust the duration as needed
    }
}


/**
 * This function handles errors that occur during the form submission process.
 * @param {Error} error - The error object containing information about the error.
 */
function handleResponseError(error) {
    console.error('Error:', error);
    alert('An error occurred while sending the message.');
}