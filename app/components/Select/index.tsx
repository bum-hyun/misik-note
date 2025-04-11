import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { css } from 'styled-system/css';

interface IOption {
  label: string;
  value: string | number;
}

interface ISelectProps {
  options: IOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
}

const Select = ({ options, value, onChange, placeholder = '선택' }: ISelectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selectedLabel = useMemo(() => {
    return options.find((opt) => opt.value === value)?.label;
  }, [options, value]);

  const filteredOptions = useMemo(() => {
    return options.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()));
  }, [options, search]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleOptionClick = useCallback(
    (value: string | number) => {
      onChange(value);
      setIsOpen(false);
      setSearch('');
    },
    [onChange]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={selectContainerStyle}>
      <div onClick={handleToggle} className={selectValueBoxStyle}>
        {selectedLabel || placeholder}
      </div>
      {isOpen && (
        <div className={optionsContainerStyle}>
          <input type="text" placeholder="검색..." value={search} onChange={(e) => setSearch(e.target.value)} className={searchSelectLabelStyle} />
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <div key={opt.value} onClick={() => handleOptionClick(opt.value)} className={`${optionStyle} ${opt.value === value ? selectedOptionStyle : ''}`}>
                {opt.label}
              </div>
            ))
          ) : (
            <div className={noResultTextStyle}>검색 결과가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;

const selectContainerStyle = css({
  position: 'relative',
  width: '200px',
});

const selectValueBoxStyle = css({
  border: '1px solid #ccc',
  padding: '8px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  backgroundColor: '#fff',
});

const optionsContainerStyle = css({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: 0,
  right: 0,
  maxHeight: '240px',
  border: '1px solid #ccc',
  backgroundColor: '#fff',
  borderRadius: '4px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  overflowY: 'auto',
  zIndex: 10,
});

const searchSelectLabelStyle = css({
  width: '100%',
  padding: '8px 12px',
  borderBottom: '1px solid #eee',
  boxSizing: 'border-box',
});

const optionStyle = css({
  padding: '8px 12px',
  cursor: 'pointer',

  _hover: {
    backgroundColor: '#f0f0f0',
  },
});

const selectedOptionStyle = css({
  backgroundColor: '#f0f0f0',
});

const noResultTextStyle = css({
  padding: '8px 12px',
  color: '#999',
});
