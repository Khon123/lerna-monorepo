import React from 'react';
interface IProps {
    results: any;
    form: any;
    search: string;
    onSelect: any;
    onLocation: any;
    onMoreData: any;
    hasMore: boolean;
    loadMore: boolean;
    loading: boolean;
}
declare const SearchListItems: React.MemoExoticComponent<(props: IProps) => JSX.Element | null>;
export default SearchListItems;
