// Chatbot Widget Script

// Wait for DOM to be ready
function initChatbot() {
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotMessages = document.getElementById('chatbot-messages');

  // Check if elements exist
  if (!chatbotToggle || !chatbotContainer || !chatbotClose || !chatbotInput || !chatbotSend || !chatbotMessages) {
    console.error('Chatbot elements not found. Make sure chatbot-widget.ejs is included.');
    return;
  }

  // Toggle chatbot
  chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.add('open');
    chatbotToggle.classList.add('hidden');
    chatbotInput.focus();
  });

  // Close chatbot
  chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.remove('open');
    chatbotToggle.classList.remove('hidden');
  });

  // Send message
  chatbotSend.addEventListener('click', sendMessage);
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Disable input while sending
    chatbotInput.disabled = true;
    chatbotSend.disabled = true;

    // Add user message
    addMessage(message, 'user');
    chatbotInput.value = '';

    // Show loading indicator
    showLoadingIndicator();

    try {
      const response = fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });

      response.then(res => {
        console.log('Response status:', res.status);
        console.log('Content-Type:', res.headers.get('content-type'));
        
        if (!res.ok) {
          return res.text().then(text => {
            console.error('Error response text:', text.substring(0, 500));
            throw new Error(`HTTP ${res.status}: API Error`);
          });
        }
        return res.json();
      }).then(data => {
        console.log('Success! Data:', data);
        removeLoadingIndicator();
        addMessage(data.reply, 'bot');
      }).catch(error => {
        console.error('Chatbot error:', error);
        removeLoadingIndicator();
        addMessage('Sorry, the chatbot service is unavailable. Check console for details.', 'bot');
      }).finally(() => {
        chatbotInput.disabled = false;
        chatbotSend.disabled = false;
        chatbotInput.focus();
      });
    } catch (error) {
      console.error('Chatbot error:', error);
      removeLoadingIndicator();
      addMessage('Sorry, I couldn\'t process that. Please try again.', 'bot');
      chatbotInput.disabled = false;
      chatbotSend.disabled = false;
    }
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'chatbot-message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function showLoadingIndicator() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'chatbot-message bot';
    loadingDiv.innerHTML = '<div class="chatbot-loading"><span></span><span></span><span></span></div>';
    loadingDiv.id = 'chatbot-loading';
    chatbotMessages.appendChild(loadingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function removeLoadingIndicator() {
    const loading = document.getElementById('chatbot-loading');
    if (loading) {
      loading.remove();
    }
  }

  // Add initial greeting
  addMessage('Hi! 👋 I\'m your Disaster Safety Bot. Ask me anything about disaster preparedness and safety!', 'bot');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}
