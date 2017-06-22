angular.module('todoList').component('tasklistElement', {
  templateUrl: 'src/todolist-tasklist/tasklist-element/tasklist-element.template.html',
  controller: TaskListElementController,
  bindings: {
    task: '<',
    onCheck: '&',
    onDelete: '&',
  }
});

function TaskListElementController() {
  const self = this;
  self.delete = () => {
    self.onDelete({task: self.task});
  };
  self.toogleCheck = () => {
    self.onCheck({task: self.task});
  }
}