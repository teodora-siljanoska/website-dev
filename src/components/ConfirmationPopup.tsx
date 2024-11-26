import React from 'react';

interface ConfirmationPopupProps {
  onConfirm: () => void; // Specify the type for onConfirm
  onCancel: () => void; // Specify the type for onCancel
}

function ConfirmationPopup({ onConfirm, onCancel }: ConfirmationPopupProps) {
  return (
    <div className="confirmation-popup">
      <p>
        Proceeding with this action will remove all items from your cart. Are
        you sure you want to continue?
      </p>
      <div className="button-container">
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
