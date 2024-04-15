document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit-btn').addEventListener('click', function() {
        const grossIncome = parseFloat(document.getElementById('gross-income').value);
        const extraIncome = parseFloat(document.getElementById('extra-income').value);
        const age = document.getElementById('age').value;
        const deductions = parseFloat(document.getElementById('deductions').value);

        if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(deductions)) {
            showError('Please enter valid numbers.');
            return;
        }

        if (grossIncome < 0 || extraIncome < 0 || deductions < 0) {
            showError('Please enter positive numbers.');
            return;
        }

        // Calculate tax
        let taxRate;
        if (age === '<40') {
            taxRate = 0.3;
        } else if (age === '>=40&<60') {
            taxRate = 0.4;
        } else if (age === '>=60') {
            taxRate = 0.1;
        }

        const totalIncome = grossIncome + extraIncome - deductions;
        let taxAmount = 0;
        if (totalIncome > 800000) {
            taxAmount = taxRate * (totalIncome - 800000);
        }

        document.getElementById('result').innerText = `Your overall income will be: ${taxAmount.toFixed(2)} after tax deductions`;
        document.getElementById('result-modal').style.display = 'block';
    });

    const inputFields = document.querySelectorAll('.input-field');
    inputFields.forEach(function(input) {
        input.addEventListener('input', function() {
            const errorIconId = input.id + '-error';
            const errorIcon = document.getElementById(errorIconId);

            if (!input.validity.valid) {
                errorIcon.style.display = 'inline';
            } else {
                errorIcon.style.display = 'none';
            }
        });
    });

    document.getElementById('close-modal-btn').addEventListener('click', function() {
        document.getElementById('result-modal').style.display = 'none';
    });
});

function showError(message) {
    alert(message);
}
