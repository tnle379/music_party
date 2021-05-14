import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, IconButton, List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from 'react-router-dom';

const pages = {
    JOIN: 'pages.join',
    CREATE: 'pages.create',
};

export default function Info(props) {
    const [page, setPage] = useState(pages.JOIN);

    function joinInfo() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                    <Typography component="h6" variant="h6">
                        Guest Joining A Room
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <List disablePadding>
                        <ListItem>
                            <ListItemText>
                                Provide a room's code to join the room.
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                An user can only be a part of one room at a time. If user wants to leave a room after joining, user will have to select "Leave Room" button inside the room.
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                In a room that the host allows guests to have control over the music player, a guest can play or pause the song being played. Moreover, every room has a threshold where guests can vote to skip the current song.
                            </ListItemText>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        );
    }

    function createInfo() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                    <Typography component="h6" variant="h6">
                        Host Creating A Room
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <List disablePadding>
                        <ListItem>
                            <ListItemText>
                                A host will be required to log into Spotify in order to host music for the room.
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                Host can decide if guests are allowed to play or pause the music player. Host can also decide how many votes required to skip a song. Host can change the said settings by when creating the room or using "Settings" button inside the room.
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                An user can only host ONE room at a time. In order to create another room, user has to leave current room which will effectively close the room as well.
                            </ListItemText>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        );
    }


    return (
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Typography component="h4" variant="h4">
                What is Music Party?
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <Typography variant="body1">
                {page === pages.JOIN ? joinInfo() : createInfo()}
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <IconButton onClick={
                () => {page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE)
            }}>
                {page === pages.CREATE ? (<NavigateBeforeIcon />) : (<NavigateNextIcon />)}
            </IconButton>
        </Grid>
        <Grid item xs={12} align="center">
            <Button color="secondary" variant="contained" to="/" component={Link}>
                Back
            </Button>
        </Grid>
    </Grid>
    );
}

