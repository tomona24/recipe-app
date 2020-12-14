import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LocalCafeRoundedIcon from '@material-ui/icons/LocalCafeRounded';
import IngredientsLabel from './IngredientLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const RecipeCard = (props) => {
  const { t, recipe, loadRecipe, deletechosenRecipe } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = (event) => {
    const { id } = event.target;
    deletechosenRecipe(id);
    handleClose();
  };

  const editStr = t('このレシピを編集する');
  const deleteStr = t('このレシピを削除する');

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Avatar aria-label="recipe" className={classes.avatar}>
            <LocalCafeRoundedIcon />
          </Avatar>
        }
        action={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <>
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                component={Link}
                to={{
                  pathname: `/create`,
                  state: { editRecipe: recipe },
                }}
              >
                {editStr}
              </MenuItem>
              <MenuItem onClick={handleDelete} id={recipe.id}>
                {deleteStr}
              </MenuItem>
            </Menu>
          </>
        }
        title={recipe.title}
        subheader={recipe.updateDate}
      />
      <Link to={`/detail/${recipe.id}`}>
        <CardMedia
          className={classes.media}
          image="https://source.unsplash.com/random"
          title={`${recipe.title}のレシピを見る`}
        />
      </Link>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button size="small" color="primary">
          View
        </Button>
        <Link
          to={{
            pathname: `/create`,
            state: { editRecipe: recipe },
          }}
        >
          Edit
        </Link>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <IngredientsLabel ingredients={recipe.ingredients} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipeCard;
