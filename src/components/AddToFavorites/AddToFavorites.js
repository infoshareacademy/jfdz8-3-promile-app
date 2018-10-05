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

    componentWillUnmount() {
      this.setState({
        userFavoriteEvent: false
      })
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
                toast.info("Dodano do obserwowanych")
        } else {
            database.ref(`/users/${this.props.user.uid}/favorite/${this.props.event.id}`)
                .remove()
                toast.info("Usunięto z obserwowanych")
        }
    }

    render() {
        return(
            <div className="event_to_watch_button-container">
                <button className="event_to_watch_button"
                    onClick={() => this.toggleFavorite()}
                >
                    {this.state.userFavoriteEvent ? "Nie obserwuj" : "Obserwuj"}
                </button>
            </div>
        )
    }
}

export default AddToFavorites