import React, { Component } from 'react'

export default class Tutorials extends Component {
    showTutorials() {
        const list = [1, 2, 3,4,5,6,7,8];
        let listItems = [];
        let index = 1;
        list.map(tutorial => {
            listItems.push(<div class="col">


                <div id="post-frame-small">
                    <h1 class="title" >
                        <a href="cours.jsp?id_cours=<%=cours[0]%>">
                            <span >Title</span>
                        </a>
                    </h1>
                    <div class="user-bar">
                        <div class="photo">
                            <a href="/people/seamusleahy"><img src="<%=user1.getPhoto() %>.png" /></a>
                        </div>
                        <div class="meat">
                            <h2>
                                <a href="profile.jsp?id_user=<%=user1.getId_user() %>"> by user name</a>
                            </h2>
                            at 12/12/2018. 12 views . 100 comments
                                <div class="right">
                                <a href="cours.jsp?id_cours=<%=cours[0]%>" >View</a>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>


            </div>)
            if(index == 2){
                listItems.push(<div class="w-100"></div>)
                index = 1;
            }else{
                index ++;
            }

        })
        return listItems;
    }
    render() {
        return (
            <div >


                <div class="container wrapper">
                <h3 className="bold font22" style={{color:"black"}}>Tutorials</h3>
                    <div class="row">
                    
                        {this.showTutorials()}
                    </div>
                </div>
            </div>
        )
    }
}
