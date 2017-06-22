angular.module('todoList').component('todoListTaskList', {
  templateUrl: 'src/todolist-tasklist/todolist-tasklist.template.html',
  controller: TodoListTaskListController,
});

function TodoListTaskListController() {
  const self = this;
  self.closeTask = (task) => {
    const index = self.tasks.indexOf(task);
    if (index > -1) {
      self.tasks.splice(index, 1);
    }
    !task.check ? self.activeElements -= 1 : 0;
  };
  self.taskCheck = (task) => {
    task.check ? self.activeElements -= 1 : self.activeElements += 1;
  };
  self.addNewTask = (task) => {
    self.tasks.push(task);
    self.activeElements += 1;
  };
  self.delCheckedTasks = () => {
    self.tasks = self.tasks.filter((task) => {
      return !task.check;
    });
    self.allCheckUncheck = false;
  };
  self.toggleTasksCheckboxes = () => {
    angular.forEach(self.tasks, (task) => {
      if(!self.allCheckUncheck !== task.check) {
        task.check = !self.allCheckUncheck;
        task.check ? self.activeElements -= 1 : self.activeElements += 1;
      }
    });
    self.allCheckUncheck = !self.allCheckUncheck;
  };
  self.allLabelSort = () => {
    self.allTasksclass = 'radio-btn-label-selected';
    self.completeTasksclass = 'radio-btn-label-unselected';
    self.activeTasksclass = 'radio-btn-label-unselected';
  };
  self.completeLabelSort = () => {
    self.completeTasksclass = 'radio-btn-label-selected';
    self.allTasksclass = 'radio-btn-label-unselected';
    self.activeTasksclass = 'radio-btn-label-unselected';
  };
  self.activeLabelSort = () => {
    self.activeTasksclass = 'radio-btn-label-selected';
    self.completeTasksclass = 'radio-btn-label-unselected';
    self.allTasksclass = 'radio-btn-label-unselected';
  };
  self.$onInit = () => {
    self.tasks = [];
    self.allCheckUncheck = false;
    self.activeElements = 0;
  };
}