const getClasses = () => {
  const classes = document.querySelector(".JwPp0e");
  if (classes.innerHTML === "") {
    return [];
  }
  const classesArray = Array.from(classes.children);
  return classesArray;
}

function rerenderClasses() {
  let hiddenCourses = JSON.parse(localStorage.getItem('hiddenCourses'));
  if (!hiddenCourses) {
    hiddenCourses = [];
  }
  const classes = getClasses().map(course => course.getAttribute('data-course-id'));

  for (let i = 0; i < classes.length; i++) {
    if (hiddenCourses.includes(classes[i])) {
      const course = document.querySelector(`[data-course-id="${classes[i]}"]`);
      course.style.display = 'none';
    }
    else {
      const course = document.querySelector(`[data-course-id="${classes[i]}"]`);
      course.style.display = 'flex';
    }
  }
}

function createCheckbox(name, label, checked = false) {
  label = label.replace("&amp;", "&");
  var checkboxLabel = document.createElement("label");
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = name;
  checkbox.value = label;
  checkbox.checked = checked;

  checkboxLabel.appendChild(checkbox);
  checkboxLabel.appendChild(document.createTextNode(label));

  return checkboxLabel;
}

function getCheckboxes() {
  const classes = getClasses();

  let hiddenCourses = JSON.parse(localStorage.getItem('hiddenCourses'));
  if (!hiddenCourses) {
    hiddenCourses = [];
  }

  const checkboxes = [];
  for (let i = 0; i < classes.length; i++) {
    const className = classes[i].querySelector(".z3vRcc-ZoZQ1").innerHTML;
    const courseId = classes[i].getAttribute('data-course-id');
    const checkbox = createCheckbox(courseId, className, hiddenCourses.includes(courseId));
    checkboxes.push(checkbox);
  }

  return checkboxes;
}

function styleElements() {
  let style = document.createElement('style');
  style.innerHTML = `
    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      padding-bottom: 40px;
      border: 1px solid #888;
      width: 60%;
    }

    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
    }

    .close:hover, .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }

    .close:hover {
      color: red;
    }

    .modal-content h1 {
      text-align: center;
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: bold;
    }  

    .modal-content button {
      background-color: #4CAF50;
      border: none;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      float: right;
      cursor: default;
    }

    .modal-content button:hover {
      background-color: rgb(0, 150, 0);
    }
      
    .modal-content label {
      margin: 10px;
      display: block;
    }

    #hideCoursesBtn {
      margin-top: 5px;
      border-radius: 50%;
      background: transparent;
      border: none;
      transition: 0.3s;
    }

    #hideCoursesBtn:hover {
      cursor: pointer;
      background: rgb(245, 245, 245);
    }

    #hideCoursesBtn img {
      width: 30px;
      height: 30px;
      padding: 7px 17px;
      padding-bottom: 3px;
    }
  `;

  document.head.appendChild(style);
}

function createModal() {
  // Create the modal container element
  var modalContainer = document.createElement("div");
  modalContainer.id = "myModal";
  modalContainer.className = "modal";

  var modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  // Create the close button element
  var closeButton = document.createElement("span");
  closeButton.className = "close";
  closeButton.innerHTML = "&times;";

  // Create the heading element
  var heading = document.createElement("h1");
  heading.innerHTML = "Select Courses that you want to hide";

  // Get all checkboxes
  // var checkboxes = getCheckboxes();

  // Create the apply button
  var applyButton = document.createElement("button");
  applyButton.id = "applyBtn";
  applyButton.innerHTML = "Apply";

  var classesDiv = document.createElement("div");
  classesDiv.id = "classes";

  // Append elements to the modal content
  modalContent.appendChild(closeButton);
  modalContent.appendChild(heading);
  // checkboxes.forEach(function(checkbox) {
  //   modalContent.appendChild(checkbox);
  // });
  modalContent.appendChild(classesDiv);
  modalContent.appendChild(applyButton);

  // Append the modal content to the modal container
  modalContainer.appendChild(modalContent);

  // Append the modal container to the document body
  document.body.appendChild(modalContainer);

  // Get the modal element
  var modal = document.getElementById("myModal");

  // Close the modal when the user clicks on the close button (x)
  closeButton.onclick = function () {
    modal.style.display = "none";
  }

  // Close the modal when the user clicks outside the modal
  document.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // Apply button click event
  applyButton.onclick = function () {
    // Get all checkboxes inside the modal
    var checkboxes = document.querySelectorAll('#myModal input[type="checkbox"]:checked');
    checkboxes = Array.from(checkboxes).map(checkbox => checkbox.name);

    localStorage.setItem('hiddenCourses', JSON.stringify(checkboxes));
    rerenderClasses();

    // Close the modal
    modal.style.display = "none";
  }

  // Add modal to DOM
  document.body.appendChild(modalContainer);
}

function mainFunction() {
  styleElements();
  rerenderClasses();
  createModal();

  const navDiv = document.querySelector("div[class='Mtd4hb QRiHXd']");

  function openModal() {
    // Get the modal element
    var modal = document.getElementById("myModal");

    // Get all checkboxes
    var checkboxes = getCheckboxes();

    // Get the classes div
    var classesDiv = document.getElementById("classes");
    classesDiv.innerHTML = "";
    checkboxes.forEach(function (checkbox) {
      classesDiv.appendChild(checkbox);
    });

    // Open the modal
    modal.style.display = "block";
  }

  const button = document.createElement("button");
  button.id = "hideCoursesBtn";
  button.onclick = openModal;
  const img = document.createElement("img");
  img.src = "https://static.thenounproject.com/png/464129-200.png";
  button.appendChild(img);

  navDiv.prepend(button);
}

function waitForDynamicObjects() {
  return new Promise((resolve, reject) => {
    const observer = new MutationObserver((mutationsList, observer) => {
      const classes = document.querySelector(".JwPp0e");
      if (classes.innerHTML !== "") {
        observer.disconnect();
        resolve();
      }
    });

    observer.observe(document, { childList: true, subtree: true });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error('Timeout: No classes not found in the DOM'));
    }, 6000); // Maximum wait time in milliseconds
  });
}

function noPath(url) {
  return url.split("/")[3] === undefined || url.split("/")[3] === "";
}

if (noPath(window.location.href)) {
  waitForDynamicObjects()
  .then(() => {
    mainFunction();
  })
  .catch(error => {
    console.error(error);
  });
}

// Custom event to handle URL changes
var urlChangeEvent = new Event('urlChange');

// Function to check for URL changes
function checkURLChange() {
  if (window.location.href !== checkURLChange.currentURL) {
    checkURLChange.currentURL = window.location.href;
    document.dispatchEvent(urlChangeEvent);
  }
}

checkURLChange.currentURL = window.location.href;

window.addEventListener('popstate', checkURLChange);

setInterval(checkURLChange, 50);

document.addEventListener('urlChange', function (event) {
  if (noPath(window.location.href)) {
    waitForDynamicObjects()
      .then(() => {
        mainFunction();
      })
      .catch(error => {
        console.error(error);
      });
  }
  else {
    const btn = document.getElementById("hideCoursesBtn");
    if (btn) {
      btn.remove();
    }
  }
});