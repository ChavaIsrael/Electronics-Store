import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, CardActionArea, CardActions } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { updateUserCart } from '../../services/itemService'
import UserContext from '../../Context/UserContext';
import ZoomItem from './ZoomItem';
import { useAlert } from "react-alert";


//Style 
const useStyles = makeStyles({
  root: {
    maxWidth: 245,
  },
  media: {
    height: 800,
    width: 800,
    objectFit:'fill',
  }
});

const Item = (props) => {
  const { user, setUser } = useContext(UserContext)
  const classes = useStyles();
  const alert = useAlert()

  const updateCart = () => {
      if (user.userName === 'התחברות') {
          alert.error("עליך להתחבר לאתר כדי לקנות את המוצרים האהובים ")
      }
      else {
          updateUserCart(user.userEmail, props.item.id, 1)
          localStorage.setItem('currentUserCartNumber', +user.userCartNumber + 1)
          setUser()
      }
  }
  return (
    <div className="card">
    <Card className={classes.root}>
      <CardActionArea>
        <ZoomItem image={props.item.itemImage} />
        <CardContent>
        <Typography gutterBottom variant="h5" component="h5">
        {props.item.itemName}
          </Typography>
          <Typography gutterBottom variant="h6" component="h6">             
             מחיר:{props.item.itemCost}
            <br/>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" >
            {props.item.itemDescription}
          </Typography>
          </CardContent>
          </CardActionArea>  
          <CardActions>
          <Button onClick={()=>{updateCart()}}>
          <AddShoppingCartIcon style={{ width:'200px' }}/>
          </Button>
        </CardActions>
    </Card>
    </div>
  );
}

export default Item