import PaypalExpressBtn from 'react-paypal-express-checkout';
import { getUserByEmail, updateuserDetails } from '../../services/userServic';
import { useAlert } from "react-alert";

const Paypal = (props) => {
    const alert = useAlert()

    //update user's address- if user pays in paypal
    const updateUser =(() => 
        getUserByEmail(props.userEmail).then((res) => {
            updateuserDetails({
                ...res[0],
                userAddress: props.address
            })
        }))

    //on success cancel user's cart
    const onSuccess = (payment) => {
        alert.success("התשלום הועבר בהצלחה", payment);
        props.cancelCart();
        updateUser()
    }

    const onCancel = (data) => {
        alert.show('התשלום בוטל', data);
    }
    
    const onError = (err) => {
        alert.error("קרתה תקלה נסה מאוחר יותר", err);
    }

    let env = 'sandbox';
    let currency = 'ILS';

    const client = {
        sandbox: 'AVoBSe07DJNZma2YuzCxqRMTIKMbIHmx2jjZE1-8vINjN6DkBc2-m_IRTIsP1RX3uTLRFOJHNQNY29T1',
        production: 'YOUR-PRODUCTION-APP-ID',
    }
    return (
        <PaypalExpressBtn ref={null} env={env} client={client} currency={currency} total={props.price} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
    );
}

export default Paypal