document.addEventListener('DOMContentLoaded', function () {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const sendMessageButton = document.getElementById('send-message');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');

    // Toggle the visibility of the chatbot container when the chatbot button is clicked
    chatbotButton.addEventListener('click', () => {
        chatbotContainer.classList.toggle('hidden');
    });

    // Send the message and get the response when the send message button is clicked
    sendMessageButton.addEventListener('click', () => {
        const message = chatbotInput.value;
        if (message) {
            addMessage('user', message);
            chatbotInput.value = '';
            setTimeout(() => {
                playTypingSound();
                simulateTyping('chatbot', 'Processing your request...', message);
            }, 500);
        }
    });

    // Generate responses based on specific keywords in the user's message
    function getChatbotResponse(message) {
        const lowerCaseMessage = message.toLowerCase();

        if (lowerCaseMessage.includes('linkedin')) {
            return 'You can find my LinkedIn profile here: <a href="https://www.linkedin.com/in/michele-grimaldi-599b36280/" target="_blank">LinkedIn</a>';
        } else if (lowerCaseMessage.includes('github')) {
            return 'You can find my GitHub profile here: <a href="https://github.com/Mike014" target="_blank">GitHub</a>';
        } else if (lowerCaseMessage.includes('cv')) {
            return 'You can download my CV here: <a href="https://drive.google.com/file/d/1oCYa-MGkEwIRMs6Y2g0gYt6duSrDK5l_/view" download>Download CV</a>';
        } else if (lowerCaseMessage.includes('bye')) {
            return 'Goodbye!';
        } else if (lowerCaseMessage.includes('hello')) {
            return 'Hello! How can I assist you today?';
        } else if (lowerCaseMessage.includes('help')) {
            return 'You can ask me for your LinkedIn, GitHub, or CV links. Just type the respective keyword.';
        } else if (lowerCaseMessage.includes('tell me something about michele grimaldi')) {
            return 'Michele Grimaldi is a Junior Software Developer specializing in back-end and audio technologies. He uses Python, Rust, C++, and C for web applications and custom audio software. He aims to combine NLP and DSP for advanced audio solutions. You can contact him at mikgrimaldi7@gmail.com.';
        } else if (lowerCaseMessage.startsWith('uppercase ')) {
            const textToConvert = message.slice(10);
            return textToConvert.toUpperCase();
        } else if (lowerCaseMessage.startsWith('lowercase ')) {
            const textToConvert = message.slice(10);
            return textToConvert.toLowerCase();
        } else if (lowerCaseMessage.startsWith('capitalize ')) {
            const textToConvert = message.slice(11);
            return textToConvert.charAt(0).toUpperCase() + textToConvert.slice(1).toLowerCase();
        } else {
            return "I'm sorry, I don't understand that. Just type 'LinkedIn', 'GitHub', 'CV', or say 'Bye', or just ask something about Michele Grimaldi.";
        }
    }

    function addMessage(sender, text) {
        const messageElement = document.createElement('p');
        messageElement.innerHTML = `<strong>${sender === 'user' ? 'You' : 'Bot'}:</strong> ${text}`;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function playTypingSound() {
        const typingSound = document.getElementById('typing-sound');
        typingSound.play().catch(function (error) {
            console.error('Error playing typing sound:', error);
        });
    }

    function simulateTyping(sender, typingText, originalMessage) {
        const messageElement = document.createElement('p');
        messageElement.innerHTML = `<strong>Bot:</strong> ${typingText}`;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        let index = 0;
        const interval = setInterval(() => {
            if (index < typingText.length) {
                messageElement.innerHTML = `<strong>Bot:</strong> ${typingText.slice(0, index + 1)}`;
                index++;
                playTypingSound();
            } else {
                clearInterval(interval);
                const response = getChatbotResponse(originalMessage);
                simulateTypingResponse('chatbot', response, messageElement);
            }
        }, 100); // Simulate typing effect
    }

    function simulateTypingResponse(sender, responseText, messageElement) {
        let index = 0;
        const interval = setInterval(() => {
            if (index < responseText.length) {
                messageElement.innerHTML = `<strong>Bot:</strong> ${responseText.slice(0, index + 1)}`;
                index++;
                playTypingSound();
            } else {
                clearInterval(interval);
                messageElement.innerHTML = `<strong>Bot:</strong> ${responseText}`;
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }
        }, 100); // Simulate typing effect for response
    }
});














