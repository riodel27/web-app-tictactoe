'use client';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog-custom';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

import NewBoard from './board';

interface GameResultDialogProps {
  open: boolean;
  onInteractOutside: () => void;
  handleContinue: () => void;
  handleStop: () => void;
  result: string;
  squares: Array<string | null>;
  avatar: string;
  loading: boolean;
}

interface ChooseFirstMoveDialogProps {
  player1: string;
  player2: string;
  open: boolean;
  onInteractOutside: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSetFirstMove: (_value: string) => void;
  chooseFirstMoveDialogvalue: string;
}

export const ChooseFirstMoveDialog: React.FC<ChooseFirstMoveDialogProps> = ({
  player1,
  player2,
  open,
  onInteractOutside,
  handleSetFirstMove,
  chooseFirstMoveDialogvalue,
}) => {
  const handleRadioItemClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    handleSetFirstMove(event.currentTarget.value);
  };

  return (
    <Dialog>
      <DialogContent
        className='sm:max-w-[425px]'
        open={open}
        onInteractOutside={onInteractOutside}
      >
        <DialogHeader>
          <DialogTitle>Who wants to make the first move?</DialogTitle>
          <DialogDescription>
            First move will automatically assign to &quot;X&quot;
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <RadioGroup
            className='grid grid-cols-3 gap-4'
            value={chooseFirstMoveDialogvalue}
          >
            <Label
              htmlFor={player1}
              className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary'
            >
              <RadioGroupItem
                value={player1}
                id={player1}
                className='sr-only'
                onClick={handleRadioItemClick}
              />

              {player1}
            </Label>
            <Label
              htmlFor='random'
              className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary'
            >
              <RadioGroupItem
                value='random'
                id='random'
                className='sr-only'
                onClick={handleRadioItemClick}
              />
              Random
            </Label>
            <Label
              htmlFor={player2}
              className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary'
            >
              <RadioGroupItem
                value={player2}
                id={player2}
                className='sr-only'
                onClick={handleRadioItemClick}
              />

              {player2}
            </Label>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={onInteractOutside}>
            Continue Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const GameResultDialog: React.FC<GameResultDialogProps> = ({
  open,
  onInteractOutside,
  handleContinue,
  handleStop,
  result,
  squares,
  avatar,
  loading,
}) => {
  return (
    <Dialog>
      <DialogContent
        className='sm:max-w-[425px]'
        open={open}
        onInteractOutside={onInteractOutside}
      >
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>
            {result !== 'draw' && (
              <>
                <span className='text-base'>Winner:</span>{' '}
                <span className='ml-2'>{result}</span>{' '}
                <span className='text-sm text-gray-500'>({avatar})</span>
              </>
            )}
            {result === 'draw' && (
              <span className='text-2xl font-bold'>Draw</span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className='pointer-events-none opacity-50'>
          <Separator className='my-5' />
          <NewBoard squares={squares} />
          <Separator className='my-5' />
        </div>

        <DialogFooter>
          {loading ? (
            <Button type='submit' disabled>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button type='submit' onClick={handleStop}>
              Stop
            </Button>
          )}

          <Button
            disabled={loading}
            className='mb-2'
            type='submit'
            onClick={handleContinue}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
