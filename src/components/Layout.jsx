import React from 'react';

const Layout = ({ isToggled, children }) => {
  // Aplica a classe 'toggled' se o estado for verdadeiro
  const wrapperClasses = `d-flex ${isToggled ? 'toggled' : ''}`;

  return (
    <div className={wrapperClasses} id="wrapper">
      {children}
    </div>
  );
};

export default Layout;