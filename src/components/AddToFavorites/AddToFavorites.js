import React, {Component} from 'react'

class AddToFavorites extends Component {
    
    addNewFavorite = (event) => {
        alert(event + 'whatup dawg?')
    }
    render() {
        return(
            <div>
                <button onClick={(event) => this.addNewFavorite(event)}>Add to favorites</button>
            </div>
        )
    }
}

export default AddToFavorites