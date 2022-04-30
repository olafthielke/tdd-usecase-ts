import Customer from "./Customer";
import { MissingEmailAddress, MissingFirstName, MissingLastName } from "./errors";
import ICustomerRepository from "./ICustomerRepository";


export default class RegisterCustomerUseCase {

    constructor(private readonly customerRepo: ICustomerRepository) {

    }

    public register(customer: Customer) {
        if (!customer.firstname)
            throw new MissingFirstName();
        if (!customer.lastname)
            throw new MissingLastName();
        throw new MissingEmailAddress();
    }
}