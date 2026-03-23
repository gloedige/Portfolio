let req_name = false;
let req_mail = false;
let req_message = false;
let contact_name = null;
let contact_mail = null;
let contact_message = null;
let contact_name_label = null;
let contact_mail_label = null;
let contact_message_label = null;


function sendMail() {
    loadContactSection();
    if (checkForRequired(['name', 'mail', 'message'])) {
        window.location.href = `mailto:${contact_mail.value}?subject=Contact from ${contact_name.value}&body=${contact_message.value}`;
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
    contact_name = document.getElementById("contact_name");
    contact_mail = document.getElementById("contact_mail");
    contact_message = document.getElementById("contact_message");
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
    if (contact_name.value.trim() !== "") {
        req_name = true
    }
    if (contact_mail.value.trim() !== "") {
        req_mail = true
    }
    if (contact_message.value.trim() !== "") {
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
    contact_name.value = ""
    contact_mail.value = ""
    contact_message.value = ""
}


/**
 * Shows UI indicators for any required fields that are missing.
 */
function missingInputs() {
    if (req_name == false) {
        // req_name_text.style.opacity = "1"
        contact_name_label.classList.add("missing_input_title")
        contact_name.classList.add("missing_inputs")
        // contact_name_label.querySelector("span")?.classList.add("missing_input_title")
    }
    if (req_mail == false) {
        // req_mail_text.style.opacity = "1"
        contact_mail_label.classList.add("missing_input_title")
        contact_mail.classList.add("missing_inputs")
        // contact_mail_label.querySelector("span")?.classList.add("missing_input_title")
    }
    if (req_message == false) {
        // req_message_text.style.opacity = "1"
        contact_message_label.classList.add("missing_input_title")
        contact_message.classList.add("missing_inputs")
        // contact_message_label.querySelector("span")?.classList.add("missing_input_title")
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


