import React, {Component} from 'react'
import {database} from "../FirebaseConfig/FirebaseConfig";

class AddToFavorites extends Component {

    state = {
        addFavourite: false
    }

    addNewFavorite = () => {
    console.log(this.state.addFavourite)
    }
    render() {
        return(
            <div>
                <button onClick={() => this.addNewFavorite}>Add to favorites</button>
            </div>
        )
    }
}

export default AddToFavorites