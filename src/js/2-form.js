// 1. Даємо класи елементів в HTML для можливості стилізації по макету

const labels = document.querySelectorAll('label');
labels.forEach(label => label.classList.add('form-label'));

const input = document.querySelector('input');
input.classList.add('form-email');

const textarea = document.querySelector('textarea');
textarea.classList.add('form-message');

const button = document.querySelector('button');
button.classList.add('form-btn');

// 2. Оголошення зміних
const formData = {
  email: '',
  message: '',
};
const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';
const email = form.elements.email;
const message = form.elements.message;

// 3. читаємо інформацію із сховища
let dataStorage = localStorage.getItem(localStorageKey);

try {
  if (dataStorage !== null) {
    let obj = JSON.parse(dataStorage);
    formData = Object.assign(formData, obj);
  }
} catch (error) {
  console.log(error.message);
}
email.value = formData.email;
message.value = formData.message;

// 4. прослуховуємо введення і записуємо в сховище
form.addEventListener('input', evt => {
  switch (evt.target.name) {
    case 'email':
      formData.email = evt.target.value.trim();
      break;
    case 'message':
      formData.message = evt.target.value.trim();
  }
  if (formData.email || formData.message) {
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
  }
});

// 5. Відпрацювуємо submit
form.addEventListener('submit', evt => {
  evt.preventDefault();
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
  } else {
    console.log(formData);
    localStorage.removeItem(localStorageKey);
    formData.email = '';
    formData.message = '';
    form.reset();
  }
});
