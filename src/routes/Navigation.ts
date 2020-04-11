import { useHistory } from "react-router-dom";

const useNavigation = () => {
    const history = useHistory();

    const navigate = (path: string) => {
        const location = { pathname: path }
        history.push(location);
    }

    return { navigate };
}

export default useNavigation;
