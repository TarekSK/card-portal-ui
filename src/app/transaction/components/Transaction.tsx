import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import DeleteConfirmModal from '../../../common/components/DeleteConfirmModal';
import { Loader } from '../../../common/components/Loader';
import ActionTypeEnum from '../../../common/enum/ActionTypeEnum';
import { RootState } from '../../../config/redux/RootReducer';
import { TransactionWriteModel } from '../models/TransactionWriteModel';
import * as transactionRedux from '../redux/TransactionRedux';
import * as transactionActions from '../redux/TransactionActions';
import TransactionForm from './TransactionForm';
import DataViewHeader from '../../../common/components/DataView/DataViewHeader';
import Table from '../../../common/components/DataView/TableLayout/Table';
import TransactionTypeEnum from '../enum/TransactionTypeEnum';

// State
const mapState = (state: RootState) => ({
  transaction: state.transaction,
});

// Connector
const connector = connect(mapState, transactionRedux.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Componenet
const Transaction: FC<PropsFromRedux> = ({ transaction }) => {
  // Dispatch
  const dispatch = useDispatch();
  // Loading
  let { loading } = transaction;
  // IsShow Data Modal
  const [isShowDataModal, setIsShowDataModal] = useState<boolean>(false);
  // Record Default Values
  const recordDefaultValues: TransactionWriteModel = {
    id: 0,
    cardNumber: '',
    amount: 0,
    date: new Date().toISOString().slice(0, 10),
    type: TransactionTypeEnum.Normal,
    userId: 0,
    vendorId: 0,
  };
  // Selected Record
  const [selectedRecord, setSelectedRecord] =
    useState<TransactionWriteModel>(recordDefaultValues);
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
    await dispatch(transactionRedux.actions.requestTransaction());
  };

  // Handle Action
  // [Create]
  const handleAction = async (
    actionType: ActionTypeEnum,
    data: TransactionWriteModel,
  ) => {
    // Selected Record - Set
    await setSelectedRecord(data);

    // Action Type - Set
    await SetActionType(actionType);

    // Show Data Modal
    await setIsShowDataModal(true);
  };

  // Handle Create
  const handleCreate = async () => {
    handleAction(ActionTypeEnum.Create, recordDefaultValues);
  };

  return (
    <div className="flex-auto w-96">
      <DataViewHeader title="Transactions" onCreate={handleCreate} />
      <Loader loading={loading}>
        {transaction.transaction && (
          <Table
            data={transaction.transaction as any}
            idColumn="id"
            columnsDisplay={[
              'id',
              'date',
              'amount',
              'type',
              'cardNumber',
              'vendorId',
              'userId',
            ]}
            columnsHeaders={[
              '#',
              'Date',
              'Amount',
              'Type',
              'Card Number',
              'Vendor',
              'User',
              '',
            ]}
            isEdit={false}
            onEdit={undefined}
            isDelete={false}
            onDelete={undefined}
          />
        )}
      </Loader>
      <TransactionForm
        transaction={selectedRecord}
        actionType={actionType}
        isShowModal={isShowDataModal}
        setIsShowModal={async (isShowDataModal) =>
          setIsShowDataModal(isShowDataModal)
        }
        reloadData={dataGet}
      />
    </div>
  );
};

export default connector(Transaction);
