import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  return (
    <AppContext.Provider value={{ showToast, setLoading: setIsLoading, isLoading }}>
      {children}
      
      {isLoading && (
        <div className="global-loading-overlay">
          <div className="global-spinner"></div>
        </div>
      )}

      {toast.show && (
        <div className={`global-toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp deve ser usado dentro de um AppProvider');
  return context;
};