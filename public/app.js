import { Credit } from './classes/Credit.js';
import { Debit } from './classes/Debit.js';
import { ListTemplate } from './classes/ListTemplate.js';
const form = document.querySelector('.new-item-form');
const ul = document.querySelector('.item-list');
const type = document.querySelector('#type');
const tofrom = document.querySelector('#tofrom');
const details = document.querySelector('#details');
const amount = document.querySelector('#amount');
const transactionList = new ListTemplate(ul);
const isNotEmpty = (input) => {
    return input.length > 0;
};
const notZero = (num) => {
    return amount.valueAsNumber !== 0;
};
const isDebit = (type) => {
    return type === "debit";
};
const resetForm = () => {
    type.value = 'credit';
    tofrom.value = '';
    details.value = '';
    amount.value = '';
};
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let values;
    values = [tofrom.value, details.value, amount.valueAsNumber];
    let doc;
    if (isNotEmpty(tofrom.value) && isNotEmpty(details.value) && notZero(amount.valueAsNumber)) {
        if (isDebit(type.value)) {
            doc = new Debit(...values);
        }
        else {
            doc = new Credit(...values);
        }
        resetForm();
        transactionList.render(doc, type.value, 'end');
    }
});
