import React, { Component } from 'react'

export default class PR extends Component {
    render() {
        return (
            <div>
                <h2>PROFILE</h2>

                <div id="page-tabs">
                    <ul>
                        <li class="selected" >
                            <div></div>
                            <a href="#" id="Profile">Profile</a>
                        </li>



                        <li class="" >
                            <div></div>
                            <a href="#" id="settings">My settings</a>
                            <div class="last"></div>
                        </li>


                        <li class=""  >
                            <div></div>
                            <a href="#" id="contact">Contact</a>
                        </li>

                        <li class="" >
                            <div></div>
                            <a href="#" id="posts">Posts</a>
                            <div class="last"></div>
                        </li>

                        <li class=""  >
                            <div></div>
                            <a href="#" id="groupes">Groupes</a>
                            <div class="last"></div>
                        </li>

                    </ul>
                </div>

                <div id="content-page">
                    <div id="profile" class="selected">
                        <div class="profile-cell">
                            <div class="profile-avatar">
                                <img src="" />
                                <div class="rightSide">
                                    <a href="#" class="font18 undecorated">Username </a><br />
                                    <span class="font12">Teacher</span>
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
                                    <img src="images/profile-icons/firstname.png" />
                                    <label>First Name</label>
                                    <em>salim</em>
                                </fieldset>
                                <fieldset>
                                    <img src="images/profile-icons/lastname.png" />
                                    <label>Last Name</label>
                                    <em>khamadj</em>
                                </fieldset>
                                <fieldset>
                                    <img src="images/profile-icons/birthday.png" />
                                    <label>Birth day</label>
                                    <em>birth</em>
                                </fieldset>
                                <fieldset>
                                    <img src="images/profile-icons/sex.png" />
                                    <label>Gender</label>
                                    <em>Male</em>
                                </fieldset>
                                <fieldset>
                                    <img src="images/profile-icons/address.png" />
                                    <label>Address</label>
                                    <em>adress</em>
                                </fieldset>
                                <fieldset>
                                    <img src="images/profile-icons/email.png" />
                                    <label>Email</label>
                                    <em>email@gmail.com</em>
                                </fieldset>
                                <fieldset>
                                    <img src="images/profile-icons/group.png" />
                                    <label>Groupe</label>
                                    <em>
                                        groupe name
                        <small>state </small>
                                    </em>
                                </fieldset>
                                <fieldset>
                                    <img src="images/profile-icons/module.png" />
                                    <label>Modules</label>
                                    <em>
                                        module Name<br />
                                    </em>
                                </fieldset>

                            </div>

                        </div>
                    </div>


                    <div id="settings" >

                        <div id="accordion">
                            <a href="#" id="accordion-username" className="">Account</a>
                            <div id="accordion-username" className="">
                                <form class="profile-form" method="post">
                                    <div class="input-groupe">
                                        <label>Username</label>
                                        <div class="inputs">
                                            <label>userName</label>
                                        </div>
                                    </div>
                                    <div class="input-groupe">
                                        <label>Password</label>
                                        <div class="inputs">
                                            <input type="password" name="password" />
                                        </div>
                                    </div>
                                    <div class="input-groupe">
                                        <label>Confirm Password</label>
                                        <div class="inputs">
                                            <input type="password" name="confirm_password" />
                                        </div>
                                    </div>
                                    <div class="input-groupe">
                                        <label>New Password</label>
                                        <div class="inputs">
                                            <input type="password" name="new_password" />
                                        </div>
                                    </div>
                                    <div class="input-groupe btn">
                                        <input type="reset" value="reset" />
                                        <input type="submit" value="save" name="editUserAccount" />
                                    </div>
                                </form>
                            </div>
                            <a href="#" id="accordion-avatar"> >Profile picture</a>
                            <div id="accordion-avatar">
                                image
        </div>


                            <a href="#" id="accordion-personal" className="">Personal Information</a>
                            <div id="accordion-personal" className="">

                                <form class="profile-form" method="POST">
                                    <div class="input-groupe">
                                        <label>First Name</label>
                                        <div class="inputs">
                                            <input type="text" name="firstName" placeholder="type first Name" value="salim"
                                                min-length="3" notnull />
                                            <small>e.g : Bessem</small>
                                        </div>
                                    </div>
                                    <div class="input-groupe">
                                        <label>Last Name</label>
                                        <div class="inputs">
                                            <input type="text" name="lastName" placeholder="type last Name" value="khamadj"
                                                min-length="3" notnull />
                                            <small>write your last name here </small>
                                        </div>
                                    </div>
                                    <div class="input-groupe">
                                        <label>Sex</label>
                                        <div class="inputs">

                                            <select name="sex" notnull>
                                                <option value="M">Male</option>
                                                <option value="F">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="input-groupe">
                                        <label>Birthday</label>
                                        <div class="inputs">
                                            <input type="text" name="birthday" placeholder="type your Birthday" value="12.13.1990"
                                                isdate length="10" notnull />
                                            <small>e.g : 05/06/1986 </small>
                                            <br /><br />
                                            <label>Privacy</label>
                                            <select name="birthday_type">
                                                <option value="1">Hide Age and Date of Birth</option>
                                                <option value="2">Display Only Age</option>
                                                <option value="3">Showing only the day and month of Birth</option>
                                                <option value="4">Age and date of birth</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="input-groupe">
                                        <label>Address</label>
                                        <div class="inputs">
                                            <textarea name="address" placeholder="your address ..." min-length="5"
                                                notnull>medjannag</textarea>
                                            <small>ex : bba penza 440018 </small>
                                        </div>
                                    </div>

                                    <div class="input-groupe btn">
                                        <input type="reset" value="reset" />
                                        <input type="submit" value="save" name="editUserPersonal" />
                                    </div>
                                </form>
                            </div>
                        </div>



                    </div>

                </div>

            </div>

        )
    }
}
