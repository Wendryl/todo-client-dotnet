export async function loadTasks() {
  const result = await fetch("http://localhost:5195/api/todoItems")
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      throw error;
    });

  return result;
}

export async function createTask(newTask) {
  const result = await fetch("http://localhost:5195/api/todoItems", {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      throw error;
    });

  return result;
}

export async function updateTask(id, newTask) {
  return fetch(`http://localhost:5195/api/todoItems/${id}`, {
    method: "PUT",
    body: JSON.stringify(newTask),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data)
    .catch((error) => {
      throw error;
    });
}

export async function deleteTask(id) {
  return fetch(`http://localhost:5195/api/todoItems/${id}`, {
    method: "DELETE",
  })
    .then((data) => data)
    .catch((error) => {
      throw error;
    });
}

