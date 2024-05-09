var username = localStorage.getItem("phoneNumber");
username = "0" + username;
document.getElementById("username1").innerText = username;
document.getElementById("username2").innerText = localStorage.getItem("phoneNumber");

function back() {
  let cookiet = document.cookie;
  let cookieValue = cookiet.split('=')[1];
  console.log(cookieValue);
  let xhr3 = new XMLHttpRequest();
  xhr3.open("POST", "php/leave_chat.php", true);
  xhr3.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr3.onreadystatechange = function() {
      if (xhr3.readyState === XMLHttpRequest.DONE) {
          if (xhr3.status === 200) {
          } else {
          }
      }
  };
  xhr3.send("cookieValue=" + cookieValue);

  var cookies = document.cookie.split("; ");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
  for (var key in localStorage) {
    if (localStorage.hasOwnProperty(key) && key !== "phoneNumber") {
      localStorage.removeItem(key);
    }
  }
  window.location.href = "home.html";
}
var username = document.getElementById("username1");
var usernameWidth = username.offsetWidth;
var username = document.getElementById("username2");
var usernameWidth = username.offsetWidth;
usernamecontainer = document.getElementById("username-container");
usernamecontainer.style.width = usernameWidth*5 + "px";

function createCookie(name, value, minutes) {
    let expires = "";
    if (minutes) {
        let date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function sendValuesToPHP() {
  let cookie = document.cookie;
  let cookieValue = cookie.split('=')[1];
  let localStoragePhoneNumber = localStorage.getItem("phoneNumber");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/get_other.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              let response = xhr.responseText;
              document.getElementById("username2").innerText = response;
          } else {
              document.getElementById("username2").innerText = "00000000000";
          }
      }
  };
  let requestData = "cookieValue=" + encodeURIComponent(cookieValue) + "&localStoragePhoneNumber=" + encodeURIComponent(localStoragePhoneNumber);
  xhr.send(requestData);
}
sendValuesToPHP();

document.getElementById("messageInput").addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage();
  }
});

document.getElementById("sendButton").addEventListener("click", sendMessage);

function sendMessage() {
  var inputValue = document.getElementById("messageInput").value;
  let tempCook = document.cookie;
  var key = tempCook.split('=')[1]; 
  var encryptedValue = encryptValue(inputValue, key);
  var phoneNumber = localStorage.getItem("phoneNumber");
  phoneNumber = "0" + phoneNumber;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "php/send_message.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        document.getElementById("messageInput").value = "";
      } else {
        console.error("Error sending message:", xhr.statusText);
      }
    }
  };
  var requestData = "encryptedMessage=" + encodeURIComponent(encryptedValue) + "&cookieValue=" + encodeURIComponent(key) + "&phoneNumber=" + encodeURIComponent(phoneNumber);
  xhr.send(requestData);
}

function encryptValue(inputValue, key) {
  var encryptedValue = CryptoJS.AES.encrypt(inputValue, key).toString();
  return encryptedValue;
}

function decryptValue(encryptedValue, key) {
  var decryptedValue = CryptoJS.AES.decrypt(encryptedValue, key).toString(CryptoJS.enc.Utf8);
  return decryptedValue;
}

function collectMessages() {
  let cookie = document.cookie;
  let cookieValue = cookie.split('=')[1];
  let phoneNumber = localStorage.getItem("phoneNumber");
  phoneNumber = "0" + phoneNumber;
  let username2 = document.getElementById("username2").innerText;
  let xhr1 = new XMLHttpRequest();
  xhr1.open("POST", "php/get_messageO.php", true);
  xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr1.onreadystatechange = function() {
      if (xhr1.readyState === XMLHttpRequest.DONE) {
          if (xhr1.status === 200) {
              let newMessage = xhr1.responseText;
              let storedMessage = localStorage.getItem("oM");
              if (storedMessage === null || storedMessage === undefined || newMessage !== storedMessage) {
                  localStorage.setItem("oM", newMessage);
                  let messageParts = newMessage.split(" ");
                  let lastNonEmptyMessagePart = "";
                  for (let i = messageParts.length - 1; i >= 0; i--) {
                      let messagePart = messageParts[i].trim();        
                      if (messagePart !== "") {
                          lastNonEmptyMessagePart = messagePart;
                          break;
                      }
                  }
                  if (lastNonEmptyMessagePart !== "") {
                      createOMessage(lastNonEmptyMessagePart, cookieValue);
                  }
              }
          } else {
              console.error("Error getting messages for username2:", xhr1.statusText);
          }
      }
  };
  xhr1.send("cookieValue=" + encodeURIComponent(cookieValue) + "&username2=" + encodeURIComponent(username2));

  let xhr2 = new XMLHttpRequest();
  xhr2.open("POST", "php/get_messageU.php", true);
  xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr2.onreadystatechange = function() {
      if (xhr2.readyState === XMLHttpRequest.DONE) {
          if (xhr2.status === 200) {
              let newMessage = xhr2.responseText;
              let storedMessage = localStorage.getItem("uM");
              if (storedMessage === null || storedMessage === undefined || newMessage !== storedMessage) {
                  localStorage.setItem("uM", newMessage);
                  let messageParts = newMessage.split(" ");
                  let lastNonEmptyMessagePart = "";
                  for (let i = messageParts.length - 1; i >= 0; i--) {
                      let messagePart = messageParts[i].trim();
                      if (messagePart !== "") {
                          lastNonEmptyMessagePart = messagePart;
                          break;
                      }
                  }
                  if (lastNonEmptyMessagePart !== "") {
                      createUMessage(lastNonEmptyMessagePart, cookieValue);
                  }
              }
          } else {
              console.error("Error getting messages for phoneNumber:", xhr2.statusText);
          }
      }
  };
  xhr2.send("cookieValue=" + encodeURIComponent(cookieValue) + "&phoneNumber=" + encodeURIComponent(phoneNumber));

  function createUMessage(messageText, cookieValue) {
    var tempMessage = decryptValue(messageText, cookieValue);
    messageText = tempMessage;
    var messageElement = document.createElement("div");
    messageElement.className = "message-u";
    messageElement.innerText = messageText;
    var messagesContainer = document.getElementById("messages-container");
    messagesContainer.appendChild(messageElement);
    var messageWidth = messageText.length * 10;
    messageElement.style.width = messageWidth + "px";

    function decryptValue(encryptedValue, key) {
      var decryptedValue = CryptoJS.AES.decrypt(encryptedValue, key).toString(CryptoJS.enc.Utf8);
      return decryptedValue;
    }
  }
  
  function createOMessage(messageText, cookieValue) {
    var tempMessage = decryptValue(messageText, cookieValue);
    messageText = tempMessage;
    var messageElement = document.createElement("div");
    messageElement.className = "message-o";
    messageElement.innerText = messageText;
    var messagesContainer = document.getElementById("messages-container");
    messagesContainer.appendChild(messageElement);
    var messageWidth = messageText.length * 10;
    messageElement.style.width = messageWidth + "px";

    function decryptValue(encryptedValue, key) {
      var decryptedValue = CryptoJS.AES.decrypt(encryptedValue, key).toString(CryptoJS.enc.Utf8);
      return decryptedValue;
    }
  }
}

function createUMessage(messageText) {
  var messageElement = document.createElement("div");
  messageElement.className = "message-u";
  messageElement.innerText = messageText;
  var messagesContainer = document.getElementById("messages-container");
  messagesContainer.appendChild(messageElement);
  var messageWidth = messageText.length * 10; 
  messageElement.style.width = messageWidth + "px";
}

function createOMessage(messageText) {
  var messageElement = document.createElement("div");
  messageElement.className = "message-o";
  messageElement.innerText = messageText;
  var messagesContainer = document.getElementById("messages-container");
  messagesContainer.appendChild(messageElement);
  var messageWidth = messageText.length * 10; 
  messageElement.style.width = messageWidth + "px";
}

function runCollectMessages() {
  collectMessages();
}

runCollectMessages();
setInterval(runCollectMessages, 1000); 

function checkTable(){
  let cookieTemp = document.cookie;
  let cookieValue = cookieTemp.split('=')[1];

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/check_table.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              let response = xhr.responseText;
              if (response === "1") {
                back();
              }
          } else {
          }
      }
  };
  xhr.send("cookieValue=" + cookieValue);
}

setInterval(checkTable, 1000);