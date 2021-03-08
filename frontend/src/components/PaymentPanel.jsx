import React, { useState } from 'react'
import { Steps } from 'rsuite';

const PaymentPanel = () => {

    const [step, setStep] = useState(0);
    const onChange = nextStep => {
      setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

   return (
       <>
    <div>
        <Steps current={step}>
            <Steps.Item />
            <Steps.Item />
            <Steps.Item />
            <Steps.Item />
        </Steps>
        
        <div>
            <button onClick={onPrevious} disabled={step === 0}>
            Previous
            </button>
            <button onClick={onNext} disabled={step === 3}>
            Next
            </button>
        </div>
    </div>
    </>
  );
}

export default PaymentPanel