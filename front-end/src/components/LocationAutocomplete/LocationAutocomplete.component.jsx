import {Divider, List, ListItemButton, ListItemText, Popover, TextField} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {LocationModel} from "../../model/Location.model";
import {autocompleteQuery} from "../../api/queries/OpenStreetMap.query";

const LocationAutocomplete = ({placeholder, setLocation}) => {
    const [isOpen, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [shown, setShown] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const anchor = useRef();

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            autocompleteQuery(input, (res) => {
                setSuggestions(res.slice(0, 5).map((json) => new LocationModel(json)));
                setOpen(res.length > 0);
            });
        }, 1000);

        return () => clearTimeout(delayDebounce);
    }, [input]);

    const updateInput = (e) => {
        setShown(e.target.value);
        setInput(e.target.value);
    }

    const updateLocation = (location) => {
        setLocation(location);
        setShown(location.display_name);
        setOpen(false);
    }

    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <TextField
                    fullWidth
                    variant='outlined'
                    label={placeholder}
                    value={shown}
                    onInput={updateInput}
                    onBlur={() => {
                        // noinspection JSUnresolvedFunction
                        anchor.current.setSelectionRange(0, 0);
                    }}
                    inputRef={anchor}
                />

                <Popover
                    open={isOpen}
                    anchorEl={anchor.current}
                    onClose={() => setOpen(false)}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                >
                    <List component="nav">
                        {
                            suggestions.map((suggestion) => {
                                return (
                                    <div key={suggestion.place_id}>
                                        <ListItemButton onClick={() => updateLocation(suggestion)}>
                                            <ListItemText primary={suggestion.display_name}/>
                                        </ListItemButton>
                                        <Divider/>
                                    </div>
                                );
                            })
                        }
                    </List>
                </Popover>
            </div>
        </div>
    );
};

export default LocationAutocomplete;