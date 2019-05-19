import React, { Component } from 'react';
import { connect } from 'react-redux';

import { archiveField, addSubject, deleteSubject, getFieldList, getSubjectList } from '../../actions/AdminAction';



class SubjectList extends Component {

    constructor() {
        super();
        this.state = {
            field: "",
            name: "",
            description: "",
            showForm: false,
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }



    componentWillMount() {
        this.props.getFieldList();
        this.props.getSubjectList();

    }



    deleteSubject(id) {
        this.props.deleteSubject(id);

    }
    archiveToggle(id, index) {
        this.props.archiveField(id, index);
    }

    createSubjectList() {
        let listItems = [];
        const list = this.props.user.subjectList;
        if (list.length > 0) {
            let index = 0;
            list.map(subject => {
                listItems.push(
                    <tr class="table-warning" >
                        <th scope="row">{index}</th>
                        <td className="text-center">{subject.field.name}</td>
                        <td className="text-center">{subject.id}</td>
                        <td className="text-center">{subject.name}</td>
                        <td className="text-center">{subject.description}</td>
                        <td className="text-center"> <button className="genric-btn danger small" onClick={this.deleteSubject.bind(this, subject.id)}>delete</button>
                        </td>
                    </tr>
                )
                index++;
            })
        }
        return listItems;

    }
    createSelectField() {
        const list = this.props.user.fieldList;
        let listItems = [];
        if (list.length > 0) {
            list.map(field => {
                listItems.push(
                    <option value={field.id}>{field.name}</option>
                )
            })
        }
        return listItems;


    }
    createField() {
        const { errors } = this.state;
        return (
            <div class="row" style={{ marginTop: "250px" }} >
                <div class="col-lg-6" style={{ border: "solid 1px #51D5E5" }} >
                    <h3 className="text-center"> New Field</h3>
                    <div className="mt-10">
                        <form onSubmit={this.onSubmit}>
                            {errors.error ? <div className="alert alert-danger" role="alert"> {errors.error} </div> : ""}
                            {errors.result ? <div className="alert alert-success" role="alert"> {errors.result} </div> : ""}

                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Field</label>
                                <select class="form-control" id="exampleFormControlSelect1"
                                    name="field"
                                    value={this.state.field}
                                    onChange={this.onChange}
                                >
                                    {this.createSelectField()}
                                </select>

                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="text" className="form-control" name="name" placeholder="Name" required="required"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>

                            <div className="mt-10">
                                <textarea className="single-textarea" name="description" placeholder="Description" required="required"
                                    value={this.state.descr}
                                    onChange={this.onChange}
                                ></textarea>
                            </div>

                            <div className="col-md-12  text-right ">
                                <button className="genric-btn warning medium" style={{ marginRight: "5px" }} onClick={this.showForm.bind(this, false)}>
                                    Cancel</button>
                                <button className="genric-btn success medium" onClick={this.onSubmit}> Save </button>
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

    showForm(bool) {
        this.setState({ showForm: bool });
    }
    onSubmit(e) {
        e.preventDefault();
        const newSubject = {
            "name": this.state.name,
            "descr": this.state.descr
        }
        console.log(newSubject + " field id " + this.state.field);
        this.props.addSubject(this.state.field, newSubject);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {


        return (
            <section class="home_banner_area">

                <div class="banner_inner">


                    <div class="container" >
                        {this.state.showForm && this.createField()}

                        <div class="row" >
                            <div class="col-lg-12">

                                <h3 className="text-center"> List of Subjects</h3>


                                <div><button class="genric-btn success large" onClick={this.showForm.bind(this, true)}>add New </button></div>
                                <div class="table-wrapper-scroll-y my-custom-scrollbar">
                                    <table class="table table-striped w-table-fixed">

                                        <thead>
                                            <tr>
                                                <th className="text-center">#</th>
                                                <th className="text-center">Field</th>
                                                <th className="text-center">Subject ID</th>
                                                <th className="text-center">name</th>
                                                <th className="text-center">Description</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.createSubjectList()}




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
    user: state.admin
});

export default connect(mapStateToProps, { addSubject, deleteSubject, archiveField, getSubjectList, getFieldList })(SubjectList);
