import React from "react";
import { Stack } from "@mui/material";
import { styled, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { Form, Field } from "react-final-form";
import { SearchField } from "./SearchField";
import { useSearchBase } from "../hooks/useSearchBase";
import * as helper from "../utils/helpers";
import SearchListItems from "./SearchListItems";
import useStates from "../hooks/useState";

interface IProps {
  maps: any;
  onChange?(value: string): any;
}
export const Search: React.FC<IProps> = React.memo(({ maps, onChange }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SearchContent maps={maps} onChange={onChange} />
    </ThemeProvider>
  );
});

const SearchContent: React.FC<IProps> = React.memo(({ maps, onChange }) => {
  const [state, setState]: any = useStates({
    isFocus: false,
    loadMore: false,
    loading: false,
    results: undefined,
    pageInfo: undefined,
  });
  const { isFocus, loadMore, loading, results, pageInfo } = state;
  const {
    fetchAPINext,
    onSearch,
    onSelectedItem,
    onSubmit,
    onClearData,
    onClickLocation,
  }: any = useSearchBase({ maps, state, setState });

  React.useEffect(() => {
    setState({
      pageInfo,
      results,
    });
  }, [isFocus, loading]);

  const onActive = React.useCallback((action: boolean) => {
    setState({ isFocus: action });
  }, []);

  const handleClear = () => {
    setState({ results: undefined, pageInfo: undefined });
  };
  const handleOnChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value }: any = e.currentTarget;
      onSearch(value);
      if (helper.isLatLonText(value)) {
        setState({ results: undefined, pageInfo: undefined });
      }
      if (value === "") {
        handleClear();
        // helper.removeMapLayer(map);
      }
      onChange && onChange(value);
    },
    []
  );

  const hasMore =
    pageInfo && !(pageInfo?.current_page === pageInfo?.total_pages);

  const fetchMoreData = async () => {
    if (!hasMore) return;
    const { per_page, current_page, q } = pageInfo;
    try {
      const res = await fetchAPINext({ q, per_page, page: current_page + 1 });
      setState({
        pageInfo: res?.pageInfo || {},
        results: results.concat(res.results),
      });
    } catch (err) {
      console.log("====::: ", err);
    }
  };

  const handleClearData = (form: any) => {
    onClearData(form);
    handleClear();
    helper.removeMapLayer(maps);
  };

  return (
    <StyledWrapper id="id-sidebar-search">
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, values, form }: any) => (
          <form onSubmit={handleSubmit}>
            <Stack flex="1" direction="row" className="search-wrapper">
              <Field
                name="search"
                fullWidth
                placeholder="Search..."
                component={SearchField}
                onChange={handleOnChange}
                onActive={onActive}
                onClose={() => handleClearData(form)}
              />
            </Stack>
            {isFocus && (
              <SearchListItems
                results={results}
                form={form}
                search={values.search}
                onSelect={onSelectedItem}
                onMoreData={fetchMoreData}
                onLocation={onClickLocation}
                hasMore={hasMore}
                loadMore={loadMore}
                loading={loading}
              />
            )}
            <ManageFormState form={form} onItemSelect={onClickLocation} />
          </form>
        )}
      </Form>
    </StyledWrapper>
  );
});

const ManageFormState = React.memo(({ form, onItemSelect }: any) => {
  const query = helper.stringToQueryParams();
  React.useEffect(() => {
    if (query?.location) {
      form.change("search", query?.location);
      setTimeout(() => {
        onItemSelect(query?.location);
      }, 360);
    }
  }, []);
  return null;
});

const StyledWrapper: any = styled(Stack)`
  && {
    width: 250px;
    background-color: #f8f8f8;
    position: absolute;
    top: calc(var(--top-header-height) + 84px);
    right: 0px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 20%), 0 -1px 0px rgb(0 0 0 / 2%);
    form {
      .search-wrapper {
        background-color: white;
        border-radius: 8px;
      }
    }
  }
`;
