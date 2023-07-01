const socket = io('http://localhost:3000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container')
const audio = new Audio('ting.mp3');

const appendUser = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if (position == 'left') audio.play();
};


form.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendUser(`You: ${message}`, "right");
    socket.emit('send', message);
    messageInput.value = '';
});

const userName = prompt("Enter your name to join LetsChat")
socket.emit("new-user", userName);

socket.on("join-chat", (name) => {
  appendUser(`${name} joined the chat`, "right");
});

socket.on('receive', data => {
    appendUser(`${data.name}: ${data.message}`, "left");
});

socket.on('left', name => {
    appendUser(`${name} left the chat`, 'left');
});