angular.
module('todoList').
  component('todoListCheckDelBtns', {
    templateUrl: 'src/todolist-check-del-btns/todolist-check-del-btns.template.html',
    controller: TodolistCheckDelBtnsController,
    bindings: {
      onToggleCheckBtn: '&',
      onDelCheckedBtn: '&'
    }
});

function TodolistCheckDelBtnsController() {
  const self =this;
  self.toggleCheckBtn = () => {
    self.onToggleCheckBtn();
  };
  self.delCheckedBtn = () => {
    self.onDelCheckedBtn();
  }
}