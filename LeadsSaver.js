// let myLeads = ["www.amazon.com", "www.google.co.in", "www.walmart.com"];
let inputEl = document.getElementById("input-el");
let btnEl = document.getElementById("btn-el");
let ulEl = document.getElementById("ul-el");
let saveTabEl = document.getElementById("saveTab-el");
let delEl = document.getElementById("delete-el");
let myLeads = [];
// getting the Localstorage  values
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("MyLeads"));
// console.log(leadsFromLocalStorage);
//checking if the localstorage has values or not if it has values the display on the screen
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

//To save the URLs of the current Tab
saveTabEl.addEventListener("click", () => {
  //Google API(Application Interface) to get the tab the user is viewing
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("MyLeads", JSON.stringify(myLeads));
    render(myLeads);
    console.log(tabs[0].url);
  });
});

btnEl.addEventListener("click", function () {
  //To check weather the input value is empty or not if it's empty thn flash a  msg
  if (inputEl.value === "") {
    let paraEl = document.getElementById("para-el");
    let msg = alert(  "Cannot save the empty lines");
    paraEl.msg;
    // paraEl.textContent = "Cannot save the empty lines";
    setTimeout(() => {
      paraEl.textContent = "";
    }, 2000);
  } else {
    //if input value is not empty than push it into the "myLeads" array
    myLeads.push(inputEl.value.trim());
    //call the render() func
    render(myLeads);
    //Empty the input value after rendering it
    inputEl.value = "";
  }
  // console.log("success");
});

function render(leads) {
  let listitem = "";
  for (let i = 0; i < leads.length; i++) {
    //creating a HTML structure to store and display the data on screen
    listitem += `<li>
    <a href=${leads[i]} target="_blank">${leads[i]}</a>
    </li>`;
  }
  ulEl.innerHTML = listitem;
  //Storing the data in the localstorage
  localStorage.setItem("MyLeads", JSON.stringify(myLeads));
}

//To Delete all the records from localstorage
delEl.addEventListener("dblclick", function () {
  // console.log("deleted");
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
// for (let i = 0; i < myLeads.length; i++) {
//   //Create an element
//   const li = document.createElement("li");
//   //set the text content
//   li.textContent = myLeads[i];
//   //append the li into the ul tag
//   ulEl.append(li);
// }
