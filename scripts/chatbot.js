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
            const response = getChatbotResponse(message);
            chatbotMessages.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
            chatbotMessages.innerHTML += `<p><strong>Bot:</strong> ${response}</p>`;
            chatbotInput.value = '';
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
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
});











