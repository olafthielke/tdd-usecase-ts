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
});