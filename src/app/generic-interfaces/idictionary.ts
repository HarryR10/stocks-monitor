// https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types-and-index-signatures

export interface IDictionary<T> {
    [key: string]: T;
}
