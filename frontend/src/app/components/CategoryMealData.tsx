import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Modal,
    Rating,
    Typography
} from "@mui/material";
import {Meal} from "../types/types";
import useStyles from "../styles/styles";
import {useState} from "react";
import Image from "next/image";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {addMealToShoppingCart} from "../utils/shoppingCart.utils";
import {useAuth} from "../../context/auth.context";
import {useRouter} from "next/navigation";

interface CategoryMealDataProps {
    meals: Meal[];
}

const CategoryMealData = ({meals}: CategoryMealDataProps) => {
    const classes = useStyles();
    const {shoppingCart, token, user, fetchShoppingCart} = useAuth();
    const [open, setOpen] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

    const [selectedMealQuantity, setSelectedMealQuantity] = useState<number>(1);

    const router = useRouter();


    const handleOpen = (meal: Meal) => {
        setOpen(true);
        setSelectedMeal(meal);
    }
    const handleClose = () => {
        setOpen(false);
        setSelectedMeal(null);
    }

    const handleOperationClick = (operation: string) => {
        if (operation == "+") {
            setSelectedMealQuantity((prev) => prev + 1);
        } else {
            if (selectedMealQuantity === 1) {
                setSelectedMealQuantity(1);
            } else {
                setSelectedMealQuantity((prev) => prev - 1);
            }
        }
    }

    const handleAddToCart = async () => {
        if(user) {
            await addMealToShoppingCart(
                shoppingCart.id,
                selectedMeal?.idMeal,
                selectedMeal?.strMealThumb,
                selectedMeal?.strMeal,
                selectedMealQuantity,
                selectedMeal?.price,
                token,
                fetchShoppingCart
            )
            handleClose();
        } else {
            router.push("/login");
        }
        setSelectedMealQuantity(1);
    }


    return (
        <Box>
            <Grid container spacing={4} className={classes.gridContainer}>
                {meals.map((meal, index) => {
                        return (
                            <Grid item key={meal.idMeal || index} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={meal.strMealThumb}
                                        title={"Meal image"}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5">
                                            {meal.strMeal}
                                        </Typography>
                                        <Typography variant="h6">
                                            Price: ${meal.price}
                                        </Typography>
                                        <Typography>
                                            {meal.strMeal}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size={"small"} color={"primary"}
                                                onClick={() => handleOpen(meal)}>View</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    }
                )}
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.boxModalStyle}>
                    <Grid container spacing={2}>
                        {/* Left Column: Image */}
                        <Grid item xs={6}>
                            <Image
                                src={selectedMeal?.strMealThumb}
                                alt="Image of the selected meal"
                                style={{objectFit: 'cover', width: '100%', height: 'auto'}}
                                priority={true} // Optional: for preloading the image
                                width={400}
                                height={300}
                            />
                        </Grid>
                        {/* Right Column: Details */}
                        <Grid item xs={6}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                <>
                                    <div>
                                        <p>Details of the Meal:</p>
                                    </div>
                                    {selectedMeal?.strMeal}
                                </>
                            </Typography>
                            <Grid container spacing={2} sx={{mt: 0.2}}>
                                <Grid item>
                                    <Typography id="modal-modal-description">
                                        Rating:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Rating name={'rating'} defaultValue={selectedMeal?.rating} precision={0.5}
                                            readOnly={true}/>
                                </Grid>
                            </Grid>

                            <Grid container sx={{mt: 1}}>
                                <Typography variant="h6" sx={{color: "green"}}>
                                    Price: ${selectedMeal?.price}
                                </Typography>
                            </Grid>

                            <Grid container>
                                <Typography variant="h6" sx={{color: "red"}}>
                                    {selectedMeal?.reviews} reviews
                                </Typography>
                            </Grid>


                            {/* Add Quantity Control */}
                            <Box sx={{mt: 2}}>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleOperationClick("-")}
                                >
                                    -
                                </Button>
                                <Typography component="span" sx={{mx: 2}}>
                                    {selectedMealQuantity}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleOperationClick("+")}
                                >
                                    +
                                </Button>
                            </Box>
                            {/* Add to Cart Button */}
                            <Box sx={{mt: 2}}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                    <ShoppingCartIcon sx={{marginLeft: '8px'}}/>
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Box>
    );
};

export default CategoryMealData;
