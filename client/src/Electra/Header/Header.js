import './Header.css';
import { useContext, useState } from "react";
import {  useHistory } from 'react-router-dom'
import LoginModal from "../Login/loginModal";
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Place } from "@material-ui/icons";
import { FormGroup, FormControlLabel } from "@material-ui/core";
import { LocalShipping } from '@material-ui/icons'
import UserContext from "../../Context/UserContext";
import { Person } from '@material-ui/icons';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Categoties from "../Categories/Categories";
import logo from './logo.JPG'
//Style
const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 5px',
    },
}))(Badge);


const Header = () => {
    const history = useHistory()
    const [open, setOpen] = useState(false);
    const style = { color: 'white', fontSize: 19 , marginRight: '2%'}
    //current user by context
    const userContext = useContext(UserContext)
    const handleOpen = () => {
        setOpen(true);
    };
    
    return (
        <div className='header'>
            <div className="OverHeader">
            <LocalShipping style={{ fontSize: '33px' }} />
                מאות מוצרים באספקה חינם אצלך תוך 48 שעות                
            </div>
            <div className='root'>
                <LoginModal open={open} setOpen={setOpen} />
                <FormGroup row style={{marginRight:'5%'}}>
                    {/* חזרה לדף הבית */}
                    <FormControlLabel
                        control={<KeyboardArrowRightIcon style={{ fill: "yellow" }}/>}           
                        style={{ color: 'yellow', fontSize: 19, marginLeft:'5%' }} 
                        label="דף הבית"
                        onClick={() => history.push("/")}
                    />
                    {/* קטגוריות  */}
                    <FormControlLabel 
                            control={ <Categoties/>}
                            style={{ color: 'white', fontSize: 19, marginLeft:'10%' }}
                        />
                    {/* עגלה */}
                    <FormControlLabel
                        control={<IconButton aria-label="cart" >
                                    <StyledBadge badgeContent={+userContext.user.userCartNumber} color="secondary">
                                        <ShoppingCartIcon style={{ fontSize: '35px', fill: "yellow" }} />
                                    </StyledBadge>
                                </IconButton>}
                        label={<div className='cart'>עגלה</div>}
                        onClick={() => history.push("/Cart")}
                        style={{ color: 'white', fontSize: 19, marginRight: '7%'}}
                        labelPlacement="start"
                    />
                    {/* התחברות */}
                    <FormControlLabel
                        control={<Person style={{ fill: "yellow" }} />}
                        label={userContext.user.userName}
                        onClick={handleOpen}
                        style={ style }
                        labelPlacement="start"
                    />
                    {/* סניפים */}
                    <FormControlLabel
                        label="סניפים"   
                        onClick={() => history.push("/Branches")}
                        style={ style }
                        labelPlacement="start"
                        control={<Place style={{ fill: "yellow" }} />}
                    />
                    <FormControlLabel      
                        control={<img alt='logo' src={logo} style={{width:'30px', height:'30px'}}/>}
                        style={{marginRight:'30%', color:'yellow'}}
                        label='electra חשמל'
                    />
                </FormGroup>
            </div>
        </div>
    )
}

export default Header