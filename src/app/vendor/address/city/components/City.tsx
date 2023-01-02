import React, { FC, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { GoPlus, GoX } from 'react-icons/go';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import DeleteConfirmModal from '../../../../../common/components/DeleteConfirmModal';
import { Loader } from '../../../../../common/components/Loader';
import ActionTypeEnum from '../../../../../common/enum/ActionTypeEnum';
import { RootState } from '../../../../../config/redux/RootReducer';
import { CityWriteModel } from '../models/CityWriteModel';
import * as cityRedux from '../redux/CityRedux';
import * as cityActions from '../redux/CityActions';
import CityForm from './CityForm';
import DataViewHeader from '../../../../../common/components/DataView/DataViewHeader';
import DataViewRowActions from '../../../../../common/components/DataView/TableLayout/TableRowActions';
import Table from '../../../../../common/components/DataView/TableLayout/Table';

// State
const mapState = (state: RootState) => ({
  city: state.city,
});

// Connector
const connector = connect(mapState, cityRedux.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Componenet
const City: FC<PropsFromRedux> = ({ city }) => {
  // Dispatch
  const dispatch = useDispatch();
  // Loading
  let { loading } = city;
  // IsShow Data Modal
  const [isShowDataModal, setIsShowDataModal] = useState<boolean>(false);
  // IsShow Delete Modal
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  // Record Default Values
  const recordDefaultValues: CityWriteModel = {
    id: 0,
    name: '',
  };
  // Selected Record
  const [selectedRecord, setSelectedRecord] =
    useState<CityWriteModel>(recordDefaultValues);
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
    await dispatch(cityRedux.actions.requestCity());
  };

  // Handle Delete
  const onDelete = async (isDelete: boolean) => {
    if (isDelete) {
      // Delete
      await cityActions.deleteCity(selectedRecord);
      // Data - Get
      await dataGet();
    }
  };

  // Handle Action
  // [Create, Update, Delete]
  const handleAction = async (
    actionType: ActionTypeEnum,
    data: CityWriteModel,
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
  const handleEdit = async (data: CityWriteModel) => {
    handleAction(ActionTypeEnum.Update, data);
  };
  // Handle Delete
  const handleDelete = async (data: CityWriteModel) => {
    handleAction(ActionTypeEnum.Delete, data);
  };

  return (
    <div className="flex-auto w-96">
      <DataViewHeader title="Cities" onCreate={handleCreate} />
      <Loader loading={loading}>
        {city.city && (
          <Table
            data={city.city as any}
            idColumn="id"
            columnsDisplay={['id', 'name']}
            columnsHeaders={['#', 'name', '']}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Loader>
      <CityForm
        city={selectedRecord}
        actionType={actionType}
        isShowModal={isShowDataModal}
        setIsShowModal={async (isShowDataModal) =>
          setIsShowDataModal(isShowDataModal)
        }
        reloadData={dataGet}
      />
      <DeleteConfirmModal
        title="City"
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

export default connector(City);
