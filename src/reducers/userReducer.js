import { SET_CURRENT_USER, UPDATE_USER_STATE, JOIN_GROUPE, LEAVE_GROUPE, GET_PROFILE, UPDATE_PROFILE_PICTURE } from '../actions/types';
import { GET_USER_INFO, GET_USERS_LIST } from '../actions/types';
const initialState = {
    user: {},
    userInfo: null,
    validToken: false,
    profile:null
};


export default function (state = initialState, action) {
    switch (action.type) {

        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: (action.payload ? true : false),
                user: action.payload
            }
        case GET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload
            }
            case JOIN_GROUPE:
            return {
                ...state,
                user: updateUserGroupe( state.user, action.payload)
            }
            case GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
            case UPDATE_PROFILE_PICTURE:
            return {
                ...state,
                userInfo: updateProfilePicture(state , action.payload),
                profile:state.profile
            }

            case LEAVE_GROUPE:
            return {
                ...state,
                user: LeaveGroupe( state.user, action.payload)
            }


       

        default:
            return state;
    }
}

export const updateUserGroupe = (user , id) =>{
     user.studentGroupes+=id
     return user;
}
export const updateProfilePicture = (state,payload) =>{
    state.userInfo.photo = payload;
    console.log(state.profile);
    console.log(state.userInfo);
if(state.userInfo.id_Info === state.profile.userInfo.id_Info){
    console.log("changinng");
    state.profile.userInfo.photo = payload
}
     
    return state.userInfo;
}

export const LeaveGroupe = (user , id) =>{
    user.studentGroupes = user.studentGroupes.replace(""+id,"");
    return user;
}
