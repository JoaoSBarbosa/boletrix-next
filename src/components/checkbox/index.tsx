import * as Checkbox from '@radix-ui/react-checkbox';
import {CheckboxProps} from "@radix-ui/react-checkbox";

// Icones da aplicação
import { Check } from "@phosphor-icons/react";

// Estilo do componente
import styles from './CheckBox.module.css';
import {ReactNode} from "react";



export enum CheckBoxMargin {
    MX_0 = 'mx-0',
    MY_0 = 'my-0',
    MX_PX = 'mx-px',
    MY_PX = 'my-px',
    MX_0_5 = 'mx-0.5',
    MY_0_5 = 'my-0.5',
    MAX_H_8 = 'max-h-8',
    MX_1 = 'mx-1',
    MY_1 = 'my-1',
    MY_1_5 = 'my-1.5',
    MX_1_5 = 'my-1.5',
    MY_2 = 'my-2',
    MX_2 = 'mx-2',

}
interface CheckBoxProps extends CheckboxProps {
    title?: string;
    width?: string | number;
    subtitles?: string;
    textSize?: string;
    textColor?: string;
    icon?: ReactNode;
    marginBottom?: CheckBoxMargin;
}

export function CheckBox( { title, icon, width, subtitles, textColor,textSize,marginBottom, ...rest } : CheckBoxProps ) {
    return (
        <label
            style={{ width: width === undefined ? '100%' : width }}
            className={ `${styles.checkboxContent} ${marginBottom ? marginBottom : ""}` }
        >
            <Checkbox.Root
                className={ styles.checkboxRoot }
                { ...rest }
                title={ subtitles }
            >
                <Checkbox.Indicator
                    className={ styles.checkboxIndicator }
                >
                    <Check
                        size={ '70%' }
                        weight="bold"
                    />
                </Checkbox.Indicator>
            </Checkbox.Root>
            <p
                style={
                    {
                        fontSize: textSize ? textSize+"px" : "16px",
                        color: textColor ? textColor : "#7f8791"

                    }
                } className={`${icon ? "flex items-center gap-1" : ""}`}>
                { title }
                { icon ? icon : ""}
            </p>
        </label>
    );
}