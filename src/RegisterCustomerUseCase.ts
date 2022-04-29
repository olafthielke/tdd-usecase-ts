import Customer from "./Customer";
import { MissingEmailAddress, MissingFirstName, MissingLastName } from "./errors";


export default class RegisterCustomerUseCase {

    public register(customer: Customer) {
        if (!customer.firstname)
            throw new MissingFirstName();
        if (!customer.lastname)
            throw new MissingLastName();
        throw new MissingEmailAddress();
    }
}