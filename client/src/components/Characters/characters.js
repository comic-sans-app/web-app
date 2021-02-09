import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchCharacters} from '../../store/characters'
import {Dropdown, DropdownButton} from 'react-bootstrap'
import { fabric } from 'fabric'

class Characters extends Component {

    constructor(props){
        super(props)
        this.handleCharacterSelect = this.handleCharacterSelect.bind(this)
    }

    componentDidMount() {
        try {
            this.props.fetchAllCharacterUrls()
        } catch (err) {
            console.log(err, 'error in Character Component.')
        }
    }

    handleCharacterSelect(canvasInstance, characterImg){

        new fabric.Image.fromURL(characterImg, function(img){
            img.scale(0.1)
            canvasInstance.add(img)
        })

    }


  render(){

      const charactersUrls = this.props.characters;
      const canvasInstance = this.props.canvasInstance;


        return (
            <DropdownButton title ="Comic Characters" variant="secondary" className="dropdown-button">
            {charactersUrls.map((char, index) => {
                return <Dropdown.Item key={index} onSelect={() => this.handleCharacterSelect(canvasInstance, char)}>
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
