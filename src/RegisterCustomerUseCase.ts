import Customer from "./Customer";
import { DuplicateCustomerEmailAddress, MissingEmailAddress, MissingFirstName, MissingLastName } from "./errors";
import ICustomerRepository from "./ICustomerRepository";
import { v4 as uuidv4 } from 'uuid';
import CustomerRegistration from "./CustomerRegistration";

export default class RegisterCustomerUseCase {

    constructor(private readonly customerRepo: ICustomerRepository) {

    }

    public register(registration: CustomerRegistration) {
        this.validate(registration);

        const customer = new Customer(uuidv4(), registration.firstname, registration.lastname, registration.email);

        this.customerRepo.saveCustomer(customer);
    }

    private validate(registration: CustomerRegistration) {
        if (!registration.firstname)
            throw new MissingFirstName();
        if (!registration.lastname)
            throw new MissingLastName();
        if (!registration.email)
            throw new MissingEmailAddress();
        const existingCustomer = this.customerRepo.getCustomer(registration.email);
        if (existingCustomer)
            throw new DuplicateCustomerEmailAddress(registration.email);
    }
}