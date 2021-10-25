import { useDispatch } from "react-redux";
import { updateNotification } from "../Redux/notification";

export default function useNotifier() {
    const dispatch = useDispatch();

    function notify(notification) {
        dispatch(updateNotification(notification));
    }

    return { notify }
}