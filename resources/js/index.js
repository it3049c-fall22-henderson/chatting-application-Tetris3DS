

const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const saveButton = document.getElementById("save-button");
const chatBox = document.getElementById("chat");
const MILLISECONDS_IN_TEN_SECONDS = 10000;


const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;

function fetchMessages() {
    return fetch(serverURL)
        .then( response => response.json())
}
//String(nameInput);



saveButton.addEventListener("click", function(saveButtonClickEvent) {
  saveButtonClickEvent.preventDefault();
  //newNameInput = nameInput.toString();
  localStorage.setItem('saveButton', nameInput.value);
  
  console.log(localStorage.getItem('saveButton'));
  //document.getElementById('nameInput').value = localStorage.getItem('saveButton');
  
    sendButton.disabled = false;
  

});

async function updateMessages() {
  // Fetch Messages
  const messages = await fetchMessages();
  // Loop over the messages. Inside the loop we will:
      // get each message
      // format it
      // add it to the chatbox
  let formattedMessages = "";
  messages.forEach(message => {
      formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
}

function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;



  if (myNameInput === message.sender) {
      return `
      <div class="mine messages">
          <div class="message">
              ${message.text}
          </div>
          <div class="sender-info">
              ${formattedTime}
          </div>
      </div>

      `
  } else {
      return `
          <div class="yours messages">
              <div class="message">
                  ${message.text}
              </div>
              <div class="sender-info">
                  ${message.sender} ${formattedTime}
              </div>
          </div>
        
      `
  }
}

updateMessages()
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);

function sendMessages(username, text) {
  const newMessage = {
      sender: username,
      text: text,
      timestamp: new Date()

      
  }

  fetch (serverURL, {
      method: `POST`, 
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
  });
}

//function enableSend(){
  //document.getElementById("sendButton").disabled = false;
//}

sendButton.addEventListener("click", function(sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;

  console.log(nameInput);

  sendMessages(sender,message);
  myMessage.value = "";

  //start.disabled = true;
  alert("Please input your name");
});
