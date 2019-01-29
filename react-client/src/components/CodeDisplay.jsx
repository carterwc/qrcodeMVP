import React from 'react';

const CodeDisplay = (props) => {



  return (
    <div className="category">
      <h3>Current Codes</h3>

      <div className="category-list">
        {
          // props.codes.map((code) => {

          //   return <div className="category-data" key={code.id}>{code}</div>
          // })

          <img src={props.sampleCode} />
        }

      </div>
      <div className="category-form">

        <div className="category-input">
          {/* <input
            type="text"
            placeholder="Budget Category"
          // onChange={}
          /> */}
          {/* <input
            type="number"
            placeholder="Target Budget"
          // onChange={}
          /> */}
        </div>

        {/* <button > + </button> */}
      </div>
    </div>

  );

};


export default CodeDisplay;