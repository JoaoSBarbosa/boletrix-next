import * as Select from '@radix-ui/react-select';
import {SelectProps} from '@radix-ui/react-select';
import {ArrowDown, ArrowLineUp, CheckSquare} from "@phosphor-icons/react";

// Estilo do componente
import styles from './Select.module.css';

export interface SelectionOptionsProps {
    value: string;
    label: string;
}

interface SelectionProps extends SelectProps {
    title: string;
    placeholder?: string;
    ariaLabel?: string;
    width?: string | number;
    groupName: string;
    optionsList: SelectionOptionsProps[];
}

export function Selection({title, placeholder, ariaLabel, width, groupName, optionsList, ...rest}: SelectionProps) {
    return (
        <div
            className={styles.selectionContent}
            style={{width: width}}
        >
            {title}
            <div className={styles.selectionContainer}>
                <Select.Root
                    {...rest}
                >
                    <Select.Trigger
                        className={styles.selectTrigger}
                        aria-label={ariaLabel}
                    >
                        <Select.Value placeholder={placeholder}/>
                        <Select.Icon>
                            <ArrowDown
                                size={'1vw'}
                                weight="fill"
                                style={{
                                    marginLeft: '5px',
                                    marginRight: '5px'
                                }}
                                color={'#9CA3AF'}
                            />
                        </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                        <Select.Content
                            className={styles.selectContent}
                        >
                            <Select.ScrollUpButton
                                className={styles.selectScrollButton}
                            >
                                <ArrowLineUp
                                    size={'1vw'}
                                    weight="fill"
                                />
                            </Select.ScrollUpButton>

                            <Select.Viewport className={styles.selectViewport}>
                                <Select.Group>
                                    <Select.Label className={styles.selectLabel}>{groupName}</Select.Label>
                                    {
                                        optionsList.map((option) =>
                                            <Select.Item
                                                key={option.value}
                                                className={styles.selectItem}
                                                value={option.value}
                                            >
                                                <Select.ItemIndicator className={styles.selectItemIndicator}>
                                                    <CheckSquare
                                                        size={'1vw'}
                                                        weight="fill"
                                                        color={'#17A589'}
                                                    />
                                                </Select.ItemIndicator>

                                                <Select.ItemText>{option.label}</Select.ItemText>
                                            </Select.Item>
                                        )
                                    }
                                </Select.Group>
                            </Select.Viewport>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
            </div>
        </div>
    );
}

export function CompactSelection({
                                     title,
                                     placeholder,
                                     ariaLabel,
                                     width,
                                     groupName,
                                     optionsList,
                                     ...rest
                                 }: SelectionProps) {
    return (
        <div
            className={styles.compactSelectionContent}
            style={{width: width}}
        >
            {title}
            <div className={styles.selectionContainer}>
                <Select.Root
                    {...rest}
                >
                    <Select.Trigger
                        className={styles.compactSelectTrigger}
                        aria-label={ariaLabel}
                    >
                        <Select.Value placeholder={placeholder}/>
                        <Select.Icon className={styles.compactSelectionIcon}>
                            <ArrowDown
                                size={'90%'}
                                weight="fill"
                            />
                        </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                        <Select.Content
                            className={styles.selectContent}
                        >
                            <Select.ScrollUpButton
                                className={styles.selectScrollButton}
                            >
                                <ArrowLineUp
                                    size={'1vw'}
                                    weight="fill"
                                />
                            </Select.ScrollUpButton>

                            <Select.Viewport className={styles.selectViewport}>
                                <Select.Group>
                                    <Select.Label className={styles.selectLabel}>{groupName}</Select.Label>
                                    {
                                        optionsList.map((option) =>
                                            <Select.Item
                                                key={option.value}
                                                className={styles.selectItem}
                                                value={option.value}
                                            >
                                                <Select.ItemIndicator className={styles.selectItemIndicator}>
                                                    <CheckSquare
                                                        size={'1vw'}
                                                        weight="fill"
                                                        color={'#17A589'}
                                                    />
                                                </Select.ItemIndicator>

                                                <Select.ItemText>{option.label}</Select.ItemText>
                                            </Select.Item>
                                        )
                                    }
                                </Select.Group>
                            </Select.Viewport>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
            </div>
        </div>
    );
}


interface convertToSelectionOptionsProps<T = any> {
    list: T[];
    fieldValue: string;
    fieldLabel: string;
}

export function convertToSelectionOptions(
    {
        list,
        fieldValue,
        fieldLabel
    }: convertToSelectionOptionsProps
): SelectionOptionsProps[] {
    let selectionsOptionsList = [];

    selectionsOptionsList.push({
        value: '',
        label: 'Nenhum item selecionado'
    });

    for (const item of list) {
        type objectKey = keyof typeof item;

        const value = fieldValue as objectKey;
        const label = fieldLabel as objectKey;

        selectionsOptionsList.push({
            value: String(item[value]),
            label: String(item[label])
        });
    }

    return selectionsOptionsList;
}


export interface SelectionOptionsGenericProps<T> {
    value: T;
    label: string;
}




export function CustomSelection({
                                    title,
                                    placeholder,
                                    ariaLabel,
                                    width,
                                    groupName,
                                    optionsList,
                                    ...rest
                                }: SelectionProps) {
    return (
        <div
            className="flex items-start justify-center flex-col h-12 font-light text-[12px] rounded-full transition-all duration-500 p-3 text-gray-400"
            style={{width, border: "2px solid #e5e7eb"}}
        >
            {/*{title}*/}

            <div className="w-full flex items-center justify-center flex-col">
                <Select.Root {...rest}>
                    <Select.Trigger
                        className="w-full h-full whitespace-nowrap overflow-hidden flex items-center justify-between font-medium text-[14px] text-black bg-transparent outline-none"
                        aria-label={ariaLabel}
                    >
                        <Select.Value placeholder={placeholder}/>
                        <Select.Icon>
                            <ArrowDown
                                size={'1vw'}
                                weight="fill"
                                className="mx-[5px]"
                                color="#9CA3AF"
                            />
                        </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                        <Select.Content className="overflow-hidden bg-white z-10 shadow-lg rounded-md">
                            <Select.ScrollUpButton className="flex items-center justify-center h-[30px]">
                                <ArrowLineUp size={'1vw'} weight="fill"/>
                            </Select.ScrollUpButton>

                            <Select.Viewport className="p-[5px]">
                                <Select.Group>
                                    <Select.Label className="p-[14px] text-[11px] font-light text-[#839192]">
                                        {groupName}
                                    </Select.Label>

                                    {optionsList.map((option) => (
                                        <Select.Item
                                            key={option.value}
                                            className="pl-[20px] h-[35px] text-[13px] font-normal flex items-center justify-start flex-row outline-none transition-all duration-500 hover:bg-gray-300 focus:bg-gray-300"
                                            value={option.value}
                                        >
                                            <Select.ItemIndicator
                                                className="w-[35px] h-[35px] flex items-center justify-center">
                                                <CheckSquare
                                                    size={'1vw'}
                                                    weight="fill"
                                                    color="#17A589"
                                                />
                                            </Select.ItemIndicator>

                                            <Select.ItemText>{option.label}</Select.ItemText>
                                        </Select.Item>
                                    ))}
                                </Select.Group>
                            </Select.Viewport>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
            </div>
        </div>
    );
}
