describe('todoList',  () => {
  beforeEach(module('todoList'));
  describe('ToDoListController', () => {
    it('should contain empty input field', inject(function ($componentController) {
      const ctrl = $componentController('todoList');
      expect(ctrl.name).toBeUndefined();
    }));
    it('should contain empty task array', inject(function ($componentController) {
      const ctrl = $componentController('todoList');
      expect(ctrl.tasks).toBeUndefined();
    }));
    it('active task number should equal 0', inject(function ($componentController) {
      const ctrl = $componentController('todoList');
      expect(ctrl.activeElements).toBeUndefined();
    }));
  });
});