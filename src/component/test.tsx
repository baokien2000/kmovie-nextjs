import React, { useState, useRef, useCallback } from 'react';
import _ from 'lodash';

function MyComponent(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debounceRef = useRef<_.DebouncedFunc<((value: string) => void)>>();

  const handleSearch = useCallback(
      _.debounce((value: string) => {
          console.log(value);
      }, 500)
      , []
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (debounceRef.current) {
      debounceRef.current.cancel();
    }
    debounceRef.current = handleSearch;
    debounceRef.current(event.target.value);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} />
    </div>
  );
}

export default MyComponent;