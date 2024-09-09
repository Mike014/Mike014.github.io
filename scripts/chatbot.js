document.addEventListener('DOMContentLoaded', function () {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const sendMessageButton = document.getElementById('send-message');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');

    // Alterna la visibilità del contenitore del chatbot quando il pulsante del chatbot viene cliccato
    chatbotButton.addEventListener('click', () => {
        chatbotContainer.classList.toggle('hidden');
    });

    // Invia il messaggio e ottiene la risposta quando il pulsante di invio del messaggio viene cliccato
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

    // Genera risposte basate su parole chiave specifiche nel messaggio dell'utente
    function getChatbotResponse(message) {
        const lowerCaseMessage = message.toLowerCase();

        if (lowerCaseMessage.includes('linkedin')) {
            return 'You can find my LinkedIn profile above the chat, click the button';
        } else if (lowerCaseMessage.includes('github')) {
            return 'You can find my GitHub profile above the chat, click the button';
        } else if (lowerCaseMessage.includes('cv')) {
            return 'You can find my CV profile above the chat, click the button';
        } else if (lowerCaseMessage.includes('bye')) {
            return 'Goodbye!';
        } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
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
            return generateContextualResponse(message);
        }
    }

    // Funzione per generare una risposta contestuale utilizzando compromise
    function generateContextualResponse(message) {
        const doc = nlp(message);
        const people = doc.people().out('array');
        const places = doc.places().out('array');
        const topics = doc.topics().out('array');

        if (people.length > 0) {
            return `You mentioned ${people.join(', ')}. Can you tell me more about them?`;
        } else if (places.length > 0) {
            return `You mentioned ${places.join(', ')}. What do you want to know about these places?`;
        } else if (topics.length > 0) {
            return `You mentioned ${topics.join(', ')}. What specific information are you looking for?`;
        } else {
            return "I'm sorry, I don't understand that. Just type 'LinkedIn', 'GitHub', 'CV', or say 'Bye', or just ask something about Michele Grimaldi.";
        }
    }

    // Funzione per aggiungere un messaggio alla chat
    function addMessage(sender, text) {
        const messageElement = document.createElement('p');
        messageElement.innerHTML = `<strong>${sender === 'user' ? 'You' : 'Bot'}:</strong> ${text}`;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Funzione per riprodurre il suono di digitazione
    function playTypingSound() {
        const typingSound = document.getElementById('typing-sound');
        typingSound.play().catch(function (error) {
            console.error('Error playing typing sound:', error);
        });
    }

    // Funzione per simulare la digitazione del chatbot
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
        }, 100); // Simula l'effetto di digitazione
    }

    // Funzione per simulare la risposta del chatbot
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
        }, 100); // Simula l'effetto di digitazione per la risposta
    }
});
