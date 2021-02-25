import { combineReducers } from 'redux'
import { createReducer } from '@reduxjs/toolkit'
import actions from "./phonebook-actions";

const items = createReducer([], {
    [actions.addContact]: (state, { payload }) => 
        [{ name: payload.contact.name, id: payload.id, number: payload.contact.number }, ...state,],
    [actions.deleteContact]: (state, {payload}) => state.filter(contact => contact.id !== payload)
})

const filter = createReducer('', {
    [actions.changeFilter]: (_, {payload}) => payload
})

export default combineReducers({items, filter})