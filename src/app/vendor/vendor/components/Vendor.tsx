import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import DeleteConfirmModal from '../../../../common/components/DeleteConfirmModal';
import { Loader } from '../../../../common/components/Loader';
import ActionTypeEnum from '../../../../common/enum/ActionTypeEnum';
import { RootState } from '../../../../config/redux/RootReducer';
import { VendorWriteModel } from '../models/VendorWriteModel';
import * as vendorRedux from '../redux/VendorRedux';
import * as vendorActions from '../redux/VendorActions';
import VendorForm from './VendorForm';
import DataViewHeader from '../../../../common/components/DataView/DataViewHeader';
import Table from '../../../../common/components/DataView/TableLayout/Table';
import ContactModal from '../../contact/contact/components/ContactModal';
import AddressModal from '../../address/address/components/AddressModal';

// State
const mapState = (state: RootState) => ({
  vendor: state.vendor,
});

// Connector
const connector = connect(mapState, vendorRedux.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Componenet
const Vendor: FC<PropsFromRedux> = ({ vendor }) => {
  // Dispatch
  const dispatch = useDispatch();
  // Loading
  let { loading } = vendor;
  // IsShow Data Modal
  const [isShowDataModal, setIsShowDataModal] = useState<boolean>(false);
  // IsShow Delete Modal
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  // Record Default Values
  const recordDefaultValues: VendorWriteModel = {
    id: 0,
    name: '',
    addresses: undefined,
    contacts: undefined,
  };
  // Selected Record
  const [selectedRecord, setSelectedRecord] =
    useState<VendorWriteModel>(recordDefaultValues);
  // Action Type
  const [actionType, SetActionType] = useState<ActionTypeEnum>(
    ActionTypeEnum.Create,
  );
  // State - Is Show Contacts
  const [isShowContact, setIsShowContact] = useState<boolean>(false);
  // State - Is Show Address
  const [isShowAddress, setIsShowAddress] = useState<boolean>(false);

  useEffect(() => {
    // Data - Get
    dataGet();
  }, []);

  // Data - Get
  const dataGet = async () => {
    await dispatch(vendorRedux.actions.requestVendor());
  };

  // Handle Delete
  const onDelete = async (isDelete: boolean) => {
    if (isDelete) {
      // Delete
      await vendorActions.deleteVendor(selectedRecord);
      // Data - Get
      await dataGet();
    }
  };

  // Handle Action
  // [Create, Update, Delete]
  const handleAction = async (
    actionType: ActionTypeEnum,
    data: VendorWriteModel,
  ) => {
    // Selected Record - Set
    await setSelectedRecord(data);

    // Action Type - Set
    await SetActionType(actionType);

    if (
      actionType == ActionTypeEnum.Create ||
      actionType == ActionTypeEnum.Update
    ) {
      // Show Data Modal
      await setIsShowDataModal(true);
    } else if (actionType == ActionTypeEnum.Delete) {
      // Show Delete Modal
      await setIsShowDeleteModal(true);
    }
  };

  // Handle Create
  const handleCreate = async () => {
    handleAction(ActionTypeEnum.Create, recordDefaultValues);
  };
  // Handle Edit
  const handleEdit = async (data: VendorWriteModel) => {
    handleAction(ActionTypeEnum.Update, data);
  };
  // Handle Delete
  const handleDelete = async (data: VendorWriteModel) => {
    handleAction(ActionTypeEnum.Delete, data);
  };

  // Handle Contact
  const handleContact = async () => {
    // Contact - Show
    setIsShowContact(true);
    console.log('Contact ....');
  };

  // Handle Address
  const handleAddress = async () => {
    // Address - Show
    setIsShowAddress(true);
    console.log('Address ....');
  };

  return (
    <div className="flex-auto w-96">
      <DataViewHeader title="Vendors" onCreate={handleCreate} />
      <Loader loading={loading}>
        {vendor.vendor && (
          <Table
            data={vendor.vendor as any}
            idColumn="id"
            columnsDisplay={['id', 'name']}
            columnsHeaders={['#', 'name', '']}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDetails1={true}
            titleDetails1="Contacts"
            onClickDetails1={() => handleContact()}
            isDetails2={true}
            titleDetails2="Addresses"
            onClickDetails2={() => handleAddress()}
          />
        )}
      </Loader>
      <VendorForm
        vendor={selectedRecord}
        actionType={actionType}
        isShowModal={isShowDataModal}
        setIsShowModal={async (isShowDataModal) =>
          setIsShowDataModal(isShowDataModal)
        }
        reloadData={dataGet}
      />
      <DeleteConfirmModal
        title="Vendor"
        recordText={selectedRecord.name}
        isShowModal={isShowDeleteModal}
        setIsShowModal={async (isShowDeleteModal) =>
          setIsShowDeleteModal(isShowDeleteModal)
        }
        onOK={async (isDelete: boolean) => onDelete(isDelete)}
      />

      <ContactModal
        isShow={isShowContact}
        setIsShow={(isShowContact: boolean) => setIsShowContact(isShowContact)}
      />
      <AddressModal
        isShow={isShowAddress}
        setIsShow={(isShowAddress: boolean) => setIsShowAddress(isShowAddress)}
      />
    </div>
  );
};

export default connector(Vendor);
