import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/userActions';

import { getProfile } from '../../actions/profileActions';
import { SERVER_URL } from '../../actions/types';

class Header extends Component {

    componentWillMount() {
        this.props.getProfile();

    }

    logout() {
        this.props.logout();
    }
    render() {
        const loggedIn = (localStorage.jwtToken ? true : false);
        const image = this.props.user.userInfo ? SERVER_URL+  this.props.user.userInfo.photo+".th.png" : "/images/no-avatar.th.png"
        return (
            <header  >
            <div className=" collapse" style={{background:"#155EB6"}} id="navbarHeader" >
              <div className="container" >
                <div className="row">
                  <div className="col-sm-8 col-md-7 py-4">
                    <h4 style={{color:"black"}}>About</h4>
                    <p className="" style={{color:"white"}}>Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.</p>
                  </div>
                 { !loggedIn && <div className="col-sm-1 offset-md-1 py-4 align-center" style={{padding :"0px" ,borderLeft:"1px solid black",borderRight:"1px solid black" , borderBottom:"6px solid black" , backgroundColor:"#181C22"}}>
                  <img className="rounded-circle" style={{marginBottom:"5px" , border:"solid 2px black"}} src={image} />
                  
                     <ul className="list-unstyled">
                     <li><Link to="/profile" className="btn  text-primary underlineHover" style={{marginBottom:"5px" ,width:"100%" , backgroundColor:"black"}}>Profile</Link></li>
                     <li><Link to="/profile" className="btn  text-primary underlineHover" style={{marginBottom:"5px" ,width:"100%" , backgroundColor:"black"}}>Mail</Link></li>
                     <li><Link className="btn  text-primary underlineHover" style={{width:"100%" , backgroundColor:"black"}} onClick = {this.logout.bind(this)}>Logout</Link></li>
                     
                    </ul>
                  </div>}
                </div>
              </div>
            </div>
            <div className="navbar   navbar-dark shadow-sm " style={{background:"#155EB6" , borderBottom:"solid 3px black"}}>

            
              <div className="container d-flex justify-content-between">
                <a href="#" className="navbar-brand d-flex align-items-center">
                <img src="/images/header-logo.png" />  
                </a>
             
                <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
            </div>
          </header>
        )
    }
}

const mapStateToProps = state => ({
    user: state.security
});

export default connect(mapStateToProps, { getProfile, logout })(Header);
