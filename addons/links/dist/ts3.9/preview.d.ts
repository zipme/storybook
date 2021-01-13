interface ParamsId {
    storyId: string;
}
interface ParamsCombo {
    kind: string;
    story: string;
}
export declare const navigate: (params: ParamsId | ParamsCombo) => any;
export declare const linkTo: (idOrKindInput: string, storyInput?: string | ((...args: any[]) => string)) => (...args: any[]) => void;
export declare const hrefTo: (kind: string, name: string) => Promise<string>;
export declare const withLinks: any;
export {};
