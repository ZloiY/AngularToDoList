angular
.module('todoList')
.component('todoList', {
  templateUrl: 'src/js/app/todolist/todolist.template.html',
  controller:['$scope',
    function ToDoListController($scope) {
      const self = this;
      self.allCheckUncheck = false;
      self.activeElements = 0;
      self.tasks = [];
      self.addTask = function addTask(taskName) {
        $scope.task = {};
        if (taskName.length === 0) {
          alert('You must entry task name.');
          return;
        }
        const task = $scope.task;
        task.name = taskName;
        task.check = false;
        $scope.tasks.push(task);
        $scope.activeElements += 1;
      };
      self.closeTask = function closeTask(task) {
        const index = $scope.tasks.indexOf(task);
        if (index > -1) {
          $scope.tasks.splice(index, 1);
        }
        !task.check ? $scope.activeElements -= 1 : 0;
      };
      self.taskCheck = function taskCheck(task) {
        task.check ? $scope.activeElements -= 1 : $scope.activeElements += 1;
      };
      self.allLabelSort = function allLabelSort() {
        $scope.allTasksclass = 'radio-btn-label-selected';
        $scope.completeTasksclass = 'radio-btn-label-unselected';
        $scope.activeTasksclass = 'radio-btn-label-unselected';
      };
      self.completeLabelSort = function completeLabelSort() {
        $scope.completeTasksclass = 'radio-btn-label-selected';
        $scope.allTasksclass = 'radio-btn-label-unselected';
        $scope.activeTasksclass = 'radio-btn-label-unselected';
      };
      self.activeLabelSort = function activeLabelSort() {
        $scope.activeTasksclass = 'radio-btn-label-selected';
        $scope.completeTasksclass = 'radio-btn-label-unselected';
        $scope.allTasksclass = 'radio-btn-label-unselected';
      };
      self.toggleCheckBtn = function toggleCheckBtn() {
        angular.forEach($scope.tasks, (task) => {
           if(!$scope.allCheckUncheck !== task.check) {
             task.check = !$scope.allCheckUncheck;
             task.check ? $scope.activeElements -= 1 : $scope.activeElements += 1;
           }
        });
        $scope.allCheckUncheck = !$scope.allCheckUncheck;
      };
      self.delCheckedBtn = function delCheckedBtn() {
        $scope.tasks = $scope.tasks.filter((task) => {
          return !task.check;
        });
        $scope.allCheckUncheck = false;
      }
    }]
  });
