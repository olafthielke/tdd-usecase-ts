import Customer from "./Customer";
import { DuplicateCustomerEmailAddress, MissingEmailAddress, MissingFirstName, MissingLastName } from "./errors";
import ICustomerRepository from "./ICustomerRepository";


export default class RegisterCustomerUseCase {

    constructor(private readonly customerRepo: ICustomerRepository) {

    }

    public register(customer: Customer) {
        this.validate(customer);
        const existingCustomer = this.customerRepo.getCustomer(customer.email);
        if (existingCustomer)
            throw new DuplicateCustomerEmailAddress(customer.email);

        this.customerRepo.saveCustomer();
    }

    private validate(customer: Customer) {
        if (!customer.firstname)
            throw new MissingFirstName();
        if (!customer.lastname)
            throw new MissingLastName();
        if (!customer.email)
            throw new MissingEmailAddress();
    }
}