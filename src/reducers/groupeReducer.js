import {  GET_GROUPE_LIST, ADD_GROUPE, UPDATE_GROUPE_LIST, GET_GROUPE_STUDENT_LIST, ACCEPT_STUDENT_IN_GROUPE, LEAVE_GROUPE } from '../actions/types';
import { acceptStudent } from '../actions/groupeActions';
const initialState = {
    groupe:{},
    list: {},
    students:{}
};


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_GROUPE_LIST:
            return {
                ...state,
                list : action.payload
            }
      
            case ADD_GROUPE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

            case UPDATE_GROUPE_LIST:
            return {
                ...state,
                list: updateList(state, action.payload)
            }

            case GET_GROUPE_STUDENT_LIST:
            return {
                ...state,
                students:action.payload.list,
                groupe:action.payload.groupe 
            }
            case ACCEPT_STUDENT_IN_GROUPE:
            return {
                ...state,
                groupe:addStudentToGroupe(state.groupe , action.payload)
            }

            case LEAVE_GROUPE:
            return {
                ...state,
                groupe: LeaveGroupe( state.groupe, action.payload),
                students : updateStudentList(state, action.payload)
            }
        default:
            return state;
    }
}
export const LeaveGroupe = (groupe , id) =>{
    groupe.acceptedStudents = groupe.acceptedStudents.replace(""+id,"");
    return groupe;
}

export const updateStudentList = (state , id) =>{
    return state.students.filter(
        student => student.id !== id
    );
}

export const addStudentToGroupe = (groupe , payload) => {
     groupe.acceptedStudents = groupe.acceptedStudents+"/"+payload;
     return groupe;
}

export const updateList = (state, payload) => {
    switch (payload.state) {
        case 1:
            return state.list.filter(
                user => user.id !== payload.index
            );
        case 2:
            state.list[payload.index].state = payload.newState;
            break;
        default:
            break;

    }

    return state.list;
}
