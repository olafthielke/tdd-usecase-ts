import { MissingFirstName } from "./errors";


export default class RegisterCustomerUseCase {

    public register(customer: any) {
        throw new MissingFirstName();
    }
}