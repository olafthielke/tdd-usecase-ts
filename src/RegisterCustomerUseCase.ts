import { DuplicateCustomerEmailAddress } from "./errors";
import ICustomerRepository from "./ICustomerRepository";
import CustomerRegistration from "./CustomerRegistration";
import Customer from "./Customer";

export default class RegisterCustomerUseCase {

    constructor(private readonly customerRepo: ICustomerRepository) {
    }

    public async register(registration: CustomerRegistration): Promise<Customer> {
        this.validate(registration);
        const customer = registration.ToCustomer();
        this.customerRepo.saveCustomer(customer);
        return customer;
    }

    private validate(registration: CustomerRegistration) {
        registration.validate();
        const existingCustomer = this.customerRepo.getCustomer(registration.email);
        if (existingCustomer)
            throw new DuplicateCustomerEmailAddress(registration.email);
    }
}