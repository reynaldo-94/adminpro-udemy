export class Usuario {
    // Las propiedades nombre,email,password son obligatorias,lo demas no
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) {

    }
}
