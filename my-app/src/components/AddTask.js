import { Button, HStack, Input, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import supabase from '../supabase';

export default function AddTask() {
    const [taskName, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast()

    async function handleAdd(e) {
        e.preventDefault();

        if (!taskName) {
            toast({
                title: 'Cannot add a task without a name',
                position: 'top',
                status: 'warning',
                duration: 2000,
                isClosable: true,
            });

            return;
        }

        setLoading(true);
        const {data, error} = await supabase.from('todos').insert([{text: taskName}]);
        setLoading(false);
        setText('');



        toast({
            title: error || 'Task added',
            position: 'top',
            status: error ? 'error' : 'success',
            duration: 2000,
            isClosable: true,
        });
    }

    return (
        <form onSubmit={handleAdd}>
            <HStack my="4" h="45">
                <Input 
                    h="100%"
                    variant="filled" 
                    placeholder="Do the laundry" 
                    disabled={loading}
                    value={taskName}
                    onChange={e => setText(e.target.value)}
                />
                <Button 
                    colorScheme="blue" 
                    px="10" 
                    h="100%" 
                    type="submit"
                    isLoading={loading}
                    loadingText="Adding"
                >
                    Add
                </Button>
            </HStack>
        </form>
    );
}