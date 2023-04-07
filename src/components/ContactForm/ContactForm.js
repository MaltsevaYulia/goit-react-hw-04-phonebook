import { useState } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export const ContactForm = ({ contacts, addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSabmit = e => {
    e.preventDefault();
    if (contacts.find(el => el.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return;
    }
    addContact({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSabmit} className={css.contact_form}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
        value={name}
      />
      <label>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={number}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

// export class ContactForm1 extends Component {
//   state = { name: '', number: '' };

//   handleChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   handleSabmit = e => {
//     e.preventDefault();
//     const { contacts } = this.props
// const { name } = this.state;
//     if (
//       contacts.find(el => el.name.toLowerCase() === name.toLowerCase())
//     ) {
//       alert(`${name} is already in contacts`);
//       return;
//     }
//     this.props.addContact(this.state);
//     this.setState({ name: '', number: '' });
//   };

//   render() {
//     const { name, number } = this.state;
//     return (
//       <form onSubmit={this.handleSabmit} className={css.contact_form}>
//         <label>Name</label>
//         <input
//           type="text"
//           name="name"
//           pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//           title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//           required
//           onChange={this.handleChange}
//           value={name}
//         />
//         <label>
//           Number
//           <input
//             type="tel"
//             name="number"
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//             onChange={this.handleChange}
//             value={number}
//           />
//         </label>
//         <button type="submit">Add contact</button>
//       </form>
//     );
//   }
// }

ContactForm.protoType = {
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};
