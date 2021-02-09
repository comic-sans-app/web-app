import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchBubbles} from '../../store/bubbles'
import {Dropdown, DropdownButton} from 'react-bootstrap'
// import { fabric } from 'fabric';


class Bubbles extends Component {

componentDidMount() {
    try {
        this.props.fetchAllBubbleUrls()
    } catch (err) {
        console.log(err, 'error in Bubbles Component.')
    }
}

// export const ComicBubbles = new fabric.Image.fromURL(image, function (img) {
//     img.scale(0.1).set('flipX', true);
//   });

//   handleAddBubbles(){

//   }

  render(){

      let bubblesUrls = this.props.bubbles;

        return (
            <DropdownButton title ="Comic Bubbles" variant="secondary" className="dropdown-button">
            {bubblesUrls.map(bubble => {
                return <Dropdown.Item onSelect={() => console.log('clicked bubble', bubble)}>
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
