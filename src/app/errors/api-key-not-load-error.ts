import {ApiKey} from "../models/apiKey";

export class ApiKeyNotLoadError extends Error {
    constructor(message,
                public apiKey: ApiKey) {
        super(message);
        this.name = "ApiKeyNotLoadError";
    }
}
