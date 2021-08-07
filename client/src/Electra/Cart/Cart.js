import { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { updateUserCart } from '../../services/itemService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import { Button, Grid, Typography } from '@material-ui/core';
import UserContext from "../../Context/UserContext";
import {  getUserItemCart} from "../../services/itemService";
import loadImage from './loading.gif';
import ClearIcon from '@material-ui/icons/Clear';
import Paypal from './Paypal';
import emptyCart from './emptyCart.jpg'

function createData(id, name, cost, count, image, del) {
    return { id, name, cost, count, image, del };
}

//Style
const useStyles = makeStyles((theme) => ({
    table: {
        padding: theme.spacing(1),
        width:'90%'
    },
}));

const Cart = () => {

    //address input
    const [userAddress, setUserAdderss] = useState({ address: '' })
    //current user by context
    const { user, setUser } = useContext(UserContext)
    //items in user's cart
    const [cartItems, setCart] = useState([])
    //loading cart
    const [load, setload] = useState(true)
    //style
    const classes = useStyles();
    //table's rows
    const rows = cartItems.map((e) => createData(e.id, e.itemName, e.itemCost, e.itemCount, e.itemImage, 'הסר פריט'))   
    //total price
    var price = 0;    
    cartItems.map((e) => { price = price + e.itemCost * e.itemCount }) 

    const updateAderss = (e) => {
        setUserAdderss({ address: e.target.value })
    }
    
    const update = (id, count) => {
        updateUserCart(user.userEmail, id, count).then(() => {
            localStorage.setItem('currentUserCartNumber', +user.userCartNumber + count);
            setUser();
        })
    }

    //cancel cart - if user pay in paypal 
    const cancelCart = () => {
        cartItems.map((e) => { updateUserCart(user.userEmail, e.id, -(e.itemCount)).then(() => setUser()) })
        setUser()
    }

    // setload(true)
    useEffect(() => {
        getUserItemCart(user.userEmail).then(res => setCart(res)).then(() => setload(false));
    }, [user])
    // setload(false)


    return (
        <>
            {/* load */}
            {load &&
                <img alt='load' src={loadImage} style={{ width: '10%', marginRight: '45%', marginTop: '30%' }} />}
            {/* empty cart*/}
            {cartItems.length === 0 && !load && 
                <div style={{fontSize:'30px'}} >
                    <img alt='empty-cart' src={emptyCart} style={{marginRight:'31%'}}/>
                    העגלה שלך ריקה בוודאי תרצה להוסיף מוצרים
                </div>}
            {/* cart */}
            {cartItems.length !== 0 &&
                <div style={{ textAlign: 'center' }}>
                    <Grid xl={9}>
                        <TableContainer component={Paper} style={{marginTop:'5%', marginRight:'7%'}}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">שם המוצר</TableCell>
                                        <TableCell align="center">מחיר ליחידה</TableCell>
                                        <TableCell align="center">כמות</TableCell>
                                        <TableCell align="center">תמונה</TableCell>
                                        <TableCell align="center">הסר פריט</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center">{row.cost}</TableCell>
                                            <TableCell align="center">
                                                <Button onClick={() => { update(row.id, 1) }} style={{ marginRight: '15%' }}>
                                                    <ExposurePlus1Icon style={{ fontSize: '20px' }} />
                                                </Button>
                                                {row.count}
                                                <Button onClick={() => { update(row.id, -1); }} style={{ marginLeft: '15%' }}>
                                                    <ExposureNeg1Icon style={{ fontSize: '20px' }} />
                                                </Button>
                                            </TableCell>
                                            <TableCell align="center"><img alt='item' src={row.image} style={{ width: '70px', height: '70px' }} /></TableCell>
                                            <TableCell align="center">
                                                <Button onClick={() => { update(row.id, -(row.count)) }}>
                                                    <ClearIcon style={{ fontSize: '20px' }} />
                                                </Button>
                                                {row.del}
                                            </TableCell>
                                        </TableRow>                            
                                    ))}
                                    <TableRow style={{fontSize:'30px', fontWeight:'bold'}}>  סה"כ לתשלום בשקלים:  {price} </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Typography variant="subtitle1" gutterBottom>
                        יש לנו את כל הפרטים אודותיך
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        לאן תרצה שהמשלוח יגיע?
                    </Typography>
                    {/* address */}
                    <input
                        variant="filled"
                        type='text'
                        id="addrees"
                        name="addrees"
                        label="כתובת"
                        placeholder='רשם כתובת חוקית'
                        onChange={(e) => updateAderss(e)} 
                        style={{width:'140px', height:'40px', borderColor:'pink', color:'black'}}/>

                    {/* paypal   */}
                    {userAddress.address !== "" && <div style={{ marginTop: '1%' }}>
                        <Typography variant="subtitle1" gutterBottom>
                        תשלום
                        </Typography>
                        <Paypal  price={price} cancelCart={cancelCart} adress={userAddress} userEmail={user.userEmail} />
                        </div>}
                </div>
            }
        </>
    )
}



export default Cart