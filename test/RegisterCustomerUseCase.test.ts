import RegisterCustomerUseCase from "../src/RegisterCustomerUseCase";
import { MissingFirstName, MissingLastName, MissingEmailAddress, DuplicateCustomerEmailAddress } from "../src/errors";
import ICustomerRepository from "../src/ICustomerRepository";
import CustomerRegistration from "../src/CustomerRegistration";
import Customer from "../src/Customer";


describe("When call register()", () => {

    it("without registration.firstname, Then throw MissingFirstName error.", () => {
        const registration = new CustomerRegistration("", "Flintstone", "fred@flintstones.rock");
        const usecase = new RegisterCustomerUseCase(<any>{});
        const register = () => usecase.register(registration);
        verifyThrowMissingFirstName(register);
    });

    it("without registration.lastname, Then throw MissingLastName error.", () => {
        const registration = new CustomerRegistration("Fred", "", "fred@flintstones.rock");
        const usecase = new RegisterCustomerUseCase(<any>{});
        const register = () => usecase.register(registration);
        verifyThrowMissingLastName(register);
    });

    it("without registration.email, Then throw MissingEmailAddress error.", () => {
        const registration = new CustomerRegistration("Fred", "flintstone", "");
        const usecase = new RegisterCustomerUseCase(<any>{});
        const register = () => usecase.register(registration);
        verifyThrowMissingEmailAddress(register);
    });

    it.each([["fred@flintstones.rock", "Fred", "Flintstone"],
             ["barney.rubble@rockwell.com", "Barney", "Rubble"],
             ["wilma@flintstones.rock", "Wilma", "Flintstone"]])
    ("for a valid customer registration with email address %s, Then call out to CustomerRepository to try and get customer by email address.", 
    (email, firstname, lastname) => {
        const registration = new CustomerRegistration(firstname, lastname, email);
        const mockCustomerRepo = setupMockCustomerRepo();
        const usecase = new RegisterCustomerUseCase(mockCustomerRepo);
        usecase.register(registration);
        expect(mockCustomerRepo.getCustomer).toHaveBeenCalledWith(registration.email);
    });

    it.each([["fred@flintstones.rock", "Fred", "Flintstone"],
             ["barney.rubble@rockwell.com", "Barney", "Rubble"],
             ["wilma@flintstones.rock", "Wilma", "Flintstone"]])
    ("for customer registration with email address %s that already exists in the system, Then throw DuplicateCustomerEmailAddress error.", 
    (email, firstname, lastname) => {
        const registration = new CustomerRegistration(firstname, lastname, email);
        const customer = new Customer("some uuid", firstname, lastname, email);
        const mockCustomerRepo = setupMockCustomerRepo(customer);
        const usecase = new RegisterCustomerUseCase(mockCustomerRepo);
        const register = () => usecase.register(registration);
        verifyThrowDuplicateCustomerEmailAddress(register, email);
    });

    it.each([["Fred", "Flintstone", "fred@flintstones.rock"],
             ["Barney", "Rubble", "barney.rubble@rockwell.com"],
             ["Wilma", "Flintstone", "wilma@flintstones.rock"]])
    ("for new customer %s %s with email address %s, Then save customer to the system.", 
    (firstname, lastname, email) => {
        const registration = new CustomerRegistration(firstname, lastname, email);
        const mockCustomerRepo = setupMockCustomerRepo();
        const usecase = new RegisterCustomerUseCase(mockCustomerRepo);
        usecase.register(registration);
        expect(mockCustomerRepo.saveCustomer).toHaveBeenCalledWith({ firstname: firstname,
                                                                     lastname: lastname,
                                                                     email: email,
                                                                     id: expect.any(String) }); // uuid
    });

    it.each([["Fred", "Flintstone", "fred@flintstones.rock"],
             ["Barney", "Rubble", "barney.rubble@rockwell.com"],
             ["Wilma", "Flintstone", "wilma@flintstones.rock"]])
    ("and registration of new customer %s %s with email address %s was successful, Then return the customer.", 
    (firstname, lastname, email) => {
        const registration = new CustomerRegistration(firstname, lastname, email);
        const mockCustomerRepo = setupMockCustomerRepo();
        const usecase = new RegisterCustomerUseCase(mockCustomerRepo);
        const customer = usecase.register(registration);
        expect(customer).toEqual({ firstname: firstname,
                                   lastname: lastname,
                                   email: email,
                                   id: expect.any(String) });
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

