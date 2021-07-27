import { getFilters } from "./filters"
import { getTodos, toggleTodo, removeTodo } from "./todos"

const renderTodos = () => {
    const todoEl = document.querySelector('#todo')
    const todos = getTodos()
    const filters = getFilters()
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLocaleLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    const incompletedTodos = todos.filter((todo) => !todo.completed)
    todoEl.innerHTML = ''
    todoEl.appendChild(genreateSummaryDOM(incompletedTodos))

    if(filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-dos to show'
    }
}

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const textEl = document.createElement('span')
    const removeButton =document.createElement('button')

    checkbox.setAttribute('type','checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderTodos()
    })

    textEl.textContent = todo.text  
    containerEl.appendChild(textEl)

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    removeButton.textContent = 'remove'
    removeButton.classList.add('button','button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoEl
} 

const genreateSummaryDOM = (incompletedTodos) => {
    const summary = document.createElement('h3')
    const plural = incompletedTodos.length > 1 ? 's' : ''
    summary.classList.add('list-title')
    summary.textContent = `There are ${incompletedTodos.length} Todo${plural} remaining`
    return summary
}

export { renderTodos }