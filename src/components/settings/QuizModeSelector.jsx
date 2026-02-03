// QuizModeSelector - Fixed sequence toggle
import React from 'react';
import { useSettings } from '../../context/SettingsContext.jsx';
import { Checkbox } from '../ui/Checkbox.jsx';

export function QuizModeSelector() {
  const { isFixedOrder, setIsFixedOrder } = useSettings();
  
  return (
    <>
      <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 border-b border-gray-600 pb-1">
        Quiz Mode
      </div>
      <div className="grid grid-cols-2 gap-0">
        <Checkbox
          checked={isFixedOrder}
          onChange={() => setIsFixedOrder(!isFixedOrder)}
          label="固定順"
          sublabel="Fixed Sequence"
          colorClass="bg-green-500 border-green-500"
          labelColorClass="text-white"
        />
      </div>
    </>
  );
}
