let req_name = false;
let req_mail = false;
let req_message = false;
let input_name = null;
let input_mail = null;
let input_message = null;
let contact_name_label = null;
let contact_mail_label = null;
let contact_message_label = null;

loadContactSection();
inputEventListener();


function sendMail() {
    if (checkForRequired(['name', 'mail', 'message'])) {
        window.location.href = `mailto:${input_mail.value}?subject=Contact from ${input_name.value}&body=${input_message.value}`;
        clearAllInputs();
    } else {
        missingInputs();
        resetRequiredValues();
    }
}


/**
 * This function loads the contact section input elements into variables for later use in validation and sending email.
 */
function loadContactSection() {
    input_name = document.getElementById("contact_name");
    input_mail = document.getElementById("contact_mail");
    input_message = document.getElementById("contact_message");
    contact_name_label = document.getElementById("contact_name_label");
    contact_mail_label = document.getElementById("contact_mail_label");
    contact_message_label = document.getElementById("contact_message_label");
}


/**
 * Checks if the required fields are filled.
 * @param {Array<string>} requiredFields - Array of field names to check (e.g. ['name', 'mail', 'message'])
 * @returns {boolean} true if all required fields are filled, false otherwise
*/
function checkForRequired(requiredFields) {
    setRequiredValues();
    let isValid = true;
    for (const field of requiredFields) {
        switch (field) {
            case 'name':
                if (!document.getElementById('contact_name').value.trim()) isValid = false;
                break;
            case 'mail':
                if (!document.getElementById('contact_mail').value.trim()) isValid = false;
                break;
            case 'message':
                if (!document.getElementById('contact_message').value.trim()) isValid = false;
                break;
            }
        }
    return isValid;
}

    
/**
 * This function sets the required value flags based on current input values to be used in validation
 */
function setRequiredValues() {
    if (input_name.value.trim() !== "") {
        req_name = true
    }
    if (input_mail.value.trim() !== "") {
        req_mail = true
    }
    if (input_message.value.trim() !== "") {
        req_message = true
    }
}


/**
 * Clears all form inputs.
 */
function clearAllInputs() {
    req_name = false
    req_mail = false
    req_message = false
    input_name.value = ""
    input_mail.value = ""
    input_message.value = ""
}


/**
 * Shows UI indicators for any required fields that are missing.
 */
function missingInputs() {
    if (req_name == false) {
        contact_name_label.classList.add("missing_input_title")
        input_name.classList.add("missing_inputs")
    }
    if (req_mail == false) {
        contact_mail_label.classList.add("missing_input_title")
        input_mail.classList.add("missing_inputs")
    }
    if (req_message == false) {
        contact_message_label.classList.add("missing_input_title")
        input_message.classList.add("missing_inputs")
    }
}


/**
 * Resets internal flags that track required-field completion.
*/
function resetRequiredValues() {
    req_name = false
    req_mail = false
    req_message = false
}


/**
 * Removes the missing-input indicator for a specific field.
 * @param {string} field - One of "name", "mail", "message".
 */
function removeIndicatorOnInput(field) {
    switch (field) {
        case "name":
            contact_name_label.classList.remove("missing_input_title");
            input_name.classList.remove("missing_inputs");
            break;
        case "mail":
            contact_mail_label.classList.remove("missing_input_title");
            input_mail.classList.remove("missing_inputs");
            break;
        case "message":
            contact_message_label.classList.remove("missing_input_title");
            input_message.classList.remove("missing_inputs");
            break;
    }
}


/**
 * This function updates the current text and span text based on whether the text is being typed or deleted, 
 * and how it compares to the full text. It handles the logic for both typing and deleting characters, ensuring 
 * that the correct portion of the text is displayed at each step.
 */
function inputEventListener() {
    inputNameEventListener();
    inputMailEventListener();
    inputMessageEventListener();
}


/**
 * This function adds an event listener to the name input field that checks for input changes. 
 * It updates the required name flag, removes any missing input indicators, and validates the input 
 * whenever the user types in the name field.
 */
function inputNameEventListener() {
     input_name.addEventListener("input", () => {
        if (input_name.value.trim() !== "") {
            req_name = true;
            contact_name_label.classList.remove("missing_input_title");
            input_name.classList.remove("missing_inputs");
            validateInput(input_name);
        } else {
            req_name = false;
            validateInput(input_name);
        }
    });
}


/**
 * This function adds an event listener to the email input field that checks for input changes. 
 * It updates the required email flag, removes any missing input indicators, and validates the email 
 * input whenever the user types in the email field.
 */
function inputMailEventListener() {
      input_mail.addEventListener("input", () => {
        if (input_mail.value.trim() !== "") {
            req_mail = true;
            contact_mail_label.classList.remove("missing_input_title");
            input_mail.classList.remove("missing_inputs");
            validateEmail(input_mail);
        } else {
            req_mail = false;
            validateEmail(input_mail);
        }
    });
}


/**
 * This function adds an event listener to the message input field that checks for input changes. 
 * It updates the required message flag, removes any missing input indicators, and validates the input 
 * whenever the user types in the message field.
 */
function inputMessageEventListener() {
      input_message.addEventListener("input", () => {
        if (input_message.value.trim() !== "") {
            req_message = true;
            contact_message_label.classList.remove("missing_input_title");
            input_message.classList.remove("missing_inputs");
            validateInput(input_message);
        } else {
            req_message = false;
            validateInput(input_message);
        }
    });
}


/**
 * This function validates the input of a given input element and adds or removes the "is_valid" class based on whether the input is empty or not.
 * @param {HTMLInputElement | HTMLTextAreaElement} inputElement - The input element to validate.
 */
function validateInput(inputElement) {
    const value = inputElement.value.trim();
    if (value === "") {
        inputElement.classList.remove("is_valid");
    } 
    if (value.length > 3) {
        inputElement.classList.add("is_valid");
    }
}


/**
 * This function validates the email input of a given input element and adds or removes the "is_valid" class based on whether the email is valid or not.
 * @param {HTMLInputElement} emailInput - The email input element to validate.
 */
function validateEmail(emailInput) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (re.test(String(emailInput.value).toLowerCase())) {
        emailInput.classList.add("is_valid");
    } else {
        emailInput.classList.remove("is_valid");
    }
}