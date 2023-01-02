import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import DeleteConfirmModal from '../../../../../common/components/DeleteConfirmModal';
import { Loader } from '../../../../../common/components/Loader';
import ActionTypeEnum from '../../../../../common/enum/ActionTypeEnum';
import { RootState } from '../../../../../config/redux/RootReducer';
import { ContactTypeWriteModel } from '../models/ContactTypeWriteModel';
import * as contactTypeRedux from '../redux/ContactTypeRedux';
import * as contactTypeActions from '../redux/ContactTypeActions';
import ContactTypeForm from './ContactTypeForm';
import DataViewHeader from '../../../../../common/components/DataView/DataViewHeader';
import Table from '../../../../../common/components/DataView/TableLayout/Table';

// State
const mapState = (state: RootState) => ({
  contactType: state.contactType,
});

// Connector
const connector = connect(mapState, contactTypeRedux.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Componenet
const ContactType: FC<PropsFromRedux> = ({ contactType }) => {
  // Dispatch
  const dispatch = useDispatch();
  // Loading
  let { loading } = contactType;
  // IsShow Data Modal
  const [isShowDataModal, setIsShowDataModal] = useState<boolean>(false);
  // IsShow Delete Modal
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  // Record Default Values
  const recordDefaultValues: ContactTypeWriteModel = {
    id: 0,
    name: '',
  };
  // Selected Record
  const [selectedRecord, setSelectedRecord] =
    useState<ContactTypeWriteModel>(recordDefaultValues);
  // Action Type
  const [actionType, SetActionType] = useState<ActionTypeEnum>(
    ActionTypeEnum.Create,
  );

  useEffect(() => {
    // Data - Get
    dataGet();
  }, []);

  // Data - Get
  const dataGet = async () => {
    await dispatch(contactTypeRedux.actions.requestContactType());
  };

  // Handle Delete
  const onDelete = async (isDelete: boolean) => {
    if (isDelete) {
      // Delete
      await contactTypeActions.deleteContactType(selectedRecord);
      // Data - Get
      await dataGet();
    }
  };

  // Handle Action
  // [Create, Update, Delete]
  const handleAction = async (
    actionType: ActionTypeEnum,
    data: ContactTypeWriteModel,
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
  const handleEdit = async (data: ContactTypeWriteModel) => {
    handleAction(ActionTypeEnum.Update, data);
  };
  // Handle Delete
  const handleDelete = async (data: ContactTypeWriteModel) => {
    handleAction(ActionTypeEnum.Delete, data);
  };

  return (
    <div className="flex-auto w-96">
      <DataViewHeader title="Contact Types" onCreate={handleCreate} />
      <Loader loading={loading}>
        {contactType.contactType && (
          <Table
            data={contactType.contactType as any}
            idColumn="id"
            columnsDisplay={['id', 'name']}
            columnsHeaders={['#', 'name', '']}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Loader>
      <ContactTypeForm
        contactType={selectedRecord}
        actionType={actionType}
        isShowModal={isShowDataModal}
        setIsShowModal={async (isShowDataModal) =>
          setIsShowDataModal(isShowDataModal)
        }
        reloadData={dataGet}
      />
      <DeleteConfirmModal
        title="Contact Type"
        recordText={selectedRecord.name}
        isShowModal={isShowDeleteModal}
        setIsShowModal={async (isShowDeleteModal) =>
          setIsShowDeleteModal(isShowDeleteModal)
        }
        onOK={async (isDelete: boolean) => onDelete(isDelete)}
      />
    </div>
  );
};

export default connector(ContactType);
