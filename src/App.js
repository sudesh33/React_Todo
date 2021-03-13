import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import Todo from "./views/Todo";
import {createStore} from "redux";
import React from "react";


const initialState = {
  todos: [],
  filtered: []
};

// Reducer function
function reducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_TODO':
      const {id,todo,active,color,priority} =action.payload;
      console.log(action.payload);
      return {
        todos: [...state.todos,{id:id,name:todo,active:active,color:color,priority:priority}],
        filtered: [...state.todos,{id:id,name:todo,active:active,color:color,priority:priority}]
      }
    case 'DELETE_TODO':
      return{
        todos: state.todos.filter((itm) => itm.id !== action.id),
        filtered: state.filtered.filter((itm) => itm.id !== action.id)
      }
    case 'EDIT_TODO':

      return {
        todos:state.todos.map((post)=>post.id === action.id ?
            {...post,active:!post.active}
            :post),
        filtered:state.filtered.map((post)=>post.id === action.id ?
            {...post,active:!post.active}
            :post)
      }

    case 'FILTER_STATUS':

      const status = action.status;
      return {
        ...state,
        filtered: state.todos.filter((itm) => itm.active === status)
      }

      case 'SEARCH_TODOS':

      const keyword = action.val;
      return {
        ...state,
        filtered: state.todos.filter((itm) => itm.name.toLowerCase().includes(keyword))
      }

      case 'FILTER_BY_COLOR':

      const colors = action.val;
      return {
        ...state,
        filtered: state.todos.filter((itm) => itm.color == colors)
      }



    default:
      return state;
  }
}

const store = createStore(reducer);

function App() {

  return (
    <Provider store={store}>
      <Todo/>
    </Provider>
  );
}

export default App;
