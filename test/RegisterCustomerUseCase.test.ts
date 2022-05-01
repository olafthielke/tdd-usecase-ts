import RegisterCustomerUseCase from "../src/RegisterCustomerUseCase";
import { MissingFirstName, MissingLastName, MissingEmailAddress } from "../src/errors";
import ICustomerRepository from "../src/ICustomerRepository";


describe("When call register()", () => {

    it("without customer.firstname, Then throw MissingFirstName error.", () => {
        const usecase = new RegisterCustomerUseCase(<any>{});
        const register = () => usecase.register({ firstname: "", lastname: "Flintstone", email: "fred@flintstones.rock" });
        verifyThrowMissingFirstName(register);
    });

    it("without customer.lastname, Then throw MissingLastName error.", () => {
        const usecase = new RegisterCustomerUseCase(<any>{});
        const register = () => usecase.register({ firstname: "Fred", lastname: "", email: "fred@flintstones.rock" });
        verifyThrowMissingLastName(register);
    });

    it("without customer.email, Then throw MissingEmailAddress error.", () => {
        const usecase = new RegisterCustomerUseCase(<any>{});
        const register = () => usecase.register({ firstname: "Fred", lastname: "Flintstone", email: "" });
        verifyThrowMissingEmailAddress(register);
    });

    it("for a valid customer, Then call out to CustomerRepository to try and get customer by email address.", () => {
        const mockCustomerRepo: ICustomerRepository = {
            getCustomer: jest.fn(() => { return null; })
        };
        const usecase = new RegisterCustomerUseCase(mockCustomerRepo);
        usecase.register({ firstname: "Fred", lastname: "Flintstone", email: "fred@flintstones.rock" });
        expect(mockCustomerRepo.getCustomer).toHaveBeenCalledWith("fred@flintstones.rock");
    });

    it("for another valid customer, Then call out to CustomerRepository to try and get customer by email address.", () => {
        const mockCustomerRepo: ICustomerRepository = {
            getCustomer: jest.fn(() => { return null; })
        };
        const usecase = new RegisterCustomerUseCase(mockCustomerRepo);
        usecase.register({ firstname: "Barney", lastname: "Rubble", email: "barney.rubble@rockwell.com" });
        expect(mockCustomerRepo.getCustomer).toHaveBeenCalledWith("barney.rubble@rockwell.com");
    });


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
});

