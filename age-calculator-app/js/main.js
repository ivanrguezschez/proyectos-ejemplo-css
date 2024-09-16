import { checkDay, checkMonth, checkYear, isValidDate, getTimeDifference, capitalizeFirstCharacter } from "./utils.js";
import { validateBirthday } from "./classes.js";

const formButton = document.querySelector('.separator__button');
const resultsValid = document.querySelector('.results__valid');
const resultsInvalid = document.querySelector('.results__invalid');
const dateDOMElements = {
    day: {
        root: document.getElementById('input-day'),
        get input() {
            return this.root.querySelector('input')
        },
        get message() {
            return this.root.querySelector('.input-form__box__error-message')
        },
        get result() {
            return document.getElementById('result-days');
        }
    },
    month: {
        root: document.getElementById('input-month'),
        get input() {
            return this.root.querySelector('input')
        },
        get message() {
            return this.root.querySelector('.input-form__box__error-message')
        },
        get result() {
            return document.getElementById('result-months');
        }
    },
    year: {
        root: document.getElementById('input-year'),
        get input() {
            return this.root.querySelector('input')
        },
        get message() {
            return this.root.querySelector('.input-form__box__error-message')
        },
        get result() {
            return document.getElementById('result-years');
        }
    }
};

const validate = new validateBirthday(checkDay, checkMonth, checkYear, isValidDate, getTimeDifference);

Object.entries(dateDOMElements).forEach(([datePart, elements]) => {
    elements.input.addEventListener('blur', () => {
        validate.setDatePart(datePart, elements.input.value);
        const isValid = validate.isValidPart(datePart);
        if (!isValid) {
            elements.root.classList.add('input-form__box--error');
            elements.message.textContent = `${capitalizeFirstCharacter(datePart)} is invalid`;
        } else {
            elements.root.classList.remove('input-form__box--error');
        }
        formButton.style.display = validate.allPartsAreValid ? 'flex' : 'none';
    });
});

formButton.addEventListener('click', () => {
    const { day, month, year } = dateDOMElements;
    if (validate.isValidDate) {
        const { yearsPassed, monthsPassed, daysPassed } = validate.timeDifference;

        console.log('RESULT: ', daysPassed, monthsPassed, yearsPassed);

        day.result.textContent = daysPassed;
        month.result.textContent = monthsPassed;
        year.result.textContent = yearsPassed;
        resultsValid.style.display = 'block';
        resultsInvalid.style.display = 'none';
    } else {
        resultsValid.style.display = 'none';
        resultsInvalid.style.display = 'block';
    }
});
