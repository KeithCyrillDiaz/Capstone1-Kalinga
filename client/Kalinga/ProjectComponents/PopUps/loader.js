import Spinner from "react-native-loading-spinner-overlay";

export const Loader = ({visible}) => {
    return (
        <Spinner 
        visible = {visible}
        textContent={'Processing...'}
        textStyle={{ color: '#FFF' }}
    />
    )
}