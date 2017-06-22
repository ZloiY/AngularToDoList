describe('todoList', () => {
  beforeEach(module('todoList'));
  describe('TodoListController', () => {
    it('should contain empty input field', inject(($componentController) => {
      const ctrl = $componentController('todoList');
      expect(ctrl.name).toBe('');
      }));
    it('should contain empty task array', inject(($componentController) => {
      const ctrl = $componentController('todoList');
      expect(ctrl.tasks.length).toBe(0);
      }));
    it('active task number should equal 0', inject(($componentController) => {
      const ctrl = $componentController('todoList');
      expect(ctrl.activeElements).toBe(0);
      }));
    it('allCheckUnchek should be false', inject(($componentController) => {
      const ctrl = $componentController('todoList');
      expect(ctrl.allCheckUncheck).toBe(false);
    }));
  })
});