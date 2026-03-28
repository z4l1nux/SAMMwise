import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import NavButton from '../../components/buttons/navbutton';

interface ButtonItem {
  name: string;
  displayName: string;
  state: boolean;
}

interface SurveyNavProps {
  button: string;
  onClick: (name: string) => void;
}

const SurveyNav: React.FC<SurveyNavProps> = (props) => {
  const t = useTranslations('assessment.controls');
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const navbarState = sessionStorage.getItem('navbarState');
    const userState = JSON.parse(sessionStorage.getItem('userState')!);
    const currentNavbarState = getNavbarState();
    if (navbarState !== currentNavbarState) {
      if (!userState['has_switched_page']) {
        sessionStorage.setItem('navbarState', currentNavbarState ?? '');
      }
    }
  }, [display]);

  const buttonState: ButtonItem[] = [
    { name: 'Control 1',  displayName: t('c01'), state: true  },
    { name: 'Control 2',  displayName: t('c02'), state: false },
    { name: 'Control 3',  displayName: t('c03'), state: false },
    { name: 'Control 4',  displayName: t('c04'), state: false },
    { name: 'Control 5',  displayName: t('c05'), state: false },
    { name: 'Control 6',  displayName: t('c06'), state: false },
    { name: 'Control 7',  displayName: t('c07'), state: false },
    { name: 'Control 8',  displayName: t('c08'), state: false },
    { name: 'Control 9',  displayName: t('c09'), state: false },
    { name: 'Control 10', displayName: t('c10'), state: false },
    { name: 'Control 11', displayName: t('c11'), state: false },
    { name: 'Control 12', displayName: t('c12'), state: false },
    { name: 'Control 13', displayName: t('c13'), state: false },
    { name: 'Control 14', displayName: t('c14'), state: false },
    { name: 'Details',    displayName: t('details'), state: false },
  ];

  function updateButtonState(index: number) {
    props.onClick(buttonState[index].name);
    setDisplay(d => !d);
  }

  function getNavbarState(): string | undefined {
    for (const key in buttonState) {
      if (buttonState[key].state) {
        return buttonState[key].name;
      }
    }
  }

  for (const key in buttonState) {
    buttonState[key].state = false;
    if (buttonState[key].name === props.button) {
      buttonState[key].state = true;
    }
  }

  const getCurrentDisplayName = () => {
    const currentButton = buttonState.find(btn => btn.name === props.button);
    return currentButton ? currentButton.displayName : props.button;
  };

  return (
    <>
      <nav className="flex justify-center items-center gap-2 py-5 px-5 flex-wrap">
        {buttonState.map((btn, i) => (
          <NavButton key={btn.name} name={btn.displayName} state={btn.state} onClick={() => updateButtonState(i)} />
        ))}
      </nav>
      <div className="flex justify-center py-2">
        <h2 className="text-lg font-semibold text-slate-200 font-[Poppins]">{getCurrentDisplayName()}</h2>
      </div>
    </>
  );
};

export default SurveyNav;
