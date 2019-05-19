import React, { Component } from 'react'
import EditAccount from './EditAccount';
import PersonalDetails from './PersonalDetails';
import CropPhoto from "../utils/CropPhoto";
import { connect } from 'react-redux';
import { SERVER_URL } from '../../actions/types';
import { Link } from 'react-router-dom';
import { getProfile } from '../../actions/userActions'


class Profile extends Component {
    constructor() {
        super();
        this.state = {
            myProfile: false,
            selectedTab: 1,
            selectedSetting: 0,
            errors: {}
        }
    }
    setSelectedTab(tab) {
        this.setState({ selectedTab: tab })
    }
    setSelectedSetting(tab) {
        if (tab == this.state.selectedSetting)
            tab = 0;
        this.setState({ selectedSetting: tab })
    }
    componentWillMount() {

        if (this.props.match.params.id == this.props.user.user.id) {
            this.setState({ myProfile: true });
        }
        this.props.getProfile(this.props.match.params.id);

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const { errors } = this.state;
        if (!this.props.user.profile)
            return <div>
                {errors.error && <div class="alert alert-danger">
                    {errors.error}
                </div>}
            </div>
        const info = this.props.user.profile;
  

        return (

            <div style={{ marginBottom: "50px" }}>

                <h2>PROFILE</h2>

                <div id="page-tabs">
                    <ul>
                        <li className={this.state.selectedTab == 1 ? "selected" : ""} >
                            <div></div>
                            <a id="Profile" onClick={this.setSelectedTab.bind(this, 1)}>Profile</a>
                        </li>
                        {this.state.myProfile && <div>
                            <li className={this.state.selectedTab == 2 ? "selected" : ""}  >
                                <div></div>
                                <a href="#" id="settings" onClick={this.setSelectedTab.bind(this, 2)}>My settings</a>
                                <div class="last"></div>
                            </li>
                            <li className={this.state.selectedTab == 3 ? "selected" : ""}   >
                                <div></div>
                                <a href="#" id="contact" onClick={this.setSelectedTab.bind(this, 3)}>Contact</a>
                            </li>
                            <li className={this.state.selectedTab == 4 ? "selected" : ""}  >
                                <div></div>
                                <a href="#" id="posts" onClick={this.setSelectedTab.bind(this, 4)}>Posts</a>
                                <div class="last"></div>
                            </li>

                            <li className={this.state.selectedTab == 5 ? "selected" : ""}  >
                                <div></div>
                                <a href="#" id="groupes" onClick={this.setSelectedTab.bind(this, 5)}>Groupes</a>
                                <div class="last"></div>
                            </li>
                        </div>}
                    </ul>
                </div>

                <div id="content-page">
                    <div id="profile" className={this.state.selectedTab == 1 ? "selected" : ""} >
                        <div class="profile-cell">
                            <div class="profile-avatar">
                                <img src={SERVER_URL + info.userInfo.photo + ".png"} />
                                <div class="rightSide">
                                    <a href="#" class="font18 undecorated">{info.username}</a><br />
                                    <span class="font12">{info.type == 1 ? "Admin" : info.type == 2 ? "Student" : "Teacher"}</span>
                                </div>
                            </div>
                            <div class="profile-cv">
                                <small>curriculum vitae</small>
                                <a href="">Download</a>
                            </div>
                        </div>
                        <div class="block profile">
                            <div class="info">
                                <fieldset>
                                    <img src="/images/profile-icons/firstname.png" />
                                    <label>First Name</label>
                                    <em>{info.userInfo.firstName ? info.userInfo.firstName : "Not set Yet"}</em>
                                </fieldset>
                                <fieldset>
                                    <img src="/images/profile-icons/lastname.png" />
                                    <label>Last Name</label>
                                    <em>{info.userInfo.lastName ? info.userInfo.lastName : "Not set Yet"}</em>
                                </fieldset>
                                <fieldset>
                                    <img src="/images/profile-icons/birthday.png" />
                                    <label>Birth day</label>
                                    <em>birth</em>
                                </fieldset>
                                <fieldset>
                                    <img src="/images/profile-icons/sex.png" />
                                    <label>Gender</label>
                                    <em>{info.userInfo.sex}</em>
                                </fieldset>
                                <fieldset>
                                    <img src="/images/profile-icons/address.png" />
                                    <label>Address</label>
                                    <em>{info.userInfo.address ? info.userInfo.address : "Not set Yet"}</em>
                                </fieldset>
                                <fieldset>
                                    <img src="/images/profile-icons/email.png" />
                                    <label>Email</label>
                                    <em>{info.email}</em>
                                </fieldset>


                            </div>

                        </div>
                    </div>

                 {this.state.myProfile && 
                    <div id="settings" className={this.state.selectedTab == 2 ? "selected" : ""} >

                        <div id="accordion">
                            <Link onClick={this.setSelectedSetting.bind(this, 1)} id="accordion-username" className={this.state.selectedSetting == 1 ? "selected" : ""}>Account</Link>
                            <div id="accordion-username" className={this.state.selectedSetting == 1 ? "selected" : ""}>
                            <EditAccount/>
                            </div>
                            <Link onClick={this.setSelectedSetting.bind(this, 2)} id="accordion-avatar" className={this.state.selectedSetting == 2 ? "selected" : ""}> Profile picture</Link>
                            <div id="accordion-avatar" className={this.state.selectedSetting == 2 ? "selected" : ""}>
                            <CropPhoto />
                         </div>


                            <Link onClick={this.setSelectedSetting.bind(this, 3)} id="accordion-personal" className={this.state.selectedSetting == 3 ? "selected" : ""}>Personal Information</Link>
                            <div id="accordion-personal" className={this.state.selectedSetting == 3 ? "selected" : ""}>
                            <PersonalDetails/>
                               
                            </div>
                        </div>



                    </div>
                }
                </div>
            

            </div>


        )
    }
}

const mapStateToProps = state => ({
    user: state.security,
    errors: state.errors
});

export default connect(mapStateToProps, { getProfile })(Profile);
