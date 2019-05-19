import axios from 'axios';
import { GET_TUTORIAL, DELETE_QUESTIONNARY } from './types';
export const addTutorial = (id_subject , tutorial , file) => async dispatch => {
    try {
     
        let details = JSON.stringify(tutorial);
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('subject', id_subject);
        formData.append('tutorial', details);
       
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        await axios.post("/api/tutorial/add/", formData, config);
    } catch (err) {
      
    }
}

export const addQuestionnaryToTutorial = (id_subject , questions , responses) => async dispatch => {
    try {
       await axios.post("/api/tutorial/addQuestionnary/?tutorial="+id_subject+"&questions="+questions+"&answers="+responses);
    } catch (err) {
      
    }
}


export const deleteQuestionnary = (id ) => async dispatch => {
    try {
        if (
            ! window.confirm(
              "Are you sure? This will delete questionnary."
            )
          ) 
          return;
        await axios.delete("/api/tutorial/deleteQuestionnary/" + id);
        dispatch({
            type:   DELETE_QUESTIONNARY,
        })


    } catch (err) {
       console.log(err);
    }
}

export const getTutorial = (id) => async dispatch => {
    try {
        

       const res =  await axios.get("/api/tutorial/"+id);
       dispatch({
        type: GET_TUTORIAL,
        payload: res.data
    })
    } catch (err) {
      
    }
}

export const getContent = (file) => async dispatch => {
    try {
        
   
       const res =  await axios.get("/api/tutorial/pdfs/"+file);
      return res;
    } catch (err) {
      
    }
}