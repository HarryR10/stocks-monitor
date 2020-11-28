import {ApiKey} from "../models/api-key";

export class ApiKeyNotLoadError extends Error {
    constructor(message,
                public apiKey: ApiKey) {
        super(message);
        this.name = "ApiKeyNotLoadError";
    }
}
