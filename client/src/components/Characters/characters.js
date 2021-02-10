import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchCharacters} from '../../store/characters'
import {Dropdown, DropdownButton} from 'react-bootstrap'

class Characters extends Component {

componentDidMount() {
    this.props.fetchAllCharacterUrls()
}

  render(){
      let charactersUrls = this.props.characters;
      console.log('charsUrls in component', charactersUrls)

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
