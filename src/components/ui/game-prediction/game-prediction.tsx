import React, { useState } from "react";
import { Form, Formik } from "formik";
import classNames from "classnames";
import { FormInput, IconButton } from "react-modern-components";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { canEditGame } from "utils/game.utils";
import { GamePredictionProps } from "./game-prediction.types";
import { getCurrentRound } from "utils/game-round.utils";
import { createPrediction, getSingleGame } from "firestore";
import { RootState } from "store";
import { CreatePredictionData } from "firestore/predictions/predictions.types";
import { GameResult } from "models";
import { useFirebaseFetch } from "hooks";
import { flags } from "constants/flags.constants";

import { ReactComponent as CancelIcon } from "assets/icons/cancel.svg";
import { ReactComponent as AcceptIcon } from "assets/icons/accept.svg";

import styles from "./game-prediction.module.scss";

export const GamePrediction: React.FC<GamePredictionProps> = ({ prediction, className, onEditSuccess }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { enqueueSnackbar } = useSnackbar();

  const [isEditing, setIsEditing] = useState(false);

  const { data: game } = useFirebaseFetch(() => getSingleGame(prediction.gameId));
  const { canEdit, editToDate } = canEditGame(game);

  const date = game ? new Date(game.date).toLocaleString() : "-";

  const gameEnded = Boolean(game?.result);
  const currentRound = getCurrentRound(new Date());
  const disabled = currentRound !== game?.round;

  const showEditButton = canEdit && !isEditing && !gameEnded;
  const showEditContent = canEdit && isEditing && !gameEnded;

  const handleEditing = (value: boolean) => () => setIsEditing(value);
  const handleEditCancel = (callback: () => void) => () => {
    setIsEditing(false);
    callback();
  };

  const submitData = async (predictedResult: GameResult) => {
    if (user) {
      const details: CreatePredictionData = { user, gameId: prediction.gameId, predictedResult };

      try {
        await createPrediction(details);

        onEditSuccess?.();
        enqueueSnackbar("Twój typ został zapisany.", {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar("Błąd podczas edycji wyniku.", { variant: "error" });
      }
    }
  };

  const values: GameResult = {
    host: prediction?.predictedResult?.host || 0,
    guest: prediction?.predictedResult?.guest || 0,
  };

  if (!game) return null;

  const HostIcon = flags[game.hostId];
  const GuestIcon = flags[game.guestId];

  return (
    <Formik initialValues={values} onSubmit={submitData}>
      {({ handleSubmit, resetForm }) => (
        <Form className={classNames(styles.container, className)}>
          <div className={styles.team}>
            <h5 className={styles.teamName}>{game.hostTeam}</h5>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <HostIcon className={styles.flag} />
            {!isEditing && <h4>{prediction.predictedResult.host}</h4>}
            {isEditing && (
              <FormInput
                label=""
                className={styles.textField}
                name="host"
                type="number"
                min={0}
                max={10}
                helperText={`Gospodarz: ${game.hostTeam}`}
              />
            )}
            {gameEnded && game.result && (
              <div>
                <h6 className={styles.result}>{game.result.host}</h6>
                <h6 className={styles.predictedResult}>{prediction.predictedResult.host}</h6>
              </div>
            )}
          </div>

          <div className={styles.info}>
            <p className={styles.dateCaption}>{date}</p>
            <p className={styles.stadium}>{game.round}</p>

            {disabled && <p className={styles.caption}>Edycja zablokowana</p>}

            {canEdit && !gameEnded && editToDate && (
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
            <h5 className={styles.teamName}>{game.guestTeam}</h5>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <GuestIcon className={styles.flag} />
            {!isEditing && <h4>{prediction.predictedResult.guest}</h4>}
            {isEditing && (
              <FormInput
                className={styles.guestTextField}
                label=""
                name="guest"
                type="number"
                min={0}
                max={10}
                helperText={`Gość: ${game.guestTeam}`}
              />
            )}
            {gameEnded && game.result && (
              <div>
                <h6 className={styles.result}>{game.result.guest}</h6>
                <h6 className={styles.predictedResult}>{prediction.predictedResult.guest}</h6>
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};
