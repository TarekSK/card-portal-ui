import React, { FC, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { GoPlus, GoX } from 'react-icons/go';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import DeleteConfirmModal from '../../../../../common/components/DeleteConfirmModal';
import { Loader } from '../../../../../common/components/Loader';
import ActionTypeEnum from '../../../../../common/enum/ActionTypeEnum';
import { RootState } from '../../../../../config/redux/RootReducer';
import { ContactTypeWriteModel } from '../models/ContactTypeWriteModel';
import * as contactTypeRedux from '../redux/ContactTypeRedux';
import * as contactTypeActions from '../redux/ContactTypeActions';
import ContactTypeForm from './ContactTypeForm';

// State
const mapState = (state: RootState) => ({
  contactType: state.contactType,
});

// Connector
const connector = connect(mapState, contactTypeRedux.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Componenet
const ContactType: FC<PropsFromRedux> = ({ contactType }) => {
  // Default Values
  const contactTypeDefault: ContactTypeWriteModel = {
    id: 0,
    name: '',
  };

  // Dispatch
  const dispatch = useDispatch();
  // Loading
  let { loading } = contactType;
  // IsShow Data Modal
  const [isShowDataModal, setIsShowDataModal] = useState<boolean>(false);
  // IsShow Delete Modal
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  // Selected ContactType
  const [selectedContactType, setSelectedContactType] =
    useState<ContactTypeWriteModel>(contactTypeDefault);
  // Action Type
  const [actionType, SetActionType] = useState<ActionTypeEnum>(
    ActionTypeEnum.Create,
  );

  useEffect(() => {
    dispatch(contactTypeRedux.actions.requestContactType());
  }, []);

  // Actions
  const action = async (
    contacttype: ContactTypeWriteModel,
    actionType: ActionTypeEnum,
  ) => {
    // Selected ContactType - Set
    await setSelectedContactType(contacttype);
    // Action Type - Set
    await SetActionType(actionType);
    // Show Data Modal
    await setIsShowDataModal(true);
  };

  // Handle Create Click
  const handleCreateClick = async () => {
    // Create
    action(contactTypeDefault, ActionTypeEnum.Create);
  };

  // Handle Edit Click
  const handleEditClick = async (contacttype: ContactTypeWriteModel) => {
    // Create
    action(contacttype, ActionTypeEnum.Update);
  };

  // Handle Form Save
  const handleFormSave = (isSaved: boolean) => {
    // Load ContactType Data
    dispatch(contactTypeRedux.actions.requestContactType());
    return 0;
  };

  // Handle Delete Click
  const handleDeleteClick = async (contacttype: ContactTypeWriteModel) => {
    // Selected ContactType - Set
    await setSelectedContactType(contacttype);

    // Show Delete Modal
    await setIsShowDeleteModal(true);
  };

  // Handle Delete
  const handleDelete = async (isDelete: boolean) => {
    if (isDelete) {
      console.log('delete .............');
      // Delete
      await contactTypeActions.deleteContactType(selectedContactType);
      // Load ContactType Data
      dispatch(contactTypeRedux.actions.requestContactType());
    }
  };

  return (
    <div className="flex-auto w-96">
      <div className="m-3 shadow flex p-3 px-4 font-semibold text-blue-600 dark:text-white bg-slate-50 rounded">
        <h2 className="text-2xl flex-none ">Contact Types</h2>
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
        {contactType.contactType && (
          <div className="overflow-x-auto relative rounded shadow p-3 m-3 bg-slate-50">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-gray-300 rounded">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    #
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Contact Type
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {contactType.contactType?.map((contactType) => (
                  <tr
                    key={contactType.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="py-4 px-6">{contactType.id}</td>
                    <td className="py-4 px-6">{contactType.name}</td>
                    <td className=" text-right px-6 transition-colors">
                      <button
                        className="p-3 ml-2 rounded text-slate-600 hover:text-blue-600 hover:bg-slate-200"
                        onClick={async () => await handleEditClick(contactType)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="p-3 ml-2 rounded text-slate-600 hover:text-red-600 hover:bg-slate-200"
                        onClick={async () =>
                          await handleDeleteClick(contactType)
                        }
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
      <ContactTypeForm
        contacttype={selectedContactType}
        actionType={actionType}
        isShowModal={isShowDataModal}
        setIsShowModal={async (isShowDataModal) =>
          setIsShowDataModal(isShowDataModal)
        }
        onOK={(isSaved: boolean) => handleFormSave(isSaved)}
      />
      <DeleteConfirmModal
        title="Contact Type"
        recordText={selectedContactType.name}
        isShowModal={isShowDeleteModal}
        setIsShowModal={async (isShowDeleteModal) =>
          setIsShowDeleteModal(isShowDeleteModal)
        }
        onOK={async (isDelete: boolean) => handleDelete(isDelete)}
      />
    </div>
  );
};

export default connector(ContactType);
