import ReactSelect from "react-select";
import './select.scss';

export const Select = ({ options, value, onSelectOption }) => {
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: 0,
      color: state.selectProps.menuColor,
      padding: '0',
    }),

    option: (_, state) => ({
      borderBottom: '1px solid #eee',
      color: state.isSelected ? '#9da2af' : '#000',
      backgroundColor: state.isFocused ? '#e3e4e8' : '#fff',
      padding: '1rem',
    }),

    control: (provided, _) => ({
      ...provided,
      boxShadow: 0,
      borderColor: '#737a8c',
      padding: '0.5rem',
    }),
  }

  return (
    <>
      <div className="select">
        <div className="label">Sensor</div>
        <ReactSelect
          className="react-select"
          classNamePrefix="react-select"
          styles={customStyles}
          value={ value }
          options={ options }
          onChange={ onSelectOption }
        />
      </div>
    </>
  )
}