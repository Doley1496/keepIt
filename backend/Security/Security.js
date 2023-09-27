const bcrypt = require("bcrypt");

/* Using Salting and Hashing to hash the password of the user. */
const hashPassword = async (password) => {
  try {
    /* number of salt rounds for hashing. */
    const saltRounds = 10;

    /* When a new user register we will hash its password and saved it in our database. 
       We will hash the user's password using bcrypt method -> bcrypt.hash with 10 rounds of salting. 
       
       * Sending password as props.
    */
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    /* returning the hashedPassword. ie the user's password that is converted using hashing. */
    return hashedPassword;

    /* Catching the error and displaying it. */
  } catch (error) {
    console.log(error);
  }
};

/* When a user try to login we have to compare(match) the password entered by the user with the registered
   passwrod present in our database. 
   Therefore we are Comparing the hashed password and the user's entered password are same or different.
   using bcrypt method -> bcrypt.compare and returning it.

   * Sending password and the hashedPassword as props.
*/
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

/* exporting */
module.exports = { hashPassword, comparePassword };
