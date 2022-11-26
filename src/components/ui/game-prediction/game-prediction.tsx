import React, { useState } from "react";
import { Form, Formik } from "formik";
import classNames from "classnames";
import { FormInput, IconButton } from "react-modern-components";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { calculatePoints, canEditGame } from "utils";
import { GamePredictionProps } from "./game-prediction.types";
import { getCurrentRound } from "utils/game-round.utils";
import { createPrediction } from "firestore";
import { RootState } from "store";
import { CreatePredictionData } from "firestore/predictions/predictions.types";
import { GameResult, PredictionModel } from "models";
import { flags } from "constants/flags.constants";

import { ReactComponent as CancelIcon } from "assets/icons/cancel.svg";
import { ReactComponent as AcceptIcon } from "assets/icons/accept.svg";

import styles from "./game-prediction.module.scss";

export const GamePrediction: React.FC<GamePredictionProps> = ({ prediction, className, onEditSuccess }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state: RootState) => state.auth);
  const { games } = useSelector((state: RootState) => state.games);

  const [isEditing, setIsEditing] = useState(false);

  const game = games.find((savedGame) => savedGame.id === prediction.gameId);

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

        const updatedPrediction: PredictionModel = {
          gameId: prediction.gameId,
          predictedResult,
          userId: user.id,
          userName: user.displayName,
        };

        onEditSuccess?.(updatedPrediction);
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

  const HostIcon = game.hostId ? flags[game.hostId] : null;
  const GuestIcon = game.guestId ? flags[game.guestId] : null;

  return (
    <Formik initialValues={values} onSubmit={submitData}>
      {({ handleSubmit, resetForm }) => (
        <Form className={classNames(styles.container, className)}>
          <div className={styles.team}>
            <h5 className={styles.teamName}>{game.hostTeam}</h5>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {HostIcon ? <HostIcon className={styles.flag} /> : <div className={styles.unknownFlag} />}
            {!isEditing && (
              <h4 className={styles.predictedResult}>
                <span className={styles.resultCaption}>Twój typ:</span> {prediction.predictedResult.host}
              </h4>
            )}
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

            <div>{gameEnded && game.result && <h3 className={styles.result}>{game.result.host}</h3>}</div>
          </div>

          <div className={styles.info}>
            <p className={styles.dateCaption}>{date}</p>
            <p className={styles.stadium}>{game?.round}</p>
            {game?.group ? (
              <p className={styles.stadium}>
                <strong>Grupa {game.group}</strong>
              </p>
            ) : null}

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

            {gameEnded && game.result && (
              <p className={styles.caption}>
                Ilość punktów za to spotkanie: {calculatePoints(prediction.predictedResult, game.result)}
              </p>
            )}
          </div>

          <div className={styles.team}>
            <h5 className={styles.teamName}>{game.guestTeam}</h5>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {GuestIcon ? <GuestIcon className={styles.flag} /> : <div className={styles.unknownFlag} />}
            {!isEditing && (
              <h4 className={styles.predictedResult}>
                <span className={styles.resultCaption}>Twój typ: </span>
                {prediction.predictedResult.guest}
              </h4>
            )}
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

            <div>{gameEnded && game.result && <h3 className={styles.result}>{game.result.guest}</h3>}</div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
