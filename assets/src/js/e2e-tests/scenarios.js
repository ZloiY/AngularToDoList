describe('ToDoList Application', () => {
  beforeEach( () => {
    browser.get('http://localhost:9000/dist/index.html');
  });
  it('should show alert when enter pressed and input empty', () => {
    const addBtn = element(by.model('$ctrl.addBtn'));
    const EC = protractor.ExpectedConditions;
    addBtn.click();
    browser.wait(EC.alertIsPresent(), 400, 'You must entry task name.');
    browser.switchTo().alert().accept().then(null, function(e) {
      if (e.code !== webdriver.ErrorCode.NO_SUCH_ALERT) {
        throw e;
      }
    });
  });
  it('should add task when add pressed and input field is not empty', () => {
    const addBtn = element(by.model('$ctrl.addBtn'));
    const input = element(by.model('$ctrl.name'));
    const tasks = element.all(by.repeater('task in $ctrl.tasks').column('task.name'));
    input.sendKeys('task');
    addBtn.click();
    function getNames() {
      return tasks.map((elem) => {
        return elem.getText();
      });
    }
    expect(getNames()).toEqual(['task']);
  });
  it('should increase item counter by one if item added', () => {
    const addBtn = element(by.model('$ctrl.addBtn'));
    const input = element(by.model('$ctrl.name'));
    const activeItems = element(by.model('$ctrl.activeElements'));
    input.sendKeys('task');
    addBtn.click();
    expect(activeItems.getText()).toBe('Active tasks: 1');
  });
  it('should show checked item in Complete and All', () => {
    const addBtn = element(by.model('$ctrl.addBtn'));
    const input = element(by.model('$ctrl.name'));
    const tasksName = element.all(by.repeater('task in $ctrl.tasks').column('task.name'));
    const allTasks = element(by.model('$ctrl.allTasks'));
    const completeTasks = element(by.model('$ctrl.completeTasks'));
    const activeTasks = element(by.model('$ctrl.activeTasks'));
    input.sendKeys('task');
    addBtn.click();
    function getName() {
      return tasksName.map((elem) => {
        return elem.getText();
      });
    }
    const tasksCheck = element(by.css('[type=checkbox]'));
    tasksCheck.click();
    allTasks.click();
    expect(getName()).toEqual(['task']);
    completeTasks.click();
    expect(getName()).toEqual(['task']);
    activeTasks.click();
    expect(getName()).toEqual([]);
  });
  it('should show unchecked item in Active and All', () => {
    const addBtn = element(by.model('$ctrl.addBtn'));
    const input = element(by.model('$ctrl.name'));
    const tasksName = element.all(by.repeater('task in $ctrl.tasks').column('task.name'));
    const allTasks = element(by.model('$ctrl.allTasks'));
    const completeTasks = element(by.model('$ctrl.completeTasks'));
    const activeTasks = element(by.model('$ctrl.activeTasks'));
    input.sendKeys('task');
    addBtn.click();
    function getName() {
      return tasksName.map((elem) => {
        return elem.getText();
      });
    }
    allTasks.click();
    expect(getName()).toEqual(['task']);
    completeTasks.click();
    expect(getName()).toEqual([]);
    activeTasks.click();
    expect(getName()).toEqual(['task']);
  });
  it('should decrease active items when checkbox checked', () => {
    const addBtn = element(by.model('$ctrl.addBtn'));
    const input = element(by.model('$ctrl.name'));
    const activeItems = element(by.model('$ctrl.activeElements'));
    input.sendKeys('task');
    addBtn.click();
    element(by.css('[type=checkbox]')).click();
    expect(activeItems.getText()).toBe('Active tasks: 0');
  });
  it('should decrease active items if task delete and checkbox unchecked', () => {
    const addBtn = element(by.model('$ctrl.addBtn'));
    const input = element(by.model('$ctrl.name'));
    const activeItems = element(by.model('$ctrl.activeElements'));
    input.sendKeys('task');
    addBtn.click();
    const closeBtn = element(by.id('closeBtn'));
    closeBtn.click();
    expect(activeItems.getText()).toBe('Active tasks: 0');
  });
  it('shouldn`t decrease active items more if checkbox checked and close btn clicked', () => {
    const addBtn = element(by.model('$ctrl.addBtn'));
    const input = element(by.model('$ctrl.name'));
    const activeItems = element(by.model('$ctrl.activeElements'));
    input.sendKeys('task');
    addBtn.click();
    const tasksCheck = element(by.css('[type=checkbox]'));
    tasksCheck.click();
    expect(activeItems.getText()).toBe('Active tasks: 0');
    const closeBtn = element(by.id('closeBtn'));
    closeBtn.click();
    expect(activeItems.getText()).toBe('Active tasks: 0');
  });
  it('should check all items when button pressed first time and active items must be equal 0', () => {
    const addBtn = element(by.model('$ctrl.addBtn'));
    const input = element(by.model('$ctrl.name'));
    const checkUncheckBtn = element(by.model('$ctrl.checkUncheckBtn'));
    const activeItems = element(by.model('$ctrl.activeElements'));
    input.sendKeys('task');
    addBtn.click();
    addBtn.click();
    addBtn.click();
    addBtn.click();
    checkUncheckBtn.click();
    const tasksCheck = element(by.css('[type=checkbox]'));
    function checkChecks() {
      for (let checkId = 0; checkId < tasksCheck.length; checkId += 1) {
        if (tasksCheck[checkId] !== true) {
            return false;
        }
      }
      return true;
    }
    expect(checkChecks()).toBe(true);
    expect(activeItems.getText()).toBe('Active tasks: 0');
  });
  it('should uncheck all if check/uncheck button pressed again', () => {
    const addBtn = element(by.model('$ctrl.addBtn'));
    const input = element(by.model('$ctrl.name'));
    const checkUncheckBtn = element(by.model('$ctrl.checkUncheckBtn'));
    const activeItems = element(by.model('$ctrl.activeElements'));
    input.sendKeys('task');
    addBtn.click();
    addBtn.click();
    addBtn.click();
    addBtn.click();
    checkUncheckBtn.click();
    checkUncheckBtn.click();
    const tasksCheck = element(by.css('[type=checkbox]'));
    function checkChecks() {
      for (let checkId = 0; checkId < tasksCheck.length; checkId += 1) {
        if (tasksCheck[checkId] !== false) {
          return true;
        }
      }
      return false;
    }
    expect(checkChecks()).toBe(false);
    expect(activeItems.getText()).toBe('Active tasks: 4');
  });
  it('should check all elements if one of them already checked', () => {
    const addBtn = element(by.model('$ctrl.addBtn'));
    const input = element(by.model('$ctrl.name'));
    const checkUncheckBtn = element(by.model('$ctrl.checkUncheckBtn'));
    const activeItems = element(by.model('$ctrl.activeElements'));
    input.sendKeys('task');
    addBtn.click();
    element(by.css('[type=checkbox]')).click();
    addBtn.click();
    addBtn.click();
    addBtn.click();
    checkUncheckBtn.click();
    const tasksCheck = element.all(by.css('[type=checkbox]'));
    function checkChecks() {
      let allTrue = true;
      tasksCheck.each((task, taskId) => {
        if (task.getAttribute('checked') !== true) {
          allTrue = false
        }
      });
      return allTrue;
    }
    expect(checkChecks()).toBe(true);
    expect(activeItems.getText()).toBe('Active tasks: 0');
  });
  it('should uncheck all elements if check/uncheck btn pressed and one of them is uncheck', () => {
    const addBtn = element(by.model('$ctrl.addBtn'));
    const input = element(by.model('$ctrl.name'));
    const checkUncheckBtn = element(by.model('$ctrl.checkUncheckBtn'));
    const activeItems = element(by.model('$ctrl.activeElements'));
    input.sendKeys('task');
    addBtn.click();
    addBtn.click();
    addBtn.click();
    addBtn.click();
    checkUncheckBtn.click();
    const tasksCheck = element.all(by.css('[type=checkbox]'));
    tasksCheck.get(1).click();
    checkUncheckBtn.click();
    function checkChecks() {
      let allFalse = false;
      tasksCheck.each((task, taskid) => {
        if (task.getAttribute('checked') !== false) {
          allFalse = true;
        }
      });
      return allFalse;
    }
    expect(checkChecks()).toBe(false);
    expect(activeItems.getText()).toBe('Active tasks: 4');
  });
  it('should delete all checked item if del btn pressed', () => {
    const addBtn = element(by.model('$ctrl.addBtn'));
    const input = element(by.model('$ctrl.name'));
    const checkUncheckBtn = element(by.model('$ctrl.checkUncheckBtn'));
    const delCheckBtn = element(by.model('$ctrl.delCheckBtn'));
    const tasks = element.all(by.repeater('task in $ctrl.tasks').column('task.name'));
    input.sendKeys('task');
    addBtn.click();
    addBtn.click();
    addBtn.click();
    addBtn.click();
    function getName() {
      return tasks.map((elem) => {
        return elem.getText();
      });
    }
    checkUncheckBtn.click();
    delCheckBtn.click();
    expect(getName()).toEqual([]);
  });
  it('should delete only checked items if del btn pressed', () => {
    const addBtn = element(by.model('$ctrl.addBtn'));
    const input = element(by.model('$ctrl.name'));
    const delCheckBtn = element(by.model('$ctrl.delCheckBtn'));
    const tasks = element.all(by.repeater('task in $ctrl.tasks').column('task.name'));
    input.sendKeys('task');
    addBtn.click();
    addBtn.click();
    addBtn.click();
    addBtn.click();
    let tasksCheck = element.all(by.css('[type=checkbox]'));
    tasksCheck.get(0).click();
    tasksCheck.get(3).click();
    delCheckBtn.click();
    function getName() {
      return tasks.map((elem) => {
        return elem.getText();
      });
    }
    expect(getName()).toEqual(['task','task']);
  });
  it('shouldn`t delete unchecked elements if del btn pressed', () => {
    const addBtn = element(by.model('$ctrl.addBtn'));
    const input = element(by.model('$ctrl.name'));
    const delCheckBtn = element(by.model('$ctrl.delCheckBtn'));
    const tasks = element.all(by.repeater('task in $ctrl.tasks').column('task.name'));
    input.sendKeys('task');
    addBtn.click();
    addBtn.click();
    addBtn.click();
    addBtn.click();
    delCheckBtn.click();
    function getName() {
      return tasks.map((elem) => {
        return elem.getText();
      });
    }
    expect(getName()).toEqual(['task','task','task','task']);
  });
});