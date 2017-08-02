(function() {
	const input     = document.querySelector('.task-form__input'),
		  submitBtn = document.querySelector('.task-form__submit'),
		  todo      = document.querySelector('.todo-list'),
		  resolved  = document.querySelector('.resolved-tasks'),
		  storage   = localStorage.getItem('todoList');

	// if(storage.length > 0) {
	// 	todo.innerHTML = storage;
	// 	console.log('storage not empty')
	// }

	function clickSubmit(e) {
		e.preventDefault();

		let val = input.value,
			tasks  = todo.querySelectorAll('li');

		if(val != '') {
			addNewTask(val);
			input.value = '';
		}
		updateLocalStorage(todo);
	} 

	function addNewTask(val) {
		let newTask = document.createElement('li');
		newTask.innerHTML = '<span class="done-task"></span>' + val + '<span class="remove-task">&mdash;</span>';
		todo.appendChild(newTask);
	}

	function clickTodoItem(e) {
		let clickedItem   = e.target,
			parentElem    = clickedItem.parentNode,
			spansInParent = parentElem.querySelector('.remove-task'),
			parentLiInner;


		if(clickedItem.className == 'done-task') {
			let resolvedTask = document.createElement('li');
			spansInParent.remove();

			parentLiInner = parentElem.innerHTML;
			resolvedTask.innerHTML = parentLiInner;
			parentElem.remove();
			if(resolved.classList.contains('empty')) {
				resolved.classList.remove('empty');
			}
			resolved.appendChild(resolvedTask);
		}

		if(clickedItem.className == 'remove-task') {
			parentElem.remove();
		}
	}

	function updateLocalStorage(list) {
		try {
		  localStorage.setItem('todoList', list);
		} catch (e) {
		  if (e == QUOTA_EXCEEDED_ERR) {
		   alert('Storage is full');
		  }
		}
	}

	submitBtn.addEventListener('click', clickSubmit);
	todo.addEventListener('click', clickTodoItem);
})()
