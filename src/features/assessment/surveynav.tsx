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
  const t = useTranslations('assessment.domains');
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
    { name: 'Governance',     displayName: t('governance'),     state: true },
    { name: 'Design',         displayName: t('design'),         state: false },
    { name: 'Implementation', displayName: t('implementation'), state: false },
    { name: 'Verification',   displayName: t('verification'),   state: false },
    { name: 'Operations',     displayName: t('operations'),     state: false },
    { name: 'Details',        displayName: t('details'),        state: false },
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
      <nav className="flex justify-center items-center gap-4 py-5 px-5 flex-wrap">
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
