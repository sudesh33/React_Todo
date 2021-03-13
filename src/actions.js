// Action Creator
let nextTodoId = 0
export function addTodo(todo,color,priority) {
    return {
        type: 'ADD_TODO',
        payload:{
            id: ++nextTodoId,
            active:true,
            color:color,
            priority:priority,
            todo
        }

    }
}

export function editTodo(id) {
    return{
        type:'EDIT_TODO',
        id:id
    }
}

export function deleteTodo(id) {
    return{
        type:'DELETE_TODO',
        id:id
    }
}

export function filterStatus(status) {
    return{
        type:'FILTER_STATUS',
        status:status
    }
}

export function handleSearch(val) {
    return{
        type:'SEARCH_TODOS',
        val:val
    }
}
export function filterByColor(val) {
    return{
        type:'FILTER_BY_COLOR',
        val:val
    }
}
