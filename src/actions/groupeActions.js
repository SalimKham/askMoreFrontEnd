import axios from 'axios';
import { GET_GROUPE_LIST, GET_ERRORS, ADD_GROUPE, UPDATE_GROUPE_LIST, JOIN_GROUPE, LEAVE_GROUPE, GET_GROUPE_STUDENT_LIST, ACCEPT_STUDENT_IN_GROUPE, GET_GROUPE_LIST_BY_TEACHER } from './types';
export const getGroupeList = () => async dispatch => {
    try {
        const res = await axios.get("/api/groupe/all/");
         console.log(res.data);
        dispatch({
            type:  GET_GROUPE_LIST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}


export const getGroupeListByTeacher = () => async dispatch => {
    try {
        console.log("getting groupes");
        const res = await axios.get("/api/groupe/ByTeacher/");
         console.log(res.data);
        dispatch({
            type:  GET_GROUPE_LIST_BY_TEACHER,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}
export const addGroupe = (newGroupe) => async dispatch => {
    try {
       const res = await axios.post("/api/groupe/add/" ,newGroupe);
     
       dispatch({
        type: ADD_GROUPE,
        payload: res.data
    });
    dispatch({
        type: GET_ERRORS,
        payload: { result: "added!" }
    });
    } catch (err) {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}


export const joindGroupe = (id) => async dispatch => {
    try {
        await axios.post("/api/groupe/join/" + id);
       dispatch({
        type: JOIN_GROUPE,
        payload: id
    });

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}


export const LeaveGroupe = (id_groupe , id_student) => async dispatch => {
    try {
        await axios.post("/api/groupe/leave/" + id_groupe+"/"+id_student);
       dispatch({
        type: LEAVE_GROUPE,
        payload: id_student
    });

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const acceptStudent = (id_groupe,id_student) => async dispatch => {
    try {
        await axios.post("/api/groupe/acceptStudent/" +id_groupe+"/"+id_student);
        console.log("OK");
       dispatch({
        type: ACCEPT_STUDENT_IN_GROUPE,
        payload: id_student
    });

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getGroupeStudent = (groupe , history) => async dispatch => {
    try {
        const res = await axios.get("/api/groupe/students/" +groupe.id);
        console.log(res);
       dispatch({
        type: GET_GROUPE_STUDENT_LIST,
        payload: {
            groupe : groupe,
            list : res.data
        }
       
    });
    history.push("groupes/students/");

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const changeGroupeState = (id, index ,state) => async dispatch => {
    try {
       const res = await axios.post("/api/groupe//update/"+id+"/"+state);
     
       dispatch({
        type: UPDATE_GROUPE_LIST,
        payload: {

            index : index,
            state:2,
            newState:state,
        }
    });

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const deleteGroupe = (id ) => async dispatch => {
    try {
        if (
            ! window.confirm(
              "Are you sure? This will delete this User."
            )
          ) 
          return;
        await axios.delete("/api/groupe/" + id);
        dispatch({
            type:   UPDATE_GROUPE_LIST,
            payload: {

                index : id,
                state:1
            }
        })


    } catch (err) {
       console.log(err);
    }
}
