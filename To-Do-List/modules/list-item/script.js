// !----------ADDING A TASK----------! reference: http://jsfiddle.net/g79ssyqv/12/
var row = 0;
var addTaskContainer = document.getElementById("add-task-container");
var listContainer = document.getElementById("list-container");

addTaskContainer.addEventListener("click", addTask);

function addTask() {
  //create a new, unique list-item-container div
  var containerNode = document.createElement("div");
  containerNode.setAttribute("id", "list-item-container-" + row);
  containerNode.setAttribute("class", "list-item-container");
  // remove border around containerNode permanently when at least one instance of it is present.
  if (row >= 0) {
    containerNode.style.borderBottom = "0";
  }
  // put the new element in the DOM at a specific location
  listContainer.appendChild(containerNode);
  
  //create a new, unique -real- checkbox inside list-item-container div
  var realCheckbox = document.createElement("input");
  realCheckbox.setAttribute("type", "checkbox");
  realCheckbox.setAttribute("id", "real-checkbox-" + row);
  containerNode.appendChild(realCheckbox);
  
  //create a new, unique -fake- checkbox inside list-item-container div
  var fakeCheckbox = document.createElement("span");
  fakeCheckbox.setAttribute("class", "checkbox");
  fakeCheckbox.setAttribute("id", "fake-checkbox-" + row);
  containerNode.appendChild(fakeCheckbox);
  
  //create a new, unique checkmark icon inside fake-checkbox span
  //This requires obtaining the svg XML element from the web server
  var checkmarkIcon = new XMLHttpRequest();
  checkmarkIcon.open("GET", "/images/checkmark.svg", true);
  checkmarkIcon.overrideMimeType("image/svg+xml");
  checkmarkIcon.onreadystatechange = function() {
    if (checkmarkIcon.readyState === XMLHttpRequest.DONE && checkmarkIcon.status === 200) {
      fakeCheckbox.appendChild(checkmarkIcon.responseXML.documentElement);
    }
  }
  checkmarkIcon.send();
  //Cannot add classes/ids in JS on an XML resource; just target parent class and use descendant selector for styling: e.g. .parent svg {..}.
  
  // create a new, unique input text field  inside list-item-container div
  var inputNode = document.createElement("input");
  inputNode.setAttribute("type", "text");
  inputNode.setAttribute("id", "list-item-label-" + row);
  inputNode.setAttribute("class", "list-item");
  // add node to DOM at a particular location
  containerNode.appendChild(inputNode);
  
  // create a new, unique anchor tag to wrap the delete icon svg inside the list-item-container div
  var svgWrapper = document.createElement("a");
  containerNode.appendChild(svgWrapper);
  
  //create a new, unique delete icon inside anchor tag
 //This requires obtaining the svg XML element from the web server
  var deleteIcon = new XMLHttpRequest();
  deleteIcon.open("GET", "/images/delete-icon.svg", true);
  deleteIcon.overrideMimeType("image/svg+xml");
  deleteIcon.onreadystatechange = function() {
    if (deleteIcon.readyState === XMLHttpRequest.DONE && deleteIcon.status === 200) {
      svgWrapper.appendChild(deleteIcon.responseXML.documentElement);
    }
  }
  deleteIcon.send();
  //Cannot [at least easily] add classes/ids in JS on an XML resource; just target parent class and use descendant selector for styling: e.g. .parent svg {..}.
  
  // DELETE A TASK---------- reference: http://jsfiddle.net/g79ssyqv/12/
  svgWrapper.setAttribute("onclick", "deleteTask(" + row.toString() + ");");
  
  row++;
}

function deleteTask(idNum) {
  document.getElementById("list-item-container-" + idNum).remove();
  };