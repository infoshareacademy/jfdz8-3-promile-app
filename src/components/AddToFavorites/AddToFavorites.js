import React, {Component} from 'react'
import { database } from '../FirebaseConfig/FirebaseConfig'

class AddToFavorites extends Component {

    state = {
        userFavoriteEvent: true
    }

    toggleFavorite = () => {
        this.setState({
            userFavoriteEvent: !this.state.userFavoriteEvent
        })
    }

    toggleFavoriteInDatabase = () => {
        console.log("udalo sie pobrac" + this.props.eventId + "???" +  this.props.user.uid)
        if(this.state.userFavoriteEvent) {
            console.log("wszedlem do ifa" + this.props.eventId + "???" +  this.props.user.uid)
            database.ref(`/users/${this.props.user.uid}/favorite/${this.props.eventId}`)
                .set(this.props.eventId)
            console.log("udalo sie dodac" + this.props.eventId + "???" +  this.props.user.uid)
        } else {
            database.ref(`/users/${this.props.user.uid}/favorite/${this.props.eventId}`)
                .remove()
        }
    }

    componentDidMount() {
        this.toggleFavoriteInDatabase()
    }

    render() {
        return(
            <div>
                <button
                    onClick={() => this.toggleFavorite()}
                >
                    {this.state.userFavoriteEvent ? "Remove from favorites" : "Add to favorites"}
                </button>
            </div>
        )
    }
}

export default AddToFavorites