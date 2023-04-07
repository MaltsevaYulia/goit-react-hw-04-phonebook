import React, {  useState, useEffect } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { nanoid } from 'nanoid';
import css from './App.module.css';

const LS_CONTACTS = 'contacts';

export const App = () => {
  const contactsLS = JSON.parse(localStorage.getItem(LS_CONTACTS));
  const [contacts, setContacts] = useState([...contactsLS]);
  const [filter, setFilter] = useState('');

  

  useEffect(() => {
    localStorage.setItem(LS_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    setContacts(prev => {
      return [...prev, { name, number, id: nanoid() }];
    });
  };

  const deleteContact = contactId => {
    setContacts(prev => {
      return prev.filter(contact => contact.id !== contactId);
    });
  };

  const changeFilter = e => {
    const value = e.target.value;
    setFilter(value);
  };

  const normalizedFilter = filter.toLocaleLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter value={filter} changeFilter={changeFilter} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </div>
  );
};

// export class App1 extends Component {
//   state = {
//     contacts: [
//       // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem(LS_CONTACTS));
//     if (contacts) {
//       this.setState({ contacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const prevContacts = prevState.contact;
//     const newContacts = this.state.contacts;

//     if (prevContacts !== newContacts) {
//       localStorage.setItem(LS_CONTACTS, JSON.stringify(newContacts));
//     }
//   }

//   addContact = ({ name, number }) => {
//     this.setState(prev => {
//       return {
//         contacts: [
//           ...prev.contacts,
//           { name: name, number: number, id: nanoid() },
//         ],
//       };
//     });
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   changeFilter = e => {
//     const value = e.target.value;
//     this.setState({ filter: value });
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = this.state.filter.toLocaleLowerCase();
//     const visibleContacts = this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//     return (
//       <div className={css.container}>
//         <h1>Phonebook</h1>
//         <ContactForm addContact={this.addContact} contacts={contacts} />
//         <h2>Contacts</h2>
//         <Filter value={filter} changeFilter={this.changeFilter} />
//         <ContactList contacts={visibleContacts} onDelete={this.deleteContact} />
//       </div>
//     );
//   }
// }
