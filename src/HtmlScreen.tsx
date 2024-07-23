import React from 'react';
import {Container, Fade, Typography} from "@mui/material";

function HtmlScreen() {
    return (
        <div className={'quote'}>
            <Fade in={true} style={{transitionDelay: '4000ms'}}><Container>
                <Typography variant="h2" color={"whitesmoke"} padding={5} fontFamily={"la belle aurore"}>
                    Every great developer you know got there by solving problems they were unqualified to solve until
                    they actually did it
                </Typography>
                <Typography variant="h4" color={"whitesmoke"} padding={5} fontFamily={"la belle aurore"}>- Patrick
                    McKenzie</Typography>
            </Container>
            </Fade></div>
    );
}

export default HtmlScreen;