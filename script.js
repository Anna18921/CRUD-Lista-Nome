window.addEventListener('load', start);

var globalName = ['Ana', 'Joao', 'Maria'];
var inputName = null;
var isEdit = false;
var currentindex = null;

function start() {
  preventFormSubmit();
  inputName = document.querySelector('#inputName');
  activateInput();
  render();
}

function insertName() {
  if (inputName.value === '') {
    alert('Campo nome não pode ser vazio');
    return;
  }
  globalName.push(inputName.value);
  render();
}

function updateName() {
  if (inputName.value === '') {
    alert('Campo nome não pode ser vazio');
    return;
  }
  globalName[currentindex] = inputName.value;
  render();
}

function submitButton() {
  isEdit ? updateName() : insertName();
  isEdit = false;
}

function handleTyping(event) {
  let hasText = !!event.target.value && event.target.value.trim() !== '';
  if (event.key === 'Enter' && hasText) {
    isEdit ? updateName() : insertName();
  }
  isEdit = false;
}

function activateInput() {
  inputName.focus();
  inputName.addEventListener('keyup', handleTyping);
}

function preventFormSubmit() {
  var form = document.querySelector('form');

  form.addEventListener('submit', handleSubmit);

  function handleSubmit(event) {
    event.preventDefault();
  }
}

function inputClear() {
  inputName.value = '';
  inputName.focus;
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalName.splice(index, 1);
      render();
    }
    let button = document.createElement('button');
    button.classList.add('classDeleteButton');
    button.textContent = 'x ';
    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editName() {
      inputName.value = name;
      inputName.focus();
      isEdit = true;
      currentindex = index;
    }
    let span = document.createElement('span');
    span.classList.add('clickSpan');
    span.textContent = name;
    span.addEventListener('click', editName);

    return span;
  }

  let divNames = document.querySelector('#list-names');
  divNames.innerHTML = '';
  let ul = document.createElement('ul');

  for (let i = 0; i < globalName.length; i++) {
    let li = document.createElement('li');
    let currentName = globalName[i];
    let button = createDeleteButton(i);
    let span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  inputClear();

  divNames.appendChild(ul);
}
