import React, {Component} from 'react'

class AddToFavorites extends Component {

    state = {
        userFavoriteEvent: false
    }

    addNewFavorite = (eventId) => {
        console.log(this.props.eventId)
        this.setState({
            userFavoriteEvent: !this.state.userFavoriteEvent
        })
        console.log(this.state.userFavoriteEvent)
    }


    render() {
        return(
            <div>
                <button onClick={() => this.addNewFavorite(this.props.eventId)}>Add to favorites</button>
            </div>
        )
    }
}

export default AddToFavorites