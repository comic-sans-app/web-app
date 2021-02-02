import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchBubbles} from '../../store/bubbles'


export class Bubbles extends Component {
//   constructor(props){
//     super(props);
//   }

componentDidMount() {
    try {
        console.log('what is this.props', this.props)
        this.props.fetchAllBubbleUrls()
    } catch (err) {
        console.log(err, 'error in Bubbles Component.')
    }
}

  render(){

    return (
        <div>
            <h1>Bubbles...</h1>
            <h2>{this.props.bubbles}</h2>
            {/* <img
              src={this.props.imageUrl}
              style={{width: '25%', margin: '20px 0'}}
            /> */}
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


//connect with reducer
//mapstate
//mapdispatch


//my goal:
//get the image Url to actually show the image on the front end (render image)
//bubble1, bubble2, bubble3