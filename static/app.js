const form = document.querySelector('#chat-form');
const promptInput = document.querySelector('#prompt');
const messages = document.querySelector('#messages');
const intro = document.querySelector('#intro');
const sendButton = document.querySelector('.send-button');

function addMessage(text, role) {
  const message = document.createElement('div');
  message.className = `message ${role}`;
  message.textContent = text;
  messages.appendChild(message);
  message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

document.querySelectorAll('[data-prompt]').forEach((button) => {
  button.addEventListener('click', () => {
    promptInput.value = button.dataset.prompt;
    promptInput.focus();
  });
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const prompt = promptInput.value.trim();
  if (!prompt) return;

  intro.classList.add('hidden');
  addMessage(prompt, 'user');
  promptInput.value = '';
  sendButton.disabled = true;
  const typing = document.createElement('div');
  typing.className = 'message assistant typing';
  typing.textContent = 'Thinking...';
  messages.appendChild(typing);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    typing.remove();
    addMessage(response.ok ? data.response : data.error, response.ok ? 'assistant' : 'assistant');
  } catch (error) {
    typing.remove();
    addMessage('Connection problem. Please try again.', 'assistant');
  } finally {
    sendButton.disabled = false;
    promptInput.focus();
  }
});