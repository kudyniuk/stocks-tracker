import { Checkbox, ListItem, ListItemAvatar, ListItemText, styled } from "@mui/material";
import { FC, useState } from "react";

type Props = {
    name: string
    imageUrl: string
    description?: string
    checked: boolean
    onClick: () => void
    divider?: boolean  
};

const Image = styled('img')(({ theme }: any /* TODO: Fix any */) => ({
    boxShadow: theme.shadows[3],
    height: 48,
    width: 48,
    borderRadius: 8
}));

export const Account: FC<Props> = ({name, imageUrl, description, checked, onClick, divider}) => {
    return <ListItem divider={divider} onClick={onClick} button>
        <ListItemAvatar>
            <Image
                alt={name}
                src={imageUrl}
            />
        </ListItemAvatar>
        <ListItemText
            primary={name}
            secondary={description}
        />
        <Checkbox checked={checked} />
    </ListItem>
}