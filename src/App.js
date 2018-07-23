import React, { Component } from 'react';
import './App.css';

// API
import * as ContactsAPI from './utils/ContactsAPI';

// Components
import ListContacts from './ListContacts';
import CreateContact from './CreateContact'

class App extends Component {
  state = {
    contacts: [],
    screen: 'list'
  };

  // ajax req
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState(() => ({ contacts }));
    })
  }

  removeContact = (contact) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }));

    // remove from backend
    ContactsAPI.remove(contact);
  }

  render() {
    return (
      <div>
        {/* short-circuit evaluation */}
        {this.state.screen === 'list' && (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
            onNavigate={() => {
              this.setState( () => ({
                screen: 'create'
              }))
            }}
          />
        )}
        {this.state.screen === 'create' && (
          <CreateContact />
        )}
      </div>
    );
  }
}

export default App;