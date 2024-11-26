/* eslint-disable @typescript-eslint/no-empty-function */
import { EditVpsInterface } from '@pages/vps/types';
import { createContext } from 'react';
interface EditVPSContextData {
  editVPSItems: EditVpsInterface[];
  setEditVPSItems: (editVPSItems: EditVpsInterface[]) => void;
}

const EditVPSContext = createContext<EditVPSContextData>({
  editVPSItems: [],
  setEditVPSItems: () => {},
});

export default EditVPSContext;
