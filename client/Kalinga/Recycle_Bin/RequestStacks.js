import RequestorHome from '../screens/Requestor/Home';
import ReqEducLibrary from '../screens/Requestor/EducLibrary';
import { globalHeaderOptions, globalMainHeaderOptions} from '../styles/globalHeader';


export const requestPages = {
    RequestorHome: {
      screen: RequestorHome,
      navigationOptions: {
        ...globalMainHeaderOptions,
        title: 'Request Home', 
       
      }
    },
  
    ReqEduclibrary: {
      screen: ReqEducLibrary,
      navigationOptions: {
        ...globalHeaderOptions,
        title: 'Education Library',
      }
  
    },
  };