import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteQuestionnary,getTutorial, getContent } from '../../actions/TutorialAction';
import { SERVER_URL } from '../../actions/types';
import CommentList from '../Lists/CommentList';
import { Link } from 'react-router-dom'
import ShowQuestionnary from '../Questionnary/ShowQuestionnary';

class ViewTuturial extends Component {
    constructor(){
        super();
        this.state = {
            showQuestionnary : false,
        }
    }

    showQuestionnary(){
        this.setState({showQuestionnary : !this.state.showQuestionnary});
    }
    componentWillMount() {
        this.props.getTutorial(this.props.match.params.id);
    }

    getDetails() {
        const tutorial = this.props.tutorial.selected;
        
        let details = {
            id: tutorial ? tutorial.id : "",
            subjectName: tutorial ? tutorial.subject.name : "",
            allowedGroupes: tutorial ? tutorial.allowedGroupes : "",
            username: tutorial ? tutorial.teacher.username : "",
            title: tutorial ? tutorial.title : "",
            createAt: tutorial ? tutorial.createAt : "",
            nbrComment: tutorial ? tutorial.nbrComment : "",
            nbrVisitor: tutorial ? tutorial.nbrVisitor : "",
            photo: tutorial ? SERVER_URL + tutorial.teacher.userInfo.photo + ".min.png" : "",
            questionnary:tutorial.questionnary,
        }
        return details;
    }
    deleteQuestionnary(id){
        this.props.deleteQuestionnary(id);
    }

    render() {
     
        if (!this.props.tutorial.selected)
            return <div></div>;

            const TutorialInfo = this.getDetails();

        return (
            <div>
                <section className="section_gap" >
                    <div className="container" >
                        <div className="row" >
                            <div className="col-lg-12">
                                <div class="input-groupe btn-top align-right">
                                    <a href="List" class="arrowLeft left">Return to Tutorials list </a>
                                    <a href="" class="arrowRight">TD</a>
                                </div>
                                <div class="btn">
                                    <h4 class="margin font14">
                                        Subject : <b style={{ color: "#1F80BF" }}>{TutorialInfo.subjectName}</b>
                                    </h4>
                                </div>

                                <div class='Notifications Success right'><p class='align-left'><small>Cours privacy :<em>
                                    {
                                        TutorialInfo.allowedGroupes
                                    }

                                </em></small></p></div>

                                <div id="post-frame">
                                    <h1 class="title">
                                        <a>
                                            <span>{TutorialInfo.title}</span>
                                        </a>
                                    </h1>

                                    <div class="user-bar">
                                        <div class="photo">
                                            <a href="/people/seamusleahy"><img src={TutorialInfo.photo} /></a>
                                        </div>
                                        <div class="meat">
                                            <h2>
                                                <a href="">{TutorialInfo.username}</a>
                                            </h2>
                                            at {TutorialInfo.createAt}. {TutorialInfo.nbrVisitor} views
                                        <div class="right">
                                                <a href="#" class="control comments-icon">{TutorialInfo.nbrComment} comments</a>
                                            </div>
                                        </div>
                                        <div class="clear"></div>
                                    </div>
                                    <object data={SERVER_URL + "api/users/pdfs/a.pdf"} type="application/pdf" width="100%" height="800px">
                                        <p>Alternative text - include a link <a href="myfile.pdf">to the PDF!</a></p>
                                    </object>
                                    <br />
                                    <hr class="dotted" />
                                    <small class="icon-h3 attach">ATTACHED FILES : </small>

                                    <br />
                                    <hr class="dotted" />
                                    <small class="icon-h3 observation-icon">Observation : </small>

                                    <hr class="dotted" />
                                    {TutorialInfo.questionnary && <div class="Notifications information">
                                        <div class="margin">
                                            <a  class="button right" onClick = {this.showQuestionnary.bind(this)}>{this.state.showQuestionnary?"Hide":"Show"}</a>
                                            <p class="align-left">
                                                Questionnary of this Tutorial
                                            </p>
                                            {this.state.showQuestionnary && <ShowQuestionnary questions={TutorialInfo.questionnary.questions} />}
                                        </div>
                                    </div>}
                                </div>

                                <div class="input-groupe btn-top align-right">
                                    <a href="" id="add_observation_btn" class="button white add">Add Observation</a>
                                    {!TutorialInfo.questionnary&&<Link to={"/newQuestionnary/" + TutorialInfo.id} class="button white add">Add Questionary</Link>}
                                    {TutorialInfo.questionnary && <form method="POST" class="right">
                                        <input type="hidden" name="id_cours" value="" />
                                        <a  class="button white delete" onClick = {this.deleteQuestionnary.bind(this,TutorialInfo.questionnary.id)}>Remove Questionary</a>
                                        <input type="submit" style={{ display: "none" }} title="Delete" value="delete" name="delete_questinary" />
                                    </form>}
                                    <a href="" class="button white edit">edit</a>
                                    <form method="POST" class="right" action="">
                                        <input type="hidden" name="id_cours" value="" />
                                        <a href="#" class="button white delete" id="submit">delete</a>
                                        <input type="submit" style={{ display: "none" }} title="Delete" value="delete" name="delete_cours" />
                                    </form>
                                </div>

                                <br />
                                <br />
                                <CommentList parent={TutorialInfo.id} />
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}
const mapStateToProps = state => ({
    tutorial: state.tutorial
})
export default connect(mapStateToProps, { deleteQuestionnary,getContent, getTutorial })(ViewTuturial);