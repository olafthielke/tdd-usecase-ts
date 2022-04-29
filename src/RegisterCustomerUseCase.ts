import Customer from "./Customer";
import { MissingFirstName, MissingLastName } from "./errors";


export default class RegisterCustomerUseCase {

    public register(customer: Customer) {
        if (!customer.firstname)
            throw new MissingFirstName();
        throw new MissingLastName();
    }
}