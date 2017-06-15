angular
.module('todoList')
.component('todoList', {
  templateUrl: 'src/js/app/todolist/todolist.template.html',
  controller:['$scope',
    function ToDoListController($scope) {
      const self = this;
      self.name = '';
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
        self.tasks.push(task);
        self.activeElements += 1;
      };
      self.closeTask = function closeTask(task) {
        const index = self.tasks.indexOf(task);
        if (index > -1) {
          self.tasks.splice(index, 1);
        }
        !task.check ? self.activeElements -= 1 : 0;
      };
      self.taskCheck = function taskCheck(task) {
        task.check ? self.activeElements -= 1 : self.activeElements += 1;
      };
      self.allLabelSort = function allLabelSort() {
        self.allTasksclass = 'radio-btn-label-selected';
        self.completeTasksclass = 'radio-btn-label-unselected';
        self.activeTasksclass = 'radio-btn-label-unselected';
      };
      self.completeLabelSort = function completeLabelSort() {
        self.completeTasksclass = 'radio-btn-label-selected';
        self.allTasksclass = 'radio-btn-label-unselected';
        self.activeTasksclass = 'radio-btn-label-unselected';
      };
      self.activeLabelSort = function activeLabelSort() {
        self.activeTasksclass = 'radio-btn-label-selected';
        self.completeTasksclass = 'radio-btn-label-unselected';
        self.allTasksclass = 'radio-btn-label-unselected';
      };
      self.toggleCheckBtn = function toggleCheckBtn() {
        angular.forEach(self.tasks, (task) => {
           if(!self.allCheckUncheck !== task.check) {
             task.check = !self.allCheckUncheck;
             task.check ? self.activeElements -= 1 : self.activeElements += 1;
           }
        });
        self.allCheckUncheck = !self.allCheckUncheck;
      };
      self.delCheckedBtn = function delCheckedBtn() {
        self.tasks = self.tasks.filter((task) => {
          return !task.check;
        });
        self.allCheckUncheck = false;
      }
    }]
  });
