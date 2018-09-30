import React, { Component } from 'react'
import AvailableSlots from '../AvailableSlots/AvailableSlots';
import SubscribeButton from "../SubscribeButton/SubscribeButton";
import AddToFavorites from "../AddToFavorites/AddToFavorites"
import {database} from "../FirebaseConfig/FirebaseConfig";
import EventTags from "../EventTags/EventTags";
import { toast } from 'react-toastify';

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
    if (!this.state.userSubscribed) {
      database.ref(`/events/${id}/freeSlots`)
        .set(this.state.event.freeSlots - 1);
      database.ref(`/users/${this.state.user.uid}/subscribed/${id}`)
        .set(id);
      this.setState({
        userSubscribed: true
      });
      toast.success("Zapisałeś się na wydarzenie")
    } else {
        toast.warn('Za chwilę wypiszesz się z wydarzenia');
        database.ref(`/events/${id}/freeSlots`)
          .set(this.state.event.freeSlots + 1);
        database.ref(`/users/${this.state.user.uid}/subscribed/${id}`)
          .remove();
        this.setState({
          userSubscribed: false
        });
        toast.info('Nie uczestniczysz już w wydarzeniu...')
    }
    this.handleIfSubscribed()
  };

  render() {
    return (
      <div className="event_details-container">
        {this.state.active &&
        <div className="event_details">
          <div className="event_date_time-container">
              <p>{this.props.singleEvent.date}</p>
              <p>{this.props.singleEvent.time}</p>
              <p>{this.props.singleEvent.address}</p>
          </div>
          <EventTags tags={this.state.event.tags}/>
          <div className="event_description_container">
              <p className="event_description">{this.props.singleEvent.description}</p>
            </div>
            <div className="event_slots-container">
              <p>Wolnych miejsc: </p>
              <AvailableSlots event={this.props.singleEvent}
                                user={this.props.user}
              />
              <p>Maksymalna liczba uczestników {this.props.singleEvent.slots}</p>

            </div>
          <SubscribeButton userSubscribed={this.state.userSubscribed}
                           event={this.state.event}
                           user={this.state.user}
                           handleEventSlots={this.handleEventSlots}
          />
          {
            this.state.user &&
            <AddToFavorites event={this.state.event}
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