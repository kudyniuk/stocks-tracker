import MBank from '../../assets/logos/mbank.webp'
import XTB from '../../assets/logos/xtb.webp'
import ING from '../../assets/logos/ing.png'
import { styled } from "@mui/material";


const resolveImage = (name: string): string => {
    switch (name) {
        case "XTB":
            return XTB
        case "MBank":
            return MBank
        case "ING":
            return ING
        default:
            return ING
    }
}

const Image = styled('img')(({ theme }: any /* TODO: Fix any */) => ({
    boxShadow: theme.shadows[3],
    height: 48,
    width: 48,
    borderRadius: 8
}));

type Props = {
    name: string,
    alt: string
}

export const AccountAvatar: React.FC<Props> = ({ name, alt }) => {
    return <Image
        src={resolveImage(name)}
        alt={alt}
    />
}