import React from 'react';
import PropTypes from 'prop-types';
import Counter from './Counter';
import GuestList from './GuestList';
import ConfirmedFilter from "./ConfirmedFilter";

const MainContent = props =>
    <div className="main">
        <ConfirmedFilter
            toggleFilter={props.toggleFilter}
            isFiltered={props.isFiltered}/>
        <Counter
            totalInvited={props.totalInvited}
            numberAttending={props.numberAttending}
            numberUnconfirmed={props.numberUnconfirmed}/>
        <GuestList
            guests={props.guests}
            toggleConfirmation={props.toggleConfirmation}
            toggleEditing={props.toggleEditing}
            setName={props.setName}
            isFiltered={props.isFiltered}
            removeGuest={props.removeGuest}
            pendingGuest={props.pendingGuest}/>
    </div>;

MainContent.propTypes = {
    toggleFilter: PropTypes.func.isRequired,
    isFiltered: PropTypes.bool.isRequired,
    totalInvited: PropTypes.number.isRequired,
    numberAttending: PropTypes.number.isRequired,
    numberUnconfirmed: PropTypes.number.isRequired,
    guests: PropTypes.array.isRequired,
    toggleConfirmation: PropTypes.func.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    setName: PropTypes.func.isRequired,
    removeGuest: PropTypes.func.isRequired,
    pendingGuest: PropTypes.string.isRequired,
};

export default MainContent;