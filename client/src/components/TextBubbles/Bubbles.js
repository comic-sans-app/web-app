import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchBubbles} from '../../store/bubbles'


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

  render(){

      let bubblesUrls = this.props.bubbles;

        return (
            <div>
                <h1>{bubblesUrls.map(bubble => {
                    // return <Button key={bubble} className="btn btn-secondary" onClick={() => console.log(bubble)}>Add Bubble</Button>
                    return <img className="sidebar-imgs" src={bubble} alt="comic-bubble" width="120" height="120"/>
                })}</h1>
            </div>
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
