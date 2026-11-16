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

function calculateStatistics() {
  let totalStudents = students.length;
  let passedCount = 0;
  let failedCount = 0;
  let marksSum = 0;
  let highest = null;
  let lowest = null;

  const bandCounts = {
    Excellent: 0,
    "Very Good": 0,
    Good: 0,
    Average: 0,
    Failed: 0,
  };
}

for (let i = 0; i < students.length; i++) {
  const student = students[i];
  marksSum += student.marks;
  bandCounts[getClassification(student.marks)]++;

  if (student.marks >= PASS_MARK) {
    passedCount++;
  } else {
    failedCount++;
  }

  if (highest === null || student.marks > highest) {
    highest = student.marks;
  }
  if (lowest === null || student.marks < lowest) {
    lowest = student.marks;
  }

  const average = totalStudents > 0 ? marksSum / totalStudents : 0;
  return {
    totalStudents,
    passedCount,
    failedCount,
    marksSum,
    highest,
    lowest,
    average,
    bandCounts
  };
}

function updateDashboard() {
  const stats = calculateStatistics();

  if(byId("stats-total")) {
    byId("stats-total").textContent = stats.totalStudents;
    byId("stats-passed").textContent = stats.passedCount;
    byId("stats-failed").textContent = stats.failedCount;
    byId("stats-average").textContent = stats.average.toFixed(2);
  }

  if (byId("recordsTotal")) {
    byId("recordsTotal").textContent = stats.totalStudents;
    byId("recordsPassed").textContent = stats.passedCount;
    byId("recordsFailed").textContent = stats.failedCount;
    byId("recordsAverage").textContent = stats.average.toFixed(2);
  }

  if (byId("summaryHighest")) {
    byId("summaryHighest").textContent = stats.highest !== null ? stats.highest : "N/A";
    byId("summaryLowest").textContent = stats.lowest !== null ? stats.lowest : "N/A";
    
    renderPerformanceBars(stats);
  }
}

function renderPerformanceBars(stats) {
  const container = byId("performanceBars");
  container.innerHTML = "";

  const bands = Object.keys(stats.bandCounts);
  for (let i = 0; i < bands.length; i++) {
    const band = bands[i];
    const count = stats.bandCounts[band];
    const percentage = stats.totalStudents > 0 ? (count / stats.totalStudents) * 100 : 0;
    
    const row = document.createElement("div");
    row.className = "performance-row";

    const label = createElementWithText("span", band, "performance-label");
    const barContainer = document.createElement("div");
    barContainer.className = "performance-bar-container";

    const track = document.createElement("div");
    track.className = "performance-bar-track";

    const fill = document.createElement("div");
    fill.className = "performance-bar-fill";
    fill.style.width = percentage + "%";
    track.appendChild(fill);
    const value=createElementWithText("span", percentage.toFixed(1) + "%", "performance-value");
    barContainer.appendChild(track);
    barContainer.appendChild(value);

    const countLabel = createElementWithText("span", count, "performance-count");
  
}