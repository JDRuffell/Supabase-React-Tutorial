import { VStack, StackDivider, HStack, Text, Image, Box} from '@chakra-ui/react';
import DeleteTask from './DeleteTask';
import ClearTasks from './ClearTasks.js';
import img from '../images/empty.svg';

export default function TaskList() {

    // If there are no tasks, show placeholder image
    return (
        <Box align="center">
            <Image src={img} mt="30px" maxW="95%" />
        </Box>
    );

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
                {/* <HStack key="">
                    <Text w="100%" p="8px" borderRadius="lg">
                        Wash the dishes
                    </Text>
                    <DeleteTask />
                </HStack> */}

            </VStack>

            <ClearTasks />
        </>
    );
}
