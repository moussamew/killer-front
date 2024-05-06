import { useTranslation } from '@killerparty/intl';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import Lottie from 'lottie-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import JoinRoomLottie from '@/assets/lotties/join-room-with-code.json';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/InputOTP';
import { onEnter } from '@/helpers/keys';
import { useCreatePlayer, useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

import { JoinRoomButton } from './JoinRoomButton';

interface ChooseRoomProps {
  pseudo?: string | null;
  defaultAvatar: string;
}

export function ChooseRoom({ pseudo, defaultAvatar }: ChooseRoomProps) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [roomCode, setRoomCode] = useState<string>('');
  const { createPlayer } = useCreatePlayer();
  const { updatePlayer } = useUpdatePlayer();
  const { session } = useSession();

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const handleJoinRoom = async () => {
    if (!pseudo) return;

    try {
      if (session) {
        await updatePlayer.mutateAsync({
          id: session?.id,
          room: roomCode,
          name: pseudo,
        });
      } else {
        const { id: playerId } = await createPlayer.mutateAsync({
          name: pseudo,
          avatar: defaultAvatar,
        });

        await updatePlayer.mutateAsync({
          id: playerId,
          room: roomCode,
        });
      }

      toast.success('Vous avez rejoint la partie avec succès');
    } catch (error) {
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-between shadow-md rounded-lg p-8 bg-brand w-1/2">
      <Lottie className="h-2/3" animationData={JoinRoomLottie} />
      <div className="flex flex-col items-center">
        <InputOTP
          disabled={!pseudo}
          ref={inputRef}
          maxLength={5}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          value={roomCode}
          onChange={(value) => setRoomCode(value.toUpperCase())}
          onKeyDown={({ key, currentTarget: { value } }) => {
            if (value.length === 5) {
              onEnter({ key, fn: handleJoinRoom });
            }
          }}
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
      <JoinRoomButton
        pseudo={pseudo}
        roomCode={roomCode}
        handleJoinRoom={handleJoinRoom}
        isLoading={createPlayer.isPending || updatePlayer.isPending}
      />
    </div>
  );
}
