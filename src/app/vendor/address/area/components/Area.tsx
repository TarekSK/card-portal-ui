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

// State
const mapState = (state: RootState) => ({
  area: state.area,
});

// Connector
const connector = connect(mapState, areaRedux.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Componenet
const Area: FC<PropsFromRedux> = ({ area }) => {
  // Default Values
  const areaDefault: AreaWriteModel = {
    id: 0,
    name: '',
    cityId: 0,
  };

  // Dispatch
  const dispatch = useDispatch();
  // Loading
  let { loading } = area;
  // IsShow Data Modal
  const [isShowDataModal, setIsShowDataModal] = useState<boolean>(false);
  // IsShow Delete Modal
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  // Selected Area
  const [selectedArea, setSelectedArea] = useState<AreaWriteModel>(areaDefault);
  // Action Type
  const [actionType, SetActionType] = useState<ActionTypeEnum>(
    ActionTypeEnum.Create,
  );

  useEffect(() => {
    dispatch(areaRedux.actions.requestArea());
  }, []);

  // Actions
  const action = async (area: AreaWriteModel, actionType: ActionTypeEnum) => {
    // Selected Area - Set
    await setSelectedArea(area);
    // Action Type - Set
    await SetActionType(actionType);
    // Show Data Modal
    await setIsShowDataModal(true);
  };

  // Handle Create Click
  const handleCreateClick = async () => {
    // Create
    action(areaDefault, ActionTypeEnum.Create);
  };

  // Handle Edit Click
  const handleEditClick = async (area: AreaWriteModel) => {
    // Create
    action(area, ActionTypeEnum.Update);
  };

  // Handle Form Save
  const handleFormSave = (isSaved: boolean) => {
    // Load Area Data
    dispatch(areaRedux.actions.requestArea());
    return 0;
  };

  // Handle Delete Click
  const handleDeleteClick = async (area: AreaWriteModel) => {
    // Selected Area - Set
    await setSelectedArea(area);

    // Show Delete Modal
    await setIsShowDeleteModal(true);
  };

  // Handle Delete
  const handleDelete = async (isDelete: boolean) => {
    if (isDelete) {
      console.log('delete .............');
      // Delete
      await areaActions.deleteArea(selectedArea);
      // Load Area Data
      dispatch(areaRedux.actions.requestArea());
    }
  };

  return (
    <div className="flex-auto w-96">
      <div className="m-3 shadow flex p-3 px-4 font-semibold text-blue-600 dark:text-white bg-slate-50 rounded">
        <h2 className="text-2xl flex-none ">Areas</h2>
        <div className="ml-auto">
          <button
            className="p-3 ml-2 rounded text-slate-600 hover:text-blue-600 hover:bg-slate-200"
            onClick={() => {
              handleCreateClick();
            }}
          >
            <GoPlus />
          </button>
        </div>
      </div>
      <Loader loading={loading}>
        {area.area && (
          <div className="overflow-x-auto relative rounded shadow p-3 m-3 bg-slate-50">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-gray-300 rounded">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    #
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {area.area?.map((area) => (
                  <tr
                    key={area.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="py-4 px-6">{area.id}</td>
                    <td className="py-4 px-6">{area.name}</td>
                    <td className=" text-right px-6 transition-colors">
                      <button
                        className="p-3 ml-2 rounded text-slate-600 hover:text-blue-600 hover:bg-slate-200"
                        onClick={async () => await handleEditClick(area)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="p-3 ml-2 rounded text-slate-600 hover:text-red-600 hover:bg-slate-200"
                        onClick={async () => await handleDeleteClick(area)}
                      >
                        <GoX />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Loader>
      <AreaForm
        area={selectedArea}
        actionType={actionType}
        isShowModal={isShowDataModal}
        setIsShowModal={async (isShowDataModal) =>
          setIsShowDataModal(isShowDataModal)
        }
        onOK={(isSaved: boolean) => handleFormSave(isSaved)}
      />
      <DeleteConfirmModal
        title="Area"
        recordText={selectedArea.name}
        isShowModal={isShowDeleteModal}
        setIsShowModal={async (isShowDeleteModal) =>
          setIsShowDeleteModal(isShowDeleteModal)
        }
        onOK={async (isDelete: boolean) => handleDelete(isDelete)}
      />
    </div>
  );
};

export default connector(Area);
