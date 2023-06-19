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

// Function to create a checkbox element
function createCheckbox(name, label, checked = false) {
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
  // Get all classes
  const classes = getClasses();

  // Create the checkboxes
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

function createModal() {
  // Create the modal container element
  var modalContainer = document.createElement("div");
  modalContainer.style.display = "none";
  modalContainer.id = "myModal";
  modalContainer.className = "modal";

  // Modal container styles
  modalContainer.style.position = "fixed";
  modalContainer.style.zIndex = "1";
  modalContainer.style.left = "0";
  modalContainer.style.top = "0";
  modalContainer.style.width = "100%";
  modalContainer.style.height = "100%";
  modalContainer.style.overflow = "auto";
  modalContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

  var modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.style.backgroundColor = "#fefefe";
  modalContent.style.margin = "15% auto";
  modalContent.style.padding = "20px";
  modalContent.style.paddingBottom = "40px";
  modalContent.style.border = "1px solid #888";
  modalContent.style.width = "60%";

  // Create the close button element
  var closeButton = document.createElement("span");
  closeButton.className = "close";
  closeButton.innerHTML = "&times;";
  closeButton.style.color = "#aaa";
  closeButton.style.float = "right";
  closeButton.style.fontSize = "28px";
  closeButton.style.fontWeight = "bold";
  closeButton.style.cursor = "pointer";

  // Create the heading element
  var heading = document.createElement("h1");
  heading.innerHTML = "Select Courses that you want to hide";
  heading.style.textAlign = "center";
  heading.style.marginBottom = "20px";
  heading.style.fontSize = "20px";
  heading.style.fontWeight = "bold";

  // Get all checkboxes
  // var checkboxes = getCheckboxes();

  // Create the apply button
  var applyButton = document.createElement("button");
  applyButton.id = "applyBtn";
  applyButton.innerHTML = "Apply";
  applyButton.style.backgroundColor = "#4CAF50";
  applyButton.style.border = "none";
  applyButton.style.color = "white";
  applyButton.style.padding = "5px 10px";
  applyButton.style.borderRadius = "4px";
  applyButton.style.float = "right";
  applyButton.style.cursor = "default";

  // Attach an onmouseover event listener
  applyButton.addEventListener('mouseover', function () {
    this.style.backgroundColor = 'rgb(0, 150, 0)';
  });

  // Attach an onmouseout event listener to revert the style when the mouse moves away
  applyButton.addEventListener('mouseout', function () {
    this.style.backgroundColor = '#4CAF50';
  });

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
  // button.onclick = triggerAlert;
  button.onclick = openModal;
  button.style.background = 'transparent';
  button.style.border = 'none';
  const img = document.createElement("img");
  img.src = "https://static.thenounproject.com/png/464129-200.png";
  img.style.paddingRight = "17px";
  img.style.paddingTop = "7px";
  img.style.width = "30px";
  img.style.height = "30px";
  button.appendChild(img);

  // const circle = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  // circle.setAttribute("width", "100%");
  // circle.setAttribute("height", "100%");
  // circle.setAttribute("viewBox", "0 0 100 100");

  // const circlePath = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  // circlePath.setAttribute("cx", "50");
  // circlePath.setAttribute("cy", "50");
  // circlePath.setAttribute("r", "40");
  // circlePath.setAttribute("fill", "transparent");
  // circlePath.setAttribute("stroke", "red");
  // circlePath.setAttribute("stroke-width", "3");

  // Add the circle to the button
  // circle.appendChild(circlePath);
  // button.appendChild(circle);

  // Set the initial styles for the button
  // button.style.position = 'relative';

  // Add event listeners for mouseover and mouseout
  // button.addEventListener('mouseover', function () {
  //   circle.style.display = 'block';
  // });

  // button.addEventListener('mouseout', function () {
  //   circle.style.display = 'none';
  // });

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

waitForDynamicObjects()
  .then(() => {
    mainFunction();
  })
  .catch(error => {
    console.error(error);
  });
