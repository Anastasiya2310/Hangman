import './modal.scss';
import { useState } from 'react';

const Modal = ({ children }) => {

  const [show, setShow] = useState(true);

  const hideModal = () => {
    setShow(false);
  }
  
  const showHideClassModal = show ? 'modal visible-modal' : 'modal hidden-modal';

  return (
    <div className={showHideClassModal}>
      {children}
      <button onClick={hideModal}>Start game</button>
    </div>
  )
}

export default Modal;