import React from 'react';
import {List, ListItemButton, Stack, Typography} from '@mui/material';
import {isEmpty} from 'lodash';
import {styled} from '@mui/material/styles';
import * as helper from '../utils/helpers';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';

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

const SearchListItems = React.memo((props: IProps) => {
  const {
    results,
    form,
    search,
    onSelect,
    onLocation,
    hasMore,
    loadMore,
    onMoreData,
    loading
  } = props;

  const length = results?.length;
  const countItem = length && length > 0 ? true : false;
  const isLocation = helper.isLatLonText(search);
  const hasResults = !((results?.length ?? 0) <= 0);
  const Loading = () => <CircularProgress size="1.5rem" />;
  const NoRecordFound = () => (
    <StyledNoResultWrapper>
      <Typography style={{fontSize: '0.9rem'}} component="h6">
        No result found!
      </Typography>
    </StyledNoResultWrapper>
  );
  if (isEmpty(search)) {
    return null;
  }

  return (
    <StyledContent id="scrollableTarget">
      <List disablePadding>
        {loading && <Loading />}
        {!loading &&
          !hasResults &&
          (isLocation ? (
            <LocationItem
              searchTerm={search}
              onClick={() => onLocation(search)}
            />
          ) : (
            <NoRecordFound />
          ))}
        {countItem && length && (
          <InfiniteScroll
            dataLength={length}
            next={onMoreData}
            hasMore={hasMore}
            loader={loadMore && <h4>Loading...</h4>}
            scrollableTarget={'scrollableTarget'}>
            {results?.map((item: any, index: number) => {
              let local_name = '';
              if (item.name_local === '' || item.name_local !== 'NULL') {
                local_name = item.name_local;
              }
              return (
                <StyledItem
                  key={index}
                  dense
                  alignItems="flex-start"
                  onClick={() => {
                    onSelect(form, item);
                  }}>
                  <Typography noWrap variant="body2" className="text-primary">
                    {item.name}
                  </Typography>
                  <Typography
                    noWrap
                    variant="caption"
                    className="text-secondary">
                    {local_name}
                  </Typography>
                </StyledItem>
              );
            })}
          </InfiniteScroll>
        )}
      </List>
    </StyledContent>
  );
});

const LocationItem = ({searchTerm, onClick}: any) => {
  return (
    <StyledItem onClick={onClick}>
      <Typography noWrap variant="body2" className="text-primary">
        {searchTerm}
      </Typography>
    </StyledItem>
  );
};
const StyledContent = styled(Stack)`
  overflow: auto;
  height: 100%;
  max-height: 300px;
  background-color: #fff;
  border-radius: 0px 0px 8px 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
  border-top: 1px solid lightgrey;
`;
const StyledNoResultWrapper = styled(Stack)`
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledItem = styled(ListItemButton)`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  overflow: hidden;
  .text-primary {
    margin-right: 5px;
    color: rgb(60, 64, 67);
  }
  .text-secondary {
    color: #70757a;
  }
`;
export default SearchListItems;
