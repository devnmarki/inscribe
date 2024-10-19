type ModalType = {
  children?: any;
};

const Modal = (props: ModalType) => {
  return (
    <div className="w-full h-full absolute top-0 left-0 z-50">
      {props.children}
    </div>
  );
};

export default Modal;
