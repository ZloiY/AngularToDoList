angular
.module('todoList')
.component('todoList', {
  templateUrl: 'src/todolist/todolist.template.html',
  controller: TodoListController,
  });

function TodoListController() {
  const self = this;
}