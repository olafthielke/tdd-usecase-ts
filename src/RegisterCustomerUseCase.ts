import Customer from "./Customer";
import { DuplicateCustomerEmailAddress } from "./errors";
import ICustomerRepository from "./ICustomerRepository";


export default class RegisterCustomerUseCase {

    constructor(private readonly customerRepo: ICustomerRepository) {

    }

    public register(customer: Customer) {
        this.validate(customer);
        this.customerRepo.saveCustomer();
    }

    private validate(customer: Customer) {
        customer.validate();
        const existingCustomer = this.customerRepo.getCustomer(customer.email);
        if (existingCustomer)
            throw new DuplicateCustomerEmailAddress(customer.email);
    }
}