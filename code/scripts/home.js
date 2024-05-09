document.getElementById("username").innerText = localStorage.getItem("phoneNumber");

function logout() {
  localStorage.clear(); 
  window.location.href = "index.html"; 
  var cookies = document.cookie.split("; ");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
}

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
  if (tabName === "create-chat-tab") {
      phoneNumberInput.classList.remove("shake-animation");
      var inviteContainer = document.getElementById("invite-container");
      inviteContainer.innerHTML = '';
      searchPhoneNumber();
  }
  phoneNumber = null;
  phoneNumberInput = document.getElementById("phone-number-input");
  phoneNumberInput.value = null;
  phoneNumberInput.classList.remove("invalid");
  document.getElementById("search-results").innerHTML = "";
  document.getElementById("phone-number-input").value = ""; 
}
 var usernameContainer = document.getElementById("username-container");
 var username = document.getElementById("username");
 var usernameWidth = username.offsetWidth;
 usernameContainer.style.width = usernameWidth + "px";

function getInvites() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '../final/php/get_invites.php?username=' + encodeURIComponent(localStorage.getItem("phoneNumber")), true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);
              if (response.error) {
                  var inviteContainer = document.getElementById("invite-container");
                  inviteContainer.innerHTML = ''; 
                  var noInvitesMessage = document.createElement('div');
                  noInvitesMessage.textContent = response.error;
                  inviteContainer.appendChild(noInvitesMessage);
              } else {
                  generateInviteBoxes(response.invites);
              }
          } else {
          }
      }
  };
  xhr.send();
}

function generateInviteBoxes(invites) {
  var inviteContainer = document.getElementById("invite-container");
  inviteContainer.innerHTML = ''; 
  if (invites.length === 0) {
    var noInvitesMessage = document.createElement('div');
    noInvitesMessage.textContent = 'No invites found.';
    inviteContainer.appendChild(noInvitesMessage);
  } else {
    invites.forEach(function(invite) {
      var inviteBox = document.createElement('div');
      inviteBox.classList.add('invite-box');
      var inviteContent = document.createElement('div');
      inviteContent.classList.add('invite-content');
      var inviteNumber = document.createElement('span');
      inviteNumber.classList.add('invite-number');
      inviteNumber.textContent = invite;
      var separator = document.createElement('span');
      separator.classList.add('separator');
      separator.textContent = '|';
      var acceptIcon = document.createElement('img');
      acceptIcon.src = 'images/tick.png';
      acceptIcon.alt = 'Accept Invite';
      acceptIcon.classList.add('response-icon', 'accept');
      acceptIcon.addEventListener('click', function() {
        acceptInvite(invite);
      });
      var declineIcon = document.createElement('img');
      declineIcon.src = 'images/cross.png';
      declineIcon.alt = 'Reject Invite';
      declineIcon.classList.add('response-icon', 'decline', 'small-cross');
      declineIcon.addEventListener('click', function() {
        declineInvite(invite);
      });
      inviteContent.appendChild(inviteNumber);
      inviteContent.appendChild(separator);
      inviteContent.appendChild(acceptIcon);
      inviteContent.appendChild(declineIcon);
      inviteBox.appendChild(inviteContent);
      inviteContainer.appendChild(inviteBox);
    });
  }
}

function acceptInvite(invite) {
  let phoneNumber = invite;
  let username = localStorage.getItem("phoneNumber");
  if (username.length === phoneNumber.length - 1) {
      username = '0' + username;
  }
  if (phoneNumber.length === username.length - 1) {
      phoneNumber = '0' + phoneNumber;
  }
  let phoneNumberArray = phoneNumber.split('').map(Number);
  let usernameArray = username.split('').map(Number);
  let chatNum = '';
  for (let i = 0; i < phoneNumberArray.length; i++) {
      let difference = Math.abs(phoneNumberArray[i] - usernameArray[i]);
      chatNum += difference;
  }
  if (chatNum.length < 11) {
      chatNum = '0' + chatNum;
  }
  let cookieExists = false;
  let cookieNum = 1;
  while (!cookieExists) {
      if (getCookie(`chatNum${cookieNum}`) !== null) {
          if (getCookie(`chatNum${cookieNum}`) === chatNum) {
              cookieExists = true;
              break;
          }
          cookieNum++;
      } else {
          break;
      }
  }
  if (!cookieExists) {
      createCookie(`chatNum${cookieNum}`, chatNum, 30); 
  }
  if (username.length === 10) {
      username = '0' + username;
  }
  if (phoneNumber.length === 10) {
      phoneNumber = '0' + phoneNumber;
  }

  acceptChat(chatNum, username, phoneNumber);

  function acceptChat(chatNum, username, phoneNumber) {  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/final/php/accept_chat.php', true); 
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); 
    xhr.onreadystatechange = function() { 
        if (xhr.readyState === XMLHttpRequest.DONE) { 
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText); 
            } else {
            }
        }
    };
    xhr.send('chatNum=' + encodeURIComponent(chatNum) + '&username=' + encodeURIComponent(username) + '&phoneNumber=' + encodeURIComponent(phoneNumber)); // Send the request

    declineInvite(phoneNumber);
  }
}

function declineInvite(inviteNumber) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '../final/php/update_invites.php', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
      } else {
      }
    }
  };
  xhr.send('username=' + encodeURIComponent(localStorage.getItem("phoneNumber")) + '&inviteNumber=' + encodeURIComponent(inviteNumber));
  var inviteBoxes = document.querySelectorAll('.invite-box');
  inviteBoxes.forEach(function(inviteBox) {
    var inviteNumberSpan = inviteBox.querySelector('.invite-number');
    if (inviteNumberSpan.innerText === inviteNumber) {
      inviteBox.style.backgroundColor = "red";
      inviteBox.classList.add('shrink-animation');
      setTimeout(function() {
      }, 1000);
      return;
    }
  });
}
document.getElementById("defaultOpen").click();
getInvites();
setInterval(function() {
  getInvites();
}, 2000);
document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault();
  searchPhoneNumber();
});

function searchPhoneNumber() {
  var phoneNumber = null;
  var phoneNumberInput = document.getElementById("phone-number-input");
  var phoneNumber = phoneNumberInput.value;
  var searchResultsDiv = document.getElementById("search-results");
  if (phoneNumber === "") {
    return;
  }
  var ukPhoneNumberRegex = /^(?:(?:\+|00)44|0)?(7\d{9})$/;
  if (ukPhoneNumberRegex.test(phoneNumber)) {
    phoneNumberInput.classList.remove("shake-animation");
    phoneNumberInput.classList.remove("invalid");
    searchResultsDiv.innerHTML = "";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../final/php/check_exist.php', true); 
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          if (response.exists) {
            var resultBox = document.getElementById('result-box');
            if (!resultBox) {
              resultBox = document.createElement('div');
              resultBox.id = 'result-box';
              resultBox.classList.add('result-box');
              var phoneNumberSpan = document.createElement('span');
              phoneNumberSpan.textContent = phoneNumber;
              phoneNumberSpan.classList.add('phone-number');
              var sendButtonImg = document.createElement('img');
              sendButtonImg.src = 'images/right.png'; 
              sendButtonImg.alt = 'Send';
              sendButtonImg.classList.add('send-button');
              resultBox.appendChild(phoneNumberSpan);
              resultBox.appendChild(sendButtonImg);
              var searchResultsDiv = document.getElementById('search-results');
              searchResultsDiv.innerHTML = "";
              searchResultsDiv.appendChild(resultBox);
            } else {
              var phoneNumberSpan = resultBox.querySelector('.phone-number');
              phoneNumberSpan.textContent = phoneNumber;
            }
          } else {
            var searchResultsDiv = document.getElementById('search-results');
            phoneNumberInput.classList.add("shake-animation");
            phoneNumberInput.classList.add("invalid");
            var errorMessage = "Number not found";
            searchResultsDiv.innerHTML = `<div class="error-message">${errorMessage}</div>`;
          }
        } else {
        }
      }
    };
    xhr.send('phoneNumber=' + encodeURIComponent(phoneNumber));
  } else {
    phoneNumberInput.classList.add("shake-animation"); 
    phoneNumberInput.classList.add("invalid"); 
    var errorMessage = "Invalid Number";
    searchResultsDiv.innerHTML = `<div class="error-message">${errorMessage}</div>`;
  }
}
document.getElementById("phone-number-input").addEventListener("input", function() {
  var phoneNumberInput = document.getElementById("phone-number-input");
  phoneNumberInput.classList.remove("shake-animation");
  phoneNumberInput.classList.remove("invalid");
  document.getElementById("search-results").innerHTML = ""; 
});
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('send-button')) {
        var resultBox = event.target.closest('.result-box');
        if (resultBox) {
            resultBox.classList.add('crumple-animation');
            var boxRect = resultBox.getBoundingClientRect();
            var boxCenterX = boxRect.left + boxRect.width / 2;
            var boxCenterY = boxRect.top + boxRect.height / 2;
            var planeImg = document.createElement('img');
            planeImg.src = 'images/plane.png';
            planeImg.classList.add('plane-img');
            planeImg.style.left = boxCenterX + 'px';
            planeImg.style.top = boxCenterY + 'px';
            document.body.appendChild(planeImg);
            setTimeout(function() {
                planeImg.classList.add('grow-animation');
            }, 100); 
            setTimeout(function() {
                planeImg.classList.add('fly-off-animation');
            }, 900); 
            var phoneNumber = resultBox.querySelector('.phone-number').textContent;
            var username = localStorage.getItem("phoneNumber");
            if (username.length === phoneNumber.length - 1) {
                username = '0' + username;
            }
            let phoneNumberArray = phoneNumber.split('').map(Number);
            let usernameArray = username.split('').map(Number);
            let chatNum = '';
            for (let i = 0; i < phoneNumberArray.length; i++) {
                let difference = Math.abs(phoneNumberArray[i] - usernameArray[i]);
                chatNum += difference;
            }
            let cookieExists = false;
            let cookieNum = 1;
            while (!cookieExists) {
                if (getCookie(`chatNum${cookieNum}`) !== null) {
                    if (getCookie(`chatNum${cookieNum}`) === chatNum) {
                        cookieExists = true;
                        break;
                    }
                    cookieNum++;
                } else {
                    break;
                }
            }
            if (!cookieExists) {
                createCookie(`chatNum${cookieNum}`, chatNum, 30);
                createChat(chatNum, username, phoneNumber);
            }
            var xhr = new XMLHttpRequest();
            var url = '../final/php/send_invite.php';
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        var response = JSON.parse(xhr.responseText);
                        if (response.success) {
                        } else {
                        }
                    } else {

                    }
                }
            };
            var processedPhoneNumber = phoneNumber;
            if (processedPhoneNumber.startsWith('0')) {
                processedPhoneNumber = processedPhoneNumber.replace(/^0+/, '');
            }
            var processedUsername = username;
            if (processedUsername.startsWith('0')) {
                processedUsername = processedUsername.replace(/^0+/, '');
            }
            var params = 'username=' + encodeURIComponent(processedUsername) + '&phoneNumber=' + encodeURIComponent(processedPhoneNumber);
            xhr.send(params);
        }
    }
});

function createChat(chatNum, username, phoneNumber) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '../final/php/create_chat.php', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
          } else {
          }
      }
  };
  xhr.send('chatNum=' + chatNum + '&username=' + encodeURIComponent(username) + '&phoneNumber=' + encodeURIComponent(phoneNumber));
}

function createCookie(name, value, minutes) {
    let expires = "";
    if (minutes) {
        let date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}
setInterval(function() {
  checkAndNavigate();
}, 2000);

function checkAndNavigate() {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf('chatNum') === 0) {
          var chatNumValue = cookie.split('=')[1];
          var phoneNumber = localStorage.getItem('phoneNumber');
          if (phoneNumber) {
              phoneNumber = '0' + phoneNumber;
              cookieValue = cookie.split('=')[0];
              sendRequest(chatNumValue, phoneNumber, cookieValue);
          } else {
              console.error("Phone number not found in local storage.");
          }
      }
  }
}

function sendRequest(chatNumValue, phoneNumber, cookieValue) {
  var encodedChatNum = encodeURIComponent(chatNumValue);
  var encodedPhoneNumber = encodeURIComponent(phoneNumber);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          if (this.responseText === 'accepted') {
              var cookies = document.cookie.split("; ");
              for (var i = 0; i < cookies.length; i++) {
                  var cookie = cookies[i].split("=");
                  var name = cookie[0];
                  if (name !== cookieValue) {
                      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  }
              }
              window.location.href = 'chat.html';
          } else if (this.responseText !== 'unknown') {
          }
      }
  };
  xhttp.open("GET", "http://localhost/final/php/check_accepted.php?chatNum=" + encodedChatNum + "&phoneNumber=" + encodedPhoneNumber, true);
  xhttp.send();
}


