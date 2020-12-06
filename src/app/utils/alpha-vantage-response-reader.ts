//TODO: remove or to service
export class AlphaVantageResponseReader {
    public isOkResponse: boolean;
    public message: string;

    constructor(response: Object) {
        this.isOkResponse = this.checkResponse(response);
    }

    private checkResponse(response: Object): boolean {
        if (response.hasOwnProperty('Information')) {
            this.message = response['Information'];
            return false;
        } else if (response.hasOwnProperty('Error Message')) {
            this.message = response['Error Message'];
            return false;
        } else if (response.hasOwnProperty('Note')) {
            this.message = response['Note'];
            return false;
        }
        return true;
    }
}
