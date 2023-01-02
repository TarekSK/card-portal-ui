import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import DeleteConfirmModal from '../../../common/components/DeleteConfirmModal';
import { Loader } from '../../../common/components/Loader';
import ActionTypeEnum from '../../../common/enum/ActionTypeEnum';
import { RootState } from '../../../config/redux/RootReducer';
import { CardWriteModel } from '../models/CardWriteModel';
import * as cardRedux from '../redux/CardRedux';
import * as cardActions from '../redux/CardActions';
import CardForm from './CardForm';
import DataViewHeader from '../../../common/components/DataView/DataViewHeader';
import Table from '../../../common/components/DataView/TableLayout/Table';
import CardStateEnum from '../enum/CardStateEnum';
import CardTypeEnum from '../enum/CardTypeEnum';

// State
const mapState = (state: RootState) => ({
  card: state.card,
});

// Connector
const connector = connect(mapState, cardRedux.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Componenet
const Card: FC<PropsFromRedux> = ({ card }) => {
  // Dispatch
  const dispatch = useDispatch();
  // Loading
  let { loading } = card;
  // IsShow Data Modal
  const [isShowDataModal, setIsShowDataModal] = useState<boolean>(false);
  // IsShow Delete Modal
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  // Record Default Values
  const recordDefaultValues: CardWriteModel = {
    id: 0,
    cardNumber: '',
    valid: true,
    state: CardStateEnum.Active,
    type: CardTypeEnum.Forint,
    currency: undefined,
    userId: 0,
  };
  // Selected Record
  const [selectedRecord, setSelectedRecord] =
    useState<CardWriteModel>(recordDefaultValues);
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
    await dispatch(cardRedux.actions.requestCard());
  };

  // Handle Delete
  const onDelete = async (isDelete: boolean) => {
    if (isDelete) {
      // Delete
      await cardActions.deleteCard(selectedRecord);
      // Data - Get
      await dataGet();
    }
  };

  // Handle Action
  // [Create, Update, Delete]
  const handleAction = async (
    actionType: ActionTypeEnum,
    data: CardWriteModel,
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
  const handleEdit = async (data: CardWriteModel) => {
    handleAction(ActionTypeEnum.Update, data);
  };
  // Handle Delete
  const handleDelete = async (data: CardWriteModel) => {
    handleAction(ActionTypeEnum.Delete, data);
  };

  return (
    <div className="flex-auto w-96">
      <DataViewHeader title="Cards" onCreate={handleCreate} />
      <Loader loading={loading}>
        {card.card && (
          <Table
            data={card.card as any}
            idColumn="id"
            columnsDisplay={[
              'id',
              'userId',
              'cardNumber',
              'valid',
              'state',
              'type',
              'currency',
            ]}
            columnsHeaders={[
              'id',
              'userId',
              'cardNumber',
              'valid',
              'state',
              'type',
              'currency',
              '',
            ]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Loader>
      <CardForm
        card={selectedRecord}
        actionType={actionType}
        isShowModal={isShowDataModal}
        setIsShowModal={async (isShowDataModal) =>
          setIsShowDataModal(isShowDataModal)
        }
        reloadData={dataGet}
      />
      <DeleteConfirmModal
        title="Card"
        recordText={selectedRecord.cardNumber}
        isShowModal={isShowDeleteModal}
        setIsShowModal={async (isShowDeleteModal) =>
          setIsShowDeleteModal(isShowDeleteModal)
        }
        onOK={async (isDelete: boolean) => onDelete(isDelete)}
      />
    </div>
  );
};

export default connector(Card);
