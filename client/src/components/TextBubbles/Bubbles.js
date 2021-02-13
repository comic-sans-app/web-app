import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { AddImage } from "../Canvas/AddImage";
import { fetchCanvasElements } from "../../store/elements";

class Bubbles extends Component {
  componentDidMount() {
    this.props.fetchCanvasElements();
  }

  render() {
    const canvasInstance = this.props.canvasInstance;
    const elements = this.props.elements;

    return (
      <DropdownButton
        title="Comic Bubbles"
        className="dropdown-button add-to-canvas"
      >
        {elements
          .filter((element) => element.type === "bubble")
          .map((bubble, index) => (
            <Dropdown.Item
              key={index}
              onSelect={() => AddImage(canvasInstance, bubble.imageUrl)}
            >
              <img
                src={bubble.imageUrl}
                alt="comic-chars"
                width="100"
                height="100"
              />
            </Dropdown.Item>
          ))}
      </DropdownButton>
    );
  }
}

const mapState = (state) => ({
  elements: state.elements,
});

const mapDispatch = (dispatch) => ({
  fetchCanvasElements: () => dispatch(fetchCanvasElements()),
});

export default connect(mapState, mapDispatch)(Bubbles);
