import React from 'react';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { FaSave } from 'react-icons/fa';

import { useAppSelector } from '../app-store';

export type ActiveState = {
  busy?: boolean;
};

export default function SubmitButton(props: ActiveState) {
  const appState = useAppSelector((state) => state.app);
  const isBusy = props.busy !== undefined ? props.busy : appState.isBusy;

  return (
    <Button variant="secondary" type="submit" size="sm" disabled={isBusy}>
      {isBusy ? (
        <Spinner animation="border" variant="light" size="sm" />
      ) : (
        <FaSave color="whitesmoke" />
      )}{" "}
      Save
    </Button>
  );
}
