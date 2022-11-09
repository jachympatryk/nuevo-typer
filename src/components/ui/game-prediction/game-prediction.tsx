import React, { useState } from "react";
import { Form, Formik } from "formik";
import classNames from "classnames";
import { FormInput, IconButton } from "react-modern-components";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { canEditGame } from "utils/game.utils";
import { GamePredictionProps } from "./game-prediction.types";
import { getCurrentRound } from "utils/game-round.utils";
import { GameData } from "../game/game.types";
import { createPrediction } from "firestore";
import { RootState } from "store";
import { mapData } from "components/ui/game/game.constants";
import { flags } from "constants/flags.constants";

import { ReactComponent as CancelIcon } from "assets/icons/cancel.svg";
import { ReactComponent as AcceptIcon } from "assets/icons/accept.svg";

import styles from "./game-prediction.module.scss";

export const GamePrediction: React.FC<GamePredictionProps> = ({ game, className, onEditSuccess }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { gameDate, hostTeam, guestTeam, predictedResult, round, resultGuest, resultHost, hostId, guestId } = game;
  const { canEdit, editToDate } = canEditGame(game);
  const { enqueueSnackbar } = useSnackbar();

  const [isEditing, setIsEditing] = useState(false);

  const date = new Date(gameDate).toLocaleString();

  const gameEnded = resultGuest && resultGuest;
  const currentRound = getCurrentRound(new Date());
  const disabled = currentRound !== round;

  const showEditButton = canEdit && !isEditing && !gameEnded;
  const showEditContent = canEdit && isEditing && !gameEnded;

  const HostIcon = flags[hostId];
  const GuestIcon = flags[guestId];

  const handleEditing = (value: boolean) => () => setIsEditing(value);
  const handleEditCancel = (callback: () => void) => () => {
    setIsEditing(false);
    callback();
  };

  const submitData = async (data: GameData) => {
    if (user) {
      const details = mapData({ data, round, date: gameDate, guestId, guestTeam, hostTeam, hostId });

      try {
        await createPrediction({ user, gameId: game.gameId, details });

        onEditSuccess?.();
        enqueueSnackbar("Twój typ został zapisany.", {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar("Błąd podczas edycji wyniku.", { variant: "error" });
      }
    }
  };

  const values: GameData = {
    guestTeam: predictedResult.guest || 0,
    hostTeam: predictedResult.host || 0,
  };

  return (
    <Formik initialValues={values} onSubmit={submitData}>
      {({ handleSubmit, resetForm }) => (
        <Form className={classNames(styles.container, className)}>
          <div className={styles.team}>
            <h5 className={styles.teamName}>{hostTeam}</h5>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <HostIcon className={styles.flag} />
            {!isEditing && <h4>{game.predictedResult.host}</h4>}
            {isEditing && (
              <FormInput
                label=""
                className={styles.textField}
                name="hostTeam"
                type="number"
                min={0}
                max={10}
                helperText={`Gospodarz: ${hostTeam}`}
              />
            )}
            {gameEnded && (
              <div>
                <h6 className={styles.result}>{resultHost}</h6>
                <h6 className={styles.predictedResult}>{predictedResult.host}</h6>
              </div>
            )}
          </div>

          <div className={styles.info}>
            <p className={styles.dateCaption}>{date}</p>
            <p className={styles.stadium}>{round}</p>

            {disabled && <p className={styles.caption}>Edycja zablokowana</p>}

            {canEdit && !gameEnded && (
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
            {!isEditing && <h4>{game.predictedResult.guest}</h4>}
            {isEditing && (
              <FormInput
                className={styles.guestTextField}
                label=""
                name="guestTeam"
                type="number"
                min={0}
                max={10}
                helperText={`Gość: ${guestTeam}`}
              />
            )}
            {gameEnded && (
              <div>
                <h6 className={styles.result}>{resultGuest}</h6>
                <h6 className={styles.predictedResult}>{predictedResult.guest}</h6>
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};
