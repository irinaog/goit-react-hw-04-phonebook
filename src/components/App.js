import React, { Component } from "react";
import shortid from 'shortid';

import { FormAddContacts } from "./FormAddContacts/FormAddContacts";
import { ContactsList } from "./ContactsList/ContactList";
import { FilterContacts } from "./FilterContacts/FilterContacts";

export class App extends Component {
  contactsId = shortid.generate();
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    console.log("mount")
    const contacts = localStorage.getItem('contacts');
    const contactsParse = JSON.parse(contacts);

    contactsParse && this.setState({ contacts: contactsParse });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts) )
    }
  };


  formSubmitHandler = data => {
    console.log(data);
    if (this.state.contacts.find(contact => (data.name === contact.name))){
      alert(data.name + ' is already in contacts' )
    }
    else {
      this.setState({ contacts: [...this.state.contacts, { name: data.name, number: data.number, id: shortid.generate() }] })
    }
  };


  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value })
  };


  getFilterListContact = () => {
    const { filter, contacts } = this.state;
    const normilizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter),
    );
  };



  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  };


  
  render() {

    return (
      <>
        <h1 className="headlineApp">Phonebook</h1>
        
        <FormAddContacts onSubmit={this.formSubmitHandler} />
       
        <FilterContacts
          contact={this.state.filter}
          filter={this.changeFilter}
        />
      
        <h2 className="contactListTitle">Contacts</h2>

        {this.state.filter !== ''?  <ContactsList
          contacts={this.getFilterListContact()}
          onDeleteContact = {this.deleteContact}
        />:<ContactsList
          contacts={this.state.contacts}
          onDeleteContact = {this.deleteContact}/>}
      
    
      </>
    );
  };
};
