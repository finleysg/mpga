import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IApplicationState } from "../../store";
import MemberClubActions from "../../store/MemberClubActions";

const useMemberClubs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(MemberClubActions.LoadMemberClubs());
    }, [dispatch]);

    return useSelector((state: IApplicationState) => state.memberClubs.clubs);
};

export default useMemberClubs;
