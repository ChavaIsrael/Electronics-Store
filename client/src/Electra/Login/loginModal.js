
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import LoginForm from './loginForm';

//Style
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 6),

  },
}));

const LoginModal = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
      <Modal
        open={props.open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          {/* טופס התחברות לאתר */}
          <LoginForm modal={props.setOpen} />
        </div>
      </Modal>
  );
}

export default LoginModal;