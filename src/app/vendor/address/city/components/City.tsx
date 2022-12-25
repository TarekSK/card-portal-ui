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

// State
const mapState = (state: RootState) => ({
  city: state.city,
});

// Connector
const connector = connect(mapState, cityRedux.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Componenet
const City: FC<PropsFromRedux> = ({ city }) => {
  // Default Values
  const cityDefault: CityWriteModel = {
    id: 0,
    name: '',
  };

  // Dispatch
  const dispatch = useDispatch();
  // Loading
  let { loading } = city;
  // IsShow Data Modal
  const [isShowDataModal, setIsShowDataModal] = useState<boolean>(false);
  // IsShow Delete Modal
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  // Selected City
  const [selectedCity, setSelectedCity] = useState<CityWriteModel>(cityDefault);
  // Action Type
  const [actionType, SetActionType] = useState<ActionTypeEnum>(
    ActionTypeEnum.Create,
  );

  useEffect(() => {
    dispatch(cityRedux.actions.requestCity());
  }, []);

  // Actions
  const action = async (city: CityWriteModel, actionType: ActionTypeEnum) => {
    // Selected City - Set
    await setSelectedCity(city);
    // Action Type - Set
    await SetActionType(actionType);
    // Show Data Modal
    await setIsShowDataModal(true);
  };

  // Handle Create Click
  const handleCreateClick = async () => {
    // Create
    action(cityDefault, ActionTypeEnum.Create);
  };

  // Handle Edit Click
  const handleEditClick = async (city: CityWriteModel) => {
    // Create
    action(city, ActionTypeEnum.Update);
  };

  // Handle Form Save
  const handleFormSave = (isSaved: boolean) => {
    // Load City Data
    dispatch(cityRedux.actions.requestCity());
    return 0;
  };

  // Handle Delete Click
  const handleDeleteClick = async (city: CityWriteModel) => {
    // Selected City - Set
    await setSelectedCity(city);

    // Show Delete Modal
    await setIsShowDeleteModal(true);
  };

  // Handle Delete
  const handleDelete = async (isDelete: boolean) => {
    if (isDelete) {
      console.log('delete .............');
      // Delete
      await cityActions.deleteCity(selectedCity);
      // Load City Data
      dispatch(cityRedux.actions.requestCity());
    }
  };

  return (
    <div className="flex-auto w-96">
      <div className="m-3 shadow flex p-3 px-4 font-semibold text-blue-600 dark:text-white bg-slate-50 rounded">
        <h2 className="text-2xl flex-none ">Cities</h2>
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
        {city.city && (
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
                {city.city?.map((city) => (
                  <tr
                    key={city.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="py-4 px-6">{city.id}</td>
                    <td className="py-4 px-6">{city.name}</td>
                    <td className=" text-right px-6 transition-colors">
                      <button
                        className="p-3 ml-2 rounded text-slate-600 hover:text-blue-600 hover:bg-slate-200"
                        onClick={async () => await handleEditClick(city)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="p-3 ml-2 rounded text-slate-600 hover:text-red-600 hover:bg-slate-200"
                        onClick={async () => await handleDeleteClick(city)}
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
      <CityForm
        city={selectedCity}
        actionType={actionType}
        isShowModal={isShowDataModal}
        setIsShowModal={async (isShowDataModal) =>
          setIsShowDataModal(isShowDataModal)
        }
        onOK={(isSaved: boolean) => handleFormSave(isSaved)}
      />
      <DeleteConfirmModal
        title="City"
        recordText={selectedCity.name}
        isShowModal={isShowDeleteModal}
        setIsShowModal={async (isShowDeleteModal) =>
          setIsShowDeleteModal(isShowDeleteModal)
        }
        onOK={async (isDelete: boolean) => handleDelete(isDelete)}
      />
    </div>
  );
};

export default connector(City);
