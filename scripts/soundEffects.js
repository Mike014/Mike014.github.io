// Aggiunge un event listener al pulsante con id 'send-message' per gestire il click
document.getElementById('send-message').addEventListener('click', function () {
    // Ottiene il valore dell'input del chatbot
    const input = document.getElementById('chatbot-input');
    const message = input.value;
    // Controlla se il messaggio non è vuoto o solo spazi
    if (message.trim() !== '') {
        // Aggiunge il messaggio dell'utente alla chat
        addMessage('user', message);
        // Pulisce l'input
        input.value = '';
        // Dopo 500ms, riproduce il suono di digitazione e simula la digitazione del chatbot
        setTimeout(() => {
            playTypingSound();
            simulateTyping('chatbot', 'Processing your request...', message);
        }, 500);
    }
});

// Funzione per aggiungere un messaggio alla chat
function addMessage(sender, text) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = sender;
    messageElement.innerHTML = `<strong>${sender === 'user' ? 'You' : 'Bot'}:</strong> ${text}`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function playTypingSound() {
    const typingSound = document.getElementById('typing-sound');
    if (typingSound) {
        typingSound.play().catch(function (error) {
            console.error('Error playing typing sound:', error);
        });
    }
}

function playClickSound() {
    const clickSound = document.getElementById('click-sound');
    if (clickSound) {
        clickSound.play().catch(function (error) {
            console.error('Error playing click sound:', error);
        });
    }
}

// Aggiunge un event listener a tutti i pulsanti per riprodurre il suono del click
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        playClickSound();
        // Assicurarsi che il suono di digitazione possa essere riprodotto dopo un'interazione dell'utente
        document.getElementById('chatbot-input').addEventListener('input', playTypingSound);
    });
});

// Funzione per simulare la digitazione del chatbot
function simulateTyping(sender, typingText, originalMessage) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = sender;
    messageElement.innerHTML = `<strong>Bot:</strong> ${typingText}`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

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
            const messagesContainer = document.getElementById('chatbot-messages');
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }, 100); // Simula l'effetto di digitazione per la risposta
}

// Funzione per ottenere la risposta del chatbot in base al messaggio dell'utente
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

