import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchBubbles} from '../../store/bubbles'
import {Dropdown, DropdownButton} from 'react-bootstrap'
import { AddImage } from '../Canvas/AddImage'

class Bubbles extends Component {

componentDidMount() {
    try {
        this.props.fetchAllBubbleUrls()
    } catch (err) {
        console.log(err, 'error in Bubbles Component.')
    }
}

  render(){

      const bubblesUrls = this.props.bubbles;
      const canvasInstance = this.props.canvasInstance;

        return (
            <DropdownButton title ="Comic Bubbles" variant="secondary" className="dropdown-button">
            {bubblesUrls.map((bubble, index) => {
                return <Dropdown.Item key={index} onSelect={() => AddImage(canvasInstance, bubble)}>
                    <img src={bubble} alt="comic-bubble" width="120" height="120"/>
                </Dropdown.Item>
            })}</DropdownButton>
        )
  }
}

const mapState = state => ({
    bubbles: state.bubbles
    })

const mapDispatch = dispatch => ({
   fetchAllBubbleUrls: () => dispatch(fetchBubbles())
  })

export default connect(mapState, mapDispatch)(Bubbles)
