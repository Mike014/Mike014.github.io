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
        if (message.includes('LinkedIn')) {
            return 'You can find my LinkedIn profile here: <a href="https://www.linkedin.com/in/michele-grimaldi-599b36280/" target="_blank">LinkedIn</a>';
        } else if (message.includes('GitHub')) {
            return 'You can find my GitHub profile here: <a href="https://github.com/Mike014" target="_blank">GitHub</a>';
        } else if (message.includes('CV')) {
            return 'You can download my CV here: <a href="https://drive.google.com/file/d/1oCYa-MGkEwIRMs6Y2g0gYt6duSrDK5l_/view" download>Download CV</a>';
        } else if (message.includes('Bye')) {
            return 'Goodbye!';
        } else {
            return "I'm sorry, I don't understand that, justy type 'LinkedIn', 'GitHub', 'CV', or say 'Bye'.";
        }
    }
});



