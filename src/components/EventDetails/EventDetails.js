import React, { Component } from 'react'
import AvailableSlots from '../AvailableSlots/AvailableSlots';
import SubscribeButton from "../SubscribeButton/SubscribeButton";
import AddToFavorites from "../AddToFavorites/AddToFavorites"
import { toast } from 'react-toastify'
import { database } from "../FirebaseConfig/FirebaseConfig";

class EventDetails extends Component {

  state = {
    user: this.props.user,
    event: this.props.singleEvent,
    active: false,
    userSubscribed: '',
  };

  componentDidUpdate(nextProps) {
    if (nextProps.clicked !== this.props.clicked || nextProps.user !== this.props.user
      || nextProps.singleEvent.freeSlots !== this.props.singleEvent.freeSlots) {
      this.setState({
        active: this.props.clicked,
        user: this.props.user,
        event: this.props.singleEvent
      });
    }
  }

  componentDidMount() {
    if (this.state.user) {
      this.handleIfSubscribed()
    }
  }

  handleIfSubscribed = () => {
    database.ref(`/users/${this.state.user.uid}/subscribed/${this.state.event.id}`)
      .on('value', snapshot => !snapshot.val() ? false : this.setState({ userSubscribed: true }))
  };

  handleEventSlots = (id) => {
    console.log(this.state.event.freeSlots)
    if (!this.state.userSubscribed) {
      database.ref(`/events/${id}/freeSlots`)
        .set(this.state.event.freeSlots - 1);
      database.ref(`/users/${this.state.user.uid}/subscribed/${id}`)
        .set(id);
      this.setState({
        userSubscribed: true
      });
      toast.success("Subscribed!")
    } else {
        toast.warn('You\'re about to leave the event!');
        database.ref(`/events/${id}/freeSlots`)
          .set(this.state.event.freeSlots + 1);
        database.ref(`/users/${this.state.user.uid}/subscribed/${id}`)
          .remove();
        this.setState({
          userSubscribed: false
        });
        toast.info('Unsubsribed')
    }
    this.handleIfSubscribed()
  };

  render() {
    return (
      <div>
        {this.state.active &&
        <div>
          <p>{this.props.singleEvent.description}</p>
          <p>{this.props.singleEvent.date}</p>
          <p>{this.props.singleEvent.time}</p>
          <AvailableSlots event={this.props.singleEvent}
                          user={this.props.user}
          />
          <SubscribeButton userSubscribed={this.state.userSubscribed}
                           eventId={this.state.event.id}
                           user={this.state.user}
                           handleEventSlots={this.handleEventSlots}

          />
          {
            this.state.user &&
            <AddToFavorites eventId={this.state.event.id}
                            user={this.state.user}
            />
          }

        </div>
        }
      </div>
    )
  }
}

export default EventDetails