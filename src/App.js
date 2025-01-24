import logo from './logo.svg';
import { usePaystackPayment } from 'react-paystack';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import './App.css';

const config = {
  reference: (new Date()).getTime().toString(),
  email: "user@example.com",
  amount: 20000, //20000 kobo = N200
  publicKey: 'pk_test_e3fbaba354db9595539a3ec4607164f653cd2164',
};

const onSuccess = (reference) => {
  console.log(reference);
};

const onClose = () => {
  console.log('closed')
}

const style = {"layout":"vertical"};


const Paystack = () => {
  const initializePayment = usePaystackPayment(config);
  return (
    <div>
        <button onClick={() => {
            initializePayment(onSuccess, onClose)
        }}>Transfer with Paystack</button>
    </div>
  );
};

const ButtonWrapper = ({ showSpinner }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
      <>
      { (showSpinner && isPending) && <div className="spinner" /> }
      <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[style]}
          fundingSource={undefined}
      />
      </>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is a Sample Integration for Local and International Payment Gateway.
        </p>
        <Paystack />
        <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
          <ButtonWrapper showSpinner={false} />
        </PayPalScriptProvider>
      </header>
      
    </div>
  );
}

export default App;
