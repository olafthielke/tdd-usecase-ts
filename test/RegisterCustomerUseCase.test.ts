import RegisterCustomerUseCase from "../src/RegisterCustomerUseCase";
import { MissingFirstName, MissingLastName, MissingEmailAddress, DuplicateCustomerEmailAddress } from "../src/errors";
import ICustomerRepository from "../src/ICustomerRepository";
import Customer from "../src/Customer";


describe("When call register()", () => {

    it("without customer.firstname, Then throw MissingFirstName error.", () => {
        const customer = new Customer("", "Flintstone", "fred@flintstones.rock");
        const usecase = new RegisterCustomerUseCase(<any>{});
        const register = () => usecase.register(customer);
        verifyThrowMissingFirstName(register);
    });

    it("without customer.lastname, Then throw MissingLastName error.", () => {
        const customer = new Customer("Fred", "", "fred@flintstones.rock");
        const usecase = new RegisterCustomerUseCase(<any>{});
        const register = () => usecase.register(customer);
        verifyThrowMissingLastName(register);
    });

    it("without customer.email, Then throw MissingEmailAddress error.", () => {
        const customer = new Customer("Fred", "flintstone", "");
        const usecase = new RegisterCustomerUseCase(<any>{});
        const register = () => usecase.register(customer);
        verifyThrowMissingEmailAddress(register);
    });

    it.each([["fred@flintstones.rock", "Fred", "Flintstone"],
             ["barney.rubble@rockwell.com", "Barney", "Rubble"],
             ["wilma@flintstones.rock", "Wilma", "Flintstone"]])
    ("for a valid customer with email address %s, Then call out to CustomerRepository to try and get customer by email address.", 
    (email, firstname, lastname) => {
        const customer = new Customer(firstname, lastname, email);
        const mockCustomerRepo = setupMockCustomerRepo();
        const usecase = new RegisterCustomerUseCase(mockCustomerRepo);
        usecase.register(customer);
        expect(mockCustomerRepo.getCustomer).toHaveBeenCalledWith(customer.email);
    });

    it.each([["fred@flintstones.rock", "Fred", "Flintstone"],
             ["barney.rubble@rockwell.com", "Barney", "Rubble"],
             ["wilma@flintstones.rock", "Wilma", "Flintstone"]])
    ("for customer with email address %s that already exists in the system, Then throw DuplicateCustomerEmailAddress error.", 
    (email, firstname, lastname) => {
        const customer = new Customer(firstname, lastname, email);
        const mockCustomerRepo = setupMockCustomerRepo(customer);
        const usecase = new RegisterCustomerUseCase(mockCustomerRepo);
        const register = () => usecase.register(customer);
        verifyThrowDuplicateCustomerEmailAddress(register, email);
    });

    it.each([["Fred", "Flintstone", "fred@flintstones.rock"],
             ["Barney", "Rubble", "barney.rubble@rockwell.com"],
             ["Wilma", "Flintstone", "wilma@flintstones.rock"]])
    ("for new customer %s %s with email address %s, Then save customer to the system.", 
        (firstname, lastname, email) => {
        const customer = new Customer(firstname, lastname, email);
        const mockCustomerRepo = setupMockCustomerRepo();
        const usecase = new RegisterCustomerUseCase(mockCustomerRepo);
        usecase.register(customer);
        expect(mockCustomerRepo.saveCustomer).toHaveBeenCalledWith({ firstname: firstname,
                                                                     lastname: lastname,
                                                                     email: email,
                                                                     id: expect.any(String) }); // uuid
    });


    function setupMockCustomerRepo(getCustomerReturnValue: Customer | null = null): ICustomerRepository {
        return {
            getCustomer: jest.fn(() => { return getCustomerReturnValue; }),
            saveCustomer: jest.fn(() => {})
        };
    }

    function verifyThrowMissingFirstName(register: () => void) {
        expect(register).toThrow(new MissingFirstName());
        expect(register).toThrow("Missing first name.");
    }

    function verifyThrowMissingLastName(register: () => void) {
        expect(register).toThrow(new MissingLastName());
        expect(register).toThrow("Missing last name.");
    }

    function verifyThrowMissingEmailAddress(register: () => void) {
        expect(register).toThrow(new MissingEmailAddress());
        expect(register).toThrow("Missing email address.");
    }

    function verifyThrowDuplicateCustomerEmailAddress(register: () => void, email: string) {
        expect(register).toThrow(DuplicateCustomerEmailAddress);
        expect(register).toThrow(`Customer with email address '${email}' already exists.`);
    }
});

