let student = [
  {
    id: 1,
    name: "Mary Wanjiku",
    age: 21,
    gender: "Female",
    course: "Software Development",
    marks: 85,
  },
  {
    id: 2,
    name: "John Kamau",
    age: 23,
    gender: "Male",
    course: "Software Development",
    marks: 65,
  },
];

let nextStudentId = 3;

const PASS_MARK = 50;

let editingStudentId = null;

let currentCourseFilter = "All";
let sortByMarksHighToLow = false;

function byId(elementId) {
  return document.getElementById(elementId);
}

function getClassification(marks) {
  if (marks >= 80) {
    return "Excellent";
  } else if (marks >= 70) {
    return "Very Good";
  } else if (marks >= 60) {
    return "Good";
  } else if (marks >= 50) {
    return "Average";
  } else {
    return "Failed";
  }
}

function getStatus(marks) {
  const hasPassed = marks >= PASS_MARK;
  return hasPassed ? "Passed" : "Failed";
}

function getClassificationCssClass(classification) {
  return "badge-" + classification.toLowerCase().replace(" ", "-");
}

function showMessage(box, text, type) {
  box.textContent = text;
  box.className = "message " + type;
}

function createElementWithText(tagName, text, cssClass) {
  const element = document.createElement(tagName);
  element.textContent = text;
  if (cssClass) {
    element.className = cssClass;
  }
  return element;
}
