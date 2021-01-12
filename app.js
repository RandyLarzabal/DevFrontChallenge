// self executing function here
(function () {

    const formTasks = document.querySelector("#formTasks")
    const compteRendu = document.querySelector(".compte-rendu")
    const btnRendu = document.querySelector("#renduBtn")
    btnRendu.addEventListener("click", () => renderModal())
    const listeTasksElement = document.querySelector("#liste")
    const listeTable = []



    formTasks.addEventListener("submit", (e) => onSubmit(e))

    const toggleButton = (id) => {
        const td = document.createElement("td")
        const button = document.createElement("button")
        button.className = "btn btn-primary"
        button.onclick = () => toggleTask(id)
        button.innerText = "non fait"
        td.appendChild(button)
        return td
    }
    const deleteButton = (id) => {
        const td = document.createElement("td")
        const button = document.createElement("button")
        button.className = "btn btn-danger"
        button.onclick = () => deleteTask(id)
        button.innerText = "Delete"
        td.appendChild(button)
        return td
    }

    const changeButton = (id) => {
        const td = document.createElement("td")
        const button = document.createElement("button")
        button.className = "btn btn-primary"
        button.onclick = () => changeTask(id)
        button.innerText = "modifier"
        td.appendChild(button)
        return td
    }


    const onSubmit = (e) => {
        e.preventDefault()
        const inputTask = document.querySelector("#task")
        const inputTaskObject = {value: inputTask.value, id: listeTable.length, state: false}
        addNewRow(inputTaskObject)
        inputTask.value = ""
    }

    const addNewRow = (task) => {
        const row = document.createElement("tr")
        const td = document.createElement("td")
        td.className = "task-value"
        td.innerText = task.value
        row.appendChild(td)
        row.appendChild(toggleButton(task.id))
        row.appendChild(deleteButton(task.id))
        row.appendChild(changeButton(task.id))
        row.dataset.id = task.id
        listeTable.push({...task, element: row})
        listeTasksElement.appendChild(row)
        console.log(listeTable);
    }

    const toggleTask = (id) => {
        const index = listeTable.findIndex(value => value.id === id)
        const task = listeTable[index]
        task.element.children[1].children[0].innerText = !task.state ? "fait" : "non fait"
        listeTable.splice(index, 1)
        listeTable.push({...task, state: !task.state})

    }

    const deleteTask = (id) => {
        const index = listeTable.findIndex(value => value.id === id)
        const task = listeTable[index]
        listeTasksElement.removeChild(task.element)
        listeTable.splice(index, 1)
    }

    const changeTask = (id) => {
        const index = listeTable.findIndex(value => value.id === id)
        const task = listeTable[index]
        task.children[0].innerHTML = `<input value=${task}/>`
        listeTable.splice(index, 1)
        listeTable.push({...task, state: !task.state})

    }

    const renderModal = () => {
        compteRendu.innerHTML = `<ul>${listeTable.map((value, index) => `<li><span>${value.value}</span> <span style="background-color: ${value.state ? "green" : "red"}">${value.state ? "fait" : "non"}</span></li>`)}</ul>`
    }

})();