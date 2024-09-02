"use client";

import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const Countdowns = () => {
  const targetDate1 = new Date('2025-02-01');
  const targetDate2 = new Date('2024-11-07');
  const targetDate3 = new Date('2024-12-21');
  const targetDate4 = new Date('2025-02-03');

  const calculateTimeRemaining = (targetDate: Date) => {
    const currentDate = new Date();
    const timeDiff = targetDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysRemaining;
  };

  const [daysUntilReunion, setDaysUntilReunion] = useState(calculateTimeRemaining(targetDate1));
  const [daysUntilNovember7, setDaysUntilNovember7] = useState(calculateTimeRemaining(targetDate2));
  const [daysUntilDecember21, setDaysUntilDecember21] = useState(calculateTimeRemaining(targetDate3));
  const [daysUntilReturn, setDaysUntilReturn] = useState(calculateTimeRemaining(targetDate4));
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDaysUntilReunion(calculateTimeRemaining(targetDate1));
      setDaysUntilNovember7(calculateTimeRemaining(targetDate2));
      setDaysUntilDecember21(calculateTimeRemaining(targetDate3));
      setDaysUntilReturn(calculateTimeRemaining(targetDate4));
    }, 1000 * 60 * 60 * 24); // Actualizar cada día

    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen font-serif transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-br from-[#FFF5EE] to-[#F5F5F5] text-[#6B4F4F]'}`}>
      <button
        className={`absolute top-4 right-4 p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} transition-colors duration-300`}
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        <span className="sr-only">Cambiar de Tema</span>
      </button>
      <div className="max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">Esperandote :)</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Regreso en Febrero", days: daysUntilReunion, date: "Febrero 1, 2025" },
            { title: "Visita en Noviembre 7", days: daysUntilNovember7, date: "Noviembre 7, 2024" },
            { title: "Visita en Diciembre 21", days: daysUntilDecember21, date: "Diciembre 21, 2024" },
            { title: "Regreso en Febrero 3", days: daysUntilReturn, date: "Febrero 3, 2025" }
          ].map((item, index) => (
            <div key={index} className={`shadow-lg rounded-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
              <p className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-[#9B7979]'}`}>{item.days} dias</p>
              <p className={isDarkMode ? 'text-gray-400' : 'text-muted-foreground'}>Hasta {item.date}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className={isDarkMode ? 'text-gray-400' : 'text-muted-foreground'}>
            El tiempo que nos separa nos unira mas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Countdowns;