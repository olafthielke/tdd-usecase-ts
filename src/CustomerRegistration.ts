import { MissingEmailAddress, MissingFirstName, MissingLastName } from "./errors";
import Customer from "./Customer";
import { v4 as uuidv4 } from 'uuid';

export default class CustomerRegistration {

    constructor(
        public readonly firstname: string,
        public readonly lastname: string,
        public readonly email: string) { 
    }

    public validate(): void {
        if (!this.firstname)
            throw new MissingFirstName();
        if (!this.lastname)
            throw new MissingLastName();
        if (!this.email)
            throw new MissingEmailAddress();
    }

    public ToCustomer(): Customer {
        return new Customer(uuidv4(), 
                            this.firstname, 
                            this.lastname, 
                            this.email);
    }
}