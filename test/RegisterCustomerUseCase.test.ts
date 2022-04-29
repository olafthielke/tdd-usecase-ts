import RegisterCustomerUseCase from "../src/RegisterCustomerUseCase";


describe("When construct RegisterCustomerUseCase", () => {
    
    it("Then can construct RegisterCustomerUseCase.", () => {
        const usecase = new RegisterCustomerUseCase();
    });
});

describe("When call register()", () => {

    it("Then can call register().", () => {
        const usecase = new RegisterCustomerUseCase();
        usecase.register();
    });

    it("without customer.firstname, Then throw MissingFirstName error.", () => {
        const usecase = new RegisterCustomerUseCase();
        const register = () => usecase.register({ });
        expect(register).toThrow(new MissingFirstName());
    });
});

