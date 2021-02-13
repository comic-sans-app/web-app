import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCharacters } from "../../store/characters";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { AddImage } from "../Canvas/AddImage";

class Characters extends Component {
  componentDidMount() {
    this.props.fetchAllCharacterUrls();
  }

  render() {
    const charactersUrls = this.props.characters;
    const canvasInstance = this.props.canvasInstance;

    return (
      <DropdownButton
        title="Characters"
        className="dropdown-button add-to-canvas"
      >
        {charactersUrls.map((char, index) => {
          return (
            <Dropdown.Item
              key={index}
              onSelect={() => AddImage(canvasInstance, char)}
            >
              <img src={char} alt="comic-chars" width="100" height="100" />
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    );
  }
}

const mapState = (state) => ({
  characters: state.characters,
});

const mapDispatch = (dispatch) => ({
  fetchAllCharacterUrls: () => dispatch(fetchCharacters()),
});

export default connect(mapState, mapDispatch)(Characters);
