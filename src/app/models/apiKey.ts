export class ApiKey {

    public isValid: boolean;

    constructor(public keyName: string,
                public keyDescription: string,
                public keyValue: string = '') {
    }
}
