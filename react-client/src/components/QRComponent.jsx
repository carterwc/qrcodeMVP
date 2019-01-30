import React from 'react';
import CodeDisplay from './CodeDisplay.jsx';
import QRCode from 'qrcode';

class QRComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQrCode: '',
      sampleCode:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKsSURBVO3BQW7kQAwEwSxC//9yro88NSBIM2sTjIg/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEkfJNKl4QTlS4JncpJEr5J5YlijVKsUYo1ysXLVN6UhDtUuiS8SeVNSXhTsUYp1ijFGuXiw5Jwh8oTSehUuiS8KQl3qHxSsUYp1ijFGuXij1M5ScJJEjqVv6xYoxRrlGKNcvHHJeFE5SQJkxRrlGKNUqxRLj5M5ZNU7kjCm1R+k2KNUqxRijXKxcuS8E1J6FS6JHQqXRLuSMJvVqxRijVKsUaJPxgkCZ1Kl4QTlb+sWKMUa5RijXLxUBI6lZMk/E8qXRK6JHQqJ0noVLok3KHyRLFGKdYoxRrl4j9TeSIJncoTKl0STlTuUPmkYo1SrFGKNcrFQypdEt6UhCeS0Kl0KneonCThjiR0Kk8Ua5RijVKsUeIPXpSEE5WTJHQqJ0l4QqVLQqdykoROpUvCicqbijVKsUYp1igXH6bSJeFEpUtCp9KpdEk4UXkiCSdJ6FS6JHxSsUYp1ijFGiX+4A9LQqdyRxI6lTuS0Kl0SbhD5YlijVKsUYo1ysVDSfgmlZMknKjckYQ7knCi8knFGqVYoxRrlIuXqbwpCU+odEk4ScI3JaFTeaJYoxRrlGKNcvFhSbhD5X9SOUlCp9IloVPpktCpvKlYoxRrlGKNcjGMSpeEE5UuCScqJyonKp9UrFGKNUqxRrn441S6JNyRhBOVkyR0Kl0S7lB5olijFGuUYo1y8WEq36TSJeEOlS4JnUqn8psUa5RijVKsUS5eloRvSkKn0qm8KQknKp3KNxVrlGKNUqxR4g/WGMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRvkHv7QE9MppxbsAAAAASUVORK5CYII=',
      codes: [],
      codeInput: '',
    };

    this.getQRCodes = this.getQRCodes.bind(this);
    // this.postQRCodes = this.postQRCodes.bind(this);
    this.onPreviewClick = this.onPreviewClick.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getQRCodes();
  }

  getQRCodes() {
    fetch('/api/qrcodes')
      // fetching the end point to get the qr codes
      .then(response => {
        if (response.status !== 200) {
          console.log();
        }
        response.json().then(data => {
          console.log(data, 'is this the qr code string?!?!');
          this.setState({
            codes: data,
          });
        });
      })
      .catch(error => {
        if (error) {
          console.log(
            error,
            'Error with getQRCode Function client side!!!'
          );
        }
      });
  }

  // postQRCodes() {
  //   fetch('/api/qrcodes', {
  //     method: 'post',
  //     header: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify({})
  //   })
  // }

  handleInputChange(event) {
    console.log(event.target.value);
    this.setState({
      codeInput: event.target.value,
    });
  }

  onPreviewClick() {
    var codeName = this.state.codeInput;
    QRCode.toDataURL(codeName)
      .then(url => {
        console.log(url, 'This created?');
        this.setState({ currentQrCode: url })
      })
      .catch(error => {
        console.error(error, 'Error making URl PreviewClick.');
        this.setState({ currentQrCode: '' })
      });
  }

  onSubmitHandler() {
    console.log(this.state.currentQrCode, 'we exist or nah?');
    console.log(this.state.codeInput, 'code input??/')

    fetch('/api/qrcodes', {
      method: 'post',
      header: {
        'Content-type': 'application/json',
      },
      body: {
        qrcode: this.state.currentQrCode,
        createdDate: new Date(),
        expiresDate: new Date(),
        createdBy: 'carter',
      },
    }).then(() => {
      this.getQRCodes();
    });
  }

  render() {
    const { codeInput, currentQrCode } = this.state;

    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Insert Code Name Here"
            onChange={this.handleInputChange}
            value={codeInput}
          />
          <button onClick={this.onPreviewClick}>Preview Code</button>
          {
            currentQrCode && (
              <div className="current-code-wrapper">
                <img src={currentQrCode} />
                <button onClick={this.onSubmitHandler}>Submit</button>
              </div>
            )
          }
        </div>
        <CodeDisplay codes={this.state.codes} />
      </div>
    );
  }
}

export default QRComponent;