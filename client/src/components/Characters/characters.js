import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchCharacters} from '../../store/characters'
import {Dropdown, DropdownButton} from 'react-bootstrap'
import firebase from 'firebase'

class Characters extends Component {

componentDidMount() {
    try {
        this.props.fetchAllCharacterUrls()
    } catch (err) {
        console.log(err, 'error in Character Component.')
    }
}

  render(){
      console.log('what is thisss:', firebase.storage());

      let charactersUrls = this.props.characters;

        return (
            <DropdownButton title ="Comic Characters" variant="secondary" className="dropdown-button">
            {charactersUrls.map((char, index) => {
                return <Dropdown.Item key={index} onSelect={() => null}>
                    <img src={char} alt="comic-chars" width="120" height="120"/>
                </Dropdown.Item>
            })}</DropdownButton>
        )
  }
}

const mapState = state => ({
    characters: state.characters
    })

const mapDispatch = dispatch => ({
   fetchAllCharacterUrls: () => dispatch(fetchCharacters())
  })

export default connect(mapState, mapDispatch)(Characters)
