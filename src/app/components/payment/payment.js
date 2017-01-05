import React, {Component} from 'react';
import NavBar from '../navbar';
import StripeCheckout from 'react-stripe-checkout';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  }
};

export class Payment extends Component {
  onToken(token) {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token)
    }).then(token => {
      console.log(`We are in business, ${token.email}`);
    });
  }

  render() {
    return (
      <div style={styles.container}>
        <NavBar/>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_aVtElBsIJz1fgHUdj1AkvGkJ"
          />
      </div>
    );
  }
}
