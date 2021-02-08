import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchCharacters} from '../../store/characters'


class Characters extends Component {

componentDidMount() {
    try {
        this.props.fetchAllCharacterUrls()
    } catch (err) {
        console.log(err, 'error in Character Component.')
    }
}

  render(){

      let charactersUrls = this.props.characters;

        return (
            <div>
                <h1>{charactersUrls.map(char => {
                    return <img className="sidebar-imgs" src={char} alt="comic-char" width="120" height="120"/>
                })}</h1>
            </div>
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
