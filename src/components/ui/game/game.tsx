import React, { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import classNames from "classnames";
import { Form, Formik } from "formik";

import { GameProps } from "./game.types";
import { FormTextField } from "components";
import { initialValues } from "./game.constants";

import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import { ReactComponent as CancelIcon } from "assets/icons/cancel.svg";
import { ReactComponent as AcceptIcon } from "assets/icons/accept.svg";

import styles from "./game.module.scss";

export const Game: React.FC<GameProps> = ({ game, className }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { date, result, stadium, hostTeam, guestTeam } = game;

  const handleEditing = (value: boolean) => () => {
    setIsEditing(value);
  };

  const gameEnded = result !== null;
  const isEditable = true;

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <Form className={classNames(styles.container, className)}>
        <div className={styles.team}>
          <Typography>{hostTeam}</Typography>
          <div className={styles.flag} />
          {isEditable && <FormTextField className={styles.textField} name="hostTeam" type="number" variant="filled" />}
          {gameEnded && <Typography className={styles.result}>{result.host}</Typography>}
        </div>
        <div className={styles.info}>
          <Typography>{date.toString()}</Typography>
          <Typography>{stadium}</Typography>
          <Typography>edycja mozliwa do 22.11.2022</Typography>
          {isEditable && !isEditing && (
            <IconButton className={styles.icon} onClick={handleEditing(true)}>
              <EditIcon />
            </IconButton>
          )}
          {isEditable && isEditing && (
            <div className={styles.editingButton}>
              <IconButton className={styles.icon} onClick={handleEditing(false)}>
                <CancelIcon />
              </IconButton>
              <IconButton className={styles.icon}>
                <AcceptIcon />
              </IconButton>
            </div>
          )}
        </div>
        <div className={styles.team}>
          <Typography>{guestTeam}</Typography>
          <div className={styles.flag} />
          {isEditable && <FormTextField className={styles.textField} name="guestTeam" type="number" variant="filled" />}
          {gameEnded && <Typography className={styles.result}>{result.guest}</Typography>}
        </div>
      </Form>
    </Formik>
  );
};
