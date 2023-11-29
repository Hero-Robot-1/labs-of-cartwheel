import React from "react";

const BenefitImage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex' }}> {/* First row */}
        <div style={squareStyle2}>
          <div style={imageStyleCock}></div>
          <div style={textStyle}>15% הנחה במרלן</div>
        </div>
        <div style={squareStyle1}>
          <div style={imageStyleWine}></div>
          <div style={textStyle}>15% הנחה במיליו</div>
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: '20px' }}> {/* Second row */}
        <div style={squareStyle1}>
          <div style={imageStyleCoffe}></div>
          <div style={textStyle}>10% הנחה בקפה נחת </div>
        </div>
        <div style={squareStyle2}>
          <div style={imageStylePizza}></div>
          <div style={textStyle}> הנחה בפאפי פיצה 15% </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const squareStyle1 = {
  width: '226px',
  height: '226px',
  background: '#8BCDCE',
  borderRadius: '8px',
  marginRight: '20px', // Margin between boxes
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const squareStyle2 = {
  width: '226px',
  height: '226px',
  background: '#FBDCD9',
  borderRadius: '8px',
  marginRight: '20px', // Margin between boxes
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const imageStyleCoffe = {
  width: '100%',
  height: '100%',
  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/coffee.png)`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center', // Center the background image
};

const imageStyleCock = {
  width: '100%',
  height: '100%',
  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/cocktail.png)`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center', // Center the background image
};

const imageStylePizza = {
  width: '100%',
  height: '100%',
  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/pizza.png)`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center', // Center the background image
};

const imageStyleWine = {
  width: '100%',
  height: '100%',
  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/wine.png)`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center', // Center the background image
};

const textStyle = {
  textAlign: 'center',
  // marginTop: '2px', // Adjust the spacing between image and text
  color: 'blue', // Text color
};

export default BenefitImage;
