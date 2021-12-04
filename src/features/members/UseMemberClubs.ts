import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app-store';
import { loadMemberClubs } from '../../store/MemberClubSlice';

const useMemberClubs = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadMemberClubs());
  }, [dispatch]);

  return useAppSelector((state) => state.memberClubs);
};

export default useMemberClubs;
