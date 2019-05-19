import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { connect } from 'react-redux';
import { uploadPicture } from '../../actions/profileActions';
import ReactFileReader from 'react-file-reader';
import { Link } from 'react-router-dom';
class CropPhoto extends Component {
    constructor() {
        super();
        this.state = {
            crop: {
                x: 130,
                y: 50,
                width: 50,
                height: 50
            },
            data: {},
            file: "",
            display_width: 0,
            display_height: 0


        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        const { crop } = this.state;
        const cropString = crop.x + ":" + crop.y + ":" + crop.width + ":" + crop.height + ":" + this.state.display_width + ":" + this.state.display_height;
       
        this.props.uploadPicture(this.props.user.userInfo.id_Info, this.state.file, cropString)
    }
    onChange = (crop) => {
        this.setState({ crop });
    }
    getFiles(files) {
        this.setState({ data: files.base64, file: files.fileList[0] })


    }

    onImageLoaded(image) {
        this.state.display_width = image.width;
        this.state.display_height = image.height;
   
    }

    render() {
        return (
            <div>
                <div class="wrapper fadeInDown">

                    <form onSubmit={this.onSubmit} className="formContent align-center">
                        <h3 className="bold">Edit Your Profile Picture</h3>
                        <ReactCrop id ="crop-space"onImageLoaded={this.onImageLoaded.bind(this)} src={this.state.data} crop={this.state.crop} onChange={this.onChange} />



                        <ReactFileReader fileTypes={[".png", ".jpg"]} base64={true} multipleFiles={false} handleFiles={this.getFiles.bind(this)}>
                            <div className="input-groupe btn align-center">
                                <button type="button" className="btn bg-primary" >Choose</button>
                            </div>
                        </ReactFileReader>
                        <div className="input-groupe btn align-right">
                            <a to="/" className="btn bg-danger">Reset</a>
                            <button type="submit" className="btn btn-success" >Save </button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.security
})
export default connect(mapStateToProps, { uploadPicture })(CropPhoto);
