import { DuplicateCustomerEmailAddress } from "./errors";
import ICustomerRepository from "./ICustomerRepository";
import CustomerRegistration from "./CustomerRegistration";

export default class RegisterCustomerUseCase {

    constructor(private readonly customerRepo: ICustomerRepository) {
    }

    public register(registration: CustomerRegistration) {
        this.validate(registration);
        const customer = registration.ToCustomer();
        this.customerRepo.saveCustomer(customer);
    }

    private validate(registration: CustomerRegistration) {
        registration.validate();
        const existingCustomer = this.customerRepo.getCustomer(registration.email);
        if (existingCustomer)
            throw new DuplicateCustomerEmailAddress(registration.email);
    }
}