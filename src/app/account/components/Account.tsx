import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import DeleteConfirmModal from '../../../common/components/DeleteConfirmModal';
import { Loader } from '../../../common/components/Loader';
import ActionTypeEnum from '../../../common/enum/ActionTypeEnum';
import { RootState } from '../../../config/redux/RootReducer';
import { AccountWriteModel } from '../models/AccountWriteModel';
import * as accountRedux from '../redux/AccountRedux';
import * as accountActions from '../redux/AccountActions';
import AccountForm from './AccountForm';
import DataViewHeader from '../../../common/components/DataView/DataViewHeader';
import Table from '../../../common/components/DataView/TableLayout/Table';
import AccountTypeEnum from '../enum/AccountTypeEnum';

// State
const mapState = (state: RootState) => ({
  account: state.account,
});

// Connector
const connector = connect(mapState, accountRedux.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Componenet
const Account: FC<PropsFromRedux> = ({ account }) => {
  // Dispatch
  const dispatch = useDispatch();
  // Loading
  let { loading } = account;
  // IsShow Data Modal
  const [isShowDataModal, setIsShowDataModal] = useState<boolean>(false);
  // IsShow Delete Modal
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  // Record Default Values
  const recordDefaultValues: AccountWriteModel = {
    id: 0,
    balance: 0,
    type: AccountTypeEnum.Credit,
    userId: 0,
  };
  // Selected Record
  const [selectedRecord, setSelectedRecord] =
    useState<AccountWriteModel>(recordDefaultValues);
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
    await dispatch(accountRedux.actions.requestAccount());
  };

  // Handle Delete
  const onDelete = async (isDelete: boolean) => {
    if (isDelete) {
      // Delete
      await accountActions.deleteAccount(selectedRecord);
      // Data - Get
      await dataGet();
    }
  };

  // Handle Action
  // [Create, Update, Delete]
  const handleAction = async (
    actionType: ActionTypeEnum,
    data: AccountWriteModel,
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
  const handleEdit = async (data: AccountWriteModel) => {
    handleAction(ActionTypeEnum.Update, data);
  };
  // Handle Delete
  const handleDelete = async (data: AccountWriteModel) => {
    handleAction(ActionTypeEnum.Delete, data);
  };

  return (
    <div className="flex-auto w-96">
      <DataViewHeader title="Accounts" onCreate={handleCreate} />
      <Loader loading={loading}>
        {account.account && (
          <Table
            data={account.account as any}
            idColumn="id"
            columnsDisplay={['id', 'balance', 'type', 'userId']}
            columnsHeaders={['#', 'Balance', 'Type', 'User', '']}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Loader>
      <AccountForm
        account={selectedRecord}
        actionType={actionType}
        isShowModal={isShowDataModal}
        setIsShowModal={async (isShowDataModal) =>
          setIsShowDataModal(isShowDataModal)
        }
        reloadData={dataGet}
      />
      <DeleteConfirmModal
        title="Accounts"
        recordText={selectedRecord.id.toString()}
        isShowModal={isShowDeleteModal}
        setIsShowModal={async (isShowDeleteModal) =>
          setIsShowDeleteModal(isShowDeleteModal)
        }
        onOK={async (isDelete: boolean) => onDelete(isDelete)}
      />
    </div>
  );
};

export default connector(Account);
