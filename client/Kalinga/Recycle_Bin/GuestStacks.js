import DonorHome from '../screens/Donor/Home';
import DonorEduclibrary from '../screens/Donor/EducLibrary';
import { globalHeaderOptions, globalMainHeaderOptions} from '../styles/globalHeader';

export const guestPages = {
    DonorHome: {
      screen: DonorHome,
      navigationOptions: {
        ...globalMainHeaderOptions,
        title: 'Guest Home', 
       
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