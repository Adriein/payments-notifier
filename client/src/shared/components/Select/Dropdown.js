import React, { useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import { KEYCODES } from '../../utils/keyCodes';

import { Dropdown, Options, Option, OptionsNoResults } from './Styles';

const propTypes = {
  dropdownWidth: PropTypes.number,
  value: PropTypes.any,
  isValueEmpty: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  inputRef: PropTypes.object.isRequired,
  deactivateDropdown: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  propsRenderOption: PropTypes.func,
};

const defaultProps = {
  dropdownWidth: undefined,
  value: undefined,
  onCreate: undefined,
  propsRenderOption: undefined,
};

const SelectDropdown = ({
  dropdownWidth,
  value,
  isValueEmpty,
  inputRef,
  deactivateDropdown,
  searchValue,
  setSearchValue,
  options,
  onChange,
  propsRenderOption,
}) => {
  const optionsRef = useRef();

  useLayoutEffect(() => {
    const setFirstOptionAsActive = () => {
      const active = getActiveOptionNode();
      if (active) active.classList.remove(activeOptionClass);

      if (optionsRef.current.firstElementChild) {
        optionsRef.current.firstElementChild.classList.add(activeOptionClass);
      }
    };
    setFirstOptionAsActive();
  });

  const selectOptionValue = (optionValue) => {
    deactivateDropdown();

    onChange(optionValue);
  };


  const clearOptionValues = () => {
    inputRef.current.value = '';
    inputRef.current.focus();
    onChange(null);
  };

  const handleInputKeyDown = (event) => {
    if (event.keyCode === KeyCodes.ESCAPE) {
      handleInputEscapeKeyDown(event);
    } else if (event.keyCode === KeyCodes.ENTER) {
      handleInputEnterKeyDown(event);
    } else if (
      event.keyCode === KeyCodes.ARROW_DOWN ||
      event.keyCode === KeyCodes.ARROW_UP
    ) {
      handleInputArrowUpOrDownKeyDown(event);
    }
  };

  const handleInputEscapeKeyDown = (event) => {
    event.nativeEvent.stopImmediatePropagation();
    deactivateDropdown();
  };

  const handleInputEnterKeyDown = (event) => {
    event.preventDefault();

    const active = getActiveOptionNode();
    if (!active) return;

    const optionValueToSelect = active.getAttribute(
      'data-select-option-value'
    );
    const optionLabelToCreate = active.getAttribute(
      'data-create-option-label'
    );

    if (optionValueToSelect) {
      selectOptionValue(optionValueToSelect);
    }
  };

  const handleInputArrowUpOrDownKeyDown = (event) => {
    const active = getActiveOptionNode();
    if (!active) return;

    const options = optionsRef.current;
    const optionsHeight = options.getBoundingClientRect().height;
    const activeHeight = active.getBoundingClientRect().height;

    if (event.keyCode === KeyCodes.ARROW_DOWN) {
      if (options.lastElementChild === active) {
        active.classList.remove(activeOptionClass);
        options.firstElementChild.classList.add(activeOptionClass);
        options.scrollTop = 0;
      } else {
        active.classList.remove(activeOptionClass);
        active.nextElementSibling.classList.add(activeOptionClass);
        if (active.offsetTop > options.scrollTop + optionsHeight / 1.4) {
          options.scrollTop += activeHeight;
        }
      }
    } else if (event.keyCode === KeyCodes.ARROW_UP) {
      if (options.firstElementChild === active) {
        active.classList.remove(activeOptionClass);
        options.lastElementChild.classList.add(activeOptionClass);
        options.scrollTop = options.scrollHeight;
      } else {
        active.classList.remove(activeOptionClass);
        active.previousElementSibling.classList.add(activeOptionClass);
        if (active.offsetTop < options.scrollTop + optionsHeight / 2.4) {
          options.scrollTop -= activeHeight;
        }
      }
    }
  };

  const handleOptionMouseEnter = (event) => {
    const active = getActiveOptionNode();
    if (active) active.classList.remove(activeOptionClass);
    event.currentTarget.classList.add(activeOptionClass);
  };

  const getActiveOptionNode = () =>
    optionsRef.current.querySelector(`.${activeOptionClass}`);

  const removeSelectedOptionsSingle = (opts) =>
    opts.filter((option) => value !== option.value);

  const filteredOptions = removeSelectedOptionsSingle(optionsFilteredBySearchValue);

  return (
    <Dropdown width={dropdownWidth}>
      <DropdownInput
        type="text"
        placeholder="Search"
        ref={inputRef}
        autoFocus
        onKeyDown={handleInputKeyDown}
        onChange={(event) => setSearchValue(event.target.value)}
      />

      {!isValueEmpty && withClearValue && (
        <ClearIcon type="close" onClick={clearOptionValues} />
      )}

      <Options ref={optionsRef}>
        {filteredOptions.map((option) => (
          <Option
            key={option.value}
            data-select-option-value={option.value}
            data-testid={`select-option:${option.label}`}
            onMouseEnter={handleOptionMouseEnter}
            onClick={() => selectOptionValue(option.value)}
          >
            {propsRenderOption ? propsRenderOption(option) : option.label}
          </Option>
        ))}

        {isOptionCreatable && (
          <Option
            data-create-option-label={searchValue}
            onMouseEnter={handleOptionMouseEnter}
            onClick={() => createOption(searchValue)}
          >
            {isCreatingOption
              ? `Creating "${searchValue}"...`
              : `Create "${searchValue}"`}
          </Option>
        )}
      </Options>

      {filteredOptions.length === 0 && (
        <OptionsNoResults>No results</OptionsNoResults>
      )}
    </Dropdown>
  );
};

const activeOptionClass = 'jira-select-option-is-active';

SelectDropdown.propTypes = propTypes;
SelectDropdown.defaultProps = defaultProps;

export default SelectDropdown;
