import { Fragment } from 'react';
import { toast, ToastBar, Toaster } from 'react-hot-toast';
import tw from 'tailwind-styled-components';

const Alert = tw.div`
  cursor-pointer
`;

export function Notifications(): JSX.Element {
  const closeNotification = (id: string) => (): void => {
    toast.dismiss(id);
  };

  return (
    <Toaster position="top-center">
      {(toaster) => (
        <Alert role="presentation" onClick={closeNotification(toaster.id)}>
          <ToastBar toast={toaster}>
            {({ icon, message }) => (
              <Fragment>
                {icon}
                {message}
              </Fragment>
            )}
          </ToastBar>
        </Alert>
      )}
    </Toaster>
  );
}
