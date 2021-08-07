import { useState, useEffect, useContext } from 'react';
import { getUserByEmail, getUserByPasswordEmail, updateuserDetails } from '../../services/userServic';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import { NavLink } from 'react-router-dom'
import { Grid, TextField } from '@material-ui/core';
import UserContext from '../../Context/UserContext';
import LocalStorage from '../../services/localStorage';
import './login.css'

//Yup
const validationSchema = yup.object({
  email: yup
    .string('הכנס מייל')
    .email('המייל אינו תקין')
    .required('לא הכנסת מייל'),
  password: yup
    .string('הכנס סיסמא')
    .required('לא הכנסת סיסמא'),
});

//Style
const styleButton = {
  color: 'black',
  fontSize: '17px',

}

//LoginForm
const LoginForm = (props) => {

  //Context
  const { user, setUser } = useContext(UserContext)
  //If the user is registed successfully
  const [isValid, setValid] = useState(false)
  //detaiis of user
  const [currentUser, setCurrentUser] = useState({})

  
  //get user by email
  useEffect(() => {
    getUserByEmail(user.userEmail).then(res => setCurrentUser(res))
  }, [])

  //Exit
  const Exit = () => {
    console.log(currentUser[0])
    updateuserDetails(Object.assign(currentUser[0], { itemsCart: user.userCartNumber }))
    LocalStorage("התחברות", "", 0);
    props.modal(false)
    setUser()
  }

  //formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => { checkLogin(formik.values) },
  });

  //Check if the user is logined
  const checkLogin = (currentUser) => {
    setValid(false)
    getUserByPasswordEmail(currentUser.email, currentUser.password).then((res) => {
      if (res?.length) {
        LocalStorage(res[0].firstName, res[0].email, res[0].itemsCart)
        props.modal(false)
        setUser()
      }
      else {
        setValid(true)
      }
    })

  }

  return (
    <>
      {user.userName === 'התחברות' && <div>
        <PersonIcon style={{marginRight:'45%', width:'55px', height:'55px'}}/>
        <form onSubmit={formik.handleSubmit}>
          <TextField
           style={{marginBottom:'8%'}}
            variant="outlined"
            type="text"
            fullWidth
            id="email"
            name="email"
            label="מייל"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
          style={{marginBottom:'8%'}}
            variant="outlined"
            fullWidth
            type="text"
            id="password"
            name="password"
            label="סיסמא"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button variant="outlined" color="secondary" fullWidth type="submit">
            כניסה
          </Button>
          </form>
          <br />
          <br />
          < Grid container justify="space-between">
            <NavLink disply="inline" to="/Register" style={styleButton} onClick={() => {props.modal(false)}}>
              לא רשום לאתר לחץ כאן
            </NavLink>
            <div id="formFooter">
            <NavLink disply="inline" to="/forgotPassword" style={styleButton} onClick={() => {props.modal(false)}}>
              שכחתי סיסמא
            </NavLink>
            </div>
          </ Grid>
        
        {isValid && <h1 style={{ fontSize: '27px', color: 'red' }}>אחד מהפרטים שגוי</h1>}

      </div>}
      {user.userName !== 'התחברות' &&
        <div>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Button onClick={Exit}>
              <h1 style={styleButton}>צא מהחשבון</h1>
            </Button>
            <Button onClick={() => { props.modal(false) }}>
              <h1 style={styleButton}> ביטול</h1>
            </Button>
          </Grid>
        </div>}
    </>
  );
};

export default LoginForm