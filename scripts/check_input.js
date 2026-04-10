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


/** Opens mailto with form values and clears inputs. 
 * @param {Event} event 
 */
function sendMail(event) {
    if (event) event.preventDefault();
    window.location.href = `mailto:${input_mail.value}?subject=Contact from ${input_name.value}&body=${input_message.value}`;
    clearAllInputs();
}


/** Enables or disables send button based on all required fields being filled. */
function manageSendButtonStatus() {
    if (checkForRequired(['name', 'mail', 'message', 'checkbox'])) {
        send_button.disabled = false;
    } else {
        send_button.disabled = true;
    }
}


/** Caches all contact form DOM elements into module variables. */
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


/** Checks if all required fields are filled. 
 * @param {Array<string>} requiredFields @returns {boolean} true if all fields are filled */
function checkForRequired(requiredFields) {
    let isValid = true;
    for (const field of requiredFields) {
        isValid = checkSingleField(field) && isValid;
    }
    return isValid;
}

    
/** Updates req_* flags based on current input values. */
function setRequiredValues(element) {
    const checks = {
        name: !!input_name?.value.trim(),
        mail: !!input_mail?.value.trim(),
        message: !!input_message?.value.trim(),
        checkbox: !!input_checkbox?.checked
    };
    if (element === "name") req_name = checks.name;
    if (element === "mail") req_mail = checks.mail;
    if (element === "message") req_message = checks.message;
    if (element === "checkbox") req_checkbox = checks.checkbox;
}


/**
 * This function checks if the given field is filled/checked and updates the corresponding req_* flag.
 * @param {string} field 
 * @returns {boolean} true if the given field is filled/checked, false otherwise */
function checkSingleField(field) {
    switch (field) {
            case 'name':
                return (!!input_name?.value.trim());
            case 'mail':
                return (!!input_mail?.value.trim());
            case 'message':
                return (!!input_message?.value.trim());
            case 'checkbox':
                return (!!input_checkbox?.checked);
            default:
                return true;
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


/** Shows error indicators for missing required fields. */
function missingInputs(element) {
    if (element === "name" && !req_name) {
        handleMissingInput(contact_name_label, input_name, "Your name is required");
    } else if (element === "mail" && !req_mail) {
        handleMissingInput(contact_mail_label, input_mail, "Your email is required");
    } else if (element === "message" && !req_message) {
        handleMissingInput(contact_message_label, input_message, "Your message is required");
    } else if (element === "checkbox" && !req_checkbox) {
        enableCheckboxError();
        error_policy.classList.remove("d-none");
    }
}


/** Adds error classes to label and input. 
 * @param {HTMLElement} labelElement @param {HTMLElement} inputElement @param {string} errorMessage */
function handleMissingInput(labelElement, inputElement, errorMessage) {
    if(window.innerWidth < 700){
        inputElement.placeholder = errorMessage;
    } else {
        labelElement.classList.add("missing_input_title");
        labelElement.children[0].classList.remove("d-none");
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


/** Clears error state from the name field. */
function removeNameError() {
    contact_name_label.classList.remove("missing_input_title");
    contact_name_label.children[0].classList.add("d-none");
    input_name.classList.remove("missing_inputs");
    input_name.placeholder = "Your Name";
}

/** Clears error state from the mail field. */
function removeMailError() {
    contact_mail_label.classList.remove("missing_input_title");
    contact_mail_label.children[0].classList.add("d-none");
    input_mail.classList.remove("missing_inputs");
    input_mail.placeholder = "Your Email";
}

/** Clears error state from the message field. */
function removeMessageError() {
    contact_message_label.classList.remove("missing_input_title");
    contact_message_label.children[0].classList.add("d-none");
    input_message.classList.remove("missing_inputs");
    input_message.placeholder = "Your Message";
}


/** Clears error state from the checkbox field. */
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


/** Registers all contact form event listeners. */
function inputEventListener() {
    inputNameEventListener();
    inputMailEventListener();
    inputMessageEventListener();
    inputCheckboxEventListener();
    removeInputValidationListener(input_name, contact_name_label, req_name);
    removeInputValidationListener(input_mail, contact_mail_label, req_mail);
    removeInputValidationListener(input_message, contact_message_label, req_message);
}


/** Adds focus/blur listeners to the name input. */
function inputNameEventListener() {
    input_name.addEventListener("focus", () => removeIndicatorOnInput("name"));
    input_name.addEventListener("blur", () => {
        setRequiredValues("name");
        missingInputs("name");
        validateInput(input_name);
        manageSendButtonStatus();
    });
}


/** Adds focus/blur listeners to the mail input. */
function inputMailEventListener() {
    input_mail.addEventListener("focus", () => removeIndicatorOnInput("mail"));
    input_mail.addEventListener("blur", () => {
        setRequiredValues("mail");
        missingInputs("mail");
        validateEmail(input_mail);
        manageSendButtonStatus();
    });
}


/** Adds focus/blur listeners to the message input. */
function inputMessageEventListener() {
    input_message.addEventListener("focus", () => removeIndicatorOnInput("message"));
    input_message.addEventListener("blur", () => {
        setRequiredValues("message");
        missingInputs("message");
        validateInput(input_message);
        manageSendButtonStatus();
    });
}


/** Removes error CSS on input event when value is non-empty.
 * @param {HTMLInputElement|HTMLTextAreaElement} inputElement @param {HTMLElement} labelElement @param {boolean} field */
function removeInputValidationListener(inputElement, labelElement, field) {
    inputElement.addEventListener("input", () => {
        if (inputElement.value.trim() !== "") {
            field = false;
            labelElement.classList.remove("missing_input_title");
            inputElement.classList.remove("missing_inputs");
        }
    });
}


/** Adds focus/blur listeners to the policy checkbox. */
function inputCheckboxEventListener() {
    input_checkbox.addEventListener("focus", () => removeIndicatorOnInput("checkbox"));
    input_checkbox.addEventListener("blur", () => {
            setRequiredValues("checkbox");
            missingInputs("checkbox");
    });
    input_checkbox.addEventListener("change", () => {
            policy_checkbox_checked = input_checkbox.checked;
            manageSendButtonStatus();
            toggleAcceptPolicy();
    });
}


/** Toggles "is_valid" class based on whether value length > 3. 
 * @param {HTMLInputElement|HTMLTextAreaElement} inputElement */
function validateInput(inputElement) {
    const value = inputElement.value.trim();
    if (value === "") {
        inputElement.classList.remove("is_valid");
    } 
    if (value.length > 3) {
        inputElement.classList.add("is_valid");
    }
}


/** Toggles "is_valid" class based on email regex test. 
 * @param {HTMLInputElement} emailInput */
function validateEmail(emailInput) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (re.test(String(emailInput.value).toLowerCase())) {
        emailInput.classList.add("is_valid");
    } else {
        emailInput.classList.remove("is_valid");
    }
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
    req_checkbox = false;
    input_name.classList.remove("is_valid");
    input_mail.classList.remove("is_valid");
    input_message.classList.remove("is_valid");
}