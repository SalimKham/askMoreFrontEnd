import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../actions/userActions';

import {deleteUser , blockUnBlockUser ,activateUser } from '../../actions/AdminAction';
import {lastVisitInMinutes}  from '../../components/utils/Time'


class UserList extends Component {

    constructor(){
        super();
        this.state = {
            changed:false
        }
    }
    
    componentWillMount() {
        this.props.getUserList();
    
    }
    getUserState(state){

        switch (state) {
            case 1:
            return (<td className="text-success" >OK</td>)
            
            case 5:
            return(<td className="text-default">Waiting for Confirmation...</td>)
            
            case 4:
            return(<td className="text-warning">Waiting for Activation...</td>)
            
            case 3:
            return(<td className="text-danger">Blocked!!!</td>)
            case 2:
            return(<td className="text-success">Online</td>)
            

        }

    }
    
   

    deleteUser(id){
        this.props.deleteUser(id);
        
      }
    blockUnblock(id , index ){
      this.props.blockUnBlockUser(id , index);
      this.forceUpdate();
    }

    activateUser(id , index){
            this.props.activateUser(id,index);
    }
    createUserList(){
        let listItems = [];
        const list = this.props.user.userList;
        if(list.length > 0){
            let index = 0;
            list.map(user => {
                listItems.push(
                    <tr class={user.type == 2 ?"table-info":(user.type == 3 ? "table-warning":"")}>
                    <th scope="row">{index}</th>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{lastVisitInMinutes(user.last_Visit_date) + " min ago"}</td>
                    {
                        this.getUserState(user.user_state)
                    }
                    <td id={"user_id_"+user.id} className="text-center"> <button type="submit" className="genric-btn danger small"  onClick= {this.deleteUser.bind(this , user.id )}>delete</button>
                    {user.user_state !== 5 && user.user_state !== 4 &&<button type="submit" onClick= {this.blockUnblock.bind(this , user.id , index)} id= {user.user_state == 3?"unblock":"block"} className="genric-btn warning small">{user.user_state == 3?"Unblock":"Block"}</button>}
                    {user.user_state == 4 && <button type="submit" id = {user.id} onClick = {this.activateUser.bind(this , user.id ,index)} className="genric-btn success small">Activate</button>}
                   
                    </td>
                    </tr>
                )
            index ++;
            })
        }

        return listItems;

    }
    render() {
      
   
        return (
            <section class="home_banner_area">

                <div class="banner_inner">

                    <div class="container">
                        <div class="row" >
                            <div class="col-lg-12">
                            <h3 className="text-center"> List of users</h3>
                                <table class="table table-striped w-table-fixed">
                                    <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th className="text-center">user ID</th>
                                            <th className="text-center">Username</th>
                                            <th className="text-center">last visit</th>
                                            <th className="text-center">State</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                  {this.createUserList()}
                                    
                                     
                                    
                                   
                                    </tbody>


                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    user: state.admin
});

export default connect(mapStateToProps, {deleteUser,blockUnBlockUser,activateUser,getUserList })(UserList);
