import { FC, useState, useCallback, useLayoutEffect } from 'react';

import ArrowDown from '@public/images/chevron-down.svg';
import cn from 'clsx';

import styles from './select.module.scss';

import { useDropdown } from '@/hooks/useDropdown';

export interface IOption {
  label: string;
  value: string;
}

export interface ISelectProps {
  name: string;
  value: IOption;
  options: IOption[];
  className?: string;
  onChange?: (option: IOption) => void;
  disabled?: boolean;
}

const Select: FC<ISelectProps> = ({
  className,
  options,
  onChange,
  value,
  name,
  disabled,
}) => {
  const [selectedOption, setSelectedOption] = useState<IOption>(value);

  const { isOpen, setIsOpen, rootRef } = useDropdown();

  const updateSelectedOption = useCallback(() => {
    const option = options.find((option) => option.value === value.value);

    if (option) setSelectedOption(option);
  }, [options, value]);

  useLayoutEffect(() => {
    if (Array.isArray(options)) {
      updateSelectedOption();
    }
  }, [options, updateSelectedOption, value]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSelect = (option: IOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div
      ref={rootRef}
      className={cn(className, styles.select, {
        [styles.select__open]: isOpen,
      })}
    >
      <div
        onClick={handleOpen}
        onMouseDown={(e) => e.preventDefault()}
        onDoubleClick={() => setIsOpen(false)}
      >
        <input
          name={name}
          value={selectedOption?.label}
          onFocus={handleOpen}
          readOnly
          disabled={disabled}
        />
        <ArrowDown />
      </div>
      <div className={styles.dropdown}>
        <ul
          className={cn(styles.dropdown__list, {
            [styles.dropdown__list__empty]: isOpen && !options.length,
            [styles.dropdown__list__open]: isOpen,
          })}
        >
          {options.length ? (
            options.map((option, index) => (
              <li
                key={option.value + index}
                className={cn(styles.dropdown__list__item, {
                  [styles.active]: option.value === selectedOption?.value,
                })}
              >
                <button type="button" onClick={() => handleSelect(option)}>
                  {option.label}
                </button>
              </li>
            ))
          ) : (
            <li className={styles.dropdown__list__item}>
              <span>Нет данных</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Select;
