import { loadTasks, createTask, deleteTask, updateTask } from './src/httpCalls.js';

async function listTasks() {
  const tasks = await loadTasks();
  const taskTable = document.querySelector("#taskTable");
  const taskContainer = document.querySelector("#taskContainer");

  tasks.forEach((task) => appendNewTask(task, taskContainer));
}

function appendNewTask(newTask, list) {
  let row = document.createElement("tr");
  row.setAttribute('data-id', newTask.id);
  let taskStatus = newTask.isComplete ? "Concluída" : "Pendente";

  row.innerHTML = `
            <th scope="row" class="align-middle">${newTask.id}</th>
            <td class="align-middle">${newTask.name}</td>
            <td class="align-middle">
              <input onclick="updateTaskStatus(event, ${newTask.id}, '${newTask.name}')" type="checkbox" name="taskStatus" id="taskStatus" class="me-2" ${
                newTask.isComplete ? "checked" : ""
              }>
              <span>
                ${taskStatus}
              </span>
            </td>
            <td class="align-middle">
              <button class="btn btn-danger" onclick="removeTask(${
                newTask.id
              })">
                Excluir
              </button>
            </td>`;

  list.appendChild(row);
}

function removeTaskFromList(id) {
  let row = document.querySelector(`[data-id="${id}"]`);
  row.remove();
}

function replaceTask(newTask) {
  let row = document.querySelector(`[data-id="${newTask.id}"]`);
  let taskStatus = newTask.isComplete ? "Concluída" : "Pendente";

  row.innerHTML = `
            <th scope="row" class="align-middle">${newTask.id}</th>
            <td class="align-middle">${newTask.name}</td>
            <td class="align-middle">
              <input onclick="updateTaskStatus(event, ${newTask.id}, '${newTask.name}')" type="checkbox" name="taskStatus" id="taskStatus" class="me-2" ${
                newTask.isComplete ? "checked" : ""
              }>
              <span>
                ${taskStatus}
              </span>
            </td>
            <td class="align-middle">
              <button class="btn btn-danger" onclick="removeTask(${
                newTask.id
              })">
                Excluir
              </button>
            </td>`;
}

async function createNewTask() {
  const newTaskName = prompt("Insira o nome da tarefa");
  try {
    const result = await createTask({
      id: 0,
      name: newTaskName,
      isComplete: false,
    });
    alert("Tarefa cadastrada com sucesso");

    const taskTable = document.querySelector("#taskTable");
    taskTable.classList.remove("d-none");

    appendNewTask(result, document.querySelector("#taskContainer"));
  } catch (err) {
    alert("Houve um erro ao cadastrar a tarefa");
  }
}

async function removeTask(id) {
  if (confirm('Deseja excluir esta tarefa?')) {
    try {
      await deleteTask(id);
      alert("Tarefa excluída com sucesso");
      removeTaskFromList(id);
    } catch (err) {
      console.warn(err);
      alert("Houve um erro ao cadastrar a tarefa");
    }
  }
}

async function updateTaskStatus(event, id, taskName) {
  const isComplete = event.target.checked;

    try {
      await updateTask(id, {
        id,
        name: taskName,
        isComplete,
      });
      alert("Tarefa atualizada com sucesso");

      replaceTask({
        id,
        name: taskName,
        isComplete,
      });
    } catch (err) {
      console.warn(err);
      alert("Houve um erro ao atualizar a tarefa");
    }

}

window.createNewTask = createNewTask;
window.removeTask = removeTask;
window.updateTaskStatus = updateTaskStatus;

window.onload = listTasks();
