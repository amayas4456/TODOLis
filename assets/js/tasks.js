document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoColumn = document.getElementById('todo-column');
    const inProgressColumn = document.getElementById('in-progress-column');
    const doneColumn = document.getElementById('done-column');

    // Charger les tâches depuis LocalStorage
    loadTasksFromLocalStorage();

    // Fonction pour créer une carte de tâche
    function createTaskCard(taskText, column) {
        const taskCard = document.createElement('li');
        taskCard.classList.add('task-card');
        taskCard.innerHTML = `
            <div class="flex justify-between items-center">
                <span>${taskText}</span>
                <button class="delete-btn text-red-500 hover:text-red-600"><i class="fas fa-trash"></i></button>
            </div>
        `;

        // Supprimer une tâche
        const deleteBtn = taskCard.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            taskCard.remove();
            saveTasksToLocalStorage(); // Sauvegarder après suppression
        });

        column.appendChild(taskCard);
    }

    // Fonction pour ajouter une nouvelle tâche dans la colonne "À faire"
    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();

        if (taskText) {
            createTaskCard(taskText, todoColumn);  // Ajouter à la colonne "À faire"
            taskInput.value = '';  // Réinitialiser le champ de saisie
            saveTasksToLocalStorage();  // Sauvegarder dans LocalStorage
        }
    });

    // Sauvegarder les tâches dans LocalStorage
    function saveTasksToLocalStorage() {
        const tasks = {
            todo: getTasksFromColumn(todoColumn),
            inProgress: getTasksFromColumn(inProgressColumn),
            done: getTasksFromColumn(doneColumn)
        };
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Fonction pour obtenir les tâches d'une colonne
    function getTasksFromColumn(column) {
        const tasks = [];
        column.querySelectorAll('.task-card span').forEach(task => {
            tasks.push(task.innerText);
        });
        return tasks;
    }

    // Charger les tâches depuis LocalStorage au démarrage
    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || { todo: [], inProgress: [], done: [] };

        tasks.todo.forEach(task => createTaskCard(task, todoColumn));
        tasks.inProgress.forEach(task => createTaskCard(task, inProgressColumn));
        tasks.done.forEach(task => createTaskCard(task, doneColumn));
    }

    // Activer le drag-and-drop avec Sortable.js
    new Sortable(todoColumn, { group: 'shared', animation: 150, onEnd: saveTasksToLocalStorage });
    new Sortable(inProgressColumn, { group: 'shared', animation: 150, onEnd: saveTasksToLocalStorage });
    new Sortable(doneColumn, { group: 'shared', animation: 150, onEnd: saveTasksToLocalStorage });
});
