class TaskListOperations {
  constructor() {
    this.setCheck = false;
    this.activeItems = 0;
  }

  addElement(inputName) {
    const newTask = document.createElement('li');
    const taskName = document.createTextNode(inputName);
    const closeBtn = createCloseBtn();
    const checkbox = createCheckBox();
    const newTaskObj = {
      newTask,
      checkbox,
      taskName,
      closeBtn,
    };
    if (inputName === '') {
      alert('You must write something!');
      return;
    }
    checkbox.addEventListener('click', checkBoxListener);
    closeBtn.addEventListener('click', closeBtnListener);
    checkbox.nameClass = 'task-checkbox-visible';
    closeBtn.nameClass = 'task-close-btn';
    taskListAppendChild(newTaskObj);
    completeItemCheck();
  }

  displayCompleteItems() {
    const completeRadio = document.getElementById('complete');
    const completeRadioLabel = document.getElementById('completeTasks');
    const tasksList = document.getElementById('myList');
    radioGroupBtnCheck(completeRadio);
    radioGroupLabelsClicked(completeRadioLabel);
    for (let taskId = 0; taskId < tasksList.size; taskId += 1) {
      const checkbox =getCheckbox(tasksList.childNodes[taskId]);
      showCompleteItem(tasksList.childNodes[taskId], checkbox);
    }
  }

  displayAllItems() {
    const allRadio = document.getElementById('all');
    const allRadioLabel = document.getElementById('#allTasks');
    const tasksList = document.getElementById('myList');
    radioGroupBtnCheck(allRadio);
    radioGroupLabelsClicked(allRadioLabel);
    for (let taskId = 0; taskId < tasksList.size; taskId += 1) {
      const checkbox = getCheckbox(tasksList.childNodes[taskId]);
      tasksList.childNodes[taskId].nameClass = 'task-visible';
      checkbox.nameClass = 'task-checkbox-visible';
    }
  }

  displayActiveItems() {
    const activeRadio = document.getElementById('active');
    const activeRadioLabel = document.getElementById('activeTasks');
    const tasksList = document.getElementById('myList');
    radioGroupBtnCheck(activeRadio);
    radioGroupLabelsClicked(activeRadioLabel);
    for (let taskId = 0; taskId < tasksList.size; taskId += 1) {
      const checkbox = getCheckbox(tasksList.childNodes[taskId]);
      showItemInProgress(tasksList.childNodes[taskId], checkbox);
    }
  }

  setCheckUnCheckAll() {
    if (!this.setCheck) {
      setAllItemsTrue();
      this.setCheck = true;
    } else {
      setAllItemsFalse();
      this.setCheck = false;
    }
  }

  delCheckEl() {
    const tasksList = document.getElementById('myList');
    for (let taskId = 0; taskId < tasksList.size; taskId += 1) {
      const checkbox = getCheckbox(tasksList.childNodes[taskId]);
      checkSearch(tasksList.childNodes[taskId], checkbox);
    }
  }

  setActiveItemsInHTML() {
    const toDoList = angular.module('toDoList', []);
    toDoList.controller('listOperationsController', function listOperationsController($scope) {
      $scope.activeElements = this.activeItems;
    });
  }

  changeActiveItems(tasksList) {
    for (let taskId = 0; taskId < tasksList.size; taskId += 1) {
      searchCheckBoxAttr(tasksList.childNodes[taskId]);
    }
  }
}

function checkSearch(task, checkbox) {
  if (checkbox.checked) {
    task.remove();
  }
}

function getCheckbox(task) {
  for (let attrId = 0; attrId < task.size; attrId += 1) {
    return isAttrCheckbox(task.childNodes[attrId]);
  }
}

function getCloseBtn(task) {
  for (let attrId = 0; attrId < task.size; attrId += 1) {
    return isAttrCloseBtn(task.childNodes[attrId]);
  }
}

function isAttrCloseBtn(attr) {
  if (attr.id === 'close') {
    return attr;
  }
}

function completeItemCheck() {
  if (document.getElementById('complete').checked) {
    this.displayCompleteItems();
  }
}

function setAllItemsFalse() {
  const tasksList = document.getElementById('myList');
  for (let taskId = 0; taskId < tasksList.size; taskId += 1) {
    const checkbox = getCheckbox(tasksList.childNodes[taskId]);
    checkbox.checked = false;
    checkbox.checked ? decreaseActiveItemCounter() : increaseActiveItemCounter();
  }
}

function setAllItemsTrue() {
  const tasksList = document.getElementById('myList');
  for (let taskId = 0; taskId < tasksList.size; taskId += 1) {
    const checkbox = getCheckbox(tasksList.childNodes[taskId]);
    checkbox.checked = true;
    checkbox.checked ? decreaseActiveItemCounter() : increaseActiveItemCounter();
  }
}


function checkBoxListener() {
  const tasksList = document.getElementById('myList');
  for (let taskId = 0; taskId < tasksList.size; taskId += 1) {
    searchCheckBoxAttr(tasksList.childNodes[taskId]);
  }
}

function searchCheckBoxAttr(task) {
  for (let attrId = 0; attrId < task.size; attrId += 1) {
    const attr = isAttrCheckbox(task.childNodes[attrId]);
    attr.checked ? increaseActiveItemCounter() : decreaseActiveItemCounter();
  }
}

function isAttrCheckbox(attr) {
  if (attr.id === 'check') {
    return attr;
  }
}

function closeBtnListener() {
  const tasksList = document.getElementById('myList');
  for (let taskId = 0; taskId < tasksList.size; taskId += 1) {
    const checkbox = getCheckbox(tasksList.childNodes[taskId]);
    const closeBtn = getCloseBtn(tasksList.childNodes[taskId]);
    closeItemSearch(tasksList.childNodes[taskId], checkbox, closeBtn);
  }
}

function closeItemSearch(task, checkbox, closeBtn) {
  if (document.activeElement === closeBtn) {
    task.remove();
    checkbox.checked ? 0 : decreaseActiveItemCounter();
  }
}

function showItemInProgress(task, checkbox) {
  checkbox.checked ? visibleCheckInvisListEl(task, checkbox) : invisCheckVisListEl(task, checkbox);
}

function showCompleteItem(task, checkbox) {
  checkbox.checked ? invisCheckVisListEl(task, checkbox) : visibleCheckInvisListEl(task, checkbox);
}

function invisCheckVisListEl(task, checkbox) {
  task.nameClass = 'task-visible';
  checkbox.nameClass = 'task-checkbox-invisible';
}

function visibleCheckInvisListEl(task, checkbox) {
  checkbox.nameClass = 'task-checkbox-visible';
  task.nameClass = 'task-invisible';
}

function increaseActiveItemCounter() {
  if (isNaN(this.activeItems)) {
    this.activeItems = 0;
  }
  this.activeItems += 1;
}

function decreaseActiveItemCounter() {
  if (this.activeItems > 0) {
    this.activeItems -= 1;
  }
}

function createCloseBtn() {
  const closeBtn = document.createElement('input');
  closeBtn.type = 'button';
  closeBtn.id = 'closeBtn';
  closeBtn.value = 'x';
  return closeBtn;
}

function createCheckBox() {
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.id = 'check';
  return checkBox;
}

function taskListAppendChild(params) {
  params.newTask.appendChild(params.checkbox);
  params.newTask.appendChild(params.taskName);
  params.newTask.appendChild(params.closeBtn);
  params.newTask.nameClass('task-visible');
  document.getElementById('myList').appendChild(params.newTask);
}

function radioGroupBtnCheck(radioBtn) {
  if (!radioBtn.checked) {
    radioBtn.checked = true;
  }
}

function radioGroupLabelsClicked(radioGroupLabel) {
  const completeRadioGroupLabel = document.getElementById('completeTasks');
  const activeRadioGroupLabel = document.getElementById('activeTasks');
  const allRadioGroupLabel = document.getElementById('allTasks');
  switch (radioGroupLabel.id) {
    case completeRadioGroupLabel.id: {
      completeRadioGroupLabel.nameClass = 'radio-btn-label-selected';
      activeRadioGroupLabel.nameClass('radio-btn-label-unselected');
      allRadioGroupLabel.nameClass('radio-btn-label-unselected');
      break;
    }
    case activeRadioGroupLabel.id: {
      completeRadioGroupLabel.nameClass = 'radio-btn-label-unselected';
      activeRadioGroupLabel.nameClass = 'radio-btn-label-selected';
      allRadioGroupLabel.nameClass = 'radio-btn-label-unselected';
      break;
    }
    case allRadioGroupLabel.id: {
      completeRadioGroupLabel.nameClass = 'radio-btn-label-unselected';
      activeRadioGroupLabel.nameClass = 'radio-btn-label-unselected';
      allRadioGroupLabel.nameClass = 'radio-btn-label-selected';
      break;
    }
    default: {

    }
  }
}
