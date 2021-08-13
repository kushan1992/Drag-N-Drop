import React, { Component, Fragment } from "react";
import { Media } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImages: [],
      dragId: "",
    };
  }

  componentDidMount() {
    const { imagesPreviewUrls } = this.props;
    this.setState({
      previewImages: imagesPreviewUrls,
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.imagesPreviewUrls !== state.previewImages) {
      return {
        previewImages: props.imagesPreviewUrls,
      };
    }
    return null;
  }

  deleteImage = (id) => {
    const { deleteImage } = this.props;
    deleteImage(id);
  };

  handleOver = (ev) => {
    ev.preventDefault();
  };

  handleDrag = (ev) => {
    this.setState({
      dragId: ev.currentTarget.id,
    });
  };

  handleDrop = (ev) => {
    ev.preventDefault();
    const { previewImages } = this.state;
    const { dragId } = this.state;
    const dragImage = previewImages.find((image) => image.id == dragId);
    const dropImage = previewImages.find(
      (image) => image.id == ev.currentTarget.id
    );
    const arr = this.moveItem(dragImage.id - 1, dropImage.id - 1);

    this.setState({
      previewImages: arr,
    });
  };

  moveItem(from, to) {
    const { previewImages } = this.state;
    const f = previewImages.splice(from, 1)[0];
    previewImages.splice(to, 0, f);
    return previewImages;
  }

  renderPreview() {
    const { previewImages } = this.state;
    if (previewImages.length > 0) {
      previewImages.map((items, index) => {
        items.id = index + 1;
      });
    }
    return (
      <Fragment>
        {previewImages.length > 0 &&
          previewImages.map((element, index) => {
            return (
              <div
                className="gallery"
                key={index}
                id={element.id}
                draggable
                onDragOver={(e) => this.handleOver(e)}
                onDragStart={(e) => this.handleDrag(e)}
                onDrop={(e) => this.handleDrop(e)}
              >
                <img
                  src={element.file}
                  alt={element.name}
                  width="600"
                  height="400"
                />

                <div className="desc">
                  <div className="image-order">
                    <FontAwesomeIcon
                      className="delete-icon"
                      onClick={() => this.deleteImage(element.id)}
                      icon={faTrash}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </Fragment>
    );
  }

  render() {
    const { previewImages } = this.state;
    console.log("image order", previewImages);
    return <div className="wrapper">{this.renderPreview()}</div>;
  }
}

export default Preview;
