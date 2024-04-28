import DonorHome from '../screens/Donor/Home';
import DonorEduclibrary from '../screens/Donor/EducLibrary';
import { globalHeaderOptions, globalMainHeaderOptions} from '../styles/globalHeader';

export const donorPages = {
    DonorHome: {
      screen: DonorHome,
      navigationOptions: {
        ...globalMainHeaderOptions,
        title: 'Donor Home', 
       
      }
    },
  
    DonorEduclibrary: {
      screen: DonorEduclibrary,
      navigationOptions: {
        ...globalHeaderOptions,
        title: 'Education Library',
      }
  
    },
  };