
export class UserRegisterDto {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public passwordRepeat: string,
    ) {
    }
}
