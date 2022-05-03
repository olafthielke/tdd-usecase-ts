import { MissingEmailAddress, MissingFirstName, MissingLastName } from "./errors";

export default class Customer {

    constructor(public readonly firstname: string,
        public readonly lastname: string,
        public readonly email: string) { }

    public validate(): void {
        if (!this.firstname)
            throw new MissingFirstName();
        if (!this.lastname)
            throw new MissingLastName();
        if (!this.email)
            throw new MissingEmailAddress();
    }    
}