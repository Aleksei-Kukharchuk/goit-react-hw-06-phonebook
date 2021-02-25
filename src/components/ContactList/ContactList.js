import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux'
import actions from '../../redux/phonebook/phonebook-actions'
import fade from '../../fade.module.css'
import s from './ContactList.module.css'

function ContactList({ contacts, deleteContact, clearFilter }) {

    const onClickHandle = (contactId) => {
    deleteContact(contactId);
    clearFilter('');
}

    return ( 
        <TransitionGroup component='ul' className={s.list}>
            {contacts.map(contact => (
                <CSSTransition key={contact.id} timeout={500} classNames={fade}>
                    <li className={s.item}>
                    {contact.name}: {contact.number}
                    <button onClick={ () => onClickHandle(contact.id)} className={s.button}>Delete</button>
                </li>
                </CSSTransition>
                )
            )} 
        </TransitionGroup>
    ) 
}

ContactList.propType = {
    contacts: PropTypes.array,
    onDeleteContact: PropTypes.func,
}

const getVisiableTodos = (items, filter) => {
  const normalizedFilter = filter.toLowerCase();

  return items.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
}

const mapStateToProps = ({phonebook: {items, filter}}) => ({
  contacts: getVisiableTodos(items,filter)
})

const mapDispatchToProps = dispatch => ({
    deleteContact: (contactId) => dispatch(actions.deleteContact(contactId)),
    clearFilter: (e) => dispatch(actions.changeFilter(''))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactList)