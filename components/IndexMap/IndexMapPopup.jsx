import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Popup } from 'react-map-gl';
import s from './popup.module.css';

const IndexMapPopup = ({ feature }) => {
    return (
        <Popup
            longitude={feature.geometry.coordinates[0]}
            latitude={feature.geometry.coordinates[1]}
            anchor='top'
            closeButton={false}
            maxWidth='440px'
            className={s.popup}
        >
            <Card sx={{ maxWidth: 440 }}>
                <CardContent>
                    <Typography variant='h4'>
                        Title
                    </Typography>
                    <Typography >
                        Description
                        Cards are surfaces that display content and actions on a single topic.
                        They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.
                    </Typography>
                </CardContent>
                <CardMedia
                    component='img'
                    height='200'
                    image='/wip.png'
                    alt=''
                />
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                        alignSelf='center'
                        href='/project'
                    >
                        Присоедениться
                    </Button>
                </CardActions>
            </Card>
        </Popup>
    )
};

export default IndexMapPopup;
