import { useEffect } from 'react';
import { useRouter } from 'next/router';
import getSurvey from '../features/assessment/surveys/totalsurvey';

export default function TestResults() {
    const router = useRouter();

    useEffect(() => {
        const dummyData: any = {
            'Company Name': 'TestCorp',
            'Project name': 'AISVS Pilot',
            'Description of Project': 'A test project for AI security.'
        };

        const surveyData = getSurvey();
        surveyData.pages.forEach((page: any) => {
            if (page.elements) {
                page.elements.forEach((panel: any) => {
                    if (panel.elements) {
                        panel.elements.forEach((q: any) => {
                            // Assign random score (0, 0.25, 0.5, 1) mostly 0.5
                            dummyData[q.name] = 0.5; 
                        });
                    }
                });
            }
        });

        sessionStorage.setItem('assessmentState', JSON.stringify(dummyData));
        sessionStorage.setItem('freshCompletion', 'true');
        router.push('/results');
    }, []);

    return <div>Loading test results...</div>;
}
