import {createStackNavigator} from 'react-navigation-stack';

import {createAppContainer} from 'react-navigation';
import { adminPages } from './AdminStacks';
import { donorPages } from './DonorStacks';
import { guestPages } from './GuestStacks';
import { requestPages } from './RequestStacks';

// TEST ONLY
let i = 2;
let page = 0;

if(i === 1){
    page = guestPages;
} else if (i === 2) {
    page = donorPages;
   
} else if (i === 3){
    page = requestPages;
} else {
    page = adminPages;
};

//let page = donorPages;

const stackNavigator = createStackNavigator(page);
export default createAppContainer(stackNavigator);
