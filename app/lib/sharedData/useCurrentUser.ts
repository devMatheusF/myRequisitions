import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../../app/store/store';
import { syncUserData } from '../../store/currentUserSlice';

export const useCurrentUser = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.currentUser);
  
  useEffect(() => {
    if (name === '') {
      dispatch(syncUserData({ 
        access: {},
        name: 'Matheus'
      }));
    }
  }, [name, dispatch]);

  return {
    name
  };
};
