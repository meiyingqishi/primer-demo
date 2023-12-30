import {
  useCallback,
  useRef, 
  useState 
} from "react";

import {
  BaseStyles,
  Box,
  Button,
  Dialog,
  Text,
  ThemeProvider
} from "@primer/react";

import {
  ZapIcon
 } from "@primer/octicons-react";

import "@primer/css/index.scss";


export default function App() {
  // Old dialog api hook
  const [isOpenOldApi, setIsOpenOldApi] = useState(false);
  const returnFocusRef = useRef(null);

  // New dialog api hook
  const [isOpenNewApi, setIsOpenNewApi] = useState(false)
  const [secondOpenNewApi, setSecondOpenNewApi] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpenNewApi(false), [])
  const onSecondDialogClose = useCallback(() => setSecondOpenNewApi(false), [])
  const openSecondDialog = useCallback(() => setSecondOpenNewApi(true), [])

  return (
    <ThemeProvider>
      <BaseStyles>
        <div className="d-flex flex-justify-center flex-items-center flex-column">

          <Button className="mt-3" ref={returnFocusRef} onClick={() => setIsOpenOldApi(true)}>
            Show dialog old api
          </Button>
          <Dialog
            aria-labelledby="header-id"
            isOpen={isOpenOldApi}
            onDismiss={() => setIsOpenOldApi(false)}
            returnFocusRef={returnFocusRef}
          >
            <Dialog.Header id="header-id">
              <ZapIcon className="mr-1" />
              Title
            </Dialog.Header>
            <Box p={3}>
              <Text fontFamily="sans-serif">Some content.</Text>
              <hr />
              Another content.
              <Box display="flex" mt={3} justifyContent="flex-end">
                <Button sx={{mr: 1}}>Cancel</Button>
                <Button variant="danger">Delete</Button>
              </Box>
            </Box>
          </Dialog>
          
          <Button className="mt-3" ref={buttonRef} onClick={() => setIsOpenNewApi(!isOpenNewApi)}>
            Show dialog new api
          </Button>
          {isOpenNewApi && (
            <Dialog
              title="My Dialog"
              subtitle="This is a subtitle!"
              onClose={onDialogClose}
              footerButtons={[
                {
                  buttonType: 'normal',
                  content: 'Open Second Dialog',
                  onClick: openSecondDialog,
                },
                {
                  buttonType: 'danger',
                  content: 'Delete the universe',
                  onClick: onDialogClose,
                },
                {
                  buttonType: 'primary',
                  content: 'Proceed',
                  onClick: openSecondDialog,
                  autoFocus: true,
                },
              ]}
            >
              <p>This is a p.</p>
              {secondOpenNewApi && (
                <Dialog
                  title="Inner dialog!"
                  onClose={onSecondDialogClose}
                  width="small"
                >
                  Hello world
                </Dialog>
              )}
            </Dialog>
          )}

        </div>
      </BaseStyles>
    </ThemeProvider>
  )
}