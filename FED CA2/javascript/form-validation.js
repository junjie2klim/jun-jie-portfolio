"use strict";

// Run code when the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.wish-form');
    form.addEventListener('submit', handleFormSubmit);
});


function handleFormSubmit(event) {
    event.preventDefault(); 

    if (isFormValid()) { 
        showSuccessMessage();
        resetForm();
    }
}

// Check to see forms are filled up
function isFormValid() {
    let allFieldsValid = true; 

    if (!validateField('firstName', 'First name is required.')) allFieldsValid = false;
    if (!validateField('lastName', 'Last name is required.')) allFieldsValid = false;
    if (!validateField('email', 'Email is required.') || !isEmailValid('email')) allFieldsValid = false;
    if (!validateField('message', 'Message is required.')) allFieldsValid = false;
    if (!validateField('wishType', 'Please select a type of wish.')) allFieldsValid = false;

    return allFieldsValid; 
}

// Validate if content is empty
function validateField(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    if (field.value.trim() === '') { 
        field.classList.add('is-invalid'); 
        field.nextElementSibling.textContent = errorMessage; 
        return false; 
    } else {
        field.classList.remove('is-invalid'); 
        field.nextElementSibling.textContent = ''; 
        return true; 
    }
}

// Check email field
function isEmailValid(fieldId) {
    const emailField = document.getElementById(fieldId);
    if (emailField.value && !emailField.value.includes('@')) {
        emailField.classList.add('is-invalid'); 
        emailField.nextElementSibling.textContent = 'Please enter a valid email address.';
        return false; 
    }
    return true; 
}


function showSuccessMessage() {
    const successModal = new bootstrap.Modal(document.getElementById('customAlertModal'));
    successModal.show(); 
}


function resetForm() {
    document.querySelector('.wish-form').reset(); 
}
