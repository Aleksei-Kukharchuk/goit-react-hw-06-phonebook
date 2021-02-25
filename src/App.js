import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import actions from './redux/phonebook/phonebook-actions'
import s from './App.module.css'
import Section from './components/Section'
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from "./components/ContactList"
import Filter from "./components/Filter"
import Notification from './components/Notification'
import fade from './fade.module.css'

class App extends Component {

  state = {
    NotificationData: '',
    showNotification: false
  }

  formSubmitHandler = data => {
    if (this.props.contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase())) {
      this.setState({showNotification: true, NotificationData: `${data.name} is already in contacts`})
      this.closeNotification()
      return
    } else if (data.name === '') {
      this.setState({showNotification: true, NotificationData: `Name field are empty`})
      this.closeNotification()
      return
    } else if (data.number === '') {
      this.setState({showNotification: true, NotificationData: `Number field are empty`})
      this.closeNotification()
      return
    }
    
    this.props.addContact(data);
  }

  closeNotification() {
    setTimeout(() => {
      this.setState({ showNotification: false })
    }, 2000);
  }
  
  render() {
    const { showNotification, NotificationData } = this.state;

    return (
      <div className={s.container}>
        <Section title='Phonebook'>
          <ContactForm onSubmit={this.formSubmitHandler}/>
        </Section>
        <Section title='Contacts'>
          <Filter/>
        </Section>
        <ContactList/>
        <CSSTransition in={showNotification}
          timeout={250}
          classNames={fade}
          unmountOnExit>
           <Notification alert={NotificationData}/>
        </CSSTransition>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.phonebook.items,
})

const mapDispatchToProps = dispatch => ({
  addContact: (data) => dispatch(actions.addContact(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);