
export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public id: string,
        public createdAt: string,
        public role: string,
        public shoppingCartId: string
    ) {
    }
}
