let valid_name = false;
let valid_mail = false;
let valid_message = false;
let valid_checkbox = false;
let name_input = null;
let email_input = null;
let message_input = null;
let input_checkbox = null;
let name_input_label = null;
let email_input_label = null;
let message_input_label = null;
let error_policy = null;
let send_button = null;

const nameValidationErrorText = "Please enter at least 3 letters (a-z)";
const emailValidationErrorText = "Please enter a valid email address";
const messageValidationErrorText = "Please enter at least 4 characters";
const nameEmptyErrorText = "Your name is required";
const emailEmptyErrorText = "Your email is required";
const messageEmptyErrorText = "Your message is required";
const nameStandardLabelAndPlaceholderText = "Your Name";
const emailStandardLabelAndPlaceholderText = "Your Email";
const messageStandardLabelAndPlaceholderText = "Your Message";

loadContactSection();
inputEventListener();


/** Opens mailto with form values and clears inputs. 
 * @param {Event} event 
 */
function sendMail(event) {
    if (event) event.preventDefault();
    window.location.href = `mailto:${email_input.value}?subject=Contact from ${name_input.value}&body=${message_input.value}`;
    clearAllInputs();
}


/** Caches all contact form DOM elements into module variables. */
function loadContactSection() {
    name_input = document.getElementById("contact_name");
    email_input = document.getElementById("contact_mail");
    message_input = document.getElementById("contact_message");
    input_checkbox = document.getElementById("accept_policy");
    name_input_label = document.getElementById("contact_name_label");
    email_input_label = document.getElementById("contact_mail_label");
    message_input_label = document.getElementById("contact_message_label");
    contact_checkbox = document.getElementById("checkbox_container");
    error_policy = document.getElementById("error_policy");
    send_button = document.getElementById("send_button");
}


/** Enables or disables send button based on all required fields being filled. */
function manageSendButtonStatus() {
    if (checkForRequired()) {
        send_button.disabled = false;
    } else {
        send_button.disabled = true;
    }
}


/** Checks if all required fields are filled. 
 * @returns {boolean} true if all fields are filled */
function checkForRequired() {
    let isValid = true;
    const requiredFields = [valid_name, valid_mail, valid_message, valid_checkbox];
    for (const field of requiredFields) {
        isValid = field && isValid;
    }
    return isValid;
}


/**
 * Clears all form inputs.
 */
function clearAllInputs() {
    valid_name = false
    valid_mail = false
    valid_message = false
    name_input.value = ""
    email_input.value = ""
    message_input.value = ""
    clearCheckboxAndValidation();
}


/** Adds error classes to label and input. 
 * @param {HTMLElement} labelElement @param {HTMLElement} inputElement @param {string} errorMessage */
function handleMissingInput(labelElement, inputElement, errorMessage) {
    if(window.innerWidth < 700){
        inputElement.value = "";
        inputElement.placeholder = errorMessage;
    } else {
        labelElement.classList.add("font_color_red");
        labelElement.textContent = errorMessage;
    }
    inputElement.classList.add("missing_inputs"); 
}


/** Shows checkbox error icon, hides default/checked/hover icons. */
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


/** Removes error indicator for the given field. 
 * @param {string} field */
function removeIndicatorOnInput(field) {
    switch (field) {
        case "name":
            removeNameError();
            resetValidationError("contact_name", nameStandardLabelAndPlaceholderText);
            break;
        case "mail":
            removeMailError();
            resetValidationError("contact_mail", emailStandardLabelAndPlaceholderText);
            break;
        case "message":
            removeMessageError();
            resetValidationError("contact_message", messageStandardLabelAndPlaceholderText);
            break;
        case "checkbox":
            removeCheckboxError();
            break;
    }
}


/** Clears error state from the name field. */
function removeNameError() {
    name_input_label.classList.remove("font_color_red");
    name_input.classList.remove("missing_inputs");
    name_input.placeholder = nameStandardLabelAndPlaceholderText;
}

/** Clears error state from the mail field. */
function removeMailError() {
    email_input_label.classList.remove("font_color_red");
    email_input.classList.remove("missing_inputs");
    email_input.placeholder = emailStandardLabelAndPlaceholderText;
}

/** Clears error state from the message field. */
function removeMessageError() {
    message_input_label.classList.remove("font_color_red");
    message_input.classList.remove("missing_inputs");
    message_input.placeholder = messageStandardLabelAndPlaceholderText;
}


/** Clears error state from the checkbox field. */
function removeCheckboxError() {
    contact_checkbox.classList.remove("font_color_red");
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


/** Registers all contact form event listeners. */
function inputEventListener() {
    inputNameEventListener();
    inputMailEventListener();
    inputMessageEventListener();
    inputCheckboxEventListener();
    removeInputValidationListener(name_input, name_input_label, valid_name);
    removeInputValidationListener(email_input, email_input_label, valid_mail);
    removeInputValidationListener(message_input, message_input_label, valid_message);
}


/** Adds focus/blur listeners to the name input. */
function inputNameEventListener() {
    name_input.addEventListener("focus", () => removeIndicatorOnInput("name"));
    name_input.addEventListener("blur", () => {
        validateNameInput(name_input);
        manageSendButtonStatus();
    });
}


/** Adds focus/blur listeners to the mail input. */
function inputMailEventListener() {
    email_input.addEventListener("focus", () => removeIndicatorOnInput("mail"));
    email_input.addEventListener("blur", () => {
        validateEmailInput(email_input);
        manageSendButtonStatus();
    });
}


/** Adds focus/blur listeners to the message input. */
function inputMessageEventListener() {
    message_input.addEventListener("focus", () => removeIndicatorOnInput("message"));
    message_input.addEventListener("blur", () => {
        validateMessageInput(message_input);
        manageSendButtonStatus();
    });
}


/** Adds focus/blur listeners to the policy checkbox. */
function inputCheckboxEventListener() {
    input_checkbox.addEventListener("focus", () => removeIndicatorOnInput("checkbox"));
    input_checkbox.addEventListener("change", () => {
        validateCheckboxInput();
        manageSendButtonStatus();
        toggleAcceptPolicy();
    });
    input_checkbox.addEventListener("blur", () => {
        validateCheckboxInput();
        manageSendButtonStatus();
        toggleAcceptPolicy();
    });
}


/** Removes error CSS on input event when value is non-empty.
 * @param {HTMLInputElement|HTMLTextAreaElement} inputElement @param {HTMLElement} labelElement @param {boolean} field */
function removeInputValidationListener(inputElement, labelElement, field) {
    inputElement.addEventListener("input", () => {
        if (inputElement.value.trim() !== "") {
            field = false;
            labelElement.classList.remove("font_color_red");
            inputElement.classList.remove("missing_inputs");
        }
    });
}


/** Toggles "is_valid" class based on whether value length > 3. 
 * @param {HTMLInputElement|HTMLTextAreaElement} inputElement */
function validateNameInput(inputElement) {
    if (checkIsEmptyInputValues("name")) {
        valid_name = false;
        inputElement.classList.remove("is_valid");
        handleMissingInput(name_input_label, name_input, nameEmptyErrorText);
    } else if (!isOnlyLetters(inputElement) || !checkRequiredInputLengths(3, inputElement)){
        valid_name = false;
        inputElement.classList.remove("is_valid");
        handleMissingInput(name_input_label, name_input, nameValidationErrorText);
    } else {
        inputElement.classList.add("is_valid");
        valid_name = true;
    }
}


/** Toggles "is_valid" class based on whether value length > 3. 
 * @param {HTMLInputElement|HTMLTextAreaElement} inputElement */
function validateMessageInput(inputElement) {
    if (checkIsEmptyInputValues("message")) {
        valid_message = false;
        inputElement.classList.remove("is_valid");
        handleMissingInput(message_input_label, message_input, messageEmptyErrorText);
    } else if (!checkRequiredInputLengths(4, inputElement)) {
        valid_message = false;
        inputElement.classList.remove("is_valid");
        handleMissingInput(message_input_label, message_input, messageValidationErrorText);
    } else {
        inputElement.classList.add("is_valid");
        valid_message = true;
    }
}


/** Toggles "is_valid" class based on email regex test. 
 * @param {HTMLInputElement} emailInput */
function validateEmailInput(emailInput) {
    if (checkIsEmptyInputValues("mail")) {
        valid_mail = false;
        emailInput.classList.remove("is_valid");
        handleMissingInput(email_input_label, email_input, emailEmptyErrorText);
    } else if (!checkEmailForm()) {
        valid_mail = false;
        emailInput.classList.remove("is_valid");
        handleMissingInput(email_input_label, email_input, emailValidationErrorText);
    } else {
        emailInput.classList.add("is_valid");
        valid_mail = true;
    }
}


function validateCheckboxInput() {
    if (!checkIsEmptyInputValues("checkbox")) {
        valid_checkbox = true;
    } else {
        valid_checkbox = false;
        enableCheckboxError();
        error_policy.classList.remove("d-none");
    }
}


/** Updates valid_* flags based on current input values. */
function checkIsEmptyInputValues(element) {
    const checks = {
        name: !name_input?.value.trim(),
        mail: !email_input?.value.trim(),
        message: !message_input?.value.trim(),
        checkbox: !input_checkbox?.checked
    };
    if (element === "name") return checks.name;
    if (element === "mail") return checks.mail;
    if (element === "message") return checks.message;
    if (element === "checkbox") return checks.checkbox;
}


/**
 * This function checks if the email input value matches a basic email regex pattern.
 * @returns - {boolean} true if the email is valid, false otherwise.
 */
function checkEmailForm(){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email_input.value).toLowerCase());
}


/**
 * This function checks if the input value meets the minimum length requirement after trimming whitespace.
 * @param {number} minLengths - The minimum length required for the input value.
 * @param {HTMLInputElement|HTMLTextAreaElement} inputElement - The input element to check.
 * @returns {boolean} - True if the input value meets the minimum length, false otherwise.
 */
function checkRequiredInputLengths(minLengths, inputElement) {
    return inputElement.value.trim().length >= minLengths;
}


/**
 * This function checks if a string contains only letters (a-z, A-Z).
 * @param {HTMLInputElement|HTMLTextAreaElement} element - The input element to check.
 * @returns {boolean} - True if the input value contains only letters, false otherwise.
 */
function isOnlyLetters(element) {
    return /^[a-zA-Z]+( [a-zA-Z]+)*$/.test(element.value.trim());
}


/**
 * This function resets the validation error message for the given input field by updating the 
 * corresponding label text to the default message.
 * @param {string} inputId - The ID of the input field for which to reset the error message.
 * @param {string} defaultMessage - The default message to display.
 */
function resetValidationError(inputId, defaultMessage) {
    const labelElement = document.getElementById(inputId + "_label");
    const inputElement = document.getElementById(inputId);
    labelElement.classList.remove("font_color_red");
    inputElement.classList.remove("missing_inputs");
    labelElement.textContent = defaultMessage;
}


/** Toggles active/inactive on the checkbox_checked icon. */
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


/** Resets checkbox state and removes all is_valid classes. */
function clearCheckboxAndValidation(){
    input_checkbox.checked = false;
    send_button.disabled = true;
    toggleAcceptPolicy();
    valid_checkbox = false;
    name_input.classList.remove("is_valid");
    email_input.classList.remove("is_valid");
    message_input.classList.remove("is_valid");
}