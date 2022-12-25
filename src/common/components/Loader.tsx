import React from 'react';

interface Props {
  loading?: boolean;
  children: any;
}

const Loader: React.FC<Props> = (props) => {
  // Props
  let { loading, children } = props;

  if (loading) {
    return (
      <div className=" m-auto items-center flex justify-center content-center w-full h-full">
        <img src="\images\loading.svg" />
      </div>
    );
  } else if (children) {
    return <>{children} </>;
  } else {
    return null;
  }
};

export { Loader };
