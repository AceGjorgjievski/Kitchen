
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundImage: 'url(/images/background_image.jpg)',
        position: "fixed"
    },
    textBig: {
        textAlign: "center",
        color: "white",
        fontSize: "2rem",
        paragraph: true
    },
    textSmall: {
        textAlign: "center",
        color: "white",
        fontSize: "1.25rem",
        paragraph: true
    },
    buttons: {
        marginTop: "40px"
    },
    cardGrid: {
        padding: '20px 0'
    },
    card: {
        marginLeft: "20px",
        marginRight: "20px",
        height: "100%",
        display: "flex",
        flexDirection: 'column'
    },
    cardContent: {
        flexGrow: 1
    },
    cardMedia: {
        paddingTop: '56.25%'
    },
    grid: {
        marginTop: '10px',
        padding: '40px 0'
    }
}));

export default useStyles;
