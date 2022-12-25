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

// State
const mapState = (state: RootState) => ({
  user: state.user,
});

// Connector
const connector = connect(mapState, userRedux.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Componenet
const User: FC<PropsFromRedux> = ({ user }) => {
  // Default Values
  const userDefault: UserWriteModel = {
    id: 0,
    lastName: '',
    firstName: '',
    username: '',
    password: '',
  };

  // Dispatch
  const dispatch = useDispatch();
  // Loading
  let { loading } = user;
  // IsShow Data Modal
  const [isShowDataModal, setIsShowDataModal] = useState<boolean>(false);
  // IsShow Delete Modal
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  // Selected User
  const [selectedUser, setSelectedUser] = useState<UserWriteModel>(userDefault);
  // Action Type
  const [actionType, SetActionType] = useState<ActionTypeEnum>(
    ActionTypeEnum.Create,
  );

  useEffect(() => {
    dispatch(userRedux.actions.requestUser());
  }, []);

  // Actions
  const action = async (user: UserWriteModel, actionType: ActionTypeEnum) => {
    // Selected User - Set
    await setSelectedUser(user);
    // Action Type - Set
    await SetActionType(actionType);
    // Show Data Modal
    await setIsShowDataModal(true);
  };

  // Handle Create Click
  const handleCreateClick = async () => {
    // Create
    action(userDefault, ActionTypeEnum.Create);
  };

  // Handle Edit Click
  const handleEditClick = async (user: UserWriteModel) => {
    // Create
    action(user, ActionTypeEnum.Update);
  };

  // Handle Form Save
  const handleFormSave = (isSaved: boolean) => {
    // Load User Data
    dispatch(userRedux.actions.requestUser());
    return 0;
  };

  // Handle Delete Click
  const handleDeleteClick = async (user: UserWriteModel) => {
    // Selected User - Set
    await setSelectedUser(user);

    // Show Delete Modal
    await setIsShowDeleteModal(true);
  };

  // Handle Delete
  const handleDelete = async (isDelete: boolean) => {
    if (isDelete) {
      console.log('delete .............');
      // Delete
      await userActions.deleteUser(selectedUser);
      // Load User Data
      dispatch(userRedux.actions.requestUser());
    }
  };

  return (
    <div className="flex-auto w-96">
      <div className="m-3 shadow flex p-3 px-4 font-semibold text-blue-600 dark:text-white bg-slate-50 rounded">
        <h2 className="text-2xl flex-none ">Users</h2>
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
        {user.user && (
          <div className="overflow-x-auto relative rounded shadow p-3 m-3 bg-slate-50">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-gray-300 rounded">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    #
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Last Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    First Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    User Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Created Date
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Last Login Time
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Last Pasword Change Date
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {user.user?.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="py-4 px-6">{user.id}</td>
                    <td className="py-4 px-6">{user.lastName}</td>
                    <td className="py-4 px-6">{user.firstName}</td>
                    <td className="py-4 px-6">{user.username}</td>
                    <td className="py-4 px-6">
                      {user.createdDate!.toString()}
                    </td>
                    <td className="py-4 px-6">
                      {user.lastLoginTime!.toString()}
                    </td>
                    <td className="py-4 px-6">
                      {user.lastPasswordChangeDate!.toString()}
                    </td>
                    <td className=" text-right px-6 transition-colors">
                      <button
                        className="p-3 ml-2 rounded text-slate-600 hover:text-blue-600 hover:bg-slate-200"
                        onClick={async () => await handleEditClick(user)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="p-3 ml-2 rounded text-slate-600 hover:text-red-600 hover:bg-slate-200"
                        onClick={async () => await handleDeleteClick(user)}
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
      <UserForm
        user={selectedUser}
        actionType={actionType}
        isShowModal={isShowDataModal}
        setIsShowModal={async (isShowDataModal) =>
          setIsShowDataModal(isShowDataModal)
        }
        onOK={(isSaved: boolean) => handleFormSave(isSaved)}
      />
      <DeleteConfirmModal
        title="User"
        recordText={selectedUser.username}
        isShowModal={isShowDeleteModal}
        setIsShowModal={async (isShowDeleteModal) =>
          setIsShowDeleteModal(isShowDeleteModal)
        }
        onOK={async (isDelete: boolean) => handleDelete(isDelete)}
      />
    </div>
  );
};

export default connector(User);
