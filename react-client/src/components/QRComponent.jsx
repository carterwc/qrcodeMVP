import React from 'react';

class QRComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      qrcodeName: '',
      code: []
    };
  }

  componentDidMount() {

  }

  getQRCodes() {
    fetch('/api/qrcodes')
      // fetching the end point to get the qr codes
      .then((response) => {
        if (response.status !== 200) {
          console.log()
        }
        response.json()
          .then((data) => {
            console.log(data, 'is this the qr code string?!?!')
            this.setState({
              code: data
            });
          })

      })
      .catch((error) => {
        if (error) {
          console.log(error, 'Error with getQRCode Function client side!!!')
        }
      })
  }



  render() {
    return (
      <div>
        {/* <h1>Hello world we are live!!</h1> */}

        <input
          type="text"
          placeholder="Insert Code Name Here"
        />
        <button> Submit </button>
      </div>
    )
  }
}

export default QRComponent;