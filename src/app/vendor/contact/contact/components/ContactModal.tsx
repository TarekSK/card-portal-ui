import React, { useState, useEffect } from 'react';
import FormModalFooter from '../../../../../common/components/Form/FormModalFooter';
import FormModalLayout from '../../../../../common/components/Form/FormModalLayout';

interface ContactModalProps {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
}

const ContactModal = ({ isShow, setIsShow }: ContactModalProps) => {
  // State - Is Show Modal
  const [isShowModal, setIsShowModal] = useState<boolean>(isShow);

  // Detect [isShow] Changes
  useEffect(() => {
    setIsShowModal(isShow);
  }, [isShow]);

  // Handle Close
  const handleClose = async () => {
    // Close
    await setIsShowModal(false);
    await setIsShow(false);
  };

  // Form - Content
  const content = () => {
    return (
      <>
        <div className="p-6">
          <h5>Vendor Contact Data View Goes Here</h5>
          <h6>Vendor Contact Form Create, Update Goes Here</h6>
        </div>
        <FormModalFooter cancelButtonOnClick={handleClose} isSubmit={false} />
      </>
    );
  };

  return (
    <>
      {isShowModal && (
        <FormModalLayout
          headerTitle="Contact"
          headerOnClose={handleClose}
          formContent={content()}
        />
      )}
    </>
  );
};

export default ContactModal;
