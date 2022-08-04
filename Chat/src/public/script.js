const socket = io();

// eslint-disable-next-line no-alert
const user = prompt('What is your name?');
socket.emit('new-user', user);

const form = document.querySelector('.chat-message');
const input = document.getElementById('message-to-send');
const messages = document.querySelector('body > div > div.chat > div.chat-history > ul');
const ul = document.querySelector('.list-of-new-users');
const feedback = document.getElementById('feedback');

function userOffline(username) {
  const name = document.querySelector(`.${username}`);
  const span = document.createElement('span');
  let count = 1;

  span.insertAdjacentHTML('afterbegin', `
    <span style="margin-left:40px">is offline 1m</span>
  `);
  name.append(span);

  setInterval(() => {
    count += 1;
    span.innerHTML = `
        <span style="margin-left:40px">is offline ${count}m</span>
      `;
  }, 60000);
}

function appendUsers(users) {
  ul.insertAdjacentHTML('afterbegin', `
    <li class=${users}>${users}</li>
  `);
}

function appendMessage(message, name) {
  const newUser = document.createElement('li');
  const currentUser = document.createElement('li');

  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  if (user === 'Vincent') {
    currentUser.insertAdjacentHTML('afterbegin', `
      <div class="message-data">
        <span class="message-data-name">${name}</span>
        &nbsp; &nbsp;
        <span class="message-data-time">${hours}:${minutes} ${ampm}, Today</span>
      </div>
      <div class="message my-message">
        ${message}
      </div>
    `);

    messages.append(currentUser);
  } else {
    newUser.classList.add('clearfix');

    newUser.insertAdjacentHTML('afterbegin', `
      <div class="message-data align-right">
        <span class="message-data-time">${hours}:${minutes} ${ampm}, Today</span>
        &nbsp; &nbsp;
        <span class="message-data-name">${name}</span>
      </div>
      <div class="message other-message float-right">
        ${message}
      </div>
    `);

    messages.append(newUser);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (input.value) {
    socket.emit('send chat message', input.value);
    input.value = '';
  }
});

input.addEventListener('keypress', () => {
  socket.emit('typing', user);
});

socket.on('chat message', (data) => {
  feedback.innerHTML = '';
  appendMessage(data.message, data.name);
});

socket.on('user-connected', (name) => {
  appendUsers(name);
});

socket.on('userOffline', (data) => {
  userOffline(data.name);
});

socket.on('typing', (data) => {
  feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
  setTimeout(() => {
    feedback.innerHTML = '';
  }, 5000);
});
