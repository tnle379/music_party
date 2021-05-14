import React, {Component} from 'react';
import { Grid, Typography, Card, IconButton, LinearProgress, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';


export default class MusicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: "",
        };
    }
    
    pauseSong() {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
        };

        fetch('/spotify/pause', requestOptions);
    }

    playSong() {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
        };

        fetch('/spotify/play', requestOptions).then((response) => {
            if (response.status == 403) {
                this.setState({
                    //setting error in state to let user know if they are unable to control the room
                    errorMsg: "Guest are not allowed to play/pause in this room."
                });
            }
        });
    }

    skipSong(){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        };
        fetch('/spotify/skip', requestOptions)
        .then((response) => {
            if (response.status == 403) {
                this.setState({
                    //setting error in state to let user know if they are unable to control the room
                    errorMsg: "Guest are not allowed to play/pause in this room."
                });
            }
        });
    }

    render() {
        const songProgress = (this.props.time / this.props.duration) * 100;

        return (
        <Card>
            {/* Displaying error to let user know when they are unable to play/pause the player in the room */}
            <Grid container alignItem="center">
                <Grid item xs={12} align="center">
                    <Collapse in={this.state.errorMsg != ""}>
                        {this.state.successMsg != "" ? (
                        <Alert severity="error" onClose={() => {
                            this.setState({ errorMsg: "" });
                        }}>{this.state.errorMsg}</Alert>
                        ) : null}
                    </Collapse>
                </Grid>
                <Grid item align="center" xs={4}>
                    <img src={this.props.image_url} heigh="100%" width="100%"/>
                </Grid>
                <Grid item align="center" xs={8}>
                    <Typography component="h4" variant="h4">
                        {this.props.title}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                        {this.props.artist}
                    </Typography>
                    <div>
                        <IconButton onClick={ () => this.props.is_playing ? this.pauseSong() : this.playSong()}>
                            {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                        <IconButton onClick={() => this.skipSong()}>
                            {this.props.votes} / {this.props.votes_needed}
                            <SkipNextIcon /> 
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={ songProgress }/>
        </Card>
        );
    }
}