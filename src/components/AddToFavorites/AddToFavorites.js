import React, {Component} from 'react'

class AddToFavorites extends Component {

    state = {
        userFavoriteEvent: false
    }

    toggleFavorite = () => {
        this.setState({
            userFavoriteEvent: !this.state.userFavoriteEvent
        })
        console.log(this.state.userFavoriteEvent)
    }


    render() {
        return(
            <div>
                <button
                    onClick={() => this.toggleFavorite(this.props.eventId)}
                >
                    {this.state.userFavoriteEvent ? "Remove from favorites" : "Add to favorites"}
                </button>
            </div>
        )
    }
}

export default AddToFavorites