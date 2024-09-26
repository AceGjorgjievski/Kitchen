
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundImage: 'url(/images/background_image.jpg)',
        position: "fixed",
        border: "1px solid white"
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
    gridContainer: {
        marginTop: '10px',
        padding: '40px 0'
    },
    boxModalStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 400,
        backgroundColor: 'gray',
        border: '2px solid #FFF',
        padding: 4,
        outline: 'none',
        maxWidth: '1000px'
    },
}));

export default useStyles;
