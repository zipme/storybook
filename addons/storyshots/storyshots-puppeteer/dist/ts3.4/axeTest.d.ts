import '@wordpress/jest-puppeteer-axe';
import { CommonConfig } from './config';
declare global {
    namespace jest {
        interface Matchers<R, T> {
            toPassAxeTests(parameters: any): R;
        }
    }
}
export declare const axeTest: (customConfig?: Partial<CommonConfig>) => {
    ({ context }: any): Promise<void>;
    timeout: number;
    afterAll: () => Promise<void>;
    beforeAll: {
        (): Promise<void>;
        timeout: number;
    };
};
