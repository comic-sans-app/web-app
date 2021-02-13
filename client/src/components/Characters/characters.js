import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { AddImage } from "../Canvas/AddImage";
import { fetchCanvasElements } from "../../store/elements";

class Characters extends Component {
  componentDidMount() {
    this.props.fetchCanvasElements();
  }

  render() {
    const canvasInstance = this.props.canvasInstance;
    const elements = this.props.elements;

    return (
      <DropdownButton
        title="Characters"
        className="dropdown-button add-to-canvas"
      >
        {elements
          .filter((element) => element.type === "character")
          .map((character, index) => {
            return (
              <Dropdown.Item
                key={index}
                onSelect={() => AddImage(canvasInstance, character.imageUrl)}
              >
                <img
                  src={character.imageUrl}
                  alt="comic-chars"
                  width="100"
                  height="100"
                />
              </Dropdown.Item>
            );
          })}
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

export default connect(mapState, mapDispatch)(Characters);
