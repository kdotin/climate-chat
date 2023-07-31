const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");
const chatBox = document.getElementById("chatBox");

function appendChatMessage(msg, sender) {
    const msgElem = document.createElement("p");
    msgElem.textContent = `${sender}: ${msg}`;
    chatBox.appendChild(msgElem);
}

sendBtn.addEventListener("click", async () => {
    const chatMessage = chatInput.value.trim();

    if (chatMessage) {
        appendChatMessage(chatMessage, "user");
        chatInput.value = '';

        // Make a request to your server to get the GPT-4 response
        const response = await fetch('/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: chatMessage })
        });
        const data = await response.json();

        // Append the GPT-4 response to the chat
        if (data && data.data) {
            appendChatMessage(data.data, "bot");
        } else {
            appendChatMessage("Error in getting response", "bot");
        }
    }
});
