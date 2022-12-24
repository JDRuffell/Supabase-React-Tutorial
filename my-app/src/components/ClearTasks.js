import { Flex, Button, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import supabase from '../supabase';

export default function ClearTasks() {
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    async function handleClear() {
        if (!window.confirm('Are you sure you want to clear all tasks?')) return;
        
        setLoading(true);
        const {data, error } = await supabase.from('todos').delete().not('text', 'eq', 'Do not delete me');
        setLoading(false);

        toast({
            title: error || 'Tasks cleared',
            position: 'top',
            status: error ? 'error' : 'success',
            duration: 2000,
            isClosable: true,
          });
    }
    return (
        <Flex>
            <Button 
                colorScheme="gray" 
                px="8"
                h="45" 
                color="gray.500" 
                mt="10"
                onClick={handleClear}
                isLoading={loading}
                loadingText="Clearing tasks"
            >
                Clear Tasks
            </Button>
        </Flex>
    );
}