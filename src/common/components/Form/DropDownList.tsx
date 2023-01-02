import React, { useEffect } from 'react';
import { DropDownListDataModel } from '../../models/DropDownListDataModel';

interface Props {
  label: string;
  name: string;
  data: any[];
  idPropName: string;
  valuePropName: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
  value: number;
  required: boolean;
}

const DropDownList = ({
  label,
  name,
  data,
  idPropName,
  valuePropName,
  onChange,
  onBlur,
  value,
  required,
}: Props) => {
  // Extract Dropdown List
  useEffect(() => {
    if (data) {
      data.map(dropdownListDataProps(idPropName, valuePropName));
    }
  }, [data]);

  // Extract Dropdown List Properties
  const dropdownListDataProps = (...props: any) => {
    return (obj: any) => {
      // Drop Down Data
      const dropDownData = {};

      props.forEach((name: string) => {
        (dropDownData as any)[name] = obj[name];
      });

      // Return Extracted Properties
      return dropDownData;
    };
  };

  return (
    <>
      {data && (
        <div>
          <label
            htmlFor={name}
            className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
          <select
            id={name}
            name={name}
            required={required}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {data.map((option) => (
              <option key={option.id} value={option.id}>
                {option[valuePropName]}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default DropDownList;
