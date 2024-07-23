import React, { useState } from 'react';
import '../ClueInput.css';

interface ClueInputProps {
  onSubmit: (clue: string) => void;
  disabled: boolean;
}

const ClueInput: React.FC<ClueInputProps> = ({ onSubmit, disabled }) => {
  const [clue, setClue] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(clue);
    setClue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={clue}
          onChange={(e) => setClue(e.target.value.toUpperCase())}
          maxLength={5}
          pattern="[GYXgyx]{5}"
          title="Enter a 5-letter clue using G for green, Y for yellow, and X for grey (Ex: GXYXX)"
          disabled={disabled}
          required
        />
        <button className="submit-btn" title="Submit 5-letter clue using G for green, Y for yellow, and X for grey (Ex: GXYXX)" type="submit" disabled={disabled}>Submit</button>
      </div>
      <div className="clue-input-instructions">
      Enter a 5-letter clue using G for green, Y for yellow, and X for grey (Ex: GXYXX).
      </div>
    </form>
  );
};

export default ClueInput;
