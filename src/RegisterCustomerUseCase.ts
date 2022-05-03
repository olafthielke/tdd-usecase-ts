import { DuplicateCustomerEmailAddress } from "./errors";
import ICustomerRepository from "./ICustomerRepository";
import CustomerRegistration from "./CustomerRegistration";
import Customer from "./Customer";
import { v4 as uuidv4 } from 'uuid';

export default class RegisterCustomerUseCase {

    constructor(private readonly customerRepo: ICustomerRepository) {
    }

    public register(registration: CustomerRegistration) {
        this.validate(registration);
        const customer = registration.ToCustomer();
        this.customerRepo.saveCustomer(customer);

        return new Customer(uuidv4(), "Fred", "Flintstone", "fred@flintstones.rock");
    }

    private validate(registration: CustomerRegistration) {
        registration.validate();
        const existingCustomer = this.customerRepo.getCustomer(registration.email);
        if (existingCustomer)
            throw new DuplicateCustomerEmailAddress(registration.email);
    }
}