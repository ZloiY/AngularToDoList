angular.
module('todoList')
  .component('todoListInput', {
    templateUrl: 'src/todolist-input/todolist-input.template.html',
    controller: TodoListInputController,
    bindings: {
      task: '<',
      onAdd: '&',
    }
  });

function TodoListInputController() {
  const self = this;
  self.name = '';
  self.addTask = (taskName) => {
    if (taskName.length === 0) {
      alert('You must entry task name.');
      return;
    }
    self.task = {
      name: taskName,
      check: false,
    };
    self.onAdd({task: self.task});
    self.name = '';
  }
}