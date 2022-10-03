import React from "react";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import CloseIcon from "@mui/icons-material/Close";

export const SearchField = React.memo(
  ({ input, placeholder, onChange, onActive, onClose, ...resp }: any) => {
    return (
      <TextField
        id="id-search-field"
        placeholder="Search Geocoder..."
        value={input.value || ""}
        autoComplete="off"
        size="small"
        variant="standard"
        sx={{
          p: "2px 4px",
          flex: 1,
          ".MuiInputBase-input": {
            padding: "5px 0px !important",
          },
        }}
        {...resp}
        {...input}
        onChange={(e) => {
          input.onChange(e);
          if (onChange) {
            onChange(e);
          }
        }}
        onFocus={() => {
          if (onActive) {
            onActive(true);
          }
        }}
        onBlur={debounce(() => {
          if (onActive) {
            onActive(false);
          }
        }, 150)}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <IconButton
              disableRipple
              sx={{
                p: "2px !important",
                ":hover": {
                  background: "transparent !important",
                  ".hover-icon": {
                    color: "#1976d2",
                  },
                },
              }}
              aria-label="search"
              disabled
            >
              <SearchIcon className="hover-icon" />
            </IconButton>
          ),
          endAdornment: (
            <>
              {input.value && (
                <IconButton
                  disableRipple
                  sx={{
                    p: "2px !important",
                    ".hover-icon": {
                      width: "22px",
                      height: "22px",
                      marginTop: "2px",
                    },
                    ":hover": {
                      background: "transparent !important",
                      ".hover-icon": {
                        color: "#1976d2",
                      },
                    },
                  }}
                  aria-label="directions"
                  onClick={onClose}
                  disabled={!input.value}
                >
                  <CloseIcon className="hover-icon" />
                </IconButton>
              )}
            </>
          ),
        }}
      />
    );
  }
);
