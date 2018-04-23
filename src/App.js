import React, {Component} from 'react';
import Header from './components/Header';
import MainContent from "./components/MainContent";

class App extends Component {

    state = {
        isFiltered: false,
        pendingGuest: "",
        guests: [],

    };

    lastGuestId = 0;

    newGuestId = () => {
        const id = this.lastGuestId;
        this.lastGuestId += 1;
        return id;
    };

    toggleGuessProperty = (property, id) =>
        this.setState({
            guests: this.state.guests.map(guest => {
                if (id === guest.id) {
                    return {
                        ...guest, //spread operator
                        [property]: !guest[property],
                    };
                } else {
                    return guest;
                }
            })
        });

    toggleConfirmation = id => {
        this.toggleGuessProperty("isConfirmed", id);
    };

    removeGuest = id =>
        this.setState({
            guests: this.state.guests.filter(guest => id !== guest.id) //returns false only when match then removes
        });

    toggleEditing = id => {
        this.toggleGuessProperty("isEditing", id);
    };

    setName = (name, id) =>
        this.setState({
            guests: this.state.guests.map(guest => {
                if (id === guest.id) {
                    return {
                        ...guest, //spread operator
                        name,
                    };
                } else {
                    return guest;
                }
            })
        });

    toggleFilter = () => this.setState({isFiltered: !this.state.isFiltered});

    handleNameInput = e => this.setState({pendingGuest: e.target.value});

    newGuestSubmitHandler = e => {
        e.preventDefault();
        const id = this.newGuestId();
        this.setState({
            guests: [
                {
                    name: this.state.pendingGuest,
                    isConfirmed: false,
                    isEditing: false,
                    id,
                },
                ...this.state.guests,
            ],
            pendingGuest: "",
        });
    };

    getTotalInvited = () => this.state.guests.length;

    getAttendingGuests = () => this.state.guests.reduce(
        (total, guest) => guest.isConfirmed ? total + 1 : total, 0
    );

    render() {
        const totalInvited = this.getTotalInvited();
        const numberAttending = this.getAttendingGuests();
        const numberUnconfirmed = totalInvited - numberAttending;
        return (
            <div className="App">
                <Header
                    newGuestSubmitHandler={this.newGuestSubmitHandler}
                    pendingGuest={this.state.pendingGuest}
                    handleNameInput={this.handleNameInput}
                />
                <MainContent
                    toggleFilter={this.toggleFilter}
                    isFiltered={this.state.isFiltered}
                    totalInvited={totalInvited}
                    numberAttending={numberAttending}
                    numberUnconfirmed={numberUnconfirmed}
                    guests={this.state.guests}
                    toggleConfirmation={this.toggleConfirmation}
                    toggleEditing={this.toggleEditing}
                    setName={this.setName}
                    removeGuest={this.removeGuest}
                    pendingGuest={this.state.pendingGuest}/>
            </div>
        );
    }
}

export default App;
