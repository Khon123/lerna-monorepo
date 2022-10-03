import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import classnames from 'classnames';
import {Provider, shallowEqual, useSelector, useDispatch} from 'react-redux';
import {store} from './../index';
import {isEmpty} from 'lodash';
import {z1MapAPI} from './../core/Z1MapAPI';
import {Stack, Typography} from '@mui/material';

interface IProps {
  map: any;
  reset(): void;
}
export const WhatHereView: React.FC<IProps> = ({reset}) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RenderView reset={reset} />
      </ThemeProvider>
    </Provider>
  );
};

const RenderView: React.FC<any> = React.memo(({reset}) => {
  const {results, location, loading} = useSelector(
    ({whathere}: any) => ({
      results: whathere.results,
      loading: whathere.loading === 'pending',
      location: whathere.location
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(reset());
  };

  if (isEmpty(results)) return null;

  const getDisplayName = () => {
    const {commune, district, name, road_type} = results;
    if (name) {
      const type = road_type ? ' , ' + road_type : '';
      return name + type;
    }
    if (road_type) {
      return road_type;
    }
    const addrs = [commune, district];
    return addrs.join(', ');
  };

  return (
    <StyledWhatHere
      id="id-what-here"
      className="maplibregl-ctrl maplibregl-ctrl-group mapboxgl-ctrl mapboxgl-ctrl-group">
      <Stack id="reveal-card">
        <Stack
          direction="row"
          className={classnames('widget-reveal-card', {
            'widget-reveal-card-open': !loading
          })}>
          <StyledThumb
            bg={'https://www.z1datarnd.com/assets/default_geocode-2x.png'}>
            <span className="widget-reveal-card-caption" />
            <span className="widget-reveal-card-gradient" />
          </StyledThumb>
          <StyledContent>
            {loading ? (
              <div className="widget-reveal-card-bold">Loading...</div>
            ) : (
              <>
                <StyledAddress>
                  <WhatHereBorey location={location} />
                  <StyledTextLine className="p-line">
                    {getDisplayName()}
                  </StyledTextLine>
                  <StyledTextLine className="p-line">
                    {results.province}
                  </StyledTextLine>
                  <StyledLatLng>{location}</StyledLatLng>
                </StyledAddress>
              </>
            )}
            <StyledClose onClick={onClose}>
              <CloseIcon />
            </StyledClose>
          </StyledContent>
        </Stack>
      </Stack>
    </StyledWhatHere>
  );
});

let oldSource: any;
const WhatHereBorey = React.memo(({location}: any) => {
  const [item, setItem]: any = React.useState(null);

  const fetchApi = async () => {
    try {
      const {data} = await z1MapAPI.fetchWhatHereBorey(
        location,
        (source: any) => (oldSource = source)
      );
      setItem(data);
    } catch (err) {
      console.log(':::err ', err);
    }
  };

  React.useEffect(() => {
    fetchApi();
    return () => {
      oldSource && oldSource?.cancel('cancelled');
    };
  }, []);

  if (!item?.p_name) return null;

  return (
    <StyledTextLine className="widget-reveal-card-bold">
      {item.p_name}
    </StyledTextLine>
  );
});
const StyledTextLine = styled(Typography)`
  && {
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: initial;
    font-size: 12px;
    font-weight: normal;
    &.p-line {
      padding-bottom: 4px;
    }
  }
`;
const StyledWhatHere = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transition: bottom 0.1s linear, margin-bottom 0.1s linear;
  transform: translateX(-50%);
  margin-bottom: 20px;
  background-color: transparent;
  #reveal-card:focus {
    outline: none;
  }
  .widget-reveal-card {
    display: flex;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgb(0 0 0 / 30%);
    visibility: hidden;
    transform: translateY(198px);
    opacity: 0;
    transition: -webkit-transform 0s 200ms ease-out, transform 0s 200ms ease-out,
      opacity 200ms ease-out, visibility 200ms ease-out;
    height: 0px;
    width: 0px;
    &.widget-reveal-card-open {
      visibility: visible;
      transform: translateY(0);
      opacity: 1;
      transition: -webkit-transform 200ms ease-out, transform 200ms ease-out,
        opacity 200ms ease-out, visibility 200ms ease-out;
      height: auto;
      width: auto;
    }
  }
`;
const StyledButton = styled.div`
  background: transparent;
  border: 0;
  border-radius: 0;
  list-style: none;
  margin: 0;
  outline: 0;
  overflow: visible;
  padding: 0;
  vertical-align: baseline;
`;
const StyledThumb: any = styled(StyledButton)`
  width: 96px;
  margin: 4px;
  position: relative;
  background-size: cover;
  background-image: url(${({bg}: any) => bg});
  background-repeat: no-repeat;
  cursor: pointer;
  text-align: left;
  border-radius: 4px;
  .widget-reveal-card-caption {
    user-select: none;
    color: #fff;
    font-size: 11px;
    font-weight: bold;
    bottom: 2px;
    margin-left: 4px;
    z-index: 1;
    position: absolute;
  }
  .widget-reveal-card-gradient {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
    width: 96px;
    height: 16px;
    bottom: 0;
    position: absolute;
    border-radius: 4px;
  }
`;
const StyledContent = styled.div`
  font-size: 12px;
  line-height: 12px;
  padding: 10px 5px;
  display: flex;
  .widget-reveal-card-bold {
    padding-bottom: 6px;
    font-weight: bold;
    width: 192px;
  }
`;
const StyledAddress: any = styled(StyledButton)`
  cursor: pointer;
  text-align: left;
  border-radius: 4px;
  & > * {
    width: 192px;
    display: block;
  }
`;
const StyledLatLng = styled(StyledButton)`
  width: 192px;
  display: block;
  color: #999;
  text-align: left;
  user-select: text;
`;
const StyledClose = styled(StyledButton)`
  display: flex;
  cursor: pointer;
  margin-top: -5px;
  svg {
    height: 16px;
    width: 16px;
    opacity: 0.54;
  }
`;
