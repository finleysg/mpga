import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../components/Loading";
import { IApplicationState } from "../../store";
import AccountEmail from "./AccountEmail";
import AccountPassword from "./AccountPassword";
import AccountName from "./AccountName";
import HomeClub from "./HomeClub";
import AccountContact from "./AccountContact";
import MemberClubActions from "../../store/MemberClubActions";
import UserActions from "../../store/UserActions";

const AccountDetail: React.FC = () => {
    const dispatch = useDispatch();
    const session = useSelector((state: IApplicationState) => state.session);
    const clubState = useSelector((state: IApplicationState) => state.memberClubs);

    useEffect(() => {
        dispatch(MemberClubActions.LoadMemberClubs());
        dispatch(UserActions.LoadContact(session.user.email));
    }, [dispatch, session.user.email]);

    return (
        <div>
            <h3 className="text-primary">MPGA Account Details</h3>
            {session.flags.isBusy && <Loading />}
            {!session.flags.isBusy && (
                <React.Fragment>
                    <AccountEmail />
                    <AccountPassword />
                    <AccountName />
                    <HomeClub clubs={clubState.clubs} />
                    <AccountContact />
                </React.Fragment>
            )}
        </div>
    );
};

export default AccountDetail;