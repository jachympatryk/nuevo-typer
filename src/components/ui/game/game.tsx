import React, { useState } from "react";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { IconButton, FormInput } from "react-modern-components";

import { GameProps } from "./game.types";
import { canEditGame } from "utils/game.utils";
import { getCurrentRound } from "utils/game-round.utils";
import { initialValues } from "./game.constants";

import { ReactComponent as CancelIcon } from "assets/icons/cancel.svg";
import { ReactComponent as AcceptIcon } from "assets/icons/accept.svg";

import styles from "./game.module.scss";

// todo: disabled state

export const Game: React.FC<GameProps> = ({ game, className }) => {
  const { date, result, stadium, hostTeam, guestTeam, round } = game;
  const { canEdit, editToDate } = canEditGame(game);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditing = (value: boolean) => () => setIsEditing(value);
  const handleEditCancel = (callback: () => void) => () => {
    setIsEditing(false);
    callback();
  };

  const gameDate = new Date(date).toLocaleString();

  const gameEnded = result !== null;
  const showEditButton = canEdit && !isEditing && !gameEnded;
  const showEditContent = canEdit && isEditing && !gameEnded;

  const currentRound = getCurrentRound(new Date());
  const disabled = currentRound !== round;

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ handleSubmit, resetForm }) => (
        <Form className={classNames(styles.container, className)}>
          <div className={styles.team}>
            <h5 className={styles.teamName}>{hostTeam}</h5>
            <div className={styles.flag} />
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
            {gameEnded && <h6 className={styles.result}>{result?.host}</h6>}
          </div>

          <div className={styles.info}>
            <p className={styles.stadium}>{stadium}</p>
            <p className={styles.dateCaption}>{gameDate}</p>

            {disabled && <p className={styles.caption}>Mecz zablokowany</p>}

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
            <div className={styles.flag} />
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
            {gameEnded && <h6 className={styles.result}>{result?.guest}</h6>}
          </div>
        </Form>
      )}
    </Formik>
  );
};
