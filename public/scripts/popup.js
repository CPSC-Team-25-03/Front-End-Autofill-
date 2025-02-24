//Main file that is connected to the html file
//File will send a message to content.js to let them know what function to run.
//This file is where the json file filled with the data of the user will be fetched from the server.


var x = "";

document.getElementById("autofill").addEventListener("click", autofill);

//Sends a request to the serevr to receive the json file of the user's information
//Json file is then stored into variable x.
fetch('http://localhost:3000/api/users')
 .then(response => response.json())
 .then(users => {
  x = JSON.parse(users);
});

//When the button that is linked to this function is pressed, it sends two messages to content.js
//The first message with type "data" will send the json file and lets content.js know to store the information there.
//The second message with the type "autofill" will let content.js know to run the autofill funciton.
function autofill(){
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {type: "data", message: x}); 
    chrome.tabs.sendMessage(activeTab.id, {type: "autofill"});  
  });
}



