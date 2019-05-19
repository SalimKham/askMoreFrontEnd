import React, { Component } from 'react';
import { connect } from 'react-redux';

import {acceptStudent , LeaveGroupe , joindGroupe,changeGroupeState ,deleteGroupe , addGroupe,getGroupeList} from '../../actions/groupeActions'



class GroupeStudentList extends Component {

   isAccepted(id,groupe){
       if(groupe.acceptedStudents){
         if(groupe.acceptedStudents.indexOf(id)!==-1)
            return true;
       }
       return false;
   }

   leaveGroupe(id , id_student){
         this.props.LeaveGroupe(id , id_student);
   }
   acceptStudent(id_groupe , id_student ){
    this.props.acceptStudent( id_groupe ,  id_student);
   }

    createGroupeListForUsers() {
        let listItems = [];
        const list = this.props.groupe.students;
        const groupe = this.props.groupe.groupe;
        if (list.length > 0) {
            let index = 0;
            list.map(student => {
                listItems.push(
                    this.isAccepted(student.id , groupe) && 
                    <tr class="table-info">
                        <th scope="row">{index}</th>
                        <td>{student.id}</td>
                        <td>{student.username}</td>
                    </tr>
                )
                index++;
            })
        }
        return listItems;;

    }

    createGroupeListForTeacher() {
        let listItems = [];
        const list = this.props.groupe.students;
        const groupe = this.props.groupe.groupe;
        const id_user  = this.props.user.user.id;

        if (list.length > 0) {
            let index = 0;
            list.map(student => {
                listItems.push(
                    (groupe.owner.id == id_user)&&
                    <tr class="table-info">
                        <th scope="row">{index}</th>
                        <td>{student.id}</td>
                        <td>{student.username}</td>
                        {this.isAccepted(student.id , groupe) &&  <td className = "text-center text-success">  "Approuved"</td>}
                        {!this.isAccepted(student.id , groupe) &&  <td className = "text-center text-warning">  "Not Approuved.."</td>}
                        <td  className="text-center"> 
                        {!this.isAccepted(student.id , groupe) &&  <button  onClick = {this.acceptStudent.bind(this,groupe.id , student.id)} className="genric-btn smal success" > Accept</button>}
                        <button  onClick = {this.leaveGroupe.bind(this , groupe.id , student.id)} className="genric-btn smal danger" > Delete</button>  
                        </td>
                    </tr>
                )
                index++;
            })
        }
        return listItems;

    }


  
    render() {
      const {type}  = this.props.user.user;
        return (
            <section class="home_banner_area">

                <div class="banner_inner">


                    <div class="container" >
                        <div class="row" >
                            <div class="col-lg-12">

                                <h3 className="text-center"> List of Stduent </h3>


                                <div class="table-wrapper-scroll-y my-custom-scrollbar">
                                <table class="table table-striped w-table-fixed">

                                    <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th className="text-center">ID</th>
                                            <th className="text-center">name</th>
                                            <th className="text-center">State</th>
                                          {type == 3 &&  <th className="text-center">Action</th>}
                                        </tr>
                                    </thead>
                                    <tbody>

                                        { (type == 1 || type == 2)? this.createGroupeListForUsers(): this.createGroupeListForTeacher()}

                                    </tbody>


                                </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    groupe: state.groupe,
    user :state.security
});

export default connect(mapStateToProps, {acceptStudent , LeaveGroupe , joindGroupe , changeGroupeState , deleteGroupe , addGroupe,getGroupeList })(GroupeStudentList);
