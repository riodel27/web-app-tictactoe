'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useGameSessionStore } from '@/lib/store';

const formSchema = z
  .object({
    player1: z.string().min(3, {
      message: 'name must be at least 3 characters.',
    }),
    player2: z.string().min(3, {
      message: 'name must be at least 3 characters.',
    }),
  })
  .refine((data) => data.player1 !== data.player2, {
    message: 'Name must be different from Player 1.',
    path: ['player2'],
  });

export function NewGameForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { setPlayers } = useGameSessionStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      player1: '',
      player2: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setPlayers(values.player1, values.player2);

    setLoading(false);

    router.push(`/game`);
  }

  return (
    <div className='mb-8 rounded-sm bg-white' data-testid='deposit-form'>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>Start New Game</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>New Game</DialogTitle>
            <DialogDescription>
              Please provide names before you can start the game.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <FormField
                  control={form.control}
                  name='player1'
                  render={({ field }) => (
                    <FormItem className='mb-3'>
                      <FormLabel>Player 1</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='shadcn'
                          {...field}
                          data-testid='player-one-input'
                          type='text'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='player2'
                  render={({ field }) => (
                    <FormItem className='mb-3'>
                      <FormLabel>Player 2</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='shadcn'
                          {...field}
                          data-testid='player-two-input'
                          type='text'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <div className='flex justify-end gap-2'>
                    {loading ? (
                      <Button type='submit' disabled>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        Please wait
                      </Button>
                    ) : (
                      <Button data-testid='create-button' type='submit'>
                        Start
                      </Button>
                    )}
                  </div>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
