import { IconButton } from "@chakra-ui/react";
import { BsFillTrash2Fill } from 'react-icons/bs'

export default function DeleteTask() {
    return <IconButton isRound="true" icon={<BsFillTrash2Fill />}/>
}