import { useTranslation } from '@killerparty/intl';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import Lottie from 'lottie-react';
import { useEffect, useRef } from 'react';

import JoinRoomLottie from '@/assets/lotties/join-room-with-code.json';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/InputOTP';

import { JoinRoomButton } from './JoinRoomButton';

interface ChooseRoomProps {
  pseudo?: string | null;
}

export function ChooseRoom({ pseudo }: ChooseRoomProps) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <div className="flex flex-col items-center justify-between shadow-md rounded-lg p-8 bg-brand w-1/2">
      <Lottie className="h-2/3" animationData={JoinRoomLottie} />
      <div className="flex flex-col items-center">
        <InputOTP
          disabled={!pseudo}
          ref={inputRef}
          maxLength={5}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        >
          <InputOTPGroup className="bg-white">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
          </InputOTPGroup>
        </InputOTP>
        <span className="mt-4">{t('home.join.room.code.label')}</span>
      </div>
      <JoinRoomButton pseudo={pseudo} />
    </div>
  );
}
