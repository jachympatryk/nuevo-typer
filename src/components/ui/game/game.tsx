import React, { useState } from "react";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { IconButton, FormInput } from "react-modern-components";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { GameProps } from "./game.types";
import { canEditGame } from "utils";
import { getCurrentRound } from "utils/game-round.utils";
import { initialValues } from "./game.constants";
import { flags } from "constants/flags.constants";
import { createPrediction } from "firestore";
import { RootState } from "store";
import { CreatePredictionData } from "firestore/predictions/predictions.types";
import { GameResult } from "models";

import { ReactComponent as CancelIcon } from "assets/icons/cancel.svg";
import { ReactComponent as AcceptIcon } from "assets/icons/accept.svg";

import styles from "./game.module.scss";

// TODO: disabled state

export const Game: React.FC<GameProps> = ({ game, className, noEditable = false, onSuccess }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { enqueueSnackbar } = useSnackbar();
  const { date, result, stadium, hostTeam, guestTeam, round, hostId, guestId } = game;
  const { canEdit, editToDate } = canEditGame(game);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditing = (value: boolean) => () => setIsEditing(value);
  const handleEditCancel = (callback: () => void) => () => {
    setIsEditing(false);
    callback();
  };

  const gameDate = new Date(date).toLocaleString();

  const gameEnded = result !== null;
  const showEditButton = canEdit && !isEditing && !gameEnded && !noEditable;
  const showEditContent = canEdit && isEditing && !gameEnded && !noEditable;

  const currentRound = getCurrentRound(new Date());
  const disabled = currentRound !== round;

  const HostIcon = flags[hostId];
  const GuestIcon = flags[guestId];

  const submitData = async (data: GameResult) => {
    if (user) {
      const details: CreatePredictionData = { user, gameId: game.id, predictedResult: data };

      try {
        await createPrediction(details);

        onSuccess?.();
        enqueueSnackbar("Twój typ został zapisany. Mecz oraz edycja będzie możliwa w zakładce 'Twoje typy'.", {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar("Błąd podczas obstawiania meczu.", { variant: "error" });
      }
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitData}>
      {({ handleSubmit, resetForm }) => (
        <Form className={classNames(styles.container, className)}>
          <div className={styles.team}>
            <h5 className={styles.teamName}>{hostTeam}</h5>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <HostIcon className={styles.flag} />
            {isEditing && (
              <FormInput
                label=""
                className={styles.textField}
                name="host"
                type="number"
                min={0}
                max={10}
                helperText={`Gospodarz: ${hostTeam}`}
              />
            )}
            {gameEnded && <h6 className={styles.result}>{result?.host}</h6>}
          </div>

          <div className={styles.info}>
            <p className={styles.stadium}>{stadium}</p>
            <p className={styles.dateCaption}>{gameDate}</p>
            <p className={styles.stadium}>{round}</p>

            {disabled && <p className={styles.caption}>Edycja zablokowana</p>}

            {!noEditable && canEdit && !gameEnded && editToDate && (
              <p className={styles.caption}>
                edycja możliwa do <br />
                <span className={styles.date}>{editToDate.toLocaleString()}</span>
              </p>
            )}

            {gameEnded && (
              <p className={styles.caption}>
                <span className={styles.date}>Mecz został zakończony</span>
              </p>
            )}

            {showEditButton && <IconButton onClick={handleEditing(true)} variant="edit" />}

            {showEditContent && (
              <div className={styles.editingButton}>
                <IconButton className={styles.cancelButton} onClick={handleEditCancel(resetForm)} variant="none">
                  <CancelIcon />
                </IconButton>
                <IconButton className={styles.submitButton} onClick={handleSubmit} variant="none">
                  <AcceptIcon />
                </IconButton>
              </div>
            )}
          </div>

          <div className={styles.team}>
            <h5 className={styles.teamName}>{guestTeam}</h5>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <GuestIcon className={styles.flag} />
            {isEditing && (
              <FormInput
                className={styles.guestTextField}
                label=""
                name="guest"
                type="number"
                min={0}
                max={10}
                helperText={`Gość: ${guestTeam}`}
              />
            )}
            {gameEnded && <h6 className={styles.result}>{result?.guest}</h6>}
          </div>
        </Form>
      )}
    </Formik>
  );
};
