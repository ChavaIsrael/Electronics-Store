import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider, Link, List, ListItem, ListItemText } from '@material-ui/core';
import map from './map.jpg'

//Style
const useStyles = makeStyles((theme) => ({
    root: {
        width: '45%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const BranchesTable = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>רמת גן- בני ברק</Typography>
                    <Typography className={classes.secondaryHeading}>ההדרים 10 כפר ביל"ו</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List component="nav" className={classes.list} aria-label="mailbox folders">
                        <ListItem >
                            <ListItemText primary="מס' פקס: " />
                                03-57001112
                            </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary=" שעות פתיחה: " />
                                10:00 - 21:00
                            </ListItem>
                            <Divider />
                        <ListItem >
                            <ListItemText primary="מס' טלפון:" />
                            03-57001111
                        </ListItem>
                        <Divider />
                        <Link href="https://www.google.com/maps/place/%D7%9E%D7%97%D7%A1%D7%A0%D7%99+%D7%97%D7%A9%D7%9E%D7%9C+-+%D7%A1%D7%A0%D7%99%D7%A3+%D7%A7%D7%A8%D7%99%D7%99%D7%AA+%D7%A2%D7%A7%D7%A8%D7%95%D7%9F%E2%80%AD/@31.8694605,34.822886,17z/data=!3m1!4b1!4m5!3m4!1s0x1502b79d28220f2f:0x947834eb6ccc05f3!8m2!3d31.8694605!4d34.8206973?hl=iw-IL" target="_blank">
                            <img src={map} style={{width:'500px', height:'340px'}} alt='map'/>
                        </Link>   
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>אשדוד</Typography>
                    <Typography className={classes.secondaryHeading}>רח' הבושם 12</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List component="nav" className={classes.list} aria-label="mailbox folders">
                        <ListItem >
                            <ListItemText primary="מס' פקס: " />
                                03-57002221
                            </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary=":שעות פתיחה" />
                                10:00 - 21:00
                            </ListItem>
                            <Divider />
                        <ListItem >
                            <ListItemText primary="מס' טלפון" />
                            03-57002222
                        </ListItem>
                        <Divider />
                        <Link target="_blank" href="https://www.google.com/maps/place/%D7%9E%D7%97%D7%A1%D7%A0%D7%99+%D7%97%D7%A9%D7%9E%D7%9C+%D7%90%D7%A9%D7%93%D7%95%D7%93%E2%80%AD/@31.820745,34.6644292,17z/data=!3m1!4b1!4m5!3m4!1s0x1502a35d0ea3a81d:0x938a2e5035a90419!8m2!3d31.8207405!4d34.6622405?hl=iw-IL&shorturl=1">
                            <img alt='map' src={map} style={{width:'500px', height:'340px'}}/>
                        </Link>  
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>מודיעין</Typography>
                    <Typography className={classes.secondaryHeading}>רח' המלאכות 121</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List component="nav" className={classes.list} aria-label="mailbox folders">
                        <ListItem >
                            <ListItemText primary="מס' פקס: " />
                                03-57003331
                            </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary=":שעות פתיחה" />
                                10:00 - 20:00
                            </ListItem>
                            <Divider />
                        <ListItem >
                            <ListItemText primary="מס' טלפון" />
                            03-57003333
                        </ListItem>
                        <Divider />
                        <Link target="_blank" href="https://www.google.com/maps/place/%D7%9E%D7%97%D7%A1%D7%A0%D7%99+%D7%97%D7%A9%D7%9E%D7%9C+-+%D7%A1%D7%A0%D7%99%D7%A3+%D7%9E%D7%95%D7%93%D7%99%D7%A2%D7%99%D7%9F%E2%80%AD/@31.8889886,34.9657945,17z/data=!3m1!4b1!4m5!3m4!1s0x1502cea67644781d:0xb94f7d0dbe2b376f!8m2!3d31.8889841!4d34.9636058?hl=iw-IL&shorturl=1">
                            <img alt='map' src={map} style={{width:'500px', height:'340px'}}/>
                        </Link>     
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>טבריה</Typography>
                    <Typography className={classes.secondaryHeading}>רח' יהודה הלוי 111</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List component="nav" className={classes.list} aria-label="mailbox folders">
                        <ListItem >
                            <ListItemText primary="מס' פקס: " />
                                03-57005551
                            </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary=":שעות פתיחה" />
                                08:00 - 20:00
                            </ListItem>
                            <Divider />
                        <ListItem >
                            <ListItemText primary="מס' טלפון" />
                            03-57005555
                        </ListItem>
                        <Divider />
                        <Link target="_blank" href="https://www.google.com/maps/place/%D7%9E%D7%97%D7%A1%D7%A0%D7%99+%D7%97%D7%A9%D7%9E%D7%9C+-+%D7%A1%D7%A0%D7%99%D7%A3+%D7%98%D7%91%D7%A8%D7%99%D7%94%E2%80%AD/@32.789673,35.5357177,17z/data=!4m5!3m4!1s0x151c3e4e25174901:0x7c3db52b946a246d!8m2!3d32.789673!4d35.533529?hl=iw-IL">
                            <img alt='map' src={map} style={{width:'500px', height:'340px'}}/>
                        </Link>    
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>עפולה</Typography>
                    <Typography className={classes.secondaryHeading}>רח' חינקין</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List component="nav" className={classes.list} aria-label="mailbox folders">
                        <ListItem >
                            <ListItemText primary="מס' פקס: " />
                                03-57005551
                            </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary=":שעות פתיחה" />
                                10:00 - 20:00
                            </ListItem>
                            <Divider />
                        <ListItem >
                            <ListItemText primary="מס' טלפון" />
                            03-57005555
                        </ListItem>
                        <Divider />
                        <Link target="_blank" href="https://www.google.com/maps/place/%D7%9E%D7%97%D7%A1%D7%A0%D7%99+%D7%97%D7%A9%D7%9E%D7%9C%E2%80%AD/@32.6040205,35.2952226,17z/data=!4m5!3m4!1s0x151c53e7f56329d5:0xde7eb8a01a64e4cb!8m2!3d32.6039795!4d35.2948047?hl=iw-IL">
                            <img  alt='map' src={map} style={{width:'500px', height:'340px'}}/>
                        </Link>    
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>תל-אביב</Typography>
                    <Typography className={classes.secondaryHeading}>רח' יגאל אלון 127</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List component="nav" className={classes.list} aria-label="mailbox folders">
                        <ListItem >
                            <ListItemText primary="מס' פקס: " />
                                03-57007771
                            </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary=":שעות פתיחה" />
                                10:00 - 20:00
                            </ListItem>
                            <Divider />
                        <ListItem >
                            <ListItemText primary="מס' טלפון" />
                            03-57007777
                        </ListItem>
                        <Divider />
                        <Link target="_blank" href="https://www.google.com/maps/place/%D7%9E%D7%97%D7%A1%D7%A0%D7%99+%D7%97%D7%A9%D7%9E%D7%9C-+%D7%A1%D7%A0%D7%99%D7%A3+%D7%AA%D7%9C+%D7%90%D7%91%D7%99%D7%91%E2%80%AD/@32.0755017,34.7977617,17z/data=!3m1!4b1!4m5!3m4!1s0x151d4b98088509e5:0x8260b7b210d8eb80!8m2!3d32.0755017!4d34.795573?hl=iw-IL">
                            <img alt='map' src={map} style={{width:'500px', height:'340px'}}/>
                        </Link>    
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>חיפה</Typography>
                    <Typography className={classes.secondaryHeading}>רח' בר יהודה 111</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List component="nav" className={classes.list} aria-label="mailbox folders">
                        <ListItem >
                            <ListItemText primary="מס' פקס: " />
                                03-57006661
                            </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary=":שעות פתיחה" />
                                10:00 - 20:00
                            </ListItem>
                            <Divider />
                        <ListItem >
                            <ListItemText primary="מס' טלפון" />
                            03-57006666
                        </ListItem>
                        <Divider />
                        <Link target="_blank" href="https://www.google.com/maps/place/%D7%9E%D7%97%D7%A1%D7%A0%D7%99+%D7%97%D7%A9%D7%9E%D7%9C+-+%D7%A1%D7%A0%D7%99%D7%A3+%D7%97%D7%99%D7%A4%D7%94%E2%80%AD/@32.7793443,35.042455,17z/data=!4m5!3m4!1s0x151dba5caece7d07:0x276dc87e986a78c9!8m2!3d32.7782508!4d35.0389685?hl=iw-IL">
                            <img alt='map' src={map} style={{width:'500px', height:'340px'}}/>
                        </Link>    
                    </List>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default BranchesTable
