import React, {Component} from 'react'
import { database } from '../FirebaseConfig/FirebaseConfig'
import { toast } from 'react-toastify'

class AddToFavorites extends Component {

    state = {
        userFavoriteEvent: false
    }

    componentDidMount() {
        database.ref(`/users/${this.props.user.uid}/favorite/${this.props.event.id}`)
            .on('value', snapshot => !snapshot.val() ? false : this.setState({userFavoriteEvent: true}))
    }

    toggleFavorite = () => {
        this.setState({
            userFavoriteEvent: !this.state.userFavoriteEvent
        })
        this.toggleFavoriteInDatabase(!this.state.userFavoriteEvent)
    }

    toggleFavoriteInDatabase = (currentState) => {
        if(currentState) {
            database.ref(`/users/${this.props.user.uid}/favorite/${this.props.event.id}`)
                .set(this.props.event.id)
                toast.info("You are now watching this event")
        } else {
            database.ref(`/users/${this.props.user.uid}/favorite/${this.props.event.id}`)
                .remove()
                toast.info("You are no longer watching this event")
        }
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