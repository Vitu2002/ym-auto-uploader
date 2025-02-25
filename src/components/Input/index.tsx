'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './input.module.scss';

export default function Input(props: Props) {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState(props.value || '');
    const textareaEl = useRef<HTMLTextAreaElement>(null);
    const isActive = focused || (props.value || '').length > 0;
    const InputStyleClass =
        props.style === 'line'
            ? styles.Line
            : props.style === 'bordered'
            ? styles.Bordered
            : styles.Clean;
    const LabelMovimentClass = !props.placeholderMoviment
        ? ''
        : props.placeholderMoviment === 'top'
        ? styles.Top
        : styles.Bottom;
    const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
        textarea.style.height = 'auto'; // Redefine para recalcular
        textarea.style.height = `${Math.min(textarea.scrollHeight, window.innerHeight * 0.8)}px`; // Ajusta altura
    };
    const componentProps:
        | React.InputHTMLAttributes<HTMLInputElement>
        | React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
        className: styles.InputElement,
        type: props.type,
        placeholder: props.placeholder,
        value: props.value,
        step: props.step,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            if (props.textarea && textareaEl.current) {
                adjustTextareaHeight(textareaEl.current);
            }
            e.preventDefault();
            setValue(e.target.value);
            props.onChange?.(e.target.value);
        },
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(value.length > 0),
        disabled: props.disabled,
        required: props.required,
        maxLength: props.maxLength,
        minLength: props.minLength,
        min: props.min,
        max: props.max,
        spellCheck: props.spellCheck,
        autoComplete: props.autoComplete,
        'aria-label': props.title,
        'aria-required': props.required,
        'aria-disabled': props.disabled,
        'aria-placeholder': props.placeholder,
        'aria-readonly': props.disabled,
    };

    useEffect(() => {
        if (props.textarea && textareaEl.current) adjustTextareaHeight(textareaEl.current);
    }, [props.textarea]);

    return (
        <div
            className={`${styles.Input} ${props.className || ''} ${InputStyleClass}`}
            aria-current={isActive}
            style={{ '--component-color': props.color || '' } as React.CSSProperties}
        >
            {props.title && (
                <label className={`${styles.Label} ${LabelMovimentClass}`}>
                    {props.label ? props.label : props.title}
                </label>
            )}
            <div className={styles.Container}>
                {props.textarea ? (
                    <textarea
                        {...(componentProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                        ref={textareaEl}
                    />
                ) : (
                    <input {...(componentProps as React.InputHTMLAttributes<HTMLInputElement>)} />
                )}
                <span className={styles.Icon}>{props.icon}</span>
                {props.style === 'line' && (
                    <div className={styles.Track}>
                        <span className={styles.Bar} />
                    </div>
                )}
            </div>
        </div>
    );
}

interface Props {
    className?: string;
    onChange?: (value: string) => void;
    value?: string;
    type?: React.HTMLInputTypeAttribute;
    textarea?: boolean;
    title?: string;
    label?: string | React.ReactNode;
    placeholder?: string;
    icon?: React.ReactNode;
    style?: 'line' | 'bordered' | 'clean';
    placeholderMoviment?: 'top' | 'bottom';
    color?: string;
    maxLength?: number;
    minLength?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    required?: boolean;
    spellCheck?: boolean;
    autoComplete?: string;
    step?: 'any' | number | string;
}
