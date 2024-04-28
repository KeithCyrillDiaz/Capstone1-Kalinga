import DonorHome from '../screens/Donor/Home';
import DonorEduclibrary from '../screens/Donor/EducLibrary';
import { globalHeaderOptions, globalMainHeaderOptions} from '../styles/globalHeader';


export const adminPages = {
    DonorHome: {
      screen: DonorHome,
      navigationOptions: {
        ...globalMainHeaderOptions,
        title: 'Admin Home', 
       
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