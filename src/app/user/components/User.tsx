import React, { FC, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { GoPlus, GoX } from 'react-icons/go';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import DeleteConfirmModal from '../../../common/components/DeleteConfirmModal';
import { Loader } from '../../../common/components/Loader';
import ActionTypeEnum from '../../../common/enum/ActionTypeEnum';
import { RootState } from '../../../config/redux/RootReducer';
import { UserWriteModel } from '../models/UserWriteModel';
import * as userRedux from '../redux/UserRedux';
import * as userActions from '../redux/UserActions';
import UserForm from './UserForm';
import DataViewHeader from '../../../common/components/DataView/DataViewHeader';
import Table from '../../../common/components/DataView/TableLayout/Table';

// State
const mapState = (state: RootState) => ({
  user: state.user,
});

// Connector
const connector = connect(mapState, userRedux.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Componenet
const User: FC<PropsFromRedux> = ({ user }) => {
  // Dispatch
  const dispatch = useDispatch();
  // Loading
  let { loading } = user;
  // IsShow Data Modal
  const [isShowDataModal, setIsShowDataModal] = useState<boolean>(false);
  // IsShow Delete Modal
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  // Record Default Values
  const recordDefaultValues: UserWriteModel = {
    id: 0,
    lastName: '',
    firstName: '',
    username: '',
    password: '',
  };
  // Selected Record
  const [selectedRecord, setSelectedRecord] =
    useState<UserWriteModel>(recordDefaultValues);
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
    await dispatch(userRedux.actions.requestUser());
  };

  // Handle Delete
  const onDelete = async (isDelete: boolean) => {
    if (isDelete) {
      // Delete
      await userActions.deleteUser(selectedRecord);
      // Data - Get
      await dataGet();
    }
  };

  // Handle Action
  // [Create, Update, Delete]
  const handleAction = async (
    actionType: ActionTypeEnum,
    data: UserWriteModel,
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
  const handleEdit = async (data: UserWriteModel) => {
    handleAction(ActionTypeEnum.Update, data);
  };
  // Handle Delete
  const handleDelete = async (data: UserWriteModel) => {
    handleAction(ActionTypeEnum.Delete, data);
  };

  return (
    <div className="flex-auto w-96">
      <DataViewHeader title="Users" onCreate={handleCreate} />
      <Loader loading={loading}>
        {user.user && (
          <Table
            data={user.user as any}
            idColumn="id"
            columnsDisplay={[
              'id',
              'lastName',
              'firstName',
              'username',
              'createdDate',
            ]}
            columnsHeaders={[
              '#',
              'Last Name',
              'First Name',
              'Username',
              'Created Date',
              '',
            ]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Loader>
      <UserForm
        user={selectedRecord}
        actionType={actionType}
        isShowModal={isShowDataModal}
        setIsShowModal={async (isShowDataModal) =>
          setIsShowDataModal(isShowDataModal)
        }
        reloadData={dataGet}
      />
      <DeleteConfirmModal
        title="User"
        recordText={selectedRecord.username}
        isShowModal={isShowDeleteModal}
        setIsShowModal={async (isShowDeleteModal) =>
          setIsShowDeleteModal(isShowDeleteModal)
        }
        onOK={async (isDelete: boolean) => onDelete(isDelete)}
      />
    </div>
  );
};

export default connector(User);
