import React, { FC, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { GoPlus, GoX } from 'react-icons/go';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import DeleteConfirmModal from '../../../../../common/components/DeleteConfirmModal';
import { Loader } from '../../../../../common/components/Loader';
import ActionTypeEnum from '../../../../../common/enum/ActionTypeEnum';
import { RootState } from '../../../../../config/redux/RootReducer';
import { AreaWriteModel } from '../models/AreaWriteModel';
import * as areaRedux from '../redux/AreaRedux';
import * as areaActions from '../redux/AreaActions';
import AreaForm from './AreaForm';
import DataViewHeader from '../../../../../common/components/DataView/DataViewHeader';
import DataViewRowActions from '../../../../../common/components/DataView/TableLayout/TableRowActions';
import Table from '../../../../../common/components/DataView/TableLayout/Table';

// State
const mapState = (state: RootState) => ({
  area: state.area,
});

// Connector
const connector = connect(mapState, areaRedux.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Componenet
const Area: FC<PropsFromRedux> = ({ area }) => {
  // Dispatch
  const dispatch = useDispatch();
  // Loading
  let { loading } = area;
  // IsShow Data Modal
  const [isShowDataModal, setIsShowDataModal] = useState<boolean>(false);
  // IsShow Delete Modal
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  // Record Default Values
  const recordDefaultValues: AreaWriteModel = {
    id: 0,
    name: '',
    cityId: 0,
  };
  // Selected Record
  const [selectedRecord, setSelectedRecord] =
    useState<AreaWriteModel>(recordDefaultValues);
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
    await dispatch(areaRedux.actions.requestArea());
  };

  // Handle Delete
  const onDelete = async (isDelete: boolean) => {
    if (isDelete) {
      // Delete
      await areaActions.deleteArea(selectedRecord);
      // Data - Get
      await dataGet();
    }
  };

  // Handle Action
  // [Create, Update, Delete]
  const handleAction = async (
    actionType: ActionTypeEnum,
    data: AreaWriteModel,
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
  const handleEdit = async (data: AreaWriteModel) => {
    handleAction(ActionTypeEnum.Update, data);
  };
  // Handle Delete
  const handleDelete = async (data: AreaWriteModel) => {
    handleAction(ActionTypeEnum.Delete, data);
  };

  return (
    <div className="flex-auto w-96">
      <DataViewHeader title="Areas" onCreate={handleCreate} />
      <Loader loading={loading}>
        {area.area && (
          <Table
            data={area.area as any}
            idColumn="id"
            columnsDisplay={['id', 'name']}
            columnsHeaders={['#', 'name', '']}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Loader>
      <AreaForm
        area={selectedRecord}
        actionType={actionType}
        isShowModal={isShowDataModal}
        setIsShowModal={async (isShowDataModal) =>
          setIsShowDataModal(isShowDataModal)
        }
        reloadData={dataGet}
      />
      <DeleteConfirmModal
        title="Area"
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

export default connector(Area);
