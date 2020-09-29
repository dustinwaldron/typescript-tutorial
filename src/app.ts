import { Credit } from './classes/Credit.js';
import { Debit } from './classes/Debit.js';
import { HasFormatter } from './interfaces/HasFormatter.js';
import { ListTemplate } from './classes/ListTemplate.js';

const form = document.querySelector('.new-item-form') as HTMLFormElement;
const ul = document.querySelector('.item-list') as HTMLUListElement;
const type = document.querySelector('#type') as HTMLSelectElement;
const tofrom = document.querySelector('#tofrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

const transactionList = new ListTemplate(ul);

const isNotEmpty = (input: string) => {
  return input.length > 0;
}

const notZero = (num: number) => {
  return amount.valueAsNumber !== 0;
}

const isDebit = (type: string) => {
  return type === "debit";
}

const resetForm = () => {
  type.value = 'credit';
  tofrom.value = '';
  details.value = '';
  amount.value = '';
}

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  let values: [string, string, number];
  values = [tofrom.value, details.value, amount.valueAsNumber];

  let doc: HasFormatter;

  if (isNotEmpty(tofrom.value) && isNotEmpty(details.value) && notZero(amount.valueAsNumber)) {
    if (isDebit(type.value)) {
      doc = new Debit(...values);
    } else {
      doc = new Credit(...values);
    }
    resetForm();
    transactionList.render(doc, type.value, 'end');
  }
});