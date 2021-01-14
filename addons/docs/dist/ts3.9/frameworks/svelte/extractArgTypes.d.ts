import { ArgTypes } from '@storybook/api';
import { ArgTypesExtractor } from '../../lib/docgen';
declare type Docgen = {
    components: [];
    computed: [];
    data: [{
        defaultValue: any;
        description: string;
        keywords: [];
        kind: string;
        name: string;
        readonly: boolean;
        static: boolean;
        type: {
            kind: string;
            text: string;
            type: string;
        };
        visibility: string;
    }];
    description: null;
    events: [];
    keywords: [];
    methods: [];
    name: string;
    refs: [];
    slots: [];
    version: number;
};
export declare const extractArgTypes: ArgTypesExtractor;
export declare const createArgTypes: (docgen: Docgen) => ArgTypes;
export {};