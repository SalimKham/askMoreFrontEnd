import React, { Component } from 'react';
import { connect } from 'react-redux';

import { archiveField,addField,deleteField,getFieldList } from '../../actions/AdminAction';



class FieldList extends Component {

    constructor() {
        super();
        this.state = {
            name:"",
            descr:"",
            showForm : false,
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }



    componentWillMount() {
        this.props.getFieldList();

    }
 


    deleteField(id) {
        this.props.deleteField(id);

    }
    archiveToggle(id, index) {
        this.props.archiveField(id, index);
    }


    createFieldList() {
        let listItems = [];
        const list = this.props.user.fieldList;
        if (list.length > 0) {
            let index = 0;
            list.map(field => {
                listItems.push(
                    <tr class={field.is_arrchived == 2 ? "table-info" : "table-warning" }>
                        <th scope="row">{index}</th>
                        <td>{field.id}</td>
                        <td>{field.name}</td>
                        <td>{field.descr}</td>
                        <td  className="text-center"> <button  className="genric-btn danger small" onClick={this.deleteField.bind(this, field.id)}>delete</button>
                            <button  onClick={this.archiveToggle.bind(this, field.id, index)}  className="genric-btn warning small">{!field.is_arrchived  ? "Archive" : "Recover"}</button>
                        </td>
                    </tr>
                )
                index++;
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
                            {errors.result? <div className ="alert alert-success" role="alert"> {errors.result} </div> : ""}  
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="text" className="form-control" name="name" placeholder="Name" required="required"
                                    value={this.state.name}
                                    onChange = {this.onChange}
                                    />
                                </div>
                            </div>

                            <div className="mt-10">
                                <textarea className="single-textarea" name="descr" placeholder="Description" required="required"
                                value={this.state.descr}
                                    onChange = {this.onChange}
                                ></textarea>
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
        const newField = {
            "name":this.state.name,
            "descr":this.state.descr
        }
        this.props.addField(newField);
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    render() {
       

        return (
            <section class="home_banner_area">

                <div class="banner_inner">


                    <div class="container" >
                       {this.state.showForm&&this.createField()}

                        <div class="row" >
                            <div class="col-lg-12">

                                <h3 className="text-center"> List of Study Fields</h3>


                                <div><button class="genric-btn success large" onClick={this.showForm.bind(this , true)}>add New </button></div>
                                <div class="table-wrapper-scroll-y my-custom-scrollbar">
                                <table class="table table-striped w-table-fixed">

                                    <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th className="text-center">Field ID</th>
                                            <th className="text-center">name</th>
                                            <th className="text-center">Description</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.createFieldList()}




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

export default connect(mapStateToProps, {addField,  deleteField ,archiveField , getFieldList })(FieldList);
