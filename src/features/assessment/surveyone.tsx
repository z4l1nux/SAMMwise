import React, { useCallback, useState } from 'react';
import Mysurvey from './surveytypeone';
import { useRouter } from 'next/router';

const SurveyOne: React.FC = () => {
    const router = useRouter();
    const [showPage, setShowPage] = useState(true);

    const onCompletePage = useCallback((data: Record<string, any>) => {
        sessionStorage.setItem('dataResults', JSON.stringify(data));
        router.push('/results');
        setShowPage(s => !s);
    }, [showPage]);

    return (
        <div>
            <Mysurvey />
        </div>
    );
};

export default SurveyOne;
