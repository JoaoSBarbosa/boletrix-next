import {ReactNode, useState} from "react";
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import styles from './Alert.module.css';

interface AlertProps {
    button?: ReactNode;
    titleAlert: string;
    descriptionAlert: string;
    onAccept?: () => void;
    acceptText?: string;
}

export function Alert({titleAlert, descriptionAlert, onAccept, button, acceptText}: AlertProps) {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                {button}
            </AlertDialog.Trigger>

            <AlertDialog.Portal>
                <AlertDialog.Overlay className={styles.alertDialogOverlay}/>
                <AlertDialog.Content className={styles.alertDialogContent}>
                    <AlertDialog.Title className={styles.alertDialogTitle}>
                        {titleAlert}
                    </AlertDialog.Title>
                    <AlertDialog.Description className={styles.alertDialogDescription}>
                        {descriptionAlert}
                    </AlertDialog.Description>
                    <div style={{display: 'flex', marginTop: '12%', gap: 24, justifyContent: 'flex-end'}}>
                        <AlertDialog.Cancel asChild>
                            <button className={styles.cancelButton}>
                                Cancelar e fechar
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button
                                className={styles.actionButton}
                                onClick={onAccept}
                            >
                                {acceptText ? acceptText : 'Continuar...'}
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}