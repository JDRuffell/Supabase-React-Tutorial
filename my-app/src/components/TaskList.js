import { VStack, StackDivider, HStack, Text, Image, Box } from '@chakra-ui/react';
import DeleteTask from './DeleteTask.js';
import ClearTasks from './ClearTasks.js';
import img from '../images/empty.svg';
import supabase from '../supabase.js';
import { useEffect, useState } from 'react';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);

    async function fetchData() {
        let { data: tasks, error } = await supabase.from('todos').select('*');

        setTasks(tasks);
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const todoListener = supabase.channel('custom-all-channel')
        .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'todos' },
        (payload) => {
            fetchData();
            //console.log('Change received!', payload)
        }
        )
        .subscribe();

        return () => {
            todoListener.unsubscribe();
        };
    })

    if (!tasks.length) {
        return (
            <Box align="center">
                <Image src={img} mt="30px" maxW="95%" />
            </Box>
        );
    }

    return (
        <>
            <VStack
                divider={<StackDivider />}
                borderColor="gray.100"
                borderWidth="2px"
                p="5"
                borderRadius="lg"
                w="100%"
                maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
                alignItems="stretch"
            >
                {tasks.map(task => (
                    <HStack key={task.id}>
                        <Text w="100%" p="8px" borderRadius="lg">
                            {task.text}
                        </Text>
                        <DeleteTask id={task.id}/>
                    </HStack>
                ))}
            </VStack>

            <ClearTasks />
        </>
    );
}
