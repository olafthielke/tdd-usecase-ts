import { MissingFirstName, MissingLastName } from "./errors";


export default class RegisterCustomerUseCase {

    public register(customer: any) {
        if (!customer.firstname)
            throw new MissingFirstName();
        throw new MissingLastName();
    }
}