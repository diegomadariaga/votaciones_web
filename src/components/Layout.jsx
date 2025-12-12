import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 relative overflow-x-hidden">
      {/* Background Gradients */}
      {/* Background Gradients Removed for Performance */}

      <div className="z-10 w-full max-w-4xl flex flex-col items-center text-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
