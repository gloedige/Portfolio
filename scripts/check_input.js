let req_name = false;
let req_mail = false;
let req_message = false;
let req_checkbox = false;
let input_name = null;
let input_mail = null;
let input_message = null;
let input_checkbox = null;
let contact_name_label = null;
let contact_mail_label = null;
let contact_message_label = null;
let error_policy = null;
let policy_checkbox_checked = false;
let send_button = null;

loadContactSection();
inputEventListener();


function sendMail(event) {
    if (event) event.preventDefault();
    window.location.href = `mailto:${input_mail.value}?subject=Contact from ${input_name.value}&body=${input_message.value}`;
    clearAllInputs();
}


/**
 * This function checks if all required fields are filled and enables or disables the send button accordingly. 
 * If any required fields are missing, it calls the function to show indicators for missing inputs and resets the required field flags.
 */
function manageSendButtonStatus() {
    if (checkForRequired(['name', 'mail', 'message', 'checkbox'])) {
        send_button.disabled = false;
    } else {
        send_button.disabled = true;
    }
}


/**
 * This function loads the contact section input elements into variables for later use in validation and sending email.
*/
function loadContactSection() {
    input_name = document.getElementById("contact_name");
    input_mail = document.getElementById("contact_mail");
    input_message = document.getElementById("contact_message");
    input_checkbox = document.getElementById("accept_policy");
    contact_name_label = document.getElementById("contact_name_label");
    contact_mail_label = document.getElementById("contact_mail_label");
    contact_message_label = document.getElementById("contact_message_label");
    contact_checkbox = document.getElementById("checkbox_container");
    error_policy = document.getElementById("error_policy");
    send_button = document.getElementById("send_button");
}


/**
 * Checks if the required fields are filled.
 * @param {Array<string>} requiredFields - Array of field names to check (e.g. ['name', 'mail', 'message'])
 * @returns {boolean} true if all required fields are filled, false otherwise
*/
function checkForRequired(requiredFields) {
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
            case 'checkbox':
                if (!document.getElementById('accept_policy').checked) isValid = false;
                break;
        }
    }
    return isValid;
}

    
/**
 * This function sets the required value flags based on current input values to be used in validation
 */
function setRequiredValues(element) {
    switch (element) {
        case "name":
            if (input_name.value.trim() !== "") {
                req_name = true;
            }
            break;
        case "mail":
            if (input_mail.value.trim() !== "") {
                req_mail = true;
            }
            break;
        case "message":
            if (input_message.value.trim() !== "") {
                req_message = true;
            }
            break;
        case "checkbox":
            if (policy_checkbox_checked) {
                req_checkbox = true;
            }
            break;
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
    clearCheckboxAndValidation();
}


/**
 * Shows UI indicators for any required fields that are missing.
 */
function missingInputs(element) {
    switch (element) {
        case "name":
            if (req_name == false) {
                handleMissingInput(contact_name_label, input_name);
            }
            break;
        case "mail":
            if (req_mail == false) {
                handleMissingInput(contact_mail_label, input_mail);
            }
            break;
        case "message":
            if (req_message == false) {
                handleMissingInput(contact_message_label, input_message);
            }
            break;
        case "checkbox":
            if (req_checkbox == false) {
                enableCheckboxError();
                error_policy.classList.remove("d-none");
            }
            break;
    }
}


/**
 * This function updates the label and input element to indicate a missing required field by adding specific classes and 
 * showing error indicators.
 * @param {*} labelElement - The label element associated with the input field. 
 * @param {*} inputElement - The input element that is missing required input. The function adds a class to this element 
 * to visually indicate the error state.
 */

function handleMissingInput(labelElement, inputElement) {
    labelElement.classList.add("missing_input_title");
    labelElement.children[0].classList.remove("d-none");
    inputElement.classList.add("missing_inputs");
}


/**
 * This function enables the error state for the checkbox by showing the error icon and hiding the default and checked icons.
 */
function enableCheckboxError() {
    for (const child of contact_checkbox.children) {
        if (child.classList.contains("checkbox_error")) {
            child.classList.remove("inactive");
        }
        if (child.classList.contains("checkbox_checked")) {
            child.classList.add("inactive");
        }
        if (child.classList.contains("checkbox_default")) {
            child.classList.add("inactive");
        }
        if (child.classList.contains("checkbox_hover")) {
            child.classList.add("inactive");
        }
    }
}


/**
 * Removes the missing-input indicator for a specific field.
 * @param {string} field - One of "name", "mail", "message", "checkbox".
 */
function removeIndicatorOnInput(field) {
    switch (field) {
        case "name":
            removeNameError();
            break;
        case "mail":
            removeMailError();
            break;
        case "message":
            removeMessageError();
            break;
        case "checkbox":
            removeCheckboxError();
            break;
    }
}


/**
 * This function updates the current text and span text based on whether the text is being typed or deleted,
 * and how it compares to the full text. It handles the logic for both typing and deleting characters, ensuring
 * that the correct portion of the text is displayed at each step.
 */
function removeNameError() {
    contact_name_label.classList.remove("missing_input_title");
    contact_name_label.children[0].classList.add("d-none");
    input_name.classList.remove("missing_inputs");
}

/**
 * This function updates the current text and span text based on whether the text is being typed or deleted,
 * and how it compares to the full text. It handles the logic for both typing and deleting characters, ensuring
 * that the correct portion of the text is displayed at each step.
 */
function removeMailError() {
    contact_mail_label.classList.remove("missing_input_title");
    contact_mail_label.children[0].classList.add("d-none");
    input_mail.classList.remove("missing_inputs");
}

/**
 * This function updates the current text and span text based on whether the text is being typed or deleted,
 * and how it compares to the full text. It handles the logic for both typing and deleting characters, ensuring
 * that the correct portion of the text is displayed at each step.
 */
function removeMessageError() {
    contact_message_label.classList.remove("missing_input_title");
    contact_message_label.children[0].classList.add("d-none");
    input_message.classList.remove("missing_inputs");
}


/**
 * This function updates the current text and span text based on whether the text is being typed or deleted,
 * and how it compares to the full text. It handles the logic for both typing and deleting characters, ensuring
 * that the correct portion of the text is displayed at each step.
 * @param {string} currentText - The current text being displayed that is being typed or deleted.
 */
function removeCheckboxError() {
    contact_checkbox.classList.remove("missing_input_title");
        for (const child of contact_checkbox.children) {
            if (child.classList.contains("checkbox_error")) {
                child.classList.add("inactive");
            }
            if (child.classList.contains("checkbox_default")) {
                child.classList.remove("inactive");
            }
            if (child.classList.contains("checkbox_hover")) {
                child.classList.remove("inactive");
            }
        }
    toggleAcceptPolicy();
    error_policy.classList.add("d-none");
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
    inputCheckboxEventListener();
    removeInputValidationListener(input_name, contact_name_label, req_name);
    removeInputValidationListener(input_mail, contact_mail_label, req_mail);
    removeInputValidationListener(input_message, contact_message_label, req_message);
}


/**
 * This function adds an event listener to the name input field that checks for input changes. 
 * It updates the required name flag, removes any missing input indicators, and validates the input 
 * whenever the user types in the name field.
 */
function inputNameEventListener() {
    input_name.addEventListener("focus", () => removeIndicatorOnInput("name"));
    input_name.addEventListener("blur", () => {
        setRequiredValues("name");
        missingInputs("name");
        validateInput(input_name);
        manageSendButtonStatus();
    });
}


/**
 * This function adds an event listener to the email input field that checks for input changes. 
 * It updates the required email flag, removes any missing input indicators, and validates the email 
 * input whenever the user types in the email field.
 */
function inputMailEventListener() {
    input_mail.addEventListener("focus", () => removeIndicatorOnInput("mail"));
    input_mail.addEventListener("blur", () => {
        setRequiredValues("mail");
        missingInputs("mail");
        validateEmail(input_mail);
        manageSendButtonStatus();
    });
}


/**
 * This function adds an event listener to the message input field that checks for input changes. 
 * It updates the required message flag, removes any missing input indicators, and validates the input 
 * whenever the user types in the message field.
 */
function inputMessageEventListener() {
    input_message.addEventListener("focus", () => removeIndicatorOnInput("message"));
    input_message.addEventListener("blur", () => {
        setRequiredValues("message");
        missingInputs("message");
        validateInput(input_message);
        manageSendButtonStatus();
    });
}


/**
 * This function adds an event listener to the specified input element that listens for input events. When the user types into 
 * the input field, it checks if the value is not empty and, if so, it updates the corresponding required field flag and 
 * removes any missing input indicators from the label and input element.
 * @param {HTMLInputElement | HTMLTextAreaElement} inputElement - The input element to which the event listener will be added. 
 * This can be either a text input or a textarea element.
 * @param {HTMLElement} labelElement - The label element associated with the input element.
 * @param {boolean} field - The flag indicating whether the input field is required.
 */
function removeInputValidationListener(inputElement, labelElement, field) {
    inputElement.addEventListener("input", () => {
        if (inputElement.value.trim() !== "") {
            field = false;
            labelElement.classList.remove("missing_input_title");
            inputElement.classList.remove("missing_inputs");
        }
    });
}


/**
 * This function adds an event listener to the accept policy checkbox that checks for changes in its state.
 * It updates the required checkbox flag, removes any missing input indicators, and toggles the visibility of the 
 * checked state accordingly whenever the user interacts with the checkbox.
 */
function inputCheckboxEventListener() {
    input_checkbox.addEventListener("focus", () => removeIndicatorOnInput("checkbox"));
    input_checkbox.addEventListener("change", () => {
        policy_checkbox_checked = input_checkbox.checked;
        if (input_checkbox.checked) {
            removeIndicatorOnInput("checkbox");
            manageSendButtonStatus();
            setRequiredValues("checkbox");
        } else {
            missingInputs("checkbox");
        }
    });
    toggleAcceptPolicy();
}


/**
 * This function validates the input of a given input element and adds or removes the "is_valid" class based 
 * on whether the input is empty or not.
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
 * This function validates the email input of a given input element and adds or removes the "is_valid" class based 
 * on whether the email is valid or not.
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


/**
 * This function toggles the visibility of the checked state of the accept policy checkbox based on whether the checkbox is checked or not.
 * It changes the opacity of the checked state image to show or hide it accordingly.
 */
function toggleAcceptPolicy() {
    const checkboxChecked = document.querySelector(".checkbox_checked");
        if (input_checkbox.checked) {
            checkboxChecked.classList.remove("inactive");
            checkboxChecked.classList.add("active");
        } else {
            checkboxChecked.classList.remove("active");
            checkboxChecked.classList.add("inactive");
        }
}


/**
 * This function clears the checkbox state and any associated validation indicators, resetting the checkbox to its 
 * default state and removing any error indicators.
 */
function clearCheckboxAndValidation(){
    input_checkbox.checked = false;
    send_button.disabled = true;
    toggleAcceptPolicy();
    req_checkbox = false;
    input_name.classList.remove("is_valid");
    input_mail.classList.remove("is_valid");
    input_message.classList.remove("is_valid");
}