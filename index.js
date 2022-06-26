const { program } = require('commander');

const contactsOperations = require('./contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');
  
program.parse(process.argv);
const argv = program.opts();

async function invokeAction ({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactList = await contactsOperations.listContacts();
      console.table(contactList);
      break;

    case 'get':
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`The contact with id ${id} was not found.`);
      };
      console.table(contact);
      break;

    case 'add':
      const newContact = await contactsOperations.addContact(name, email, phone);
      console.table(newContact);
      break;

    case 'remove':
      const removedContact = await contactsOperations.removeContact(id);
      if (!removedContact) {
        throw new Error(`The contact with id ${id} was not found.`);
      };
      console.table(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

(async () => {
  await invokeAction(argv)
})();