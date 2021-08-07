import { createLog, getUserByEmail, getUserByPhoneEmail, updateuserDetails } from '../../services/userServic';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Avatar, Container, CssBaseline, Typography } from '@material-ui/core';
import { useState, useContext} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../../Context/UserContext';
import LocalStorage from '../../services/localStorage';
import PersonIcon from '@material-ui/icons/Person';
import emailjs from 'emailjs-com';
import { useAlert } from "react-alert";
import {useHistory} from 'react-router-dom'

//Style
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ElectraForm = (props) => {

    //the form can be used to register or for forgot password
    const Type = props.type==='register' ? 'password': 'hidden'
    const alert = useAlert()
    const history = useHistory()
    const classes = useStyles();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const initialPassword = Math.ceil(Math.random() * (99999999 - 11111111) + 11111111)
    //if user want to register when anothe is logined in the same email
    const [isValid, setValid] = useState(false)
    //forget
    const [forget, setForget] = useState(false)
    //context
    const setUser = useContext(UserContext)
    //yup
    const validationSchema = yup.object({
        lastName: yup
            .string('הכנס שם משפחה')
            .min(2, 'מידי קצר')
            .max(30, 'מידי ארוך')
            .required('לא הכנסת שם משפחה'),
        firstName: yup
            .string('הכנס שם פרטי')
            .min(2, 'מידי קצר')
            .max(30, 'מידי ארוך')
            .required('לא הכנסת שם פרטי'),
        email: yup
            .string('הכנס מייל')
            .email('המייל אינו תקין')
            .required('לא הכנסת מייל'),
        phone: yup.string('הכנס מס פלאפון')
            .matches(phoneRegExp, "Telephone number is invalid")
            .min(10, 'מידי קצר')
            .max(10, "מידי ארוך")
            .required('לא הכנסת פלאפון'),
        password: yup.string('הכנס סיסמא')
            .min(8, 'סיסמא צריכה להכיל לפחות 8 תווים')
            .required('לא הכנסת סיסמא')           
    });

    //checks if there is anything registered on that email
    const CheckLogin = (currentUser) => {
        //send email
        getUserByEmail(currentUser.email).then((res) => {
            if (res?.length) {
                setValid(true)
            }
            else {
                alert.success("נרשמת בהצלחה");
                history.push('/')
                createLog(currentUser)
                LocalStorage(currentUser.firstName, currentUser.email, 0)
                setUser.setUser()
            }
        })
    }

    //sends a new password and send to the user
    const sendEmail = (currentUser) => {
        setForget(false)
        getUserByPhoneEmail(currentUser.email, currentUser.phone).then((res) => {
            if (res?.length) {
                alert.success(' בדקות הקרובות תשלח אליכם הסיסמא ותוכלו להנות ממגון רחב של מוצרים')
                emailjs.send("electra", "template_5uyblss", {
                    email: currentUser.email,
                    firstName: currentUser.firstName,
                    password: initialPassword.toString(),
                }, 'user_6PhfWkWDk7RyPuSpZyW9v')
                    .catch(() => {
                        alert.error('לא הצלחנו לשלוח לך סיסמא נסה מאוחר יותר')
                    });
                const temp = res[0]
                updateuserDetails({
                    _id: temp._id,
                    password: initialPassword,
                    email: temp.email.toLowerCase(),
                    phone: temp.phone,
                    firstName: temp.firstName,
                    lastName: temp.lastName
                })
                history.push('/')
            }
            else {
                setForget(true)
            }
        })
    }

    //formik
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            address: '',
            password: props.type === 'register' ? '' : initialPassword 
        },
        validationSchema: validationSchema,
        onSubmit: () => {
            props.type === 'register' && CheckLogin(formik.values) 
            props.type === 'forgetPassword' && sendEmail(formik.values)
        }
    });

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        שליחת פרטים אישיים
                    </Typography>
                    <form onSubmit={formik.handleSubmit} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="שם פרטי"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="שם משפחה"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label="מייל"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            name="phone"
                            label="פלאפון"
                            type="numbers"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            label="סיסמא"
                            type={Type}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            שלח
                        </Button>
                    </form>
                    {isValid && <h1>המייל כבר קיים במערכת</h1>}
                    {forget && <h1>אחד הפרטים שגוי</h1>}
                </div>
            </Container>
        </>
    );
}

export default ElectraForm