import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

import {getGroupeStudent,LeaveGroupe , joindGroupe,changeGroupeState ,deleteGroupe , addGroupe,getGroupeList} from '../../actions/groupeActions'



class GroupeList extends Component {

    constructor() {
        super();
        this.state = {
            name:"",
            showForm : false,
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }



    componentWillMount() {
        this.props.getGroupeList();

    }

    deleteGroupe(id) {
        this.props.deleteGroupe(id);

    }
    changeGroupeState(id , index , newState){
        this.props.changeGroupeState(id,index,newState);
    }
 
    isAcceptedStudent(groupe){
        const id_user = this.props.user.user.id;
        if(groupe.acceptedStudents){
            if(groupe.acceptedStudents.indexOf(id_user) != -1)
                return true;
        }
        return false;
    }
   leaveGroupe(id , idStudent){
         this.props.LeaveGroupe(id , idStudent);
   }
   joinGroupe(id){
    this.props.joindGroupe(id);
   }

   showStudents(groupe){
    this.props.getGroupeStudent(groupe,this.props.history);
   }
     
   
    createGroupeListForStudent() {
        console.log(this.props.user.user);
        const {user} = this.props.user;
        let listItems = [];
        const list = this.props.groupe.list;
        if (list.length > 0) {
            let index = 0;
            list.map(groupe => {
                
                listItems.push(
                    <tr class="table-info">
                        <th scope="row">{index}</th>
                        <td>{groupe.id}</td>
                        <td>{groupe.name}</td>
                        <td>{groupe.nbr_users}</td>
                        <td className= {groupe.state == 3 ?  "text-warning" : (groupe.state == 1? "text-success":"text-danger")}> {groupe.state == 3 ?  "WaitingForActivation...." : (groupe.state == 1? "Active":"Blocked")}</td>
                        <td  className="text-center"> 
                           { (user.studentGroupes.indexOf(""+groupe.id) == -1) &&  <button  onClick = {this.joinGroupe.bind(this , groupe.id)}  className="genric-btn danger small">Join</button>}
                           {((user.studentGroupes.indexOf(""+groupe.id) != -1) && !this.isAcceptedStudent(groupe) ) && <span className ="text-success"> Not Yet Aprouved!..</span>}
                           {  (user.studentGroupes.indexOf(""+groupe.id) !== -1) &&  <button   onClick = {this.leaveGroupe.bind(this , groupe.id , -1)} className="genric-btn warning small">Leave</button>}
                        </td>
                    </tr>
                )
                index++;
            })
        }
        return listItems;

    }
    createGroupeListForAdmin() {
        let listItems = [];
        const list = this.props.groupe.list;
        if (list.length > 0) {
            let index = 0;
            list.map(groupe => {
                listItems.push(
                   
                    <tr class="table-info">
                        <th scope="row">{index}</th>
                        <td>{groupe.id}</td>
                        <td>{groupe.name}</td>
                        <td>{groupe.nbr_users}</td>
                        <td className= {groupe.state == 3 ?  "text-warning" : (groupe.state == 1? "text-success":"text-danger")}> {groupe.state == 3 ?  "WaitingForActivation...." : (groupe.state == 1? "Active":"Blocked")}</td>
                        <td  className="text-center"> 
                            <button  onClick = {this.deleteGroupe.bind(this , groupe.id)}  className="genric-btn danger small">Delete</button>
                          {(groupe.state==1 || groupe.state == 3) && <button  onClick = {this.changeGroupeState.bind(this,groupe.id , index , (groupe.state == 1 ? 3 : 1))}  className="genric-btn warning small">{groupe.state == 3 ? "Activate " : "Disactivate"}</button>}
                            <button   className="genric-btn success small">Users</button>
                        </td>
                    </tr>
                )
                index++;
            })
        }
        return listItems;

    }

    createGroupeListForTeacher() {
        let listItems = [];
        const list = this.props.groupe.list;
        const id_user  = this.props.user.user.id;
        if (list.length > 0) {
            let index = 0;
            list.map(groupe => {
                listItems.push(
                    (groupe.owner.id == id_user)&&
                    <tr class="table-info">
                        <th scope="row">{index}</th>
                        <td>{groupe.id}</td>
                        <td>{groupe.name}</td>
                        <td>{groupe.nbr_users}</td>
                        <td className= {groupe.state == 3 ?  "text-warning" : (groupe.state == 1? "text-success":"text-danger")}> {groupe.state == 3 ?  "WaitingForActivation...." : (groupe.state == 1? "Active":"Blocked")}</td>
                        <td  className="text-center"> 
                            <button  onClick = {this.deleteGroupe.bind(this , groupe.id)}  className="genric-btn danger small">Delete</button>
                            {(groupe.state==1 || groupe.state == 2) &&  <button   className="genric-btn warning small">{groupe.state == 2 ? "Activate " : "Disactivate"}</button>}
                            <Link   className="genric-btn success small" onClick ={this.showStudents.bind(this,groupe)}>Users</Link>
                        </td>
                    </tr>
                )
                index++;
            })
        }
        return listItems;

    }

    createGroupeForm() {
        const { errors } = this.state;
        return (
            <div class="row" style={{ marginTop: "250px" }} >
                <div class="col-lg-6" style={{ border: "solid 1px #51D5E5" }} >
                    <h3 className="text-center"> New Groupe</h3>
                    <div className="mt-10">
                        <form onSubmit={this.onSubmit}>
                            {errors.error ? <div className="alert alert-danger" role="alert"> {errors.error} </div> : ""}
                            {errors.result? <div className ="alert alert-success" role="alert"> {errors.result} </div> : ""}  
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="text" className="form-control" name="name" placeholder="Name" required="required"
                                    value={this.state.name}
                                    onChange = {this.onChange}
                                    />
                                </div>
                            </div>

                            <div className="col-md-12  text-right ">
                                <button  className="genric-btn warning medium" style={{ marginRight: "5px" }} onClick={this.showForm.bind(this , false)}>
                                    Cancel</button>
                                <button  className="genric-btn success medium" onClick = {this.onSubmit}> Save </button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    showForm(bool){
        this.setState({showForm:bool});
    }
    onSubmit(e){
        e.preventDefault();
        const newGroupe = {
            "name":this.state.name
        }
        this.props.addGroupe(newGroupe);
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    render() {
        const {type}  = this.props.user.user;

        return (
            <section class="home_banner_area">

                <div class="banner_inner">


                    <div class="container" >
                       {this.state.showForm&&this.createGroupeForm()}
                        <div class="row" >
                            <div class="col-lg-12">

                                <h3 className="text-center"> List of Groupes</h3>


                                <div><button class="genric-btn success large" onClick={this.showForm.bind(this , true)}>add New </button></div>
                                <div class="table-wrapper-scroll-y my-custom-scrollbar">
                                <table class="table table-striped w-table-fixed">

                                    <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th className="text-center">ID</th>
                                            <th className="text-center">name</th>
                                            <th className="text-center">users</th>
                                            <th className="text-center">State</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        { type == 1 ? this.createGroupeListForAdmin():(type==2 ? this.createGroupeListForStudent(): this.createGroupeListForTeacher())}




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

export default connect(mapStateToProps, {getGroupeStudent , LeaveGroupe , joindGroupe , changeGroupeState , deleteGroupe , addGroupe,getGroupeList })(GroupeList);
