import Customer from "./Customer";

export default interface ICustomerRepository {
    getCustomer(email: string): Customer | null;
    saveCustomer(): void;
}