window.addEventListener('load', (loadEvent) => {
  main();
});

function main() {
  const operations = new TaskListOperations();
  operations.setActiveItemsInHTML();
  operations.displayAllItems();
  addBtnClicked(operations);
  taskListChange(operations);
  taskListRadioBtnsSort(operations);
  taskListOperationsBtnsController(operations);
}

function addBtnClicked(operations) {
  const toDoList = angular.module('toDoList', []);
  toDoList.controller('inputController', function inputController($scope)  {
    $scope.addBtn = 'Add';
    $scope.addBtn.addEventListener('click', operations.addElement($scope.taskName));
    $scope.taskName='';
  });
}

function taskListChange(operations) {
  const toDoList = angular.module('toDoList', []);
  toDoList.controller('taskListController', function taskListController ($scope) {
    $scope.taskList = '';
    $scope.taskList.addEventListener('change', operations.changeActiveItems($scope.taskList));
  });
}

function taskListRadioBtnsSort(operations) {
  const toDoList = angular.module('toDoList', []);
  toDoList.controller('taskSortController', function taskSortController ($scope) {
    $scope.allLabelSort = 'All';
    $scope.completeLabelSort = 'Complete';
    $scope.activeLabelSort = 'Active';
    $scope.allLabelSort.addEventListener('click', operations.displayAllItems);
    $scope.completeLabelSort.addEventListener('click', operations.displayCompleteItems);
    $scope.activeLabelSort.addEventListener('click', operations.displayActiveItems);
  });
}

function taskListOperationsBtnsController(operations) {
  const toDoList = angular.module('toDoList', []);
  toDoList.controller('listOperationsController', function taskListOperationsBtnsController ($scope)  {
    $scope.checkUncheckBtn = 'Check/Uncheck tasks';
    $scope.delCheckedBtn = 'Delete checked tasks';
    $scope.checkUncheckBtn.addEventListener('click', operations.setCheckUnCheckAll);
    $scope.delCheckedBtn.addEventListener('click', operations.delCheckEl);
  });
}
