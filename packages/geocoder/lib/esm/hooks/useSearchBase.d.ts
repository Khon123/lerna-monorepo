declare type IProps = {
    maps: any;
    state: any;
    setState: any;
};
export declare const useSearchBase: ({ maps, state, setState }: IProps) => {
    onSearch: (value: string) => void;
    onSelectedItem: (form: any, item: any) => void;
    fetchAPINext: (params?: {}) => Promise<{
        results: any;
        pageInfo: any;
    } | undefined>;
    onSubmit: (field: any) => Promise<void>;
    onClickLocation: (location: string) => void;
    onClearData: (form: any) => void;
};
export {};
