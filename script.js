document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit-btn').addEventListener('click', handleSubmit);
});

function handleSubmit(event) {
    
    event.preventDefault(); // Prevent form submission if there are errors
    
    // Validate the form
    const isValid = validateForm();

    if (!isValid) {
        return;
    }

    const grossAnnualIncome = parseInt(document.getElementById('annum-income').value);
    const extraIncome = parseInt(document.getElementById('extra-income').value);
    const ageGroup = parseInt(document.getElementById('age-group').value);
    const deductions = parseInt(document.getElementById('deductions').value);

    let totalIncome = grossAnnualIncome + extraIncome - deductions;
    let taxAmt = 0;

    if (totalIncome > 800000) {
        let taxIncome = totalIncome - 800000;
        if (ageGroup === 1) {
            taxAmt = 0.3 * taxIncome;
        } else if (ageGroup === 2) {
            taxAmt = 0.4 * taxIncome;
        } else if (ageGroup === 3) {
            taxAmt = 0.1 * taxIncome;
        } else {
            console.log("Invalid Age Group");
        }
    }
    else{
        console.log("No need to pay tax")
    }

    console.log("Total Income:", totalIncome);
    console.log("Tax Amount:", taxAmt);
    console.log("Gross Annual Income:", grossAnnualIncome);
    console.log("Extra Income:", extraIncome);
    console.log("Age Group:", ageGroup);
    console.log("Deductions:", deductions);


    if (totalIncome>800000){
        const taxAmountElement = document.getElementById('taxAmount');
    taxAmountElement.textContent = `${taxAmt.toFixed(2)} Lakhs`;

    // Show the modal
    var modal = new bootstrap.Modal(document.getElementById('taxModal'));
    modal.show();
    }
    else{
        const taxAmountElement = document.getElementById('totalAmount');
    taxAmountElement.textContent = `${totalIncome.toFixed(2)} Lakhs`;

    // Show the modal
    var modal = new bootstrap.Modal(document.getElementById('totalModal'));
    modal.show();
    }
    // Display taxAmt in the modal
    
}

function validateForm() {
    const inputs = document.querySelectorAll('input, select');
    let isValid = true;

    inputs.forEach(input => {
        const errorSpan = input.parentElement.querySelector('.error-icon');
        if (input.required && !input.value) {
            input.classList.add('is-invalid');
            errorSpan.style.display = 'inline';
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            errorSpan.style.display = 'none';
        }
    });

    const selectElement = document.getElementById('age-group');
    if (selectElement.required && !selectElement.value) {
        selectElement.classList.add('is-invalid');
        selectElement.parentElement.querySelector('.error-icon').style.display = 'inline';
        isValid = false;
    }


    return isValid;
}
