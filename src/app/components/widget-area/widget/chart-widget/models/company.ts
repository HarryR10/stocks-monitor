export class Company {

    public symbol: string;
    public name: string;
    public type: string;
    public region: string;

    // private ['5. marketOpen']?: string;   // => "09:30"
    // private ['6. marketClose']?: string;  // =>"16:00"
    // private ['7. timezone']?: string;     // =>"UTC-05"

    public currency: string;   // => "USD"
    public matchScore: number; // => коэффициент совпадения в API стандартного поиска

    constructor(searchResult: Object) {
        this.symbol = searchResult['1. symbol'];
        this.name = searchResult['2. name'];
        this.type = searchResult['3. type'];
        this.region = searchResult['4. region'];

        this.currency = searchResult['8. currency'];
        this.matchScore = searchResult['9. matchScore'];
    }
}
