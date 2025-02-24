//The content.js file will change the DOM elements of the html document of whatever HTML document is sent
//In this case, the file changes the actions oof the common app HTML document
//This is where the autofill system will take place

//function which allows the program to find the specific options in regards to the text and dispatch a click event.
function getElementIdByTextContent(text) {
    const elements = document.querySelectorAll('*'); // Select all elements
    for (const element of elements) {
        if (element.textContent === text) {;
          element.dispatchEvent(new Event("click"));
        }
      }
  
}

//Data will be initialized after receiving the json file from the popup.js file after fethcing the jsonfile from server
var FirstNameData = ""
var radio1 = ""
var MiddleNameData = ""
var LastNameData = ""
var suffix = "";
var radio2 = ""
var DOBData = ""

//Data will be stored into a list
let DataArray = null;

//A list with the fields/questions that will be filled out in the application.
let data = ["Legal first/given name*", "Would you like to share a different first name that people call you?", "Middle name", "Last/family/surname*", "Suffix", "Do you have any materials under a former legal name?*", "Date of birth*"];

//function scans the document for the following questions or fielld titles to answer
//function then fills them with the corresponding answers
//various events are dispatched based on input type to bypasss secuiry reasons and make answer valid.
function ScanAndFillDocument(){
    const elements = document.querySelectorAll("*");
    var count = 0;
    var findNextText = false
    for (const element of elements){
        for (const text of data){
            if (element.textContent === text){
                if (text === "Suffix" && element.nodeName == "LABEL"){
                    var id = '#' + element.htmlFor;
                    var x = document.querySelector(id);
                    if(x instanceof Element){
                        x.dispatchEvent(new Event("input"));
                        getElementIdByTextContent(DataArray[count]);
                        count++;
                    }
                }
                else if (element.nodeName == "LABEL"){
                    var id = '#' + element.htmlFor;
                    var x = document.querySelector(id);
                    if (x instanceof Element){ 
                        x.value = DataArray[count];
                        x.dispatchEvent(new Event("input"));
                        x.dispatchEvent(new Event("blur"));
                        count++;
                    }

                }
                else{
                    findNextText = true;
                }
            }
            else if(findNextText && element.textContent === DataArray[count]){
                var id = '#' + element.htmlFor;
                var x = document.querySelector(id);
                if (x instanceof Element){
                    x.check = true;
                    x.dispatchEvent(new Event("change"));
                    count++;
                    findeNextText = false;
                }
            }
            else{
                console.log("Not Working");
            }
        }
    }
}

//File listens for a message from popup.js file, if the message type recieved is "data", 
//the various variables above will be intialized with the data from the given json file.
//the data is then created into a list.
//If the message type received is "autofill", this file will run the ScanAndFillDocument function,
//which does the autofill.
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.type === "data"){
            const data = request.message;
            FirstNameData = data.first;
            radio1 = data.radio1;
            MiddleNameData = data.middle;
            LastNameData = data.last;
            suffix = data.suffix;
            radio2 = data.radio2;
            DOBData = data.DOB;
            DataArray = [FirstNameData, radio1, MiddleNameData, LastNameData, suffix, radio2, DOBData];
        }
        if( request.type === "autofill" ) {
            ScanAndFillDocument();
        }
    }
);
