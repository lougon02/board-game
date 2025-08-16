import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import DiceBox from '@3d-dice/dice-box-threejs';

export interface DiceRollerHandle {
  rollDice: (notation: string) => void;
}

export const DiceRoller = forwardRef<DiceRollerHandle>(({className}: {className: string}, ref) => {
  const initialized = useRef(false);
  const boxRef = useRef<DiceBox | null>(null);

  useEffect(() => {
    if (initialized.current) return; 
    initialized.current = true;

    const setupDice = async () => {
      const box = new DiceBox('#dice-box', {
        strength: 2,
        gravity: 1,
        baseScale: 150,
        onRollComplete: (results: any) => {
          console.log('Roll results:', results);
        },
        light_intensity: 1.25,
        theme_customColorset: {
          background: "#ff0011",
          foreground: "#ffffff",
          texture: "ice",
          material: "metal",
        },
      });

      await box.initialize();
      boxRef.current = box;
    };

    setupDice();

    return () => {
      boxRef.current?.dispose();
    };
  }, []);

  // Expose rollDice to parent
  useImperativeHandle(ref, () => ({
    rollDice: (notation: string) => {
      boxRef.current?.roll(notation);
    },
  }));

  return <div id="dice-box" className={className} />;
});

